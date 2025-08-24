import {
  Camera,
  ShoppingCart,
  Home,
  Info,
  Mail,
} from "@mui/icons-material";
import { Menu } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-green-500/30 backdrop-blur-md text-white shadow-lg top-0 z-50 border-b border-green-400/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Camera className="h-8 w-8 text-green-200" />
            <span className="text-xl font-bold text-green-100">WildCapture</span>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-8 text-sm">
              <li className="hover:text-green-200 transition-colors cursor-pointer">
                <Link to="/" className="text-green-100 hover:text-green-200 transition-colors">
                  Home
                </Link>
              </li>
              <li className="hover:text-green-200 transition-colors cursor-pointer">
                <Link to="/gallery" className="text-green-100 hover:text-green-200 transition-colors">
                  Gallery
                </Link>
              </li>
              <li className="hover:text-green-200 transition-colors cursor-pointer">
                <Link to="/about" className="text-green-100 hover:text-green-200 transition-colors">
                  About
                </Link>
              </li>
              <li className="hover:text-green-200 transition-colors cursor-pointer">
                <Link to="/contact" className="text-green-100 hover:text-green-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li className="hover:text-green-200 transition-colors cursor-pointer">
                <Link to="/features" className="text-green-100 hover:text-green-200 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-green-400/20 rounded-lg transition-colors">
              <ShoppingCart className="h-6 w-6 text-green-200" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500/80 backdrop-blur-sm text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  className="p-2 hover:bg-green-400/20 rounded-lg transition-colors flex items-center"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="h-6 w-6 bg-green-300 rounded-full flex items-center justify-center text-white font-bold">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg py-1 z-10 border border-green-300/20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-green-100 hover:bg-green-400/20"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-green-100 hover:bg-green-400/20"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    {user?.role && (user.role === 'admin' || user.role === 'ADMIN') && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-green-100 hover:bg-green-400/20"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-green-100 hover:bg-green-400/20"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="p-2 hover:bg-green-400/20 rounded-lg transition-colors">
                  <span className="text-green-100">Login</span>
                </Link>
                <Link to="/register" className="p-2 hover:bg-green-400/20 rounded-lg transition-colors">
                  <span className="text-green-100">Register</span>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-green-200" open={false} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-400/20 py-4 bg-green-500/20 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              >
                <Home className="h-5 w-5 text-green-200" />
                <span className="text-green-100">Home</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              >
                <Camera className="h-5 w-5 text-green-200" />
                <span className="text-green-100">Gallery</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5 text-green-200" />
                <span className="text-green-100">About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5 text-green-200" />
                <span className="text-green-100">Contact</span>
              </Link>
              <Link
                to="/features"
                className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5 text-green-200" />
                <span className="text-green-100">Features</span>
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-green-400/20">
              <SearchBar />
            </div>
            {user ? (
              <div className="mt-4 pt-4 border-t border-green-400/20">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-green-100">Profile</span>
                </Link>
                {user?.role && (user.role === 'admin' || user.role === 'ADMIN') && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-green-100">Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 p-2 hover:bg-green-400/20 rounded-lg transition-colors w-full text-left"
                >
                  <span className="text-green-100">Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-green-400/20 flex space-x-2">
                <Link
                  to="/login"
                  className="flex-1 text-center p-2 hover:bg-green-400/20 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-green-100">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center p-2 hover:bg-green-400/20 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-green-100">Register</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;