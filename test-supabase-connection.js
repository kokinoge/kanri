const { Client } = require('pg');

// Supabaseの接続設定
const connectionString = 'postgresql://postgres.fuwrrpuauxcaubzbhvmd:[YOUR_PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres';

async function testConnection() {
  const client = new Client({
    connectionString: connectionString
  });

  try {
    console.log('Attempting to connect to Supabase...');
    await client.connect();
    console.log('Connected successfully!');

    const result = await client.query('SELECT NOW() as current_time');
    console.log('Query result:', result.rows[0]);

  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.end();
  }
}

testConnection();