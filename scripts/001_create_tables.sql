-- ============================================
-- Piega Admin Dashboard - Database Migration
-- Creates all content management tables
-- ============================================

-- 1. Site Settings (singleton row for global config)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Piega',
  tagline TEXT DEFAULT 'hair & beauty',
  phone TEXT,
  email TEXT,
  address TEXT,
  instagram_url TEXT,
  whatsapp_url TEXT,
  facebook_url TEXT,
  booking_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Hero Section (singleton row)
CREATE TABLE IF NOT EXISTS public.hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle TEXT DEFAULT 'Salón de belleza premium',
  title_line1 TEXT DEFAULT 'El arte de',
  title_line2 TEXT DEFAULT 'ser vos',
  description TEXT,
  image_url TEXT DEFAULT '/images/hero.jpg',
  cta_primary_text TEXT DEFAULT 'Reservar turno',
  cta_secondary_text TEXT DEFAULT 'Nuestros servicios',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Gallery Images
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. About Section (singleton row)
CREATE TABLE IF NOT EXISTS public.about_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtitle TEXT DEFAULT 'El Salón',
  title TEXT DEFAULT 'Un espacio pensado para vos',
  paragraph1 TEXT,
  paragraph2 TEXT,
  image_url TEXT DEFAULT '/images/salon.jpg',
  stat1_number TEXT DEFAULT '10+',
  stat1_label TEXT DEFAULT 'Años de experiencia',
  stat2_number TEXT DEFAULT '5k+',
  stat2_label TEXT DEFAULT 'Clientes felices',
  stat3_number TEXT DEFAULT '15',
  stat3_label TEXT DEFAULT 'Profesionales',
  updated_at TIMESTAMPTZ DEFAULT now()
);
