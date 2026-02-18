-- ============================================
-- RLS Policies for Piega Admin Dashboard
-- Public can read, only authenticated admins can write
-- ============================================

-- site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site_settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- hero_section
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view hero_section" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update hero_section" ON public.hero_section FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert hero_section" ON public.hero_section FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert services" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update services" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete services" ON public.services FOR DELETE USING (auth.role() = 'authenticated');

-- team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert team_members" ON public.team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update team_members" ON public.team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete team_members" ON public.team_members FOR DELETE USING (auth.role() = 'authenticated');

-- gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active gallery_images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gallery_images" ON public.gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update gallery_images" ON public.gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete gallery_images" ON public.gallery_images FOR DELETE USING (auth.role() = 'authenticated');

-- about_section
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view about_section" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update about_section" ON public.about_section FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert about_section" ON public.about_section FOR INSERT WITH CHECK (auth.role() = 'authenticated');
