-- ============================================
-- Seed data with current hardcoded site content
-- ============================================

-- Site Settings
INSERT INTO public.site_settings (site_name, tagline, phone, email, address, instagram_url, whatsapp_url, facebook_url, booking_url)
VALUES (
  'Piega',
  'hair & beauty',
  '+54 9 342 600 0000',
  'hola@piega.com.ar',
  'Av. Ejemplo 1234, Santa Fe',
  'https://instagram.com/piega',
  'https://wa.me/5493426000000',
  'https://facebook.com/piega',
  '#reservar'
)
ON CONFLICT DO NOTHING;

-- Hero Section
INSERT INTO public.hero_section (subtitle, title_line1, title_line2, description, image_url, cta_primary_text, cta_secondary_text)
VALUES (
  'Salón de belleza premium',
  'El arte de',
  'ser vos',
  'Un espacio donde el estilo se encuentra con la sofisticación. Experiencias de belleza personalizadas para cada persona.',
  '/images/hero.jpg',
  'Reservar turno',
  'Nuestros servicios'
)
ON CONFLICT DO NOTHING;

-- About Section
INSERT INTO public.about_section (subtitle, title, paragraph1, paragraph2, image_url, stat1_number, stat1_label, stat2_number, stat2_label, stat3_number, stat3_label)
VALUES (
  'El Salón',
  'Un espacio pensado para vos',
  'Piega nació con la visión de crear un salón donde la calidad, el diseño y la calidez humana se fusionan. Cada detalle de nuestro espacio fue cuidadosamente pensado para que te sientas en un lugar único desde el momento en que entrás.',
  'Trabajamos con productos de primera línea y un equipo de profesionales apasionados por lo que hacen. Porque creemos que cada persona merece una experiencia de belleza excepcional.',
  '/images/salon.jpg',
  '10+', 'Años de experiencia',
  '5k+', 'Clientes felices',
  '15', 'Profesionales'
)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO public.services (title, description, price, sort_order) VALUES
  ('Corte & Estilo', 'Cortes personalizados que realzan tu belleza natural. Nuestros estilistas analizan la textura, forma del rostro y estilo de vida para crear el look perfecto.', 'Desde $5.500', 1),
  ('Color & Mechas', 'Técnicas de coloración de vanguardia. Balayage, highlights, global color y más. Trabajamos con productos premium para un resultado impecable.', 'Desde $12.000', 2),
  ('Tratamientos Capilares', 'Hidratación profunda, keratina, botox capilar y tratamientos reparadores. Devolvemos la salud y el brillo a tu cabello.', 'Desde $8.000', 3),
  ('Spa & Bienestar', 'Rituales de relajación que combinan aromaterapia, masajes y cuidados especializados. Una experiencia integral de bienestar.', 'Desde $9.500', 4),
  ('Maquillaje Profesional', 'Looks para eventos, sesiones fotográficas o tu día a día. Resaltamos tus rasgos con técnicas profesionales y productos de alta gama.', 'Desde $7.000', 5),
  ('Novias & Eventos', 'Paquetes exclusivos para tu día especial. Incluyen prueba previa, peinado, maquillaje y atención personalizada. Hacemos de tu momento algo único.', 'Consultar', 6);

-- Team Members
INSERT INTO public.team_members (name, role, image_url, sort_order) VALUES
  ('Sofia Martinez', 'Directora Creativa', '/images/team.jpg', 1),
  ('Valentina Rossi', 'Colorista Senior', '/images/gallery-1.jpg', 2),
  ('Camila Torres', 'Especialista en Spa', '/images/gallery-2.jpg', 3);

-- Gallery Images
INSERT INTO public.gallery_images (image_url, alt_text, sort_order) VALUES
  ('/images/gallery-1.jpg', 'Resultado de estilismo profesional', 1),
  ('/images/gallery-2.jpg', 'Sala de spa y tratamientos', 2),
  ('/images/gallery-3.jpg', 'Productos y herramientas premium', 3),
  ('/images/hero.jpg', 'Ambiente del salón', 4),
  ('/images/services.jpg', 'Estilista en acción', 5),
  ('/images/salon.jpg', 'Vista del salón', 6);
