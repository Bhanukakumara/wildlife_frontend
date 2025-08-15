import apiClient from './apiClient';

export interface CartItem {
  id: string;
  photoId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartRequest {
  photoId: string;
  quantity: number;
}

class CartService {
  async getCart(): Promise<Cart> {
    try {
      const response = await apiClient.get<Cart>('/cart');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  }

  async addToCart(request: AddToCartRequest): Promise<Cart> {
    try {
      const response = await apiClient.post<Cart>('/cart', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<Cart> {
    try {
      const response = await apiClient.put<Cart>(`/cart/items/${id}`, { quantity });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  }

  async removeCartItem(id: string): Promise<Cart> {
    try {
      const response = await apiClient.delete<Cart>(`/cart/items/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove cart item');
    }
  }

  async clearCart(): Promise<void> {
    try {
      await apiClient.delete('/cart');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  }
}

export default new CartService();