"use client";

import React from "react";
import { Plus, Users, Edit, Eye, Trash2, UserCheck, UserX, Crown, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import { User as UserType } from "@/types/auth";
import { UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";

interface CreateUserForm {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: "CLIENT" | "ADMIN";
}

interface EditUserForm {
  username: string;
  email: string;
  phone: string;
  role: "CLIENT" | "ADMIN";
}

interface UsersData {
  data: UserType[];
}

interface PaginatedUsersData {
  data: UserType[];
  totalPages: number;
}

// Using actual React Query types

interface UserManagementSectionProps {
  users: UsersData | undefined;
  paginatedUsers: PaginatedUsersData | undefined;
  usersLoading: boolean;
  usersPage: number;
  showCreateForm: boolean;
  editingUser: UserType | null;
  selectedUser: UserType | null;
  createUserForm: UseFormReturn<CreateUserForm>;
  editUserForm: UseFormReturn<EditUserForm>;
  createUserMutation: UseMutationResult<unknown, unknown, CreateUserForm, unknown>;
  updateUserMutation: UseMutationResult<unknown, unknown, { userId: string; data: Partial<EditUserForm> }, unknown>;
  deleteUserMutation: UseMutationResult<unknown, unknown, string, unknown>;
  currentUser: UserType | null;
  onSetShowCreateForm: (show: boolean) => void;
  onSetUsersPage: (page: number) => void;
  onSetEditingUser: (user: UserType | null) => void;
  onSetSelectedUser: (user: UserType | null) => void;
  onCreateUser: (data: CreateUserForm) => void;
  onEditUser: (data: EditUserForm) => void;
  onStartEditUser: (user: UserType) => void;
  onToggleUserRole: (user: UserType) => void;
  t: (key: string, params?: Record<string, string | number | Date>) => string;
}

const UserManagementSection: React.FC<UserManagementSectionProps> = ({
  paginatedUsers,
  usersLoading,
  usersPage,
  showCreateForm,
  editingUser,
  selectedUser,
  createUserForm,
  editUserForm,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
  currentUser,
  onSetShowCreateForm,
  onSetUsersPage,
  onSetEditingUser,
  onSetSelectedUser,
  onCreateUser,
  onEditUser,
  onStartEditUser,
  onToggleUserRole,
  t,
}) => {
  return (
    <Card className="game-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <Users className="h-5 w-5 text-accent" />
            <span>{t("userManagement")}</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("userManagementDescription")}
          </CardDescription>
        </div>
        <Button
          onClick={() => onSetShowCreateForm(!showCreateForm)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("newUser")}
        </Button>
      </CardHeader>
      <CardContent>
        {/* Create User Form */}
        {showCreateForm && (
          <Card className="mb-6 border border-accent/50 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg text-accent flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>{t("createNewUser")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={createUserForm.handleSubmit(onCreateUser)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Input
                  {...createUserForm.register("username")}
                  placeholder={t("username")}
                  error={createUserForm.formState.errors.username?.message}
                />
                <Input
                  {...createUserForm.register("email")}
                  type="email"
                  placeholder={t("email")}
                  error={createUserForm.formState.errors.email?.message}
                />
                <Input
                  {...createUserForm.register("phone")}
                  placeholder={t("phone")}
                  error={createUserForm.formState.errors.phone?.message}
                />
                <Input
                  {...createUserForm.register("password")}
                  type="password"
                  placeholder={t("password")}
                  error={createUserForm.formState.errors.password?.message}
                />
                <select
                  {...createUserForm.register("role")}
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
                >
                  <option value="CLIENT" className="bg-gray-800">
                    {t("client")}
                  </option>
                  <option value="ADMIN" className="bg-gray-800">
                    {t("admin")}
                  </option>
                </select>
                <div className="flex space-x-2 md:col-span-2">
                  <Button
                    type="submit"
                    isLoading={createUserMutation.isPending}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {t("create")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSetShowCreateForm(false)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Edit User Form */}
        {editingUser && (
          <Card className="mb-6 border border-blue-500/50 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-lg text-blue-400 flex items-center space-x-2">
                <Edit className="h-5 w-5" />
                <span>
                  {t("editUser")}: {editingUser.username}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={editUserForm.handleSubmit(onEditUser)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Input
                  {...editUserForm.register("username")}
                  placeholder={t("username")}
                  error={editUserForm.formState.errors.username?.message}
                />
                <Input
                  {...editUserForm.register("email")}
                  type="email"
                  placeholder={t("email")}
                  error={editUserForm.formState.errors.email?.message}
                />
                <Input
                  {...editUserForm.register("phone")}
                  placeholder={t("phone")}
                  error={editUserForm.formState.errors.phone?.message}
                />
                <select
                  {...editUserForm.register("role")}
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
                >
                  <option value="CLIENT" className="bg-gray-800">
                    {t("client")}
                  </option>
                  <option value="ADMIN" className="bg-gray-800">
                    {t("admin")}
                  </option>
                </select>
                <div className="flex space-x-2 md:col-span-2">
                  <Button
                    type="submit"
                    isLoading={updateUserMutation.isPending}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {t("updateUser")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSetEditingUser(null)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Users List */}
        <div className="space-y-4">
          {paginatedUsers?.data?.map((userData: UserType, index: number) => (
            <div
              key={userData.id}
              className={`group p-6 rounded-xl glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] ${
                selectedUser?.id === userData.id
                  ? "ring-2 ring-accent/30 border-accent/50"
                  : ""
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110 ${
                        userData.role === "ADMIN"
                          ? "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/30"
                          : "bg-gradient-to-r from-blue-500 to-cyan-600 shadow-blue-500/30"
                      } shadow-lg`}
                    >
                      {userData.role === "ADMIN" ? (
                        <Crown className="h-6 w-6" />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                    </div>
                    <div
                      className={`absolute inset-0 rounded-full ${
                        userData.role === "ADMIN"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      } opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold text-white text-lg">
                        {userData.username}
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          userData.role === "ADMIN"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {userData.role}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {userData.email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {userData.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-xl font-bold text-accent">
                      {userData.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t("role")}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStartEditUser(userData)}
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:scale-105 transition-all duration-200"
                      title={t("editUser")}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onToggleUserRole(userData)}
                      className={`border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:scale-105 transition-all duration-200 ${
                        userData.role === "ADMIN" ? "bg-purple-500/10" : ""
                      }`}
                      title={
                        userData.role === "ADMIN"
                          ? t("makeClient")
                          : t("makeAdmin")
                      }
                      disabled={updateUserMutation.isPending}
                    >
                      {updateUserMutation.isPending &&
                      updateUserMutation.variables?.userId === userData.id ? (
                        <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      ) : userData.role === "ADMIN" ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onSetSelectedUser(
                          selectedUser?.id === userData.id ? null : userData
                        )
                      }
                      className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 transition-all duration-200"
                      title={t("viewDetails")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {userData.id !== currentUser?.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (
                            window.confirm(
                              t("confirmDelete", {
                                username: userData.username,
                              })
                            )
                          ) {
                            deleteUserMutation.mutate(userData.id);
                          }
                        }}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:scale-105 transition-all duration-200"
                        title={t("deleteUser")}
                        disabled={deleteUserMutation.isPending}
                      >
                        {deleteUserMutation.isPending &&
                        deleteUserMutation.variables === userData.id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* User Details Expanded */}
              {selectedUser?.id === userData.id && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">
                        {t("accountInfo")}
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>ID: {userData.id}</div>
                        <div>
                          {t("created")}:{" "}
                          {new Date(
                            userData.createdAt
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          {t("updated")}:{" "}
                          {new Date(
                            userData.updatedAt
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">
                        {t("contact")}
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>
                          {t("email")}: {userData.email}
                        </div>
                        <div>
                          {t("phone")}: {userData.phone}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">
                        {t("stats")}
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>
                          {t("role")}: {userData.role}
                        </div>
                        <div>
                          Status: Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )) || (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-xl text-muted-foreground">
                {t("noUsers")}
              </p>
            </div>
          )}
        </div>

        {/* Users Pagination */}
        {paginatedUsers && paginatedUsers.totalPages > 1 && (
          <div className="mt-8 pt-6 border-t border-white/20">
            <Pagination
              currentPage={usersPage}
              totalPages={paginatedUsers.totalPages}
              onPageChange={onSetUsersPage}
              isLoading={usersLoading}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(UserManagementSection);