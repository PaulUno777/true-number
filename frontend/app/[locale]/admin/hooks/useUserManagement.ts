// cspell:disable
import { useQuery } from "@tanstack/react-query";
import type { User, PaginatedResponse, PaginationMeta } from "../types/admin.types";

interface UseUserManagementParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: "username" | "createdAt" | "balance" | "role";
  sortOrder?: "asc" | "desc";
}

// Mock API function - replace with actual API calls
const api = {
  getUsers: async (params: UseUserManagementParams): Promise<PaginatedResponse<User>> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock user data
    const mockUsers: User[] = [
      {
        id: "1",
        username: "john_doe",
        email: "john@example.com",
        phone: "+1234567890",
        role: "CLIENT",
        balance: 150.75,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:45:00Z",
        _count: { soloGames: 45, multiplayerParticipations: 23 },
        stats: { totalGames: 68, wins: 42, winRate: 61.8, totalEarnings: 234.50 },
      },
      {
        id: "2",
        username: "jane_smith",
        email: "jane@example.com",
        phone: "+1987654321",
        role: "ADMIN",
        balance: 890.25,
        createdAt: "2024-01-10T09:15:00Z",
        updatedAt: "2024-01-25T16:20:00Z",
        _count: { soloGames: 78, multiplayerParticipations: 45 },
        stats: { totalGames: 123, wins: 89, winRate: 72.4, totalEarnings: 1245.75 },
      },
      {
        id: "3",
        username: "mike_wilson",
        email: "mike@example.com",
        phone: "+1555666777",
        role: "CLIENT",
        balance: 45.00,
        createdAt: "2024-01-18T11:45:00Z",
        updatedAt: "2024-01-22T13:30:00Z",
        _count: { soloGames: 23, multiplayerParticipations: 12 },
        stats: { totalGames: 35, wins: 18, winRate: 51.4, totalEarnings: 89.25 },
      },
      {
        id: "4",
        username: "sarah_johnson",
        email: "sarah@example.com",
        phone: "+1444555666",
        role: "CLIENT",
        balance: 267.80,
        createdAt: "2024-01-12T14:20:00Z",
        updatedAt: "2024-01-23T10:15:00Z",
        _count: { soloGames: 56, multiplayerParticipations: 34 },
        stats: { totalGames: 90, wins: 58, winRate: 64.4, totalEarnings: 456.90 },
      },
      {
        id: "5",
        username: "alex_brown",
        email: "alex@example.com",
        phone: "+1333444555",
        role: "CLIENT",
        balance: 0.00,
        createdAt: "2024-01-20T16:10:00Z",
        updatedAt: "2024-01-24T12:45:00Z",
        _count: { soloGames: 12, multiplayerParticipations: 8 },
        stats: { totalGames: 20, wins: 7, winRate: 35.0, totalEarnings: 25.50 },
      },
    ];

    // Apply search filter
    let filteredUsers = mockUsers;
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredUsers = mockUsers.filter(
        user =>
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          (user.phone && user.phone.includes(searchLower)) ||
          user.role.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (params.sortBy) {
      filteredUsers.sort((a, b) => {
        let aValue, bValue;
        
        switch (params.sortBy) {
          case "username":
            aValue = a.username.toLowerCase();
            bValue = b.username.toLowerCase();
            break;
          case "createdAt":
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case "balance":
            aValue = a.balance;
            bValue = b.balance;
            break;
          case "role":
            aValue = a.role;
            bValue = b.role;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return params.sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return params.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const page = params.page || 1;
    const perPage = params.perPage || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / perPage);

    const meta: PaginationMeta = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: perPage,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return {
      data: paginatedUsers,
      meta,
    };
  },

  getUserById: async (id: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock user - in real implementation, fetch from API
    return {
      id,
      username: "detailed_user",
      email: "detailed@example.com",
      phone: "+1111222333",
      role: "CLIENT",
      balance: 123.45,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      _count: { soloGames: 45, multiplayerParticipations: 23 },
      stats: { totalGames: 68, wins: 42, winRate: 61.8, totalEarnings: 234.50 },
    };
  },
};

export const useUserManagement = (params: UseUserManagementParams = {}) => {
  // Users list query
  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => api.getUsers(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    placeholderData: (previousData) => previousData, // Keep previous data while loading new page
  });

  // Single user query (for detailed view)
  const useGetUserQuery = (id: string) => 
    useQuery({
      queryKey: ["user", id],
      queryFn: () => api.getUserById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  const queryData = usersQuery.data as PaginatedResponse<User> | undefined;

  return {
    // Users list
    users: queryData?.data,
    meta: queryData?.meta,
    isUsersLoading: usersQuery.isLoading,
    usersError: usersQuery.error,
    isUsersFetching: usersQuery.isFetching,

    // Utility methods
    useGetUserQuery,
    refetchUsers: usersQuery.refetch,

    // Computed values
    hasNextPage: queryData?.meta.hasNextPage || false,
    hasPreviousPage: queryData?.meta.hasPreviousPage || false,
    totalUsers: queryData?.meta.totalItems || 0,
    totalPages: queryData?.meta.totalPages || 0,
    currentPage: queryData?.meta.currentPage || 1,
  };
};