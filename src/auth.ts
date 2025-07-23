// 開発環境向け認証設定
export const handlers = {
  GET: async () => new Response('Auth API', { status: 200 }),
  POST: async () => new Response('Auth API', { status: 200 }),
}

export const auth = async () => {
  return {
    user: {
      id: 'dev-user',
      name: '開発ユーザー',
      email: 'dev@example.com',
      role: 'admin',
      department: '開発部'
    }
  }
}

export const signIn = async () => {}
export const signOut = async () => {} 