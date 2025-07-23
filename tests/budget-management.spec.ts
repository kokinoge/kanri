import { test, expect } from '@playwright/test';

test.describe('予算管理ページ', () => {
  test('予算管理ページが正常に表示される', async ({ page }) => {
    await page.goto('/budgets');
    
    // ページタイトルの確認（より具体的に）
    await expect(page.locator('h1.text-3xl')).toContainText('予算管理');
    
    // 新規作成ボタンの確認
    await expect(page.locator('button:has-text("新規作成")')).toBeVisible();
    
    // フィルタの確認
    await expect(page.locator('label:has-text("施策で絞り込み")')).toBeVisible();
    
    // テーブルヘッダーの確認
    await expect(page.locator('th:has-text("クライアント")')).toBeVisible();
    await expect(page.locator('th:has-text("施策名")')).toBeVisible();
    await expect(page.locator('th:has-text("年月")')).toBeVisible();
    await expect(page.locator('th:has-text("プラットフォーム")')).toBeVisible();
    await expect(page.locator('th:has-text("運用タイプ")')).toBeVisible();
    await expect(page.locator('th:has-text("売上タイプ")')).toBeVisible();
    await expect(page.locator('th:has-text("予算金額")')).toBeVisible();
  });

  test('事業部別分析ページが正常に表示される', async ({ page }) => {
    await page.goto('/department-performance');
    
    // ページが読み込まれるまで待機
    await page.waitForTimeout(5000);
    
    // 事業部データが表示されることを確認
    await expect(page.locator('text=SNSメディア事業部')).toBeVisible();
    await expect(page.locator('text=インフルエンサー事業部')).toBeVisible();
    await expect(page.locator('text=広告事業部')).toBeVisible();
  });

  test('ホームページからナビゲーションができる', async ({ page }) => {
    await page.goto('/');
    
    // サイドバーの予算計画リンクをクリック
    await page.locator('a[href="/budgets"]').click();
    
    // 予算管理ページに遷移することを確認
    await expect(page).toHaveURL('/budgets');
    await expect(page.locator('h1.text-3xl:has-text("予算管理")')).toBeVisible();
  });
}); 