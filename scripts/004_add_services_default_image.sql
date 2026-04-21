-- Migration: Add services_default_image column to site_settings
-- This allows users to set a default image for the services section via the dashboard

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_default_image TEXT DEFAULT '/images/services.jpg';

-- Update existing rows to have the default value
UPDATE site_settings 
SET services_default_image = '/images/services.jpg' 
WHERE services_default_image IS NULL;
