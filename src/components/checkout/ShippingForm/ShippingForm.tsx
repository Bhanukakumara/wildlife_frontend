import React from 'react';
import Checkbox from '../../forms/Checkbox/Checkbox';

interface ShippingFormProps {
  shippingMethods: { id: string; name: string; price: number }[];
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingMethods,
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-green-800">Shipping Method</h3>
      
      <div className="space-y-3">
        {shippingMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
            <Checkbox
              label={method.name}
              checked={selectedMethod === method.id}
              onChange={() => onMethodChange(method.id)}
            />
            <span className="font-bold text-amber-600">${method.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingForm;