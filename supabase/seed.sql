insert into products (name,price,category,description,image_url,active) values
('Mojito Clásico',7.50,'Mojitos','Hierbabuena fresca y lima','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd',true),
('Mojito Fresa',8.50,'Mojitos','Toque de fresa natural','https://images.unsplash.com/photo-1470337458703-46ad1756a187',true),
('Azulito Neon',9.00,'Azulitos','Azul vibrante con cítricos','https://images.unsplash.com/photo-1536935338788-846bb9981813',true),
('Azulito Tropical',9.50,'Azulitos','Piña + blue curacao','https://images.unsplash.com/photo-1532634922-8fe0b757fb13',true),
('Perro Jangueo Signature',11.00,'Especiales','Receta exclusiva de la casa','https://images.unsplash.com/photo-1544145945-f90425340c7e',true),
('Combo 2x1 Mojitos',12.00,'Promos','Promoción nocturna','https://images.unsplash.com/photo-1504674900247-0877df9cc836',true);

insert into announcements (text,active) values
('🔥 Happy hour de 7PM a 9PM en mojitos seleccionados.', true);

insert into gallery (image_url) values
('https://images.unsplash.com/photo-1470337458703-46ad1756a187'),
('https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'),
('https://images.unsplash.com/photo-1536935338788-846bb9981813');

insert into settings (id,whatsapp_phone,default_message) values
(1,'18095551234','Hola, quiero pedir:')
on conflict (id) do update set whatsapp_phone=excluded.whatsapp_phone, default_message=excluded.default_message;
