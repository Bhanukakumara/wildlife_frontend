import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomerManagement from "../../components/admin/CustomerManagement/CustomerManagement";
import ProductManagement from "../../components/admin/ProductManagement/ProductManagement";
import OrderManagement from "../../components/admin/OrderManagement/OrderManagement";
import CountryManagement from "./CountryManagementPage";

const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("customers");

  // Check if user has admin role
  const isAdmin = user?.role === "admin" || user?.role === "ADMIN";

  if (!isAdmin) {
    // Redirect to home page if user is not admin
    navigate("/", { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "customers":
        return <CustomerManagement />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "countries":
        return <CountryManagement />; // Use the actual Country Management component
      default:
        return <CustomerManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">
              Welcome, {user?.displayName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Side Navigation Panel */}
        <nav className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Management
            </h2>
            <ul>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("customers")}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                    activeSection === "customers"
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Customer Management
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("products")}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                    activeSection === "products"
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Product Management
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("orders")}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                    activeSection === "orders"
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Order Management
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveSection("countries")}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-300 ${
                    activeSection === "countries"
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Country Management
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {activeSection === "customers" && "Customer Management"}
              {activeSection === "products" && "Product Management"}
              {activeSection === "orders" && "Order Management"}
              {activeSection === "countries" && "Country Management"}
            </h2>
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
