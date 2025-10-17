// import Navbar from '../../components/common/Navbar/Navbar.tsx';
// import Footer from '../../components/common/Footer/Footer';
// import { useState, useEffect } from 'react';
// import UserService from '../../services/userService';
// import type { User, Order } from '../../services/userService';
// import { useAuth } from '../../context/AuthContext';

// const ProfilePage = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await UserService.getProfile();
//         const ordersData = await UserService.getOrders();
//         setUser(userData);
//         setOrders(ordersData);
//       } catch (err) {
//         setError('Failed to fetch profile data');
//         console.error('Error fetching profile data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     logout();
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//         <Navbar />
//         <div className="flex justify-center items-center h-96">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//         <Navbar />
//         <div className="container mx-auto px-4 py-16">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <strong className="font-bold">Error! </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//       <Navbar />
      
//       {/* Page Navbar */}
//       <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl font-bold mb-4">My Profile</h1>
//           <p className="text-xl max-w-2xl mx-auto">
//             Manage your account information and view your order history
//           </p>
//         </div>
//       </section>

//       {/* Profile Content */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* User Info Section */}
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//                 <div className="flex flex-col items-center mb-6">
//                   <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
//                     {user?.name.charAt(0)}
//                   </div>
//                   <h2 className="text-2xl font-bold text-green-800">{user?.name}</h2>
//                   <p className="text-gray-600">{user?.email}</p>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between border-b border-gray-200 pb-2">
//                     <span className="font-medium text-gray-600">Member Since</span>
//                     <span className="text-gray-800">{user?.joinDate}</span>
//                   </div>
//                   <div className="flex justify-between border-b border-gray-200 pb-2">
//                     <span className="font-medium text-gray-600">Total Orders</span>
//                     <span className="text-gray-800">{user?.totalOrders}</span>
//                   </div>
//                   <div className="flex justify-between border-b border-gray-200 pb-2">
//                     <span className="font-medium text-gray-600">Favorite Category</span>
//                     <span className="text-gray-800">{user?.favoriteCategory}</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-8">
//                   <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
//                     Edit Profile
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             {/* Order History Section */}
//             <div className="lg:w-2/3">
//               <div className="bg-white rounded-xl shadow-lg p-8">
//                 <h2 className="text-2xl font-bold mb-6 text-green-800">Order History</h2>
                
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead>
//                       <tr>
//                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {orders.map((order) => (
//                         <tr key={order.id}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                               {order.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 <div className="mt-8">
//                   <h3 className="text-xl font-bold mb-4 text-green-800">Favorite Photos</h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     {[1, 2, 3].map((item) => (
//                       <div key={item} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40"></div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ProfilePage;