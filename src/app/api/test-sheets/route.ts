import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[TEST_SHEETS] Testing Google Sheets environment...');
    
    // 環境変数の存在確認
    const hasEmail = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const hasKey = !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const hasProjectId = !!process.env.GOOGLE_PROJECT_ID;
    
    console.log('[TEST_SHEETS] Environment check:', {
      hasEmail,
      hasKey: hasKey && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.length > 100,
      hasProjectId
    });
    
    // Google API接続テスト
    let googleApiTest = false;
    try {
      const { google } = await import('googleapis');
      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });
      
      // 認証テスト
      await auth.authorize();
      googleApiTest = true;
      console.log('[TEST_SHEETS] Google API authorization successful');
    } catch (authError) {
      console.error('[TEST_SHEETS] Google API authorization failed:', authError);
    }
    
    return NextResponse.json({
      success: true,
      environment: {
        hasEmail,
        hasKey: hasKey && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.length > 100,
        hasProjectId,
        googleApiTest
      },
      message: 'Google Sheets connection test completed',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('[TEST_SHEETS] Test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '不明なエラー',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[TEST_SHEETS] POST test with body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'POST endpoint is working',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[TEST_SHEETS] POST test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '不明なエラー',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}