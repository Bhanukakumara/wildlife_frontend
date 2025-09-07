import React from "react";
import CartItem from "../../cart/CartItem/CartItem";
import CartSummary from "../../cart/CartSummary/CartSummary";

interface OrderItem {
  id: number;
  title: string;
  photographer: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  tax,
  shipping,
  total,
}) => {
  return (
    <div className="bg-[var(--wildlife-bg-light)] rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-[var(--wildlife-primary-dark)]">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              photographer: item.photographer,
              price: item.price,
              quantity: item.quantity,
            }}
            onUpdateQuantity={() => {}}
            onRemove={() => {}}
            editable={false}
          />
        ))}
      </div>

      <CartSummary
        subtotal={subtotal}
        tax={tax}
        shipping={shipping}
        total={total}
        editable={false}
      />
    </div>
  );
};

export default OrderSummary;
