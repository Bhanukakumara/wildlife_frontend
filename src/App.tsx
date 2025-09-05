import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Page Components
import HomePage from './pages/HomePage/HomePage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import FeaturePage from './pages/FeaturePage/FeaturePage';
import PhotoDetailsPage from './pages/PhotoDetailsPage/PhotoDetailsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage/OrderConfirmationPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthGuard from './components/common/AuthGuard';
import AdminDashboardPage from './pages/AdminDashboardPage/AdminDashboardPage';
import AdminAuthGuard from './components/admin/AdminAuthGuard';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            } />
            <Route path="/cart" element={
              <AuthGuard>
                <CartPage />
              </AuthGuard>
            } />
            <Route path="/checkout" element={
              <AuthGuard>
                <CheckoutPage />
              </AuthGuard>
            } />
            <Route path="/order-confirmation" element={
              <AuthGuard>
                <OrderConfirmationPage />
              </AuthGuard>
            } />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/features" element={<FeaturePage />} />
            <Route path="/product-items/:id" element={<PhotoDetailsPage />} />
            <Route path="/admin" element={
              <AdminAuthGuard>
                <AdminDashboardPage />
              </AdminAuthGuard>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
