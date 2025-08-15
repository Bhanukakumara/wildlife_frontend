import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const FeaturePage = () => {
  const features = [
    {
      title: "High-Quality Photos",
      description: "All our wildlife photos are captured by professional photographers using high-end equipment, ensuring the best quality for your collection.",
      icon: "📸"
    },
    {
      title: "Multiple Formats",
      description: "Download your purchased photos in multiple formats including JPEG, PNG, and RAW files for maximum flexibility.",
      icon: "💾"
    },
    {
      title: "Print Ready",
      description: "Our photos are optimized for printing at various sizes, from small prints to large wall art.",
      icon: "🖼️"
    },
    {
      title: "Exclusive Content",
      description: "Access to exclusive wildlife photography that you won't find anywhere else, captured in remote locations around the world.",
      icon: "🌍"
    },
    {
      title: "Conservation Support",
      description: "Every purchase supports wildlife conservation efforts, with a portion of proceeds donated to wildlife protection organizations.",
      icon: "💚"
    },
    {
      title: "Secure Downloads",
      description: "Safe and secure download process with encrypted connections and immediate access to your purchased photos.",
      icon: "🔒"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Features</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover what makes WildCapture the premier destination for wildlife photography
          </p>
        </div>
      </section>

      {/* Features Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-bold mb-4 text-green-800">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-xl">
                  Become part of a growing community of wildlife photography enthusiasts and conservationists.
                </p>
              </div>
              <div className="md:w-1/3 text-center">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturePage;
