// Core types and interfaces for admin functionality

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'ADMIN';
  balance: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    soloGames: number;
    multiplayerParticipations: number;
  };
  stats?: UserStats;
}

export interface UserStats {
  totalGames: number;
  wins: number;
  winRate: number;
  totalEarnings: number;
}

export interface CreateUserData {
  username: string;
  email: string;
  phone?: string;
  password: string;
  role: 'CLIENT' | 'ADMIN';
  balance: number;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  phone?: string;
  role?: 'CLIENT' | 'ADMIN';
  balance?: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGames: number;
  globalWinRate: number;
  averageBalance: number;
  registeredUsers: number;
  gamesPlayed: number;
  successRate: number;
  wonGames: number;
  lostGames: number;
}

export interface MultiplayerStats {
  totalGames: number;
  activeGames: number;
  waitingGames: number;
  averageBet: number;
  averageThinkingTime: number;
  topWinners: TopPlayer[];
}

export interface TopPlayer {
  id: string;
  username: string;
  wins: number;
  totalGames: number;
  winRate: number;
}

export interface TransactionOverview {
  totalUserBalance: number;
  activeUsers: number;
  userBalanceDistribution: {
    highBalance: number;
    mediumBalance: number;
    lowBalance: number;
    noBalance: number;
  };
}

export interface AdminState {
  viewMode: 'overview' | 'users' | 'stats' | 'transactions';
  showCreateForm: boolean;
  editingUser: User | null;
  selectedUser: User | null;
  usersPage: number;
  usersPerPage: number;
  searchQuery: string;
  sortBy: 'username' | 'createdAt' | 'balance' | 'role';
  sortOrder: 'asc' | 'desc';
}

export type AdminAction =
  | { type: 'SET_VIEW_MODE'; payload: AdminState['viewMode'] }
  | { type: 'TOGGLE_CREATE_FORM' }
  | { type: 'SET_CREATE_FORM'; payload: boolean }
  | { type: 'SET_EDITING_USER'; payload: User | null }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'SET_USERS_PAGE'; payload: number }
  | { type: 'SET_USERS_PER_PAGE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: AdminState['sortBy'] }
  | { type: 'SET_SORT_ORDER'; payload: AdminState['sortOrder'] }
  | { type: 'RESET_PAGINATION' };

export interface TranslationFunction {
  (key: string, params?: Record<string, unknown>): string;
}

// Component Props Interfaces

export interface AdminTabNavigationProps {
  viewMode: AdminState['viewMode'];
  onViewModeChange: (mode: AdminState['viewMode']) => void;
  t: TranslationFunction;
}

export interface StatsOverviewProps {
  stats: AdminStats | undefined;
  multiplayerStats: MultiplayerStats | undefined;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  isLoading?: boolean;
}

export interface UserManagementProps {
  users: User[] | undefined;
  isLoading: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreateUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onViewDetails: (user: User) => void;
  t: TranslationFunction;
}

export interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewDetails: (user: User) => void;
  t: TranslationFunction;
}

export interface UserListProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewDetails: (user: User) => void;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface CreateUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserData) => void;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface EditUserFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserData) => void;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  t: TranslationFunction;
}

export interface TopPlayersListProps {
  topPlayers: TopPlayer[];
  isLoading: boolean;
  showAll?: boolean;
  limit?: number;
  t: TranslationFunction;
}

export interface GameStatisticsProps {
  stats: AdminStats | undefined;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface MultiplayerStatisticsProps {
  stats: MultiplayerStats | undefined;
  isLoading: boolean;
  t: TranslationFunction;
}

export interface TransactionOverviewProps {
  overview: TransactionOverview | undefined;
  isLoading: boolean;
  t: TranslationFunction;
}

// Form validation types
export interface UserFormErrors {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  balance?: string;
  role?: string;
}

export interface AdminMutations {
  createUser: {
    mutate: (data: CreateUserData) => void;
    isPending: boolean;
  };
  updateUser: {
    mutate: (data: { id: string; updates: UpdateUserData }) => void;
    isPending: boolean;
  };
  deleteUser: {
    mutate: (id: string) => void;
    isPending: boolean;
  };
  updateUserRole: {
    mutate: (data: { id: string; role: 'CLIENT' | 'ADMIN' }) => void;
    isPending: boolean;
  };
}

// Pagination types
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error: string;
}