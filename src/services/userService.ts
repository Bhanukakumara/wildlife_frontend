import apiClient from './apiClient';

export interface User {
  id: number;
  email: string;
  firstName: string;
  middleName?: string; // Optional
  lastName: string;
  displayName: string;
  profilePicture?: string; // Optional
  phoneNumber?: string; // Optional
  dateOfBirth?: string; // Using string for simplicity, can be converted to Date
  gender?: string; // Can be more specific if you have a Gender enum in frontend
  role: string; // Can be more specific if you have a UserRole enum in frontend
  accountStatus: string; // Can be more specific if you have an AccountStatus enum in frontend
}

export interface UserCreateDto {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  displayName: string;
  profilePicture?: string;
  password?: string; // Password might be optional on update
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  role: string;
  accountStatus: string;
}

class UserService {
  async createUser(userData: UserCreateDto): Promise<User> {
    try {
      const response = await apiClient.post<User>('/api/user/create', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async getOrders(): Promise<Order[]> {
  async getUserById(userId: number): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/api/user/get-by-userId/${userId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
}

export default new UserService();