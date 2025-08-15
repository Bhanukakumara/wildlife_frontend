import React from 'react';
import Input from '../../forms/Input/Input';

interface PaymentFormProps {
  cardInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ cardInfo, onChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment processing would happen here
    console.log("Payment submitted:", cardInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          label="Card Number"
          type="text"
          name="cardNumber"
          value={cardInfo.cardNumber}
          onChange={onChange}
          placeholder="1234 5678 9012 3456"
          required
          fullWidth
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Expiry Date"
            type="text"
            name="expiryDate"
            value={cardInfo.expiryDate}
            onChange={onChange}
            placeholder="MM/YY"
            required
            fullWidth
          />
        </div>
        
        <div>
          <Input
            label="CVV"
            type="text"
            name="cvv"
            value={cardInfo.cvv}
            onChange={onChange}
            placeholder="123"
            required
            fullWidth
          />
        </div>
      </div>
      
      <div>
        <Input
          label="Name on Card"
          type="text"
          name="cardName"
          value={cardInfo.cardName}
          onChange={onChange}
          placeholder="John Doe"
          required
          fullWidth
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;