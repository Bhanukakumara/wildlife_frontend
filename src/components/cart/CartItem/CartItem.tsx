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

const CartItem = ({ item, onUpdateQuantity, onRemove, editable = true }: CartItemProps) => {
  return (
    <div className="flex items-center border-b border-gray-200 pb-6">
      {/* Photo Preview */}
      <div className="w-24 h-24 bg-gradient-to-r from-green-300 to-emerald-400 rounded-lg mr-6"></div>
      
      {/* Item Details */}
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold text-green-800">{item.title}</h3>
            <p className="text-gray-600">by {item.photographer}</p>
          </div>
          {editable && (
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500"
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
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-12 h-8 flex items-center justify-center bg-gray-100">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>
          ) : (
            <div className="text-gray-600">
              Quantity: {item.quantity}
            </div>
          )}
          
          <div className="text-lg font-bold text-amber-600">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
