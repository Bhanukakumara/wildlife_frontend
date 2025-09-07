import React from "react";
import { ShoppingCart } from "@mui/icons-material";

interface CartIconProps {
  itemCount?: number;
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount = 0, onClick }) => {
  return (
    <button
      className="relative p-2 rounded-lg transition-colors hover:bg-[var(--wildlife-primary-light)]/20"
      onClick={onClick}
    >
      <ShoppingCart className="h-6 w-6 text-[var(--wildlife-primary-light)]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[var(--wildlife-error)] text-[var(--wildlife-text-light)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
