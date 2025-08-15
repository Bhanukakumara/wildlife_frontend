import React from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods,
  selectedMethod,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {methods.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => onSelect(method.id)}
          className={`p-4 border rounded-lg flex items-center justify-center transition-colors ${
            selectedMethod === method.id
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-300'
          }`}
        >
          <span className="text-2xl mr-2">{method.icon}</span>
          <span className="font-medium text-gray-800">{method.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PaymentMethods;