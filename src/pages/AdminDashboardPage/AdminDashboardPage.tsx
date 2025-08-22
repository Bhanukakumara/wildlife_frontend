import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerManagement from '../../components/admin/CustomerManagement/CustomerManagement';
import ProductManagement from '../../components/admin/ProductManagement/ProductManagement';
import OrderManagement from '../../components/admin/OrderManagement/OrderManagement';
import { Navigate } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Check if user has admin role
  const isAdmin = user?.roles.includes('admin') || user?.roles.includes('ADMIN');
  
  if (!isAdmin) {
    // Redirect to home page if user is not admin
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage customers, products, and orders</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
          <CustomerManagement />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Management</h2>
          <ProductManagement />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Management</h2>
          <OrderManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;