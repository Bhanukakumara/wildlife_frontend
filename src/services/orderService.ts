import apiClient from './apiClient';

export interface OrderItem {
  id: string;
  photoId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

class OrderService {
  async getOrders(page: number = 0, size: number = 10): Promise<PaginatedResponse<Order>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Order>>(`/orders?page=${page}&size=${size}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const response = await apiClient.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    try {
      const response = await apiClient.post<Order>('/orders', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  async cancelOrder(id: string): Promise<void> {
    try {
      await apiClient.post(`/orders/${id}/cancel`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
  }
}

export default new OrderService();