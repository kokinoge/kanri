import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Debug endpoint is working',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasGoogleEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasGoogleKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      emailValue: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'SET' : 'NOT_SET'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Googleapisの動的インポートテスト
    try {
      const { google } = await import('googleapis');
      console.log('[DEBUG_SHEETS] googleapis imported successfully');
      
      return NextResponse.json({
        success: true,
        message: 'POST endpoint working, googleapis available',
        receivedData: body,
        googleapisAvailable: true,
        timestamp: new Date().toISOString()
      });
    } catch (importError) {
      console.error('[DEBUG_SHEETS] googleapis import failed:', importError);
      return NextResponse.json({
        success: false,
        message: 'googleapis import failed',
        error: importError instanceof Error ? importError.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('[DEBUG_SHEETS] POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}