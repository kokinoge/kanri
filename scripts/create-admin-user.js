const bcrypt = require('bcryptjs');

async function createAdminUser() {
  const email = 'admin@example.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Admin user SQL:');
  console.log(`
-- Create admin user
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  '${email}',
  '${hashedPassword}',
  '管理者',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE
SET password = '${hashedPassword}',
    "updatedAt" = NOW();
  `);
  
  console.log('\nLogin credentials:');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Hashed password: ${hashedPassword}`);
}

createAdminUser();