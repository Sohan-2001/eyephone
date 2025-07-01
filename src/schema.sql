
-- This script is for reference and manual setup in your NeonDB SQL editor.
-- The application will attempt to create these tables automatically.

-- Create the folders table
CREATE TABLE IF NOT EXISTS folders (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the notes table
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add the folder_id foreign key to the notes table if it doesn't exist.
-- This command might need to be run separately after checking if the column exists.
DO $$
BEGIN
  IF NOT EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='notes' and column_name='folder_id')
  THEN
    ALTER TABLE "notes" ADD COLUMN "folder_id" INTEGER REFERENCES folders(id) ON DELETE SET NULL;
  END IF;
END $$;
