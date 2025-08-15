interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  editable?: boolean;
}

const CartSummary = ({ subtotal, shipping, tax, total, editable = true }: CartSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between">
          <span className="text-lg font-bold text-green-800">Total</span>
          <span className="text-lg font-bold text-amber-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {editable && (
        <div className="mt-6">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms">
              I agree to the <a href="#" className="text-green-600 hover:text-green-800">Terms and Conditions</a>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;