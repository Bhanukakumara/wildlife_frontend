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
    <header className="bg-[linear-gradient(to_right,var(--color-main),var(--color-secondary))] backdrop-blur-md text-[var(--color-accent)] shadow-lg top-0 z-50 border-b border-[var(--color-secondary)]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Camera className="h-8 w-8 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-columns duration-300" />
            <span className="text-xl font-bold text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300">WildCapture</span>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-8 text-sm">
              <li className="hover:text-[var(--color-secondary)] transition-colors duration-300 cursor-pointer">
                <Link to="/" className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li className="hover:text-[var(--color-secondary)] transition-colors duration-300 cursor-pointer">
                <Link to="/gallery" className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li className="hover:text-[var(--color-secondary)] transition-colors duration-300 cursor-pointer">
                <Link to="/about" className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li className="hover:text-[var(--color-secondary)] transition-colors duration-300 cursor-pointer">
                <Link to="/contact" className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li className="hover:text-[var(--color-secondary)] transition-colors duration-300 cursor-pointer">
                <Link to="/features" className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300">
              <ShoppingCart className="h-6 w-6 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-accent)]/80 backdrop-blur-sm text-xs rounded-full h-5 w-5 flex items-center justify-center text-[var(--color-main)]">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  className="p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300 flex items-center"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="h-6 w-6 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-[var(--color-accent)] font-bold hover:bg-[var(--color-accent)] hover:text-[var(--color-main)] transition-colors duration-300">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[var(--color-main)]/10 backdrop-blur-md rounded-md shadow-lg py-1 z-10 border border-[var(--color-secondary)]/30">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-secondary)]/30 transition-colors duration-300"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-secondary)]/30 transition-colors duration-300"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    {user?.role && (user.role === 'admin' || user.role === 'ADMIN') && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-secondary)]/30 transition-colors duration-300"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-secondary)]/30 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300">
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Login</span>
                </Link>
                <Link to="/register" className="p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300">
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Register</span>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" open={false} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-secondary)]/30 py-4 bg-[linear-gradient(to_bottom,var(--color-main),var(--color-secondary))] backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              >
                <Home className="h-5 w-5 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
                <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Home</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              >
                <Camera className="h-5 w-5 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
                <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Gallery</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              >
                <Info className="h-5 w-5 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
                <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">About</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              >
                <Mail className="h-5 w-5 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
                <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Contact</span>
              </Link>
              <Link
                to="/features"
                className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
              >
                <Info className="h-5 w-5 text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
                <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Features</span>
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-secondary)]/30">
              <SearchBar />
            </div>
            {user ? (
              <div className="mt-4 pt-4 border-t border-[var(--color-secondary)]/30">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Profile</span>
                </Link>
                {user?.role && (user.role === 'admin' || user.role === 'ADMIN') && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300 w-full text-left"
                >
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-[var(--color-secondary)]/30 flex space-x-2">
                <Link
                  to="/login"
                  className="flex-1 text-center p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center p-2 hover:bg-[var(--color-secondary)]/30 rounded-lg transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-[var(--color-accent)] hover:text-[var(--color-secondary)] transition-colors duration-300">Register</span>
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