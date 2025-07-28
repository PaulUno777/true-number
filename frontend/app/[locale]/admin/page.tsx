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
import { useAuth } from "@/providers/AuthProvider";
import PageLayout from "@/components/layout/PageLayout";
import {
  Users,
  GamepadIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trophy,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { User as UserType } from "@/types/auth";
import { AxiosError } from "axios";

// Extracted Components
import TabNavigation from "./components/TabNavigation";
import StatisticsOverview from "./components/StatisticsOverview";
import TopPlayersPreview from "./components/TopPlayersPreview";
import UserManagementSection from "./components/UserManagementSection";

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
      <TabNavigation
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        t={t}
      />

      {/* Content based on view mode */}
      {viewMode === "overview" && (
        <>
          {/* Global Statistics */}
          <StatisticsOverview
            users={users}
            soloStats={soloStats}
            t={t}
          />

          {/* Top Players Preview */}
          <TopPlayersPreview
            topPlayers={topPlayers}
            isLoading={topPlayersLoading}
            onViewAll={() => setViewMode("stats")}
            t={t}
          />
        </>
      )}

      {viewMode === "users" && (
        <UserManagementSection
          users={users}
          paginatedUsers={paginatedUsers}
          usersLoading={usersLoading}
          usersPage={usersPage}
          showCreateForm={showCreateForm}
          editingUser={editingUser}
          selectedUser={selectedUser}
          createUserForm={createUserForm}
          editUserForm={editUserForm}
          createUserMutation={createUserMutation}
          updateUserMutation={updateUserMutation}
          deleteUserMutation={deleteUserMutation}
          currentUser={user}
          onSetShowCreateForm={setShowCreateForm}
          onSetUsersPage={setUsersPage}
          onSetEditingUser={setEditingUser}
          onSetSelectedUser={setSelectedUser}
          onCreateUser={onCreateUser}
          onEditUser={onEditUser}
          onStartEditUser={startEditUser}
          onToggleUserRole={toggleUserRole}
          t={t}
        />
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
