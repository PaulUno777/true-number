import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import type { CreateUserData, UpdateUserData, AdminMutations } from "../types/admin.types";

// Mock API functions - replace with actual API calls
const api = {
  createUser: async (data: CreateUserData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: Date.now().toString(), ...data };
  },

  updateUser: async ({ id, updates }: { id: string; updates: UpdateUserData }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id, ...updates };
  },

  deleteUser: async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    return { id };
  },

  updateUserRole: async ({ id, role }: { id: string; role: "CLIENT" | "ADMIN" }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id, role };
  },
};

export const useAdminMutations = (t: (key: string, params?: Record<string, string | number | Date>) => string): AdminMutations => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createUser = useMutation({
    mutationFn: api.createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast({
        title: t("success"),
        description: t("userCreatedSuccessfully", { username: data.username }),
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error?.message || t("userCreationFailed"),
        variant: "destructive",
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: api.updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast({
        title: t("success"),
        description: t("userUpdatedSuccessfully"),
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error?.message || t("userUpdateFailed"),
        variant: "destructive",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast({
        title: t("success"),
        description: t("userDeletedSuccessfully"),
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error?.message || t("userDeletionFailed"),
        variant: "destructive",
      });
    },
  });

  const updateUserRole = useMutation({
    mutationFn: api.updateUserRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast({
        title: t("success"),
        description: t("userRoleUpdatedSuccessfully", { role: data.role }),
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("error"),
        description: error?.message || t("roleUpdateFailed"),
        variant: "destructive",
      });
    },
  });

  return {
    createUser: {
      mutate: createUser.mutate,
      isPending: createUser.isPending,
    },
    updateUser: {
      mutate: updateUser.mutate,
      isPending: updateUser.isPending,
    },
    deleteUser: {
      mutate: deleteUser.mutate,
      isPending: deleteUser.isPending,
    },
    updateUserRole: {
      mutate: updateUserRole.mutate,
      isPending: updateUserRole.isPending,
    },
  };
};