export async function GET() { 
  return Response.json({ 
    status: "success", 
    message: "Kanri API is working!", 
    timestamp: new Date().toISOString(), 
    environment: process.env.NODE_ENV,
    envVars: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
      databaseUrl: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing',
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
      nextAuthUrl: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Missing'
    }
  }); 
}
