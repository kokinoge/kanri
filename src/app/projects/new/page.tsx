"use client";

import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectsNewPage() {
  return (
    <ProtectedLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>新規プロジェクト</CardTitle>
          </CardHeader>
          <CardContent>
            <p>このページは開発中です。</p>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
