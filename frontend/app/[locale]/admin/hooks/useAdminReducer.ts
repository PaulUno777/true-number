import { useReducer } from "react";
import type { AdminState, AdminAction } from "../types/admin.types";

const initialState: AdminState = {
  viewMode: "overview",
  showCreateForm: false,
  editingUser: null,
  selectedUser: null,
  usersPage: 1,
  usersPerPage: 10,
  searchQuery: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };

    case "TOGGLE_CREATE_FORM":
      return { ...state, showCreateForm: !state.showCreateForm };

    case "SET_CREATE_FORM":
      return { ...state, showCreateForm: action.payload };

    case "SET_EDITING_USER":
      return { ...state, editingUser: action.payload };

    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };

    case "SET_USERS_PAGE":
      return { ...state, usersPage: action.payload };

    case "SET_USERS_PER_PAGE":
      return { ...state, usersPerPage: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload, usersPage: 1 }; // Reset page when searching

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload, usersPage: 1 }; // Reset page when sorting

    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload, usersPage: 1 }; // Reset page when sorting

    case "RESET_PAGINATION":
      return { ...state, usersPage: 1 };

    default:
      return state;
  }
};

export const useAdminReducer = (overrideInitialState?: Partial<AdminState>) => {
  const [state, dispatch] = useReducer(
    adminReducer, 
    { ...initialState, ...overrideInitialState }
  );

  // Action creators for convenience
  const actions = {
    setViewMode: (mode: AdminState["viewMode"]) =>
      dispatch({ type: "SET_VIEW_MODE", payload: mode }),

    toggleCreateForm: () =>
      dispatch({ type: "TOGGLE_CREATE_FORM" }),

    setCreateForm: (show: boolean) =>
      dispatch({ type: "SET_CREATE_FORM", payload: show }),

    setEditingUser: (user: AdminState["editingUser"]) =>
      dispatch({ type: "SET_EDITING_USER", payload: user }),

    setSelectedUser: (user: AdminState["selectedUser"]) =>
      dispatch({ type: "SET_SELECTED_USER", payload: user }),

    setUsersPage: (page: number) =>
      dispatch({ type: "SET_USERS_PAGE", payload: page }),

    setUsersPerPage: (perPage: number) =>
      dispatch({ type: "SET_USERS_PER_PAGE", payload: perPage }),

    setSearchQuery: (query: string) =>
      dispatch({ type: "SET_SEARCH_QUERY", payload: query }),

    setSortBy: (sortBy: AdminState["sortBy"]) =>
      dispatch({ type: "SET_SORT_BY", payload: sortBy }),

    setSortOrder: (order: AdminState["sortOrder"]) =>
      dispatch({ type: "SET_SORT_ORDER", payload: order }),

    resetPagination: () =>
      dispatch({ type: "RESET_PAGINATION" }),
  };

  return { state, dispatch, actions };
};