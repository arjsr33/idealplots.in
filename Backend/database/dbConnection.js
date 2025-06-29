// ================================================================
// BACKEND/DATABASE/DBCONNECTION.JS - DATABASE CONNECTION MANAGER
// Centralized MySQL database connection with connection pooling
// ================================================================

const mysql = require('mysql2/promise');
const path = require('path');

// ================================================================
// DATABASE CONFIGURATION
// ================================================================

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'real_estate',
  
  // Connection pool settings
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
  acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 60000,
  timeout: parseInt(process.env.DB_TIMEOUT) || 60000,
  
  // MySQL-specific settings
  charset: 'utf8mb4',
  timezone: '+00:00',
  
  // Connection behavior
  reconnect: true,
  idleTimeout: 300000, // 5 minutes
  maxReconnects: 10,
  
  // SSL configuration (for production)
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  } : false,
  
  // Additional options
  supportBigNumbers: true,
  bigNumberStrings: true,
  dateStrings: false,
  debug: process.env.NODE_ENV === 'development' && process.env.DB_DEBUG === 'true',
  
  // SQL mode for strict data validation
  sql_mode: 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO'
};

// ================================================================
// CONNECTION POOL INSTANCE
// ================================================================

let pool = null;
let connectionAttempts = 0;
const maxConnectionAttempts = 5;

// Create connection pool
const createPool = () => {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Pool event handlers
    pool.on('connection', (connection) => {
      console.log(`✅ New database connection established: ${connection.threadId}`);
      connectionAttempts = 0; // Reset attempts on successful connection
    });
    
    pool.on('error', (err) => {
      console.error('❌ Database pool error:', err);
      
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('🔄 Database connection lost, attempting to reconnect...');
        handleDisconnect();
      } else {
        throw err;
      }
    });
    
    pool.on('acquire', (connection) => {
      if (process.env.DB_DEBUG === 'true') {
        console.log(`🔒 Connection ${connection.threadId} acquired`);
      }
    });
    
    pool.on('release', (connection) => {
      if (process.env.DB_DEBUG === 'true') {
        console.log(`🔓 Connection ${connection.threadId} released`);
      }
    });
    
    console.log('📊 Database connection pool created successfully');
    return pool;
    
  } catch (error) {
    console.error('❌ Failed to create database pool:', error);
    throw error;
  }
};

// Handle connection loss and reconnection
const handleDisconnect = () => {
  connectionAttempts++;
  
  if (connectionAttempts > maxConnectionAttempts) {
    console.error(`❌ Maximum connection attempts (${maxConnectionAttempts}) reached. Giving up.`);
    process.exit(1);
  }
  
  console.log(`🔄 Reconnection attempt ${connectionAttempts}/${maxConnectionAttempts}`);
  
  setTimeout(() => {
    try {
      pool = createPool();
    } catch (error) {
      console.error('❌ Failed to reconnect to database:', error);
      handleDisconnect();
    }
  }, 2000 * connectionAttempts); // Exponential backoff
};

// Initialize pool
createPool();

// ================================================================
// CONNECTION MANAGEMENT FUNCTIONS
// ================================================================

/**
 * Get a connection from the pool
 * @returns {Promise<Connection>} Database connection
 */
const getConnection = async () => {
  try {
    if (!pool) {
      throw new Error('Database pool not initialized');
    }
    
    const connection = await pool.getConnection();
    
    // Set session-specific configurations
    await connection.execute('SET SESSION sql_mode = ?', [dbConfig.sql_mode]);
    await connection.execute('SET SESSION time_zone = ?', [dbConfig.timezone]);
    
    return connection;
  } catch (error) {
    console.error('❌ Error getting database connection:', error);
    throw error;
  }
};

/**
 * Execute a query with automatic connection management
 * @param {string} query - SQL query
 * @param {Array} params - Query parameters
 * @param {Object} options - Additional options
 * @returns {Promise<Array>} Query results
 */
const executeQuery = async (query, params = [], options = {}) => {
  let connection;
  
  try {
    connection = await getConnection();
    
    const startTime = Date.now();
    const [results] = await connection.execute(query, params);
    const executionTime = Date.now() - startTime;
    
    // Log slow queries in development
    if (process.env.NODE_ENV === 'development' && executionTime > 1000) {
      console.warn(`⚠️ Slow query detected (${executionTime}ms):`, query.substring(0, 100) + '...');
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Database query error:', {
      query: query.substring(0, 100) + '...',
      params: params,
      error: error.message
    });
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Execute a transaction with automatic rollback on error
 * @param {Function} callback - Function containing transaction operations
 * @returns {Promise<any>} Transaction result
 */
const executeTransaction = async (callback) => {
  let connection;
  
  try {
    connection = await getConnection();
    await connection.beginTransaction();
    
    const result = await callback(connection);
    
    await connection.commit();
    return result;
    
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
        console.log('🔄 Transaction rolled back due to error');
      } catch (rollbackError) {
        console.error('❌ Error rolling back transaction:', rollbackError);
      }
    }
    
    console.error('❌ Transaction error:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Execute stored procedure
 * @param {string} procedureName - Name of the stored procedure
 * @param {Array} params - Procedure parameters
 * @returns {Promise<Array>} Procedure results
 */
const executeStoredProcedure = async (procedureName, params = []) => {
  const placeholders = params.map(() => '?').join(', ');
  const query = `CALL ${procedureName}(${placeholders})`;
  
  return await executeQuery(query, params);
};

/**
 * Test database connection
 * @returns {Promise<boolean>} Connection status
 */
const testConnection = async () => {
  try {
    const connection = await getConnection();
    const [results] = await connection.execute('SELECT 1 as test');
    connection.release();
    
    return results && results[0] && results[0].test === 1;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};

/**
 * Get pool status information
 * @returns {Object} Pool status
 */
const getPoolStatus = () => {
  if (!pool) {
    return { status: 'not_initialized' };
  }
  
  return {
    status: 'active',
    totalConnections: pool.pool._allConnections.length,
    freeConnections: pool.pool._freeConnections.length,
    acquiredConnections: pool.pool._acquiredConnections.length,
    queuedRequests: pool.pool._connectionQueue.length
  };
};

/**
 * Close all database connections
 * @returns {Promise<void>}
 */
const closeAllConnections = async () => {
  try {
    if (pool) {
      await pool.end();
      console.log('📊 Database connection pool closed');
      pool = null;
    }
  } catch (error) {
    console.error('❌ Error closing database connections:', error);
    throw error;
  }
};

// ================================================================
// QUERY BUILDERS AND HELPERS
// ================================================================

/**
 * Build pagination query
 * @param {string} baseQuery - Base SQL query
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @param {string} orderBy - Order by clause
 * @returns {Object} Query and count query
 */
const buildPaginationQuery = (baseQuery, page = 1, limit = 10, orderBy = '') => {
  const offset = (page - 1) * limit;
  
  let query = baseQuery;
  if (orderBy) {
    query += ` ORDER BY ${orderBy}`;
  }
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  
  const countQuery = baseQuery.replace(/SELECT .+ FROM/, 'SELECT COUNT(*) as total FROM');
  
  return { query, countQuery };
};

/**
 * Escape string for LIKE queries
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
const escapeLikeString = (str) => {
  return str.replace(/[%_\\]/g, '\\$&');
};

/**
 * Build search conditions
 * @param {Object} searchParams - Search parameters
 * @param {Array} searchFields - Fields to search in
 * @returns {Object} WHERE clause and parameters
 */
const buildSearchConditions = (searchParams, searchFields) => {
  const conditions = [];
  const params = [];
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && searchFields.includes(key)) {
      if (typeof value === 'string') {
        conditions.push(`${key} LIKE ?`);
        params.push(`%${escapeLikeString(value)}%`);
      } else {
        conditions.push(`${key} = ?`);
        params.push(value);
      }
    }
  });
  
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  
  return { whereClause, params };
};

// ================================================================
// ERROR HANDLING AND LOGGING
// ================================================================

/**
 * Log database operation
 * @param {string} operation - Operation type
 * @param {Object} details - Operation details
 */
const logDatabaseOperation = (operation, details) => {
  if (process.env.NODE_ENV === 'development' || process.env.DB_LOG === 'true') {
    console.log(`🗄️ DB Operation: ${operation}`, details);
  }
};

/**
 * Handle database errors
 * @param {Error} error - Database error
 * @param {string} context - Error context
 * @returns {Error} Processed error
 */
const handleDatabaseError = (error, context = '') => {
  const errorDetails = {
    code: error.code,
    errno: error.errno,
    sqlState: error.sqlState,
    sqlMessage: error.sqlMessage,
    context
  };
  
  console.error('❌ Database Error:', errorDetails);
  
  // Map specific database errors to user-friendly messages
  switch (error.code) {
    case 'ER_DUP_ENTRY':
      error.userMessage = 'This record already exists';
      break;
    case 'ER_NO_REFERENCED_ROW_2':
      error.userMessage = 'Referenced record does not exist';
      break;
    case 'ER_ROW_IS_REFERENCED_2':
      error.userMessage = 'Cannot delete record as it is being used elsewhere';
      break;
    case 'ER_DATA_TOO_LONG':
      error.userMessage = 'Data is too long for the field';
      break;
    case 'ER_BAD_NULL_ERROR':
      error.userMessage = 'Required field is missing';
      break;
    default:
      error.userMessage = 'Database operation failed';
  }
  
  return error;
};

// ================================================================
// EXPORTS
// ================================================================

module.exports = {
  // Core functions
  getConnection,
  executeQuery,
  executeTransaction,
  executeStoredProcedure,
  testConnection,
  closeAllConnections,
  
  // Pool management
  getPoolStatus,
  
  // Query helpers
  buildPaginationQuery,
  buildSearchConditions,
  escapeLikeString,
  
  // Utilities
  logDatabaseOperation,
  handleDatabaseError,
  
  // Direct pool access (use with caution)
  pool: () => pool,
  
  // Configuration
  dbConfig
};