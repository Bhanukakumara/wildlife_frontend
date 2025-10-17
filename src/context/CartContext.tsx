import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import cartService from '../services/cartService';
import type { Cart } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItemCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      if (user) {
        const cart: Cart = await cartService.getCart(user.id);
        setCartItemCount(cart.totalItems);
      } else {
        // For non-logged in users, we could use localStorage or similar
        // For now, we'll just show 0
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCartItemCount(0);
    }
  };

  const fetchCartItemCount = async () => {
    try {
      if (user) {
        const cartItemCount: number = await cartService.getItemCount(user.id);
        setCartItemCount(cartItemCount);
      } else {
        // For non-logged in users, we could use localStorage or similar
        // For now, we'll just show 0
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch cart item count:', error);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCartItemCount();
  }, [user]);

  const refreshCart = async () => {
    await fetchCartItemCount();
  };

  const value = {
    cartItemCount,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};