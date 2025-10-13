import apiClient from './apiClient';

export interface User {
  id: number;
  email: string;
  firstName: string;
  middleName?: string; // Optional
  lastName: string;
  displayName: string;
  phoneNumber?: string; // Optional
  dateOfBirth?: string; // Using string for simplicity, can be converted to Date
  gender?: string; // Can be more specific if you have a Gender enum in frontend
  role: string; // Can be more specific if you have a UserRole enum in frontend
  accountStatus: string; // Can be more specific if you have an AccountStatus enum in frontend
}

export interface UserSearchDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  gender?: string;
  role?: string;
  accountStatus?: string;
}

export interface UserCreateDto {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  displayName: string;
  password?: string; // Password might be optional on update
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  role: string;
  accountStatus: string;
}

export interface UserUpdatePasswordDto {
  currentPassword?: string; // Might be needed for changing password
  newPassword?: string;
  token?: string; // For password reset
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page number (0-indexed)
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

class UserService {
  async createUser(userData: UserCreateDto): Promise<User> {
    try {
      const response = await apiClient.post<User>('/user/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/user/get-by-userId/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to fetch user with ID ${userId}`);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(`/user/get-by-email/${email}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to fetch user with email ${email}`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>('/user/get-all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  }

  async searchUsers(searchDto: UserSearchDto, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<Page<User>> {
    try {
      const response = await apiClient.post<Page<User>>('/user/search', searchDto, {
        params: { page, size, sort }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
  }

  async updateUser(userId: number, userData: UserCreateDto): Promise<User> {
    try {
      const response = await apiClient.put<User>(`/user/update/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to update user with ID ${userId}`);
    }
  }

  async partialUpdateUser(userId: number, userData: Partial<UserCreateDto>): Promise<User> {
    try {
      const response = await apiClient.patch<User>(`/user/partial-update/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to partially update user with ID ${userId}`);
    }
  }

  async updatePassword(userId: number, passwordDto: UserUpdatePasswordDto): Promise<void> {
    try {
      await apiClient.patch(`/user/update-password/${userId}`, passwordDto);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to update password for user with ID ${userId}`);
    }
  }

  async uploadProfilePicture(userId: number, file: File): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post<User>(`/user/upload-profile-picture/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to upload profile picture for user with ID ${userId}`);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await apiClient.delete(`/user/delete/${userId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to delete user with ID ${userId}`);
    }
  }

  async toggleUserStatus(userId: number): Promise<User> {
    try {
      const response = await apiClient.patch<User>(`/user/toggle-status/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to toggle status for user with ID ${userId}`);
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await apiClient.post('/user/request-password-reset', null, {
        params: { email },
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || `Failed to request password reset for email ${email}`);
    }
  }

  async resetPassword(token: string, passwordDto: UserUpdatePasswordDto): Promise<void> {
    try {
      await apiClient.post('/user/reset-password', passwordDto, {
        params: { token },
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }
}

export default new UserService();