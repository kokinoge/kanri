#!/bin/bash

# SSRエラーを修正するスクリプト
echo "🔧 修正スクリプトを開始します..."

# 修正対象のページ
pages=(
  "src/app/campaigns/page.tsx"
  "src/app/results/page.tsx" 
  "src/app/users/page.tsx"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    echo "修正中: $page"
    
    # dynamic importを追加
    if ! grep -q "import dynamic from" "$page"; then
      sed -i '' 's/"use client";/"use client";\
\
import dynamic from "next\/dynamic";/' "$page"
    fi
    
    # export default functionを関数名に変更
    if grep -q "export default function" "$page"; then
      # ページ名を取得（例: CampaignsPage）
      basename=$(basename "$page" .tsx)
      pagename=$(echo "$basename" | sed 's/page/Page/' | sed 's/^\([a-z]\)/\U\1/')
      
      # export defaultを削除して関数名を変更
      sed -i '' "s/export default function ${pagename}(/function ${pagename}Inner(/" "$page"
      
      # ファイル末尾にdynamic exportを追加
      echo "" >> "$page"
      echo "// Dynamic export to prevent SSR issues with AuthProvider" >> "$page"
      echo "const ${pagename} = dynamic(() => Promise.resolve(${pagename}Inner), {" >> "$page"
      echo "  ssr: false," >> "$page"
      echo "  loading: () => (" >> "$page"
      echo "    <div className=\"flex items-center justify-center h-64\">" >> "$page"
      echo "      <div className=\"text-lg\">読み込み中...</div>" >> "$page"
      echo "    </div>" >> "$page"
      echo "  )" >> "$page"
      echo "});" >> "$page"
      echo "" >> "$page"
      echo "export default ${pagename};" >> "$page"
      
      echo "✅ $page を修正しました"
    else
      echo "⚠️  $page にexport default functionが見つかりません"
    fi
  else
    echo "❌ $page が見つかりません"
  fi
done

echo "🎉 修正スクリプト完了！" 