import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Capture the Wild</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover breathtaking wildlife photography from around the world
          </p>
          <button 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate('/gallery')}
          >
            Explore Gallery
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-800">African Safari</h3>
                <p className="text-gray-600">Majestic lions, elephants, and the great migration</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-800">Birds of Prey</h3>
                <p className="text-gray-600">Stunning raptors from eagles to owls</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-800">Marine Life</h3>
                <p className="text-gray-600">Underwater wonders from whales to coral reefs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Featured Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="h-64 bg-gradient-to-r from-green-300 to-emerald-400"></div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-green-800">Wildlife Photo {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">Photographer Name</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-600 font-bold">$49.99</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive access to new photos and special offers
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-r-lg transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
