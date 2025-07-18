"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useUsers } from "@/hooks/useUsers";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/Pagination";

export function UserManagement() {
  const t = useTranslations("admin");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: usersData, isLoading } = useUsers({ page, size: 10 });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  const users = usersData?.data.content || [];
  const metaData = usersData?.data.metaData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          {t("userManagement")}
        </h2>
        <Button icon={<Plus className="h-4 w-4" />}>{t("createUser")}</Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("allUsers")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Balance</th>
                  <th className="p-4 font-medium">Games</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: number) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {user.id.slice(-8)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.role === "ADMIN" ? "destructive" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium">{user.balance}</td>
                    <td className="p-4">{user._count?.gameHistory || 0}</td>
                    <td className="p-4 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit className="h-4 w-4" />}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 className="h-4 w-4" />}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<MoreHorizontal className="h-4 w-4" />}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {metaData && (
            <div className="p-4 border-t border-border">
              <Pagination
                currentPage={metaData.page}
                totalPages={metaData.totalPages}
                onPageChange={setPage}
                totalItems={metaData.totalElements}
                itemsPerPage={metaData.size}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
