-- ============================================
-- Update hero image references from .jpg to .webp
-- ============================================

-- Update hero_section default image
UPDATE public.hero_section
SET image_url = '/images/hero.webp'
WHERE image_url = '/images/hero.jpg';

-- Update gallery_images that referenced the old hero.jpg
UPDATE public.gallery_images
SET image_url = '/images/hero.webp'
WHERE image_url = '/images/hero.jpg';
