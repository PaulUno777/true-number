"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { UserManagement } from "@/components/admin/UserManagement";
import { GlobalStats } from "@/components/admin/GlobalStats";
import { useTranslations } from "next-intl";

function AdminContent() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stats">{t("globalStats")}</TabsTrigger>
          <TabsTrigger value="users">{t("userManagement")}</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <GlobalStats />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}
