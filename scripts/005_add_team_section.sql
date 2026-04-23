-- Migration: Add team section table for editable section data
-- This table stores the title, subtitle and description for the team section

CREATE TABLE IF NOT EXISTS team_section (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subtitle TEXT DEFAULT 'Nuestro Equipo',
  title TEXT DEFAULT 'Artistas del estilo',
  description TEXT DEFAULT 'Un equipo de profesionales apasionadas por la belleza y el bienestar, dedicadas a realzar tu mejor versión.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for team_section
ALTER TABLE team_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team_section" ON team_section
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update team_section" ON team_section
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Seed default data if table is empty
INSERT INTO team_section (subtitle, title, description)
SELECT 'Nuestro Equipo', 'Artistas del estilo', 'Un equipo de profesionales apasionadas por la belleza y el bienestar, dedicadas a realzar tu mejor versión.'
WHERE NOT EXISTS (SELECT 1 FROM team_section);
