-- ================================================================
-- IMPROVED PROPERTY WEBSITE DATABASE SCHEMA
-- Enhanced User System & Account Integration
-- ================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS property_website 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE property_website;

-- ================================================================
-- 1. ENHANCED USERS TABLE (Buyers & Sellers with Bcrypt)
-- ================================================================

CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    uuid CHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Bcrypt encrypted (minimum 60 chars)
    
    -- User Type & Status
    user_type ENUM('admin', 'user', 'agent') NOT NULL DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended', 'pending_verification') NOT NULL DEFAULT 'pending_verification',
    email_verified_at TIMESTAMP NULL,
    phone_verified_at TIMESTAMP NULL,
    
    -- User Roles (A user can be both buyer and seller)
    is_buyer BOOLEAN DEFAULT TRUE,     -- Can favorite properties, get agent assignments
    is_seller BOOLEAN DEFAULT FALSE,   -- Can list properties for sale
    preferred_agent_id BIGINT UNSIGNED NULL, -- Assigned agent for this user
    
    -- Profile Information
    profile_image VARCHAR(500) NULL,
    date_of_birth DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    
    -- Buyer Preferences (for agent assignment and recommendations)
    preferred_property_types SET('villa', 'apartment', 'house', 'plot', 'commercial') NULL,
    budget_min DECIMAL(15,2) NULL,
    budget_max DECIMAL(15,2) NULL,
    preferred_cities SET('Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kottayam', 'Kannur', 'Kasaragod', 'Malappuram', 'Pathanamthitta', 'Idukki', 'Wayanad') NULL,
    preferred_bedrooms SET('1', '2', '3', '4', '5+') NULL,
    
    -- Address Information
    address TEXT NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) DEFAULT 'Kerala',
    pincode VARCHAR(10) NULL,
    
    -- Agent Specific Fields (only for user_type = 'agent')
    license_number VARCHAR(100) NULL,
    commission_rate DECIMAL(5,2) NULL DEFAULT 2.50,
    agency_name VARCHAR(255) NULL,
    experience_years INT NULL,
    specialization TEXT NULL,
    agent_bio TEXT NULL,
    agent_rating DECIMAL(3,2) DEFAULT 0.00, -- Average rating from users
    total_sales INT DEFAULT 0,
    
    -- Authentication & Security
    remember_token VARCHAR(100) NULL,
    email_verification_token VARCHAR(100) NULL,
    phone_verification_code VARCHAR(10) NULL,
    password_reset_token VARCHAR(100) NULL,
    password_reset_expires_at TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign Keys
    FOREIGN KEY (preferred_agent_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_user_type (user_type),
    INDEX idx_status (status),
    INDEX idx_is_buyer (is_buyer),
    INDEX idx_is_seller (is_seller),
    INDEX idx_preferred_agent (preferred_agent_id),
    INDEX idx_city (city),
    INDEX idx_created_at (created_at),
    
    -- Constraints
    CONSTRAINT chk_password_length CHECK (CHAR_LENGTH(password) >= 60), -- Ensure Bcrypt
    CONSTRAINT chk_agent_fields CHECK (
        (user_type != 'agent') OR 
        (user_type = 'agent' AND license_number IS NOT NULL)
    )
);

-- ================================================================
-- 2. PROPERTY LISTINGS TABLE (Same as before, enhanced)
-- ================================================================

CREATE TABLE property_listings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    listing_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Ownership & Assignment
    owner_id BIGINT UNSIGNED NOT NULL,
    assigned_agent_id BIGINT UNSIGNED NULL,
    
    -- Basic Property Information
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    property_type ENUM(
        'residential_plot', 'commercial_plot', 'agricultural_land',
        'villa', 'apartment', 'house', 'commercial_building',
        'warehouse', 'shop', 'office_space'
    ) NOT NULL,
    
    -- Pricing & Area
    price DECIMAL(15,2) NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    price_per_sqft DECIMAL(10,2) GENERATED ALWAYS AS (price / area) STORED,
    
    -- Location Details
    city VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    
    -- Property Specifications
    bedrooms INT NULL,
    bathrooms INT NULL,
    parking BOOLEAN DEFAULT FALSE,
    furnished BOOLEAN DEFAULT FALSE,
    
    -- Additional Features
    features JSON NULL,
    
    -- Media
    main_image VARCHAR(500) NULL,
    
    -- Listing Status & Workflow
    status ENUM(
        'draft', 'pending_review', 'approved', 'active', 
        'sold', 'rented', 'withdrawn', 'expired', 'rejected'
    ) NOT NULL DEFAULT 'pending_review',
    
    -- Review & Approval
    reviewed_by BIGINT UNSIGNED NULL,
    reviewed_at TIMESTAMP NULL,
    review_notes TEXT NULL,
    rejection_reason TEXT NULL,
    
    -- Listing Management
    is_featured BOOLEAN DEFAULT FALSE,
    featured_until TIMESTAMP NULL,
    views_count INT DEFAULT 0,
    inquiries_count INT DEFAULT 0,
    favorites_count INT DEFAULT 0, -- Track how many users favorited this
    
    -- SEO & Marketing
    slug VARCHAR(255) UNIQUE NULL,
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    
    -- Foreign Keys
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_listing_id (listing_id),
    INDEX idx_owner_id (owner_id),
    INDEX idx_agent_id (assigned_agent_id),
    INDEX idx_property_type (property_type),
    INDEX idx_city (city),
    INDEX idx_price (price),
    INDEX idx_area (area),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_location_search (city, location),
    INDEX idx_price_range (price, area),
    FULLTEXT idx_search (title, description, location)
);

-- ================================================================
-- 3. PENDING APPROVALS TABLE (Admin Review Queue)
-- ================================================================

CREATE TABLE pending_approvals (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    -- What needs approval
    approval_type ENUM('property_listing', 'user_verification', 'agent_application') NOT NULL,
    record_id BIGINT UNSIGNED NOT NULL, -- ID of the record needing approval
    table_name VARCHAR(100) NOT NULL, -- 'property_listings', 'users', etc.
    
    -- Submission Details
    submitted_by BIGINT UNSIGNED NOT NULL,
    submission_data JSON NULL, -- Copy of submitted data for review
    
    -- Current Status
    status ENUM('pending', 'under_review', 'approved', 'rejected', 'needs_changes') DEFAULT 'pending',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    
    -- Review Process
    assigned_reviewer BIGINT UNSIGNED NULL, -- Which admin is reviewing
    review_started_at TIMESTAMP NULL,
    review_deadline TIMESTAMP NULL,
    
    -- Review Results
    approved_by BIGINT UNSIGNED NULL,
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    admin_notes TEXT NULL,
    changes_requested TEXT NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (submitted_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_reviewer) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_approval_type (approval_type),
    INDEX idx_record_id (record_id),
    INDEX idx_submitted_by (submitted_by),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_assigned_reviewer (assigned_reviewer),
    INDEX idx_created_at (created_at)
);

-- ================================================================
-- 4. ENHANCED USER FAVORITES TABLE (Account Required)
-- ================================================================

CREATE TABLE user_favorites (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL, -- MUST be logged in user
    property_id BIGINT UNSIGNED NOT NULL,
    
    -- Favorite Details
    notes TEXT NULL, -- User's private notes about this property
    notification_preferences JSON DEFAULT ('{"price_change": true, "status_change": true, "similar_properties": false}'),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES property_listings(id) ON DELETE CASCADE,
    
    -- Ensure unique favorites
    UNIQUE KEY unique_favorite (user_id, property_id),
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_property_id (property_id),
    INDEX idx_created_at (created_at)
);

-- ================================================================
-- 5. ENHANCED ENQUIRIES TABLE (Account Integration)
-- ================================================================

CREATE TABLE enquiries (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- User Account Integration
    user_id BIGINT UNSIGNED NULL, -- Links to user account (if they have one)
    
    -- Enquiry Details (always required, even if user has account)
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    requirements TEXT NOT NULL,
    
    -- Account Creation Offer
    account_creation_offered BOOLEAN DEFAULT FALSE,
    account_created_during_enquiry BOOLEAN DEFAULT FALSE,
    
    -- Property Context
    property_id BIGINT UNSIGNED NULL,
    property_title VARCHAR(255) NULL,
    property_price VARCHAR(100) NULL,
    
    -- Source Tracking
    source VARCHAR(100) NULL,
    page_url TEXT NULL,
    user_agent TEXT NULL,
    
    -- Status & Assignment
    status ENUM('new', 'assigned', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    assigned_to BIGINT UNSIGNED NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    
    -- Follow-up & Resolution
    first_response_at TIMESTAMP NULL,
    resolved_at TIMESTAMP NULL,
    resolution_notes TEXT NULL,
    customer_satisfaction_rating INT NULL, -- 1-5 rating
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (property_id) REFERENCES property_listings(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_ticket_number (ticket_number),
    INDEX idx_user_id (user_id),
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_property_id (property_id),
    INDEX idx_status (status),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_created_at (created_at)
);

-- ================================================================
-- 6. USER AGENT ASSIGNMENTS TABLE
-- ================================================================

CREATE TABLE user_agent_assignments (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    agent_id BIGINT UNSIGNED NOT NULL,
    
    -- Assignment Details
    assignment_type ENUM('auto', 'manual', 'user_requested') NOT NULL,
    assignment_reason TEXT NULL, -- Why this agent was assigned
    
    -- Status
    status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
    
    -- Performance Tracking
    properties_shown INT DEFAULT 0,
    meetings_conducted INT DEFAULT 0,
    user_rating DECIMAL(3,2) NULL, -- User's rating of the agent
    agent_notes TEXT NULL,
    
    -- Timestamps
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_contact_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_agent_id (agent_id),
    INDEX idx_status (status),
    INDEX idx_assigned_at (assigned_at),
    
    -- Ensure one active assignment per user
    UNIQUE KEY unique_active_assignment (user_id, status, agent_id)
);

-- ================================================================
-- 7. PROPERTY IMAGES TABLE (Same as before)
-- ================================================================

CREATE TABLE property_images (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    property_id BIGINT UNSIGNED NOT NULL,
    
    -- Image Information
    image_url VARCHAR(500) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    original_filename VARCHAR(255) NULL,
    file_size INT NULL,
    
    -- Image Metadata
    alt_text VARCHAR(255) NULL,
    caption TEXT NULL,
    display_order INT DEFAULT 0,
    
    -- Image Type
    image_type ENUM('gallery', 'floor_plan', 'location_map') DEFAULT 'gallery',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (property_id) REFERENCES property_listings(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_property_id (property_id),
    INDEX idx_display_order (display_order),
    INDEX idx_image_type (image_type)
);

-- ================================================================
-- 8. ENQUIRY NOTES TABLE (Enhanced)
-- ================================================================

CREATE TABLE enquiry_notes (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    enquiry_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    
    -- Note Content
    note TEXT NOT NULL,
    note_type ENUM('internal', 'client_communication', 'system', 'follow_up_reminder') DEFAULT 'internal',
    
    -- Communication Details
    communication_method ENUM('phone', 'email', 'whatsapp', 'in_person', 'system') NULL,
    next_follow_up_date DATE NULL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_enquiry_id (enquiry_id),
    INDEX idx_user_id (user_id),
    INDEX idx_note_type (note_type),
    INDEX idx_follow_up_date (next_follow_up_date),
    INDEX idx_created_at (created_at)
);

-- ================================================================
-- 9. PROPERTY VIEWS TABLE (Enhanced with User Tracking)
-- ================================================================

CREATE TABLE property_views (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    property_id BIGINT UNSIGNED NOT NULL,
    
    -- Visitor Information
    user_id BIGINT UNSIGNED NULL, -- If logged in (for better tracking)
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    
    -- View Details
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(255) NULL,
    referrer_url TEXT NULL,
    time_spent_seconds INT NULL, -- How long they stayed on the page
    
    -- Interest Indicators
    scrolled_to_bottom BOOLEAN DEFAULT FALSE,
    viewed_gallery BOOLEAN DEFAULT FALSE,
    clicked_contact BOOLEAN DEFAULT FALSE,
    
    -- Foreign Keys
    FOREIGN KEY (property_id) REFERENCES property_listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_property_id (property_id),
    INDEX idx_user_id (user_id),
    INDEX idx_ip_address (ip_address),
    INDEX idx_viewed_at (viewed_at),
    INDEX idx_session_id (session_id)
);

-- ================================================================
-- 10. SYSTEM SETTINGS TABLE (Same as before)
-- ================================================================

CREATE TABLE system_settings (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT NULL,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- ================================================================
-- 11. AUDIT LOGS TABLE (Enhanced)
-- ================================================================

CREATE TABLE audit_logs (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    
    -- Who did what
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id BIGINT UNSIGNED NULL,
    
    -- Change Details
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    
    -- Additional Context
    description TEXT NULL, -- Human-readable description
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_record_id (record_id),
    INDEX idx_severity (severity),
    INDEX idx_created_at (created_at)
);

-- ================================================================
-- INSERT INITIAL DATA
-- ================================================================

-- Insert default admin user (with Bcrypt password)
INSERT INTO users (
    name, email, phone, password, user_type, status, 
    email_verified_at, phone_verified_at, is_buyer, is_seller
) VALUES (
    'Admin User', 
    'admin@idealplots.in', 
    '+919876543210',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Bcrypt with cost 12
    'admin', 
    'active',
    NOW(),
    NOW(),
    FALSE,
    FALSE
);

-- Insert sample agent
INSERT INTO users (
    name, email, phone, password, user_type, status,
    license_number, commission_rate, agency_name, experience_years,
    email_verified_at, phone_verified_at, is_buyer, is_seller
) VALUES (
    'Priya Sharma',
    'priya@idealplots.in',
    '+919876543211',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'agent',
    'active',
    'KL/RERA/2023/001',
    2.50,
    'Ideal Properties',
    5,
    NOW(),
    NOW(),
    FALSE,
    FALSE
);

-- Insert sample buyer/seller user
INSERT INTO users (
    name, email, phone, password, user_type, status,
    email_verified_at, phone_verified_at, is_buyer, is_seller,
    preferred_property_types, budget_min, budget_max, preferred_cities
) VALUES (
    'Ravi Kumar',
    'ravi@example.com',
    '+919876543212',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'user',
    'active',
    NOW(),
    NOW(),
    TRUE,
    TRUE,
    'villa,apartment',
    2000000.00,
    5000000.00,
    'Kochi,Thrissur'
);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Ideal Plots', 'string', 'Website name', true),
('contact_phone', '+91 98765 43210', 'string', 'Primary contact number', true),
('contact_email', 'info@idealplots.in', 'string', 'Primary contact email', true),
('bcrypt_rounds', '12', 'number', 'Bcrypt hashing rounds for passwords', false),
('auto_assign_agents', 'true', 'boolean', 'Auto-assign agents to new users', false),
('require_account_for_favorites', 'true', 'boolean', 'Require account to favorite properties', true),
('offer_account_creation_on_enquiry', 'true', 'boolean', 'Offer account creation during enquiry', true);

-- ================================================================
-- ENHANCED VIEWS
-- ================================================================

-- Active properties with complete user details
CREATE VIEW active_properties_with_users AS
SELECT 
    pl.*,
    owner.name as owner_name,
    owner.email as owner_email,
    owner.phone as owner_phone,
    owner.is_seller,
    agent.name as agent_name,
    agent.email as agent_email,
    agent.phone as agent_phone,
    agent.agency_name,
    agent.agent_rating
FROM property_listings pl
LEFT JOIN users owner ON pl.owner_id = owner.id
LEFT JOIN users agent ON pl.assigned_agent_id = agent.id
WHERE pl.status = 'active' AND pl.deleted_at IS NULL;

-- Pending approvals summary for admin
CREATE VIEW pending_approvals_summary AS
SELECT 
    pa.*,
    submitted_user.name as submitted_by_name,
    submitted_user.email as submitted_by_email,
    reviewer.name as reviewer_name,
    CASE 
        WHEN pa.approval_type = 'property_listing' THEN pl.title
        WHEN pa.approval_type = 'user_verification' THEN CONCAT('User: ', user_verification.name)
        ELSE 'Other'
    END as item_title
FROM pending_approvals pa
LEFT JOIN users submitted_user ON pa.submitted_by = submitted_user.id
LEFT JOIN users reviewer ON pa.assigned_reviewer = reviewer.id
LEFT JOIN property_listings pl ON (pa.approval_type = 'property_listing' AND pa.record_id = pl.id)
LEFT JOIN users user_verification ON (pa.approval_type = 'user_verification' AND pa.record_id = user_verification.id)
WHERE pa.status IN ('pending', 'under_review');

-- User dashboard view (for buyers/sellers)
CREATE VIEW user_dashboard_view AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.is_buyer,
    u.is_seller,
    u.preferred_agent_id,
    agent.name as preferred_agent_name,
    COUNT(DISTINCT pl.id) as properties_listed,
    COUNT(DISTINCT uf.id) as properties_favorited,
    COUNT(DISTINCT e.id) as enquiries_submitted,
    COUNT(DISTINCT CASE WHEN pl.status = 'active' THEN pl.id END) as active_listings,
    COUNT(DISTINCT CASE WHEN pl.status = 'sold' THEN pl.id END) as sold_properties
FROM users u
LEFT JOIN users agent ON u.preferred_agent_id = agent.id
LEFT JOIN property_listings pl ON u.id = pl.owner_id AND pl.deleted_at IS NULL
LEFT JOIN user_favorites uf ON u.id = uf.user_id
LEFT JOIN enquiries e ON u.id = e.user_id
WHERE u.user_type = 'user'
GROUP BY u.id;

-- ================================================================
-- ENHANCED TRIGGERS
-- ================================================================

DELIMITER //

-- Auto-create pending approval when property is submitted
CREATE TRIGGER create_property_approval 
AFTER INSERT ON property_listings 
FOR EACH ROW
BEGIN
    IF NEW.status = 'pending_review' THEN
        INSERT INTO pending_approvals (
            approval_type, record_id, table_name, submitted_by, 
            submission_data, priority
        ) VALUES (
            'property_listing', 
            NEW.id, 
            'property_listings', 
            NEW.owner_id,
            JSON_OBJECT(
                'title', NEW.title,
                'property_type', NEW.property_type,
                'price', NEW.price,
                'city', NEW.city
            ),
            'normal'
        );
    END IF;
END //

-- Update favorites count when user favorites a property
CREATE TRIGGER update_favorites_count_insert
AFTER INSERT ON user_favorites
FOR EACH ROW
BEGIN
    UPDATE property_listings 
    SET favorites_count = favorites_count + 1 
    WHERE id = NEW.property_id;
END //

CREATE TRIGGER update_favorites_count_delete
AFTER DELETE ON user_favorites
FOR EACH ROW
BEGIN
    UPDATE property_listings 
    SET favorites_count = favorites_count - 1 
    WHERE id = OLD.property_id;
END //

-- Auto-assign agent to new users based on preferences
CREATE TRIGGER auto_assign_agent_to_user
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    DECLARE agent_id BIGINT UNSIGNED;
    
    -- Only for buyers who just got verified and don't have an agent
    IF NEW.is_buyer = TRUE 
       AND NEW.email_verified_at IS NOT NULL 
       AND OLD.email_verified_at IS NULL
       AND NEW.preferred_agent_id IS NULL
       AND (SELECT setting_value FROM system_settings WHERE setting_key = 'auto_assign_agents') = 'true'
    THEN
        -- Find best agent based on user preferences and agent performance
        SELECT u.id INTO agent_id
        FROM users u
        WHERE u.user_type = 'agent' 
          AND u.status = 'active'
          AND (u.specialization IS NULL OR FIND_IN_SET('residential', u.specialization) > 0)
        ORDER BY u.agent_rating DESC, u.total_sales DESC
        LIMIT 1;
        
        -- Assign the agent
        IF agent_id IS NOT NULL THEN
            UPDATE users SET preferred_agent_id = agent_id WHERE id = NEW.id;
            
            INSERT INTO user_agent_assignments (
                user_id, agent_id, assignment_type, assignment_reason
            ) VALUES (
                NEW.id, agent_id, 'auto', 'Auto-assigned based on preferences and agent performance'
            );
        END IF;
    END IF;
END //

DELIMITER ;

-- ================================================================
-- ENHANCED STORED PROCEDURES
-- ================================================================

DELIMITER //

-- Procedure to handle enquiry with optional account creation
CREATE PROCEDURE HandleEnquiryWithAccount(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(20),
    IN p_requirements TEXT,
    IN p_property_id BIGINT UNSIGNED,
    IN p_create_account BOOLEAN,
    IN p_password VARCHAR(255), -- Bcrypt encrypted
    OUT p_user_id BIGINT UNSIGNED,
    OUT p_ticket_number VARCHAR(50),
    OUT p_account_created BOOLEAN
)
BEGIN
    DECLARE v_existing_user_id BIGINT UNSIGNED DEFAULT NULL;
    DECLARE v_enquiry_id BIGINT UNSIGNED;
    
    -- Check if user already exists
    SELECT id INTO v_existing_user_id 
    FROM users 
    WHERE email = p_email OR phone = p_phone 
    LIMIT 1;
    
    -- Create account if requested and user doesn't exist
    IF p_create_account = TRUE AND v_existing_user_id IS NULL AND p_password IS NOT NULL THEN
        INSERT INTO users (name, email, phone, password, is_buyer, is_seller)
        VALUES (p_name, p_email, p_phone, p_password, TRUE, FALSE);
        
        SET v_existing_user_id = LAST_INSERT_ID();
        SET p_account_created = TRUE;
    ELSE
        SET p_account_created = FALSE;
    END IF;
    
    -- Create enquiry
    INSERT INTO enquiries (
        user_id, name, email, phone, requirements, property_id,
        account_creation_offered, account_created_during_enquiry
    ) VALUES (
        v_existing_user_id, p_name, p_email, p_phone, p_requirements, p_property_id,
        p_create_account, p_account_created
    );
    
    SET v_enquiry_id = LAST_INSERT_ID();
    SET p_user_id = v_existing_user_id;
    
    -- Get the generated ticket number
    SELECT ticket_number INTO p_ticket_number 
    FROM enquiries 
    WHERE id = v_enquiry_id;
    
    -- Update property inquiry count if property specified
    IF p_property_id IS NOT NULL THEN
        UPDATE property_listings 
        SET inquiries_count = inquiries_count + 1 
        WHERE id = p_property_id;
    END IF;
    
END //

-- Procedure to approve property listing
CREATE PROCEDURE ApprovePropertyListing(
    IN p_listing_id BIGINT UNSIGNED,
    IN p_admin_id BIGINT UNSIGNED,
    IN p_notes TEXT
)
BEGIN
    DECLARE v_approval_id BIGINT UNSIGNED;
    
    -- Update property status
    UPDATE property_listings 
    SET status = 'active', 
        approved_at = NOW(),
        reviewed_by = p_admin_id,
        review_notes = p_notes
    WHERE id = p_listing_id;
    
    -- Update pending approval record
    UPDATE pending_approvals 
    SET status = 'approved',
        approved_by = p_admin_id,
        approved_at = NOW(),
        admin_notes = p_notes
    WHERE approval_type = 'property_listing' 
      AND record_id = p_listing_id 
      AND status IN ('pending', 'under_review');
      
    -- Log the approval
    INSERT INTO audit_logs (
        user_id, action, table_name, record_id, description
    ) VALUES (
        p_admin_id, 'approve', 'property_listings', p_listing_id,
        CONCAT('Property listing approved: ', p_notes)
    );
    
END //

-- Procedure to get user recommendations based on preferences
CREATE PROCEDURE GetUserRecommendations(
    IN p_user_id BIGINT UNSIGNED,
    IN p_limit INT DEFAULT 10
)
BEGIN
    DECLARE v_budget_min DECIMAL(15,2);
    DECLARE v_budget_max DECIMAL(15,2);
    DECLARE v_preferred_cities TEXT;
    DECLARE v_preferred_types TEXT;
    
    -- Get user preferences
    SELECT budget_min, budget_max, preferred_cities, preferred_property_types
    INTO v_budget_min, v_budget_max, v_preferred_cities, v_preferred_types
    FROM users 
    WHERE id = p_user_id;
    
    -- Return recommended properties
    SELECT pl.*, 
           (CASE 
               WHEN FIND_IN_SET(pl.city, IFNULL(v_preferred_cities, '')) > 0 THEN 20
               ELSE 0 
           END +
           CASE 
               WHEN FIND_IN_SET(pl.property_type, IFNULL(v_preferred_types, '')) > 0 THEN 20
               ELSE 0 
           END +
           CASE 
               WHEN pl.price BETWEEN IFNULL(v_budget_min, 0) AND IFNULL(v_budget_max, 999999999) THEN 30
               ELSE 0 
           END +
           CASE 
               WHEN pl.is_featured = TRUE THEN 10
               ELSE 0 
           END) as relevance_score
    FROM property_listings pl
    WHERE pl.status = 'active' 
      AND pl.deleted_at IS NULL
      AND pl.id NOT IN (
          SELECT uf.property_id 
          FROM user_favorites uf 
          WHERE uf.user_id = p_user_id
      )
    ORDER BY relevance_score DESC, pl.created_at DESC
    LIMIT p_limit;
    
END //

DELIMITER ;

-- ================================================================
-- ADDITIONAL INDEXES FOR PERFORMANCE
-- ================================================================

-- Indexes for user dashboard queries
CREATE INDEX idx_user_buyer_seller ON users (is_buyer, is_seller, status);
CREATE INDEX idx_user_preferences ON users (preferred_cities(100), preferred_property_types(100));

-- Indexes for admin panel
CREATE INDEX idx_pending_approvals_admin ON pending_approvals (status, approval_type, created_at);
CREATE INDEX idx_properties_pending ON property_listings (status, created_at) WHERE status = 'pending_review';

-- Indexes for agent assignment
CREATE INDEX idx_agent_performance ON users (user_type, agent_rating, total_sales) WHERE user_type = 'agent';

-- Indexes for favorites and recommendations
CREATE INDEX idx_favorites_user_property ON user_favorites (user_id, property_id, created_at);
CREATE INDEX idx_property_recommendations ON property_listings (status, city, property_type, price, is_featured);

-- ================================================================
-- SAMPLE DATA FOR TESTING
-- ================================================================

-- Insert sample buyer user
INSERT INTO users (
    name, email, phone, password, user_type, status,
    email_verified_at, phone_verified_at, is_buyer, is_seller,
    preferred_property_types, budget_min, budget_max, preferred_cities,
    preferred_bedrooms
) VALUES (
    'Amit Singh',
    'amit@example.com',
    '+919876543213',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'user',
    'active',
    NOW(),
    NOW(),
    TRUE,
    FALSE,
    'apartment,villa',
    1500000.00,
    4000000.00,
    'Kochi,Kozhikode',
    '2,3'
);

-- Insert sample property listing
INSERT INTO property_listings (
    owner_id, title, description, property_type, price, area,
    city, location, bedrooms, bathrooms, parking, furnished,
    main_image, status
) VALUES (
    3, -- Ravi Kumar as owner
    'Modern 3BHK Apartment in Kochi',
    'Beautiful apartment with sea view, modern amenities, and great connectivity. Perfect for families.',
    'apartment',
    3500000.00,
    1200.00,
    'Kochi',
    'Marine Drive, Near Lulu Mall',
    3,
    2,
    TRUE,
    FALSE,
    '/uploads/properties/apartment1_main.jpg',
    'active'
);

-- Insert property images
INSERT INTO property_images (property_id, image_url, image_path, display_order, image_type) VALUES
(1, '/uploads/properties/apt1_1.jpg', '/var/www/uploads/properties/apt1_1.jpg', 1, 'gallery'),
(1, '/uploads/properties/apt1_2.jpg', '/var/www/uploads/properties/apt1_2.jpg', 2, 'gallery'),
(1, '/uploads/properties/apt1_3.jpg', '/var/www/uploads/properties/apt1_3.jpg', 3, 'gallery');

-- Insert sample favorite
INSERT INTO user_favorites (user_id, property_id, notes) VALUES
(4, 1, 'Great location, need to check the price negotiation possibility');

-- Insert sample enquiry with account
INSERT INTO enquiries (
    user_id, name, email, phone, requirements, property_id,
    account_created_during_enquiry, source
) VALUES (
    4, 'Amit Singh', 'amit@example.com', '+919876543213',
    'Interested in this apartment. Can we schedule a visit?',
    1, FALSE, 'property_details'
);

-- Insert agent assignment
INSERT INTO user_agent_assignments (
    user_id, agent_id, assignment_type, assignment_reason
) VALUES (
    4, 2, 'auto', 'Auto-assigned based on location preferences and agent expertise'
);

-- ================================================================
-- USEFUL QUERIES FOR APPLICATION
-- ================================================================

/*
-- Get user dashboard data
SELECT * FROM user_dashboard_view WHERE id = ?;

-- Get user's favorite properties with details
SELECT pl.*, uf.notes, uf.created_at as favorited_at
FROM user_favorites uf
JOIN property_listings pl ON uf.property_id = pl.id
WHERE uf.user_id = ? AND pl.status = 'active'
ORDER BY uf.created_at DESC;

-- Get user's enquiries with responses
SELECT e.*, COUNT(en.id) as notes_count, 
       MAX(en.created_at) as last_response
FROM enquiries e
LEFT JOIN enquiry_notes en ON e.id = en.enquiry_id
WHERE e.user_id = ?
GROUP BY e.id
ORDER BY e.created_at DESC;

-- Get admin pending approvals
SELECT * FROM pending_approvals_summary 
WHERE status IN ('pending', 'under_review')
ORDER BY priority DESC, created_at ASC;

-- Get property recommendations for user
CALL GetUserRecommendations(?, 10);

-- Check if user can favorite properties (must be logged in)
SELECT COUNT(*) FROM users WHERE id = ? AND status = 'active';

-- Get agent performance metrics
SELECT u.name, u.agency_name, u.agent_rating, u.total_sales,
       COUNT(uaa.id) as active_clients,
       AVG(uaa.user_rating) as avg_client_rating
FROM users u
LEFT JOIN user_agent_assignments uaa ON u.id = uaa.agent_id AND uaa.status = 'active'
WHERE u.user_type = 'agent' AND u.status = 'active'
GROUP BY u.id
ORDER BY u.agent_rating DESC;
*/

-- ================================================================
-- SECURITY & PERFORMANCE RECOMMENDATIONS
-- ================================================================

/*
SECURITY ENHANCEMENTS:

1. Password Management:
   - All passwords MUST be Bcrypt encrypted with cost 12+
   - Implement password reset functionality
   - Add password history to prevent reuse
   - Force password changes for security breaches

2. Account Verification:
   - Email verification required before account activation
   - Phone OTP verification for sensitive operations
   - Two-factor authentication for agents and admins

3. Access Control:
   - Role-based permissions at application level
   - Rate limiting on login attempts
   - Session management and timeout
   - IP-based restrictions for admin accounts

4. Data Protection:
   - Encrypt sensitive personal data at rest
   - Audit all data access and modifications
   - Regular security audits and penetration testing
   - GDPR compliance for user data handling

PERFORMANCE OPTIMIZATIONS:

1. Database Optimization:
   - Regular ANALYZE TABLE on all tables
   - Monitor slow query log
   - Implement read replicas for heavy read operations
   - Archive old audit logs and property views

2. Caching Strategy:
   - Cache frequently accessed property listings
   - Cache user preferences and recommendations
   - Implement Redis for session management
   - Cache search results and filters

3. File Management:
   - Store property images on CDN
   - Implement image compression and optimization
   - Use lazy loading for property galleries
   - Regular cleanup of unused images

4. Monitoring:
   - Set up alerts for failed logins
   - Monitor database performance metrics
   - Track user engagement and conversion rates
   - Monitor system resource usage
*/