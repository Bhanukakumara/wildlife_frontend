import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import Footer from "../../components/common/Footer/Footer";
import ShippingForm from "../../components/checkout/ShippingForm/ShippingForm";
import PaymentMethods from "../../components/checkout/PaymentMethods/PaymentMethods";
import PaymentForm from "../../components/checkout/PaymentForm/PaymentForm";
import AddressForm from "../../components/checkout/AddressForm/AddressForm";

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  // Add state for selected shipping method
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("standard");

  // Define shipping methods
  const shippingMethods = [
    { id: "standard", name: "Standard Shipping", price: 5.99 },
    { id: "express", name: "Express Shipping", price: 15.99 },
  ];

  // Mock cart items for order summary

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingMethodChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", {
      shippingInfo,
      paymentMethod,
      cardInfo,
      selectedShippingMethod,
    });
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />

      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Complete your purchase and secure your wildlife photos
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Checkout Forms */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-800">
                    Shipping Information
                  </h2>
                  {/* Replace with AddressForm if you have one */}
                  <AddressForm
                    shippingInfo={shippingInfo}
                    onChange={handleShippingChange}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-800">
                    Shipping Method
                  </h2>
                  <ShippingForm
                    shippingMethods={shippingMethods}
                    selectedMethod={selectedShippingMethod}
                    onMethodChange={handleShippingMethodChange}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6 text-green-800">
                    Payment Method
                  </h2>
                  <PaymentMethods
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                    methods={[]} // Update with actual payment methods if needed
                  />

                  {paymentMethod === "credit-card" && (
                    <PaymentForm
                      cardInfo={cardInfo}
                      onChange={handleCardInfoChange}
                    />
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    Place Order
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/cart"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    &larr; Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;