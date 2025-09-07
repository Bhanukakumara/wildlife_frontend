import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import Footer from "../../components/common/Footer/Footer";

// Import local images from src/assets/images
import backgroundImage01 from "../../assets/images/others/bg_01.jpg";
import cate_01 from "../../assets/images/others/cate_01.jpg";
import cate_02 from "../../assets/images/others/cate_02.jpg";
import cate_03 from "../../assets/images/others/cate_03.jpg";
import wild_01 from "../../assets/images/others/wild_01.jpg";
import wild_02 from "../../assets/images/others/wild_02.jpg";
import wild_03 from "../../assets/images/others/wild_03.jpg";
import wild_04 from "../../assets/images/others/wild_04.jpg";
import PhotoCard from "../../components/gallery/PhotoCard/PhotoCard.tsx";

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--wildlife-primary-dark)]">
            Capture the Wild
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[var(--wildlife-text-dark)]">
            Discover breathtaking wildlife photography from around the world
          </p>
          <button
            className="bg-[var(--wildlife-primary)] hover:bg-[var(--wildlife-primary-dark)] text-[var(--wildlife-text-light)] font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate("/gallery")}
          >
            Explore Gallery
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-[var(--wildlife-bg-light)]/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wildlife-primary-dark)]">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[cate_01, cate_02, cate_03].map((image, index) => {
              const titles = ["African Safari", "Birds of Prey", "Marine Life"];
              const descriptions = [
                "Majestic lions, elephants, and the great migration",
                "Stunning raptors from eagles to owls",
                "Underwater wonders from whales to coral reefs",
              ];
              return (
                <div
                  key={index}
                  className="bg-[var(--wildlife-bg-light)]/90 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[var(--wildlife-primary-dark)]">
                      {titles[index]}
                    </h3>
                    <p className="text-[var(--wildlife-text-muted)]/80">
                      {descriptions[index]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-16 bg-[var(--wildlife-bg-light)]/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wildlife-primary-dark)]">
            Featured Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[wild_01, wild_02, wild_03, wild_04].map((image, idx) => (
              <PhotoCard
                key={idx}
                photo={{
                  id: `${idx + 1}`,
                  name: [
                    "Majestic Lion",
                    "Elegant Elephant",
                    "Graceful Giraffe",
                    "Mighty Rhino",
                  ][idx],
                  description: "Photographer Name",
                  imageUrl: image,
                  price: [49.99, 59.99, 69.99, 79.99][idx],
                  active: true,
                  createdAt: "",
                  updatedAt: "",
                  createdBy: "",
                  updatedBy: "",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--wildlife-primary-dark)]/80 text-[var(--wildlife-text-light)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive access to new photos and special offers
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-[var(--wildlife-text-dark)] focus:outline-none bg-[var(--wildlife-bg-light)]/90 border border-[var(--wildlife-secondary-light)]"
            />
            <button className="bg-[var(--wildlife-primary)] hover:bg-[var(--wildlife-primary-dark)] text-[var(--wildlife-text-light)] font-bold py-3 px-6 rounded-r-lg transition duration-300">
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
