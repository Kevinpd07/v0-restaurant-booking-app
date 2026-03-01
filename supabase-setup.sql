-- ============================================
-- RESTAURANT BOOKING APP - DATABASE SCHEMA
-- ============================================

-- 1. Tabla de perfiles de usuarios
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'restaurant_owner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de restaurantes
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  cuisine TEXT,
  address TEXT,
  phone TEXT,
  hours JSONB DEFAULT '{"mon": "9-22", "tue": "9-22", "wed": "9-22", "thu": "9-22", "fri": "9-23", "sat": "9-23", "sun": "9-21"}',
  latitude FLOAT,
  longitude FLOAT,
  rating DECIMAL(3,2) DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de mesas
CREATE TABLE IF NOT EXISTS tables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  table_number INTEGER NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  is_available BOOLEAN DEFAULT true
);

-- 4. Tabla de reservas
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de menú
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  delivery_address TEXT,
  delivery_notes TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabla de items del pedido
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0)
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Anyone can view profiles" ON profiles;
CREATE POLICY "Anyone can view profiles" ON profiles
  FOR SELECT USING (true);

-- Políticas para restaurants
DROP POLICY IF EXISTS "Anyone can view active restaurants" ON restaurants;
CREATE POLICY "Anyone can view active restaurants" ON restaurants
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage restaurants" ON restaurants;
CREATE POLICY "Admins can manage restaurants" ON restaurants
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Restaurant owners can manage their restaurants" ON restaurants;
CREATE POLICY "Restaurant owners can manage their restaurants" ON restaurants
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND id = owner_id)
  );

-- Políticas para tables
DROP POLICY IF EXISTS "Anyone can view tables" ON tables;
CREATE POLICY "Anyone can view tables" ON tables
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Restaurant owners can manage tables" ON tables;
CREATE POLICY "Restaurant owners can manage tables" ON tables
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM restaurants r 
      JOIN profiles p ON r.owner_id = p.id 
      WHERE r.id = tables.restaurant_id AND p.id = auth.uid()
    )
  );

-- Políticas para reservations
DROP POLICY IF EXISTS "Users can view own reservations" ON reservations;
CREATE POLICY "Users can view own reservations" ON reservations
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create reservations" ON reservations;
CREATE POLICY "Users can create reservations" ON reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reservations" ON reservations;
CREATE POLICY "Users can update own reservations" ON reservations
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Restaurants can view all reservations" ON reservations;
CREATE POLICY "Restaurants can view all reservations" ON reservations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM restaurants r 
      WHERE r.id = reservations.restaurant_id
    )
  );

-- Políticas para menu_items
DROP POLICY IF EXISTS "Anyone can view available menu items" ON menu_items;
CREATE POLICY "Anyone can view available menu items" ON menu_items
  FOR SELECT USING (is_available = true);

DROP POLICY IF EXISTS "Restaurant owners can manage menu items" ON menu_items;
CREATE POLICY "Restaurant owners can manage menu items" ON menu_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM restaurants r 
      JOIN profiles p ON r.owner_id = p.id 
      WHERE r.id = menu_items.restaurant_id AND p.id = auth.uid()
    )
  );

-- IMPORTANTE: Política para permitir inserts anónimos (para desarrollo)
DROP POLICY IF EXISTS "Allow anonymous inserts for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous inserts for menu_items" ON menu_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous updates for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous updates for menu_items" ON menu_items
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow anonymous deletes for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous deletes for menu_items" ON menu_items
  FOR DELETE USING (true);

-- Políticas para orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create orders" ON orders;
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Restaurants can view orders" ON orders;
CREATE POLICY "Restaurants can view orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM restaurants r 
      WHERE r.id = orders.restaurant_id
    )
  );

-- IMPORTANTE: Política para permitir inserts anónimos para pedidos
DROP POLICY IF EXISTS "Allow anonymous inserts for orders" ON orders;
CREATE POLICY "Allow anonymous inserts for orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Políticas para order_items
DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
CREATE POLICY "Anyone can view order items" ON order_items
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own order items" ON order_items;
CREATE POLICY "Users can manage own order items" ON order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM orders o 
      WHERE o.id = order_items.order_id AND o.user_id = auth.uid()
    )
  );

-- IMPORTANTE: Política para permitir inserts anónimos para order_items
DROP POLICY IF EXISTS "Allow anonymous inserts for order_items" ON order_items;
CREATE POLICY "Allow anonymous inserts for order_items" ON order_items
  FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- VERIFICACIÓN
-- ============================================

SELECT 'Database setup completed successfully!' as status;

-- Verificar tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Verificar políticas RLS
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
