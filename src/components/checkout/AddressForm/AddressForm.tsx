import React from "react";

interface AddressFormProps {
  shippingInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  shippingInfo,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-green-800">Address Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={shippingInfo.fullName}
          onChange={onChange}
          placeholder="Full Name"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={onChange}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={onChange}
          placeholder="Address"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="city"
          value={shippingInfo.city}
          onChange={onChange}
          placeholder="City"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="state"
          value={shippingInfo.state}
          onChange={onChange}
          placeholder="State"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={shippingInfo.zipCode}
          onChange={onChange}
          placeholder="Zip Code"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="country"
          value={shippingInfo.country}
          onChange={onChange}
          placeholder="Country"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="phone"
          value={shippingInfo.phone}
          onChange={onChange}
          placeholder="Phone Number"
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default AddressForm;
