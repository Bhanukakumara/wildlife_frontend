import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';
import CartItem from '../../components/cart/CartItem/CartItem';
import EmptyCart from '../../components/cart/EmptyCart/EmptyCart';
import CartSummary from '../../components/cart/CartSummary/CartSummary';

const CartPage = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Lion Portrait", photographer: "John Smith", price: 49.99, quantity: 1 },
    { id: 2, title: "Eagle in Flight", photographer: "Jane Doe", price: 39.99, quantity: 2 },
    { id: 3, title: "Underwater Dolphin", photographer: "Mike Johnson", price: 59.99, quantity: 1 },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
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
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-800">Cart Items ({cartItems.length})</h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
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
                    onClick={() => setCartItems([])} 
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