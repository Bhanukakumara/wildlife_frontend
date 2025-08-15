import apiClient from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  favoriteCategory: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}

class UserService {
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/users/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>('/users/orders');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  async updateProfile(userData: UpdateProfileRequest): Promise<User> {
    try {
      const response = await apiClient.put<User>('/users/profile', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/users/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
}

export default new UserService();