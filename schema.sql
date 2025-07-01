-- This script creates the 'notes' table for the application.
-- The application is designed to create this table automatically,
-- but you can run this script manually in your NeonDB SQL editor if you prefer.

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
