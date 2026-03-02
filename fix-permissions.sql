-- ============================================
-- POLÍTICAS DE SEGURIDAD PARA PERMITIR INSERT/UPDATE/DELETE
-- ============================================

-- IMPORTANTE: Política para permitir inserts anónimos en menu_items
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

-- Permitir inserts anónimos (para desarrollo)
DROP POLICY IF EXISTS "Allow anonymous inserts for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous inserts for menu_items" ON menu_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous updates for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous updates for menu_items" ON menu_items
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow anonymous deletes for menu_items" ON menu_items;
CREATE POLICY "Allow anonymous deletes for menu_items" ON menu_items
  FOR DELETE USING (true);

-- Para restaurants
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

-- Para pedidos
DROP POLICY IF EXISTS "Allow anonymous inserts for orders" ON orders;
CREATE POLICY "Allow anonymous inserts for orders" ON orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Para order_items
DROP POLICY IF EXISTS "Allow anonymous inserts for order_items" ON order_items;
CREATE POLICY "Allow anonymous inserts for order_items" ON order_items
  FOR INSERT WITH CHECK (true);

SELECT 'Permisos actualizados correctamente' as status;
