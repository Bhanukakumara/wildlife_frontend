import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Content */}
      <section className="flex-grow flex items-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-6xl font-bold text-white">404</div>
            </div>
            
            <h1 className="text-4xl font-bold text-green-800 mb-4">Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Go Home
              </Link>
              <Link 
                to="/gallery" 
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Browse Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFoundPage;