import apiClient from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string; // Only token is returned by the backend login endpoint
  email: string;
  roles: string[];
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<{ token: string }> { // Updated return type
    try {
      const response = await apiClient.post<{ token: string }>('/auth/login', credentials); // Updated endpoint and response type
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token in local storage
      }

      console.log('Login successful, token received:', response.data.token);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/create', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }


  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await apiClient.get<User>('/auth/me', { // Updated endpoint
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  }

  logout(): void {
    // The actual logout is handled by the interceptor
    // This just clears local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default new AuthService();