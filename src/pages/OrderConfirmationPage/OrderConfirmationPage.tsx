import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const OrderConfirmationPage = () => {
  // Mock order data
  const order = {
    orderId: "ORD-2023-001",
    orderDate: "May 15, 2023",
    total: 129.97,
    items: [
      { id: 1, title: "Lion Portrait", photographer: "John Smith", price: 49.99, quantity: 1 },
      { id: 2, title: "Eagle in Flight", photographer: "Jane Doe", price: 39.99, quantity: 2 },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Thank you for your purchase. Your wildlife photos are on their way!
          </p>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Order Placed Successfully!</h2>
                <p className="text-gray-600 mt-2">
                  We've sent a confirmation email to your inbox.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-green-800">Order Details</h3>
                    <p className="text-gray-600">Order #{order.orderId}</p>
                  </div>
                  <p className="text-gray-600">{order.orderDate}</p>
                </div>
                
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.photographer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold text-green-800">Total</span>
                  <span className="font-bold text-amber-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-green-800 mb-2">What's Next?</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Your photos will be processed and sent to your email within 24 hours</li>
                  <li>You'll receive a download link for your high-resolution photos</li>
                  <li>Check your spam folder if you don't receive the email</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/profile" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
                >
                  View Order History
                </Link>
                <Link 
                  to="/gallery" 
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg text-center transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;