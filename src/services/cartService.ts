import apiClient from './apiClient';

export interface CartItem {
  id: string;
  productItemId: string;
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
  productItemId: number;
  quantity: number;
}

class CartService {
  async getCart(userId:string): Promise<Cart> {
    try {
      const response = await apiClient.get<Cart>(`/shopping-cart/get-by-user-id/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  }

  async getItemCount(userId:string): Promise<number> {
    try {
      const response = await apiClient.get<number>(`/shopping-cart/get-item-count/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart item count');
    }
  }

  async addToCart(request: AddToCartRequest, userId: string): Promise<Cart> {
    try {
      const response = await apiClient.post<Cart>(`/shopping-cart/add-item/${userId}/items`, null, {
        params: {
          productItemId: request.productItemId,
          quantity: request.quantity,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<Cart> {
    try {
      const response = await apiClient.put<Cart>(`/shopping-cart/cart/items/${id}`, { quantity });
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