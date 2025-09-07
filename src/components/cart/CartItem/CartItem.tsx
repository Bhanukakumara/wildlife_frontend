interface CartItemProps {
  item: {
    id: string;
    title: string;
    photographer: string;
    price: number;
    quantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  editable?: boolean;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  editable = true,
}: CartItemProps) => {
  return (
    <div className="flex items-center border-b border-[var(--wildlife-secondary-light)] pb-6">
      {/* Photo Preview */}
      <div className="w-24 h-24 bg-[var(--wildlife-bg-forest)] rounded-lg mr-6"></div>

      {/* Item Details */}
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--wildlife-primary-dark)]">
              {item.title}
            </h3>
            <p className="text-[var(--wildlife-text-muted)]">
              by {item.photographer}
            </p>
          </div>
          {editable && (
            <button
              onClick={() => onRemove(item.id)}
              className="text-[var(--wildlife-text-muted)] hover:text-[var(--wildlife-error)]"
            >
              &times;
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {editable ? (
            <div className="flex items-center">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center bg-[var(--wildlife-secondary-light)] rounded-l hover:bg-[var(--wildlife-secondary)]"
              >
                -
              </button>
              <span className="w-12 h-8 flex items-center justify-center bg-[var(--wildlife-bg-light)]">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-[var(--wildlife-secondary-light)] rounded-r hover:bg-[var(--wildlife-secondary)]"
              >
                +
              </button>
            </div>
          ) : (
            <div className="text-[var(--wildlife-text-muted)]">
              Quantity: {item.quantity}
            </div>
          )}

          <div className="text-lg font-bold text-[var(--wildlife-accent-gold)]">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
