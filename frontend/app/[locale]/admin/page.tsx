"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { soloService } from "@/services/solo";
import { usersService, TopPlayer } from "@/services/users";
import { multiplayerService } from "@/services/multiplayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/providers/AuthProvider";
import PageLayout from "@/components/layout/PageLayout";
import Pagination from "@/components/ui/Pagination";
import {
  Users,
  GamepadIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  Eye,
  UserCheck,
  UserX,
  Crown,
  User,
  Shield,
  Home,
  Target,
  Trophy,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { User as UserType } from "@/types/auth";
import { AxiosError } from "axios";

const createUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.enum(["CLIENT", "ADMIN"]),
});

const editUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.enum(["CLIENT", "ADMIN"]),
});

type CreateUserForm = z.infer<typeof createUserSchema>;
type EditUserForm = z.infer<typeof editUserSchema>;

export default function AdminPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [viewMode, setViewMode] = useState<
    "overview" | "users" | "stats"
  >("overview");
  const [usersPage, setUsersPage] = useState(1);
  const usersPerPage = 8;
  const t = useTranslations("admin");

  const { data: soloStats, isLoading: statsLoading } = useQuery({
    queryKey: ["soloStats"],
    queryFn: soloService.getStats,
  });

  const { data: multiplayerStats, isLoading: multiplayerStatsLoading } =
    useQuery({
      queryKey: ["multiplayerStats"],
      queryFn: multiplayerService.getMultiplayerStats,
    });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getAllUsers(),
  });

  const { data: topPlayers, isLoading: topPlayersLoading } = useQuery({
    queryKey: ["topPlayers"],
    queryFn: () => usersService.getTopPlayers(10),
  });

  const createUserForm = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: "CLIENT",
    },
  });

  const editUserForm = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserForm) => usersService.createUser(data),
    onSuccess: () => {
      toast.success(t("userCreated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["topPlayers"] });
      setShowCreateForm(false);
      createUserForm.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError)
        toast.error(error.message || t("createError"));
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => usersService.deleteUser(userId),
    onSuccess: () => {
      toast.success(t("userDeleted"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["topPlayers"] });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError)
        toast.error(error.message || t("deleteError"));
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<EditUserForm>;
    }) => usersService.updateUser(userId, data),
    onSuccess: () => {
      toast.success(t("roleUpdated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["topPlayers"] });
      setEditingUser(null);
      editUserForm.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError)
        toast.error(error.message || t("updateError"));
    },
  });

  const onCreateUser = (data: CreateUserForm) => {
    createUserMutation.mutate(data);
  };

  const onEditUser = (data: EditUserForm) => {
    if (editingUser) {
      updateUserMutation.mutate({ userId: editingUser.id, data });
    }
  };

  const startEditUser = (userData: UserType) => {
    setEditingUser(userData);
    editUserForm.reset({
      username: userData.username,
      email: userData.email,
      phone: userData?.phone,
      role: userData.role,
    });
  };

  const toggleUserRole = (userData: UserType) => {
    const newRole = userData.role === "ADMIN" ? "CLIENT" : "ADMIN";
    updateUserMutation.mutate({
      userId: userData.id,
      data: { role: newRole },
    });
  };

  // Pagination logic for users
  const paginatedUsers = users?.data ? {
    ...users,
    data: users.data.slice((usersPage - 1) * usersPerPage, usersPage * usersPerPage),
    totalPages: Math.ceil(users.data.length / usersPerPage),
  } : users;

  if (statsLoading || usersLoading || multiplayerStatsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      breadcrumbs={[
        {
          label: t("title"),
          current: true,
        },
      ]}
    >

      {/* Navigation Tabs */}
      <div className="relative">
        {/* Tab Container */}
        <div className="flex items-center justify-center bg-white/5 rounded-2xl p-2 backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            {/* Overview Tab */}
            <button
              onClick={() => setViewMode("overview")}
              className={`tab-button group relative ${
                viewMode === "overview"
                  ? "tab-button-active"
                  : "tab-button-inactive"
              }`}
              style={{
                background: viewMode === "overview" 
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)" 
                  : undefined
              }}
            >
              <div className="relative z-10 flex items-center space-x-2">
                <Home className={`h-4 w-4 transition-transform duration-300 ${
                  viewMode === "overview" ? "animate-bounce" : "group-hover:scale-110"
                }`} />
                <span className="hidden sm:inline font-semibold">
                  {t("overview")}
                </span>
              </div>
              {viewMode === "overview" && (
                <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-xl animate-pulse" />
              )}
            </button>

            {/* Users Tab */}
            <button
              onClick={() => setViewMode("users")}
              className={`tab-button group relative ${
                viewMode === "users"
                  ? "tab-button-active"
                  : "tab-button-inactive"
              }`}
              style={{
                background: viewMode === "users" 
                  ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" 
                  : undefined
              }}
            >
              <div className="relative z-10 flex items-center space-x-2">
                <Users className={`h-4 w-4 transition-transform duration-300 ${
                  viewMode === "users" ? "animate-bounce" : "group-hover:scale-110"
                }`} />
                <span className="hidden sm:inline font-semibold">
                  {t("userManagement")}
                </span>
              </div>
              {viewMode === "users" && (
                <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-xl animate-pulse" />
              )}
            </button>

            {/* Statistics Tab */}
            <button
              onClick={() => setViewMode("stats")}
              className={`tab-button group relative ${
                viewMode === "stats"
                  ? "tab-button-active"
                  : "tab-button-inactive"
              }`}
              style={{
                background: viewMode === "stats" 
                  ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" 
                  : undefined
              }}
            >
              <div className="relative z-10 flex items-center space-x-2">
                <TrendingUp className={`h-4 w-4 transition-transform duration-300 ${
                  viewMode === "stats" ? "animate-bounce" : "group-hover:scale-110"
                }`} />
                <span className="hidden sm:inline font-semibold">
                  {t("statistics")}
                </span>
              </div>
              {viewMode === "stats" && (
                <div className="absolute inset-0 bg-purple-400/20 rounded-xl blur-xl animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Indicator Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        
        {/* Mobile Tab Labels */}
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            {viewMode === "overview" && t("overview")}
            {viewMode === "users" && t("userManagement")}
            {viewMode === "stats" && t("statistics")}
          </span>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "overview" && (
        <>
          {/* Global Statistics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="game-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {t("totalUsers")}
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {users?.data?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("registeredUsers")}
                </p>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {t("totalGames")}
                </CardTitle>
                <GamepadIcon className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {soloStats?.totalGames || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("gamesPlayed")}
                </p>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {t("globalWinRate")}
                </CardTitle>
                <Target className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {soloStats !== undefined && soloStats.totalGames > 0
                    ? (
                        ((soloStats.exactMatches + soloStats?.higherWins) /
                          soloStats?.totalGames) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("successRate")}
                </p>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {t("totalUsers")}
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {users?.data?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("activeUsers")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Quick Actions */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent" />
                <span>{t("adminActions")}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("adminActionsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button
                  onClick={() => setViewMode("users")}
                  className="flex items-center space-x-2 h-16 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 hover:scale-105 transition-all duration-200"
                  variant="outline"
                >
                  <Users className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t("manageUsers")}</div>
                    <div className="text-xs opacity-70">
                      {t("manageUsersDescription")}
                    </div>
                  </div>
                </Button>


                <Button
                  onClick={() => setViewMode("stats")}
                  className="flex items-center space-x-2 h-16 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 hover:scale-105 transition-all duration-200"
                  variant="outline"
                >
                  <TrendingUp className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t("viewStats")}</div>
                    <div className="text-xs opacity-70">
                      {t("viewStatsDescription")}
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center space-x-2 h-16 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 hover:scale-105 transition-all duration-200"
                  variant="outline"
                >
                  <GamepadIcon className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t("playGame")}</div>
                    <div className="text-xs opacity-70">
                      {t("playGameDescription")}
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Players Preview */}
          <Card className="game-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  <span>Top Players</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("leadingPlayers")}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setViewMode("stats")}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                {t("viewAll")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlayersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : topPlayers?.data && topPlayers.data.length > 0 ? (
                  topPlayers.data
                    .slice(0, 5)
                    .map((player: TopPlayer, index: number) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 rounded-lg glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                ? "bg-amber-600"
                                : "bg-gradient-to-r from-accent to-secondary"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {player.username}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {player.wonGames} {t("wins")} • {player.totalGames} {t("games")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent">
                            ${player.balance}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {player.winRate.toFixed(1)}% {t("winRate")}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    {t("noPlayers")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {viewMode === "users" && (
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
              onClick={() => setShowCreateForm(!showCreateForm)}
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
                        onClick={() => setShowCreateForm(false)}
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
                        onClick={() => setEditingUser(null)}
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
                          onClick={() => startEditUser(userData)}
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:scale-105 transition-all duration-200"
                          title={t("editUser")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleUserRole(userData)}
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
                          updateUserMutation.variables?.userId ===
                            userData.id ? (
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
                            setSelectedUser(
                              selectedUser?.id === userData.id ? null : userData
                            )
                          }
                          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 transition-all duration-200"
                          title={t("viewDetails")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {userData.id !== user?.id && (
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
                  onPageChange={setUsersPage}
                  isLoading={usersLoading}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {viewMode === "stats" && (
        <div className="space-y-6">
          {/* Game Statistics */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <GamepadIcon className="h-5 w-5 text-accent" />
                <span>{t("gameStatistics")}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("gameStatisticsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-green-500/5 border-green-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-400">
                          {t("wonGames")}
                        </p>
                        <p className="text-3xl font-bold text-green-400">
                          {(soloStats?.exactMatches || 0) +
                            (soloStats?.higherWins || 0)}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-500/5 border-red-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-400">
                          {t("lostGames")}
                        </p>
                        <p className="text-3xl font-bold text-red-400">
                          {soloStats?.losses || 0}
                        </p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Multiplayer Statistics */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Users className="h-5 w-5 text-accent" />
                <span>{t("multiplayerStatistics")}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("multiplayerStatisticsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-primary/5 border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("totalGames")}
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          {multiplayerStats?.totalGames || 0}
                        </p>
                      </div>
                      <GamepadIcon className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/5 border-green-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-400">
                          {t("activeGames")}
                        </p>
                        <p className="text-3xl font-bold text-green-400">
                          {multiplayerStats?.activeGames || 0}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/5 border-yellow-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-400">
                          {t("waitingGames")}
                        </p>
                        <p className="text-3xl font-bold text-yellow-400">
                          {multiplayerStats?.waitingGames || 0}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/5 border-accent/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-accent">
                          {t("averageBet")}
                        </p>
                        <p className="text-3xl font-bold text-accent">
                          ${multiplayerStats?.averageBet.toFixed(0) || 0}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Multiplayer Winners */}
              {multiplayerStats?.topWinners &&
                multiplayerStats.topWinners.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t("topMultiplayerWinners")}
                    </h3>
                    <div className="space-y-3">
                      {multiplayerStats.topWinners
                        .slice(0, 5)
                        .map((player, index) => (
                          <div
                            key={player.id}
                            className="flex items-center justify-between p-4 rounded-lg glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                                  index === 0
                                    ? "bg-yellow-500"
                                    : index === 1
                                    ? "bg-gray-400"
                                    : index === 2
                                    ? "bg-amber-600"
                                    : "bg-primary"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-white">
                                  {player.username}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {player.wins} {t("wins")} •{" "}
                                  {player.totalGames} {t("games")} •{" "}
                                  {player.winRate.toFixed(1)}% {t("winRate")}
                                </p>
                              </div>
                            </div>
                            <Trophy className="h-5 w-5 text-accent" />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Top Players Full List */}
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span>{t("topPlayers")}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("topPlayersDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlayersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : topPlayers?.data && topPlayers.data.length > 0 ? (
                  topPlayers.data
                    .map((player: TopPlayer, index: number) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 rounded-lg glass-effect border border-white/20 hover:border-accent/50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                              index === 0
                                ? "bg-yellow-500 shadow-yellow-500/30"
                                : index === 1
                                ? "bg-gray-400 shadow-gray-400/30"
                                : index === 2
                                ? "bg-amber-600 shadow-amber-600/30"
                                : "bg-gradient-to-r from-accent to-secondary"
                            } shadow-lg`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-white text-lg">
                              {player.username}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {player.wonGames} {t("wins")} • {player.totalGames} {t("games")} • {player.winRate.toFixed(1)}% {t("winRate")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent text-xl">
                            ${player.balance}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {player.role}
                          </div>
                          {index < 3 && (
                            <div className="text-xs text-yellow-400">
                              🏆 {t("medal")}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    {t("noPlayers")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}


      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLayout>
  );
}
