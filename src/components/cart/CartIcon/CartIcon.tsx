import React from 'react';
import { ShoppingCart } from '@mui/icons-material';

interface CartIconProps {
  itemCount?: number;
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount = 0, onClick }) => {
  return (
    <button 
      className="relative p-2 hover:bg-green-400/20 rounded-lg transition-colors"
      onClick={onClick}
    >
      <ShoppingCart className="h-6 w-6 text-green-200" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500/80 backdrop-blur-sm text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;