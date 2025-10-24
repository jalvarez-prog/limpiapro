-- Crear tabla para almacenar las solicitudes de contacto
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  service VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, completed
  notes TEXT, -- Notas internas del equipo
  contacted_at TIMESTAMP WITH TIME ZONE, -- Cuando se contactó al cliente
  completed_at TIMESTAMP WITH TIME ZONE -- Cuando se completó el servicio
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_email ON contact_requests(email);
CREATE INDEX idx_contact_requests_status ON contact_requests(status);

-- Habilitar Row Level Security
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas (para el formulario)
CREATE POLICY "Allow public inserts" ON contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Crear política para que solo usuarios autenticados puedan ver los registros
CREATE POLICY "Allow authenticated users to view" ON contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Crear política para que solo usuarios autenticados puedan actualizar
CREATE POLICY "Allow authenticated users to update" ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Comentarios en las columnas para documentación
COMMENT ON TABLE contact_requests IS 'Tabla para almacenar las solicitudes de contacto del formulario web';
COMMENT ON COLUMN contact_requests.id IS 'Identificador único de la solicitud';
COMMENT ON COLUMN contact_requests.name IS 'Nombre completo del contacto';
COMMENT ON COLUMN contact_requests.email IS 'Correo electrónico del contacto';
COMMENT ON COLUMN contact_requests.phone IS 'Número de teléfono del contacto';
COMMENT ON COLUMN contact_requests.service IS 'Tipo de servicio solicitado';
COMMENT ON COLUMN contact_requests.message IS 'Mensaje detallado del cliente';
COMMENT ON COLUMN contact_requests.created_at IS 'Fecha y hora de creación de la solicitud';
COMMENT ON COLUMN contact_requests.status IS 'Estado actual de la solicitud (pending, contacted, completed)';
COMMENT ON COLUMN contact_requests.notes IS 'Notas internas del equipo sobre esta solicitud';
COMMENT ON COLUMN contact_requests.contacted_at IS 'Fecha y hora cuando se contactó al cliente';
COMMENT ON COLUMN contact_requests.completed_at IS 'Fecha y hora cuando se completó el servicio';