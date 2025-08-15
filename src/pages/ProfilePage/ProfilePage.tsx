import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 15, 2023",
    totalOrders: 12,
    favoriteCategory: "Mammals"
  };

  // Mock order history
  const orders = [
    { id: "ORD-001", date: "2023-05-15", total: 49.99, status: "Completed" },
    { id: "ORD-002", date: "2023-04-22", total: 89.97, status: "Completed" },
    { id: "ORD-003", date: "2023-03-10", total: 34.99, status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">My Profile</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Manage your account information and view your order history
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* User Info Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {user.name.charAt(0)}
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Member Since</span>
                    <span className="text-gray-800">{user.joinDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Total Orders</span>
                    <span className="text-gray-800">{user.totalOrders}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Favorite Category</span>
                    <span className="text-gray-800">{user.favoriteCategory}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                    Edit Profile
                  </button>
                  <button className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300">
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order History Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-green-800">Order History</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-green-800">Favorite Photos</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfilePage;