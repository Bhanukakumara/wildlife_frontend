import React from 'react';
import Input from '../../forms/Input/Input';
import Select from '../../forms/Select/Select';

interface CheckoutFormProps {
  formData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ formData, onChange }) => {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
        
        <div>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
      </div>
      
      <div>
        <Input
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          required
          fullWidth
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
        
        <div>
          <Input
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
        
        <div>
          <Input
            label="ZIP Code"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select
            label="Country"
            name="country"
            value={formData.country}
            onChange={onChange}
            options={countryOptions}
            required
            fullWidth
          />
        </div>
        
        <div>
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;