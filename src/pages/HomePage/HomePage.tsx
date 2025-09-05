import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

// Import local images from src/assets/images
import backgroundImage01 from '../../assets/images/others/bg_01.jpg';
import cate_01 from '../../assets/images/others/cate_01.jpg';
import cate_02 from '../../assets/images/others/cate_02.jpg';
import cate_03 from '../../assets/images/others/cate_03.jpg';
import wild_01 from '../../assets/images/others/wild_01.jpg';
import wild_02 from '../../assets/images/others/wild_02.jpg';
import wild_03 from '../../assets/images/others/wild_03.jpg';
import wild_04 from '../../assets/images/others/wild_04.jpg';
import PhotoCard from '../../components/gallery/PhotoCard/PhotoCard.tsx';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage01})` }}
    >
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Capture the Wild</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover breathtaking wildlife photography from around the world
          </p>
          <button 
            className="bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-[var(--color-main)] font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate('/gallery')}
          >
            Explore Gallery
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-[var(--color-main)]/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-accent)]">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-main)]/90 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${cate_01})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">African Safari</h3>
                <p className="text-[var(--color-accent)]/80">Majestic lions, elephants, and the great migration</p>
              </div>
            </div>
            <div className="bg-[var(--color-main)]/90 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${cate_02})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">Birds of Prey</h3>
                <p className="text-[var(--color-accent)]/80">Stunning raptors from eagles to owls</p>
              </div>
            </div>
            <div className="bg-[var(--color-main)]/90 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${cate_03})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--color-accent)]">Marine Life</h3>
                <p className="text-[var(--color-accent)]/80">Underwater wonders from whales to coral reefs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-16 bg-[var(--color-main)]/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-accent)]">Featured Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { id: '1', name: 'Majestic Lion', description: 'Photographer Name', imageUrl: wild_01, price: 49.99, active: true, createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' },
              { id: '2', name: 'Elegant Elephant', description: 'Photographer Name', imageUrl: wild_02, price: 59.99, active: true, createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' },
              { id: '3', name: 'Graceful Giraffe', description: 'Photographer Name', imageUrl: wild_03, price: 69.99, active: true, createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' },
              { id: '4', name: 'Mighty Rhino', description: 'Photographer Name', imageUrl: wild_04, price: 79.99, active: true, createdAt: '', updatedAt: '', createdBy: '', updatedBy: '' }
            ].map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[linear-gradient(to_right,var(--color-main),var(--color-secondary))] bg-opacity-80 text-[var(--color-accent)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive access to new photos and special offers
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-[var(--color-accent)] focus:outline-none bg-[var(--color-main)]/90"
            />
            <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-[var(--color-main)] font-bold py-3 px-6 rounded-r-lg transition duration-300">
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