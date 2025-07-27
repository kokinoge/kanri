/**
 * Data Tables API デバッグスクリプト
 * APIエンドポイントの動作確認用
 */

async function debugDataTablesAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/data-tables`;

  console.log('🔍 Data Tables API デバッグを開始します...');
  console.log(`API URL: ${apiUrl}`);

  try {
    // 基本的なGETリクエスト
    console.log('\n📡 基本的なGETリクエストを送信中...');
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Debug Script/1.0',
      },
    });

    console.log(`ステータス: ${response.status} ${response.statusText}`);
    console.log('レスポンスヘッダー:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ APIレスポンス成功');
      console.log('データ統計:');
      if (data.statistics) {
        console.log(`  予算件数: ${data.statistics.recordCounts?.budgets || 0}`);
        console.log(`  実績件数: ${data.statistics.recordCounts?.results || 0}`);
        console.log(`  クライアント件数: ${data.statistics.recordCounts?.clients || 0}`);
        console.log(`  キャンペーン件数: ${data.statistics.recordCounts?.campaigns || 0}`);
      }
    } else {
      console.log('\n❌ APIエラー');
      console.log('エラー詳細:', data);
    }

    // フィルタ付きリクエストのテスト
    console.log('\n📡 フィルタ付きリクエストをテスト中...');
    const filteredUrl = `${apiUrl}?year=2024&month=1`;
    const filteredResponse = await fetch(filteredUrl);
    const filteredData = await filteredResponse.json();
    
    console.log(`フィルタ付きリクエスト結果: ${filteredResponse.status}`);
    if (filteredResponse.ok && filteredData.statistics) {
      console.log(`  フィルタ後の予算件数: ${filteredData.statistics.recordCounts?.budgets || 0}`);
    }

  } catch (error) {
    console.error('\n💥 デバッグ中にエラーが発生しました:');
    console.error(error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.log('\n💡 ヒント: サーバーが起動していることを確認してください');
      console.log('   次のコマンドでサーバーを起動: npm run dev');
    }
  }
}

// 環境変数確認
function checkEnvironment() {
  console.log('\n🔧 環境変数確認:');
  console.log(`NODE_ENV: ${process.env.NODE_ENV || '未設定'}`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '設定済み' : '未設定'}`);
  console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? '設定済み' : '未設定'}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '未設定'}`);
}

// スクリプト実行
checkEnvironment();
debugDataTablesAPI(); 