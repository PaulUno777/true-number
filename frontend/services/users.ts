import { api } from './api';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: 'CLIENT' | 'ADMIN';
}

interface UpdateUserRequest {
  username?: string;
  email?: string;
  phone?: string;
  role?: 'CLIENT' | 'ADMIN';
}

interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string[];
  filter?: string[];
}

class UsersService {
  async getAllUsers(params?: PaginationParams) {
    const response = await api.get('/users', { params });
    return response.data;
  }

  async getUserById(id: string) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(data: CreateUserRequest) {
    const response = await api.post('/users', data);
    return response.data;
  }

  async updateUser(id: string, data: UpdateUserRequest) {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }

  async getUserWithStats(id: string) {
    const response = await api.get(`/users/${id}/stats`);
    return response.data;
  }
}

export const usersService = new UsersService();