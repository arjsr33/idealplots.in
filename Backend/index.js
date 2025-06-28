import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());

// Database connection config
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

app.get('/', (req,res)=>{
    res.send("Backend is active");
})

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Test queries using your schema
        const [tables] = await connection.execute('SHOW TABLES');
        const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
        const [propertyCount] = await connection.execute('SELECT COUNT(*) as count FROM property_listings');
        
        await connection.end();
        
        res.json({
            message: 'Database connected successfully!',
            totalTables: tables.length,
            users: userCount[0].count,
            properties: propertyCount[0].count,
            tables: tables.map(t => Object.values(t)[0])
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Database connection failed',
            details: error.message 
        });
    }
});

// Example API route using your schema
app.get('/api/properties', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [properties] = await connection.execute(`
            SELECT 
                pl.id, pl.title, pl.description, pl.property_type,
                pl.price, pl.area, pl.city, pl.location, pl.status,
                u.name as owner_name
            FROM property_listings pl
            LEFT JOIN users u ON pl.owner_id = u.id
            WHERE pl.status = 'active'
            ORDER BY pl.created_at DESC
            LIMIT 10
        `);
        await connection.end();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port,()=>{
    console.log(`The server is running at ${port}`)
})