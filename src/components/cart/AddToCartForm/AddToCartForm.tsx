import { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import cartService from '../../../services/cartService';
import authService, { type User } from '../../../services/authService';
import { useCart } from '../../../context/CartContext';

interface AddToCartRequest {
  productItemId: string; // Changed from photoId to match backend DTO
  quantity: number;
}

interface AddToCartFormProps {
  productItemId: string; // Changed from photoId to match backend DTO
  price: number;
  title: string; // Added to display product name in success message
  onAddToCart?: () => void;
}

const AddToCartForm = ({ productItemId, price, title, onAddToCart }: AddToCartFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { fetchCart } = useCart();

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
      setError(null); // Clear error when quantity changes
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const request: AddToCartRequest = {
        productItemId,
        quantity,
      };

      const userData = await authService.getCurrentUser();
      if (!userData?.id) {
        throw new Error('User not authenticated');
      }

      await cartService.addToCart(request, userData.id);
      
      // Update cart count in Navbar
      await fetchCart();

      setSuccess(`${quantity} ${title}${quantity > 1 ? 's' : ''} added to cart successfully!`);
      
      if (onAddToCart) {
        onAddToCart();
      }

      // Reset quantity after successful addition
      setQuantity(1);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to add item to cart. Please try again.';
      setError(errorMessage);
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-green-800 mb-2">Purchase {title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">Price:</span>
          <span className="text-2xl font-bold text-amber-600">${price.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
          Quantity
        </label>
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={quantity <= 1 || loading}
          >
            -
          </button>
          <span className="w-12 h-10 flex items-center justify-center bg-gray-100 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700">Total:</span>
          <span className="text-xl font-bold text-amber-600">${(price * quantity).toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={loading}
        fullWidth
        size="large"
        className={loading ? "opacity-75 cursor-not-allowed" : "hover:bg-green-700"}
      >
        {loading ? 'Adding to Cart...' : 'Add to Cart'}
      </Button>

      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToCartForm;