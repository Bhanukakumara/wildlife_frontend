interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  editable?: boolean;
}

const CartSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  editable = true,
}: CartSummaryProps) => {
  return (
    <div className="bg-[var(--wildlife-bg-light)] rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-[var(--wildlife-primary-dark)]">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[var(--wildlife-text-muted)]">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--wildlife-text-muted)]">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[var(--wildlife-text-muted)]">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-[var(--wildlife-secondary-light)] pt-4 flex justify-between">
          <span className="text-lg font-bold text-[var(--wildlife-primary-dark)]">
            Total
          </span>
          <span className="text-lg font-bold text-[var(--wildlife-accent-gold)]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {editable && (
        <div className="mt-6">
          <div className="flex items-center text-sm text-[var(--wildlife-text-muted)] mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 h-4 w-4 text-[var(--wildlife-primary)] border-[var(--wildlife-secondary-light)] rounded focus:ring-[var(--wildlife-primary-light)]"
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <a
                href="#"
                className="text-[var(--wildlife-primary)] hover:text-[var(--wildlife-primary-dark)]"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
