"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().min(1, { message: "パスワードを入力してください。" }),
});

const registerSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().min(8, { message: "パスワードは8文字以上で入力してください。" }),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginValues) => {
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません。");
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const onRegister = async (data: RegisterValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "登録に失敗しました。");
      }
      
      // 登録後、そのままログイン
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
         setError("登録に成功しましたが、ログインに失敗しました。");
      } else {
         router.push("/");
      }

    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-4 text-center font-medium ${
              isLogin ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            ログイン
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-4 text-center font-medium ${
              !isLogin ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
            }`}
          >
            新規登録
          </button>
        </div>
        
        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6">
            <h1 className="text-2xl font-bold text-center">ログイン</h1>
            {/* Login form fields */}
             <div>
              <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
              <input type="email" {...loginRegister("email")} className="w-full px-3 py-2 mt-1 border rounded-md" />
              {loginErrors.email && <p className="text-sm text-red-600 mt-1">{loginErrors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">パスワード</label>
              <input type="password" {...loginRegister("password")} className="w-full px-3 py-2 mt-1 border rounded-md" />
              {loginErrors.password && <p className="text-sm text-red-600 mt-1">{loginErrors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
              {loading ? "処理中..." : "ログイン"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-6">
            <h1 className="text-2xl font-bold text-center">新規登録</h1>
            {/* Register form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">名前</label>
              <input type="text" {...registerRegister("name")} className="w-full px-3 py-2 mt-1 border rounded-md" />
              {registerErrors.name && <p className="text-sm text-red-600 mt-1">{registerErrors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
              <input type="email" {...registerRegister("email")} className="w-full px-3 py-2 mt-1 border rounded-md" />
              {registerErrors.email && <p className="text-sm text-red-600 mt-1">{registerErrors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">パスワード</label>
              <input type="password" {...registerRegister("password")} className="w-full px-3 py-2 mt-1 border rounded-md" />
              {registerErrors.password && <p className="text-sm text-red-600 mt-1">{registerErrors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
              {loading ? "登録中..." : "登録して開始"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 