-- Migration: Add new features for Piega website
-- 1. about_images table for carousel in About section
-- 2. image_url column for services
-- 3. contact_section table for editable contact section
-- 4. section_titles table for editable titles/subtitles across all sections

-- ===========================================
-- 1. About Images Table (for carousel)
-- ===========================================
CREATE TABLE IF NOT EXISTS about_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for about_images
ALTER TABLE about_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active about_images" ON about_images
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can insert about_images" ON about_images
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about_images" ON about_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete about_images" ON about_images
  FOR DELETE TO authenticated USING (true);

-- ===========================================
-- 2. Add image_url to services table
-- ===========================================
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

-- ===========================================
-- 3. Contact Section Table
-- ===========================================
CREATE TABLE IF NOT EXISTS contact_section (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subtitle TEXT DEFAULT 'Contacto',
  title TEXT DEFAULT 'Contactanos',
  description TEXT DEFAULT 'Estamos aqui para ayudarte',
  image_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for contact_section
ALTER TABLE contact_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact_section" ON contact_section
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update contact_section" ON contact_section
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can insert contact_section" ON contact_section
  FOR INSERT TO authenticated WITH CHECK (true);

-- Insert default row
INSERT INTO contact_section (subtitle, title, description, image_url)
VALUES ('Reserva tu experiencia', 'Tu momento de belleza te espera', 'Agenda tu turno de manera simple y rapida. Elegis el servicio, el profesional y el horario que mas te convenga.', '')
ON CONFLICT DO NOTHING;

-- ===========================================
-- 4. Section Titles Table (for all editable titles)
-- ===========================================
CREATE TABLE IF NOT EXISTS section_titles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  subtitle TEXT DEFAULT '',
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for section_titles
ALTER TABLE section_titles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view section_titles" ON section_titles
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update section_titles" ON section_titles
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can insert section_titles" ON section_titles
  FOR INSERT TO authenticated WITH CHECK (true);

-- Insert default section titles
INSERT INTO section_titles (section_key, subtitle, title, description) VALUES
  ('services', 'Nuestros Servicios', 'Experiencias que transforman', ''),
  ('gallery', 'Galeria', 'Nuestro trabajo', ''),
  ('team', 'Nuestro Equipo', 'Artistas del estilo', 'Un equipo de profesionales apasionados por la belleza y el bienestar, dedicados a realzar tu mejor version.')
ON CONFLICT (section_key) DO NOTHING;
