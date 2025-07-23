"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import { useEffect, useState } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";

const profileSchema = z.object({
  name: z.string().min(1, "名前は必須です。"),
  department: z.string().optional(),
  email: z.string().email(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { data: user, error, mutate } = useSWR("/api/profile", fetcher);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        department: user.department || "",
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          department: data.department,
        }),
      });

      if (!response.ok) {
        throw new Error("プロフィールの更新に失敗しました。");
      }
      
      const updatedUser = await response.json();
      mutate(updatedUser, false); // ローカルキャッシュを更新
      alert("プロフィールを更新しました。");

    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (error) return <ProtectedLayout><div>読み込みに失敗しました</div></ProtectedLayout>;
  if (!user) return <ProtectedLayout><div>読み込み中...</div></ProtectedLayout>;

  return (
    <ProtectedLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名前</label>
            <input id="name" {...register("name")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input id="email" type="email" {...register("email")} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">部署</label>
            <input id="department" {...register("department")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
          
          <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? "更新中..." : "更新"}
          </button>
        </form>
      </div>
    </ProtectedLayout>
  );
} 