-- ============================================
-- POLÍTICAS COMPLETAS PARA TODAS LAS TABLAS
-- ============================================

-- Tabla: restaurants
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select restaurants" ON restaurants;
CREATE POLICY "Allow select restaurants" ON restaurants
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert restaurants" ON restaurants;
CREATE POLICY "Allow insert restaurants" ON restaurants
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update restaurants" ON restaurants;
CREATE POLICY "Allow update restaurants" ON restaurants
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete restaurants" ON restaurants;
CREATE POLICY "Allow delete restaurants" ON restaurants
  FOR DELETE USING (true);

-- Tabla: menu_items
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select menu_items" ON menu_items;
CREATE POLICY "Allow select menu_items" ON menu_items
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert menu_items" ON menu_items;
CREATE POLICY "Allow insert menu_items" ON menu_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update menu_items" ON menu_items;
CREATE POLICY "Allow update menu_items" ON menu_items
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete menu_items" ON menu_items;
CREATE POLICY "Allow delete menu_items" ON menu_items
  FOR DELETE USING (true);

-- Tabla: tables
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select tables" ON tables;
CREATE POLICY "Allow select tables" ON tables
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert tables" ON tables;
CREATE POLICY "Allow insert tables" ON tables
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update tables" ON tables;
CREATE POLICY "Allow update tables" ON tables
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete tables" ON tables;
CREATE POLICY "Allow delete tables" ON tables
  FOR DELETE USING (true);

-- Tabla: reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select reservations" ON reservations;
CREATE POLICY "Allow select reservations" ON reservations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert reservations" ON reservations;
CREATE POLICY "Allow insert reservations" ON reservations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update reservations" ON reservations;
CREATE POLICY "Allow update reservations" ON reservations
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete reservations" ON reservations;
CREATE POLICY "Allow delete reservations" ON reservations
  FOR DELETE USING (true);

-- Tabla: orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select orders" ON orders;
CREATE POLICY "Allow select orders" ON orders
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert orders" ON orders;
CREATE POLICY "Allow insert orders" ON orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update orders" ON orders;
CREATE POLICY "Allow update orders" ON orders
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete orders" ON orders;
CREATE POLICY "Allow delete orders" ON orders
  FOR DELETE USING (true);

-- Tabla: order_items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select order_items" ON order_items;
CREATE POLICY "Allow select order_items" ON order_items
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert order_items" ON order_items;
CREATE POLICY "Allow insert order_items" ON order_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update order_items" ON order_items;
CREATE POLICY "Allow update order_items" ON order_items
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete order_items" ON order_items;
CREATE POLICY "Allow delete order_items" ON order_items
  FOR DELETE USING (true);

-- Tabla: profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow select profiles" ON profiles;
CREATE POLICY "Allow select profiles" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert profiles" ON profiles;
CREATE POLICY "Allow insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update profiles" ON profiles;
CREATE POLICY "Allow update profiles" ON profiles
  FOR UPDATE USING (true);

SELECT 'Todas las políticas creadas correctamente' as status;
