INSERT INTO users (username, email, full_name, role, password_hash)
VALUES (
  'Sion',
  'admin-sion@gmail.com',
  'Administrador Superior',
  'admin-superior',
  crypt('Nova02', gen_salt('bf', 8))
);