import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';
import CartItem from '../../components/cart/CartItem/CartItem';
import EmptyCart from '../../components/cart/EmptyCart/EmptyCart';
import CartSummary from '../../components/cart/CartSummary/CartSummary';
import CartService from '../../services/cartService';
import type { Cart } from '../../services/cartService';
import { useCart } from '../../context/CartContext';
import userService from '../../services/userService.ts';
import authService from '../../services/authService.ts';

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCart } = useCart();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        const cartData = await CartService.getCart(userData.id);
        setCart(cartData);
      } catch (err) {
        setError('Failed to fetch cart data');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    try {
      const updatedCart = await CartService.updateCartItem(id, quantity);
      setCart(updatedCart);
      await fetchCart(); // Update cart count in Navbar
    } catch (err) {
      setError('Failed to update item quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const updatedCart = await CartService.removeCartItem(id);
      setCart(updatedCart);
      await fetchCart(); // Update cart count in Navbar
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await CartService.clearCart();
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
      await fetchCart(); // Update cart count in Navbar
    } catch (err) {
      setError('Failed to clear cart');
      console.error('Error clearing cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Review your selected wildlife photos before checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {!cart || cart.items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-800">Cart Items ({cart.items.length})</h2>
                  
                  <div className="space-y-6">
                    {cart.items.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={{
                          id: item.id,
                          title: item.title,
                          photographer: "Photographer", // This would come from the photo data
                          price: item.price,
                          quantity: item.quantity
                        }} 
                        onUpdateQuantity={(id, quantity) => updateQuantity(id, quantity)}
                        onRemove={(id) => removeItem(id)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Link 
                    to="/gallery" 
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    &larr; Continue Shopping
                  </Link>
                  <button 
                    onClick={clearCart} 
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              {/* Cart Summary */}
              <div className="lg:w-1/3">
                <CartSummary 
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
                
                <div className="mt-6">
                  <Link 
                    to="/checkout" 
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;