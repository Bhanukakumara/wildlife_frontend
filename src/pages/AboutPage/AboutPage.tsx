import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About WildCapture</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Our passion for wildlife photography and conservation
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-green-900">Our Story</h2>
              <p className="text-gray-700 mb-6 text-lg">
                Founded in 2010, WildCapture began with a simple mission: to showcase the beauty and diversity 
                of wildlife through stunning photography while promoting conservation efforts worldwide.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Our team of professional wildlife photographers travels to remote locations across the globe, 
                capturing moments that tell the story of our planet's incredible biodiversity.
              </p>
              <p className="text-gray-700 text-lg">
                Every photo sold through our platform contributes to wildlife conservation organizations, 
                ensuring that our passion for photography directly supports the protection of endangered species 
                and their habitats.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-96 rounded-xl shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gradient-to-br from-emerald-100 to-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-green-900">Our Mission</h2>
              <p className="text-gray-700 mb-6 text-lg">
                At WildCapture, we believe that photography has the power to inspire change. Our mission is threefold:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-600 rounded-full p-2 mr-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-lg">
                    <span className="font-bold">Preserve Memories:</span> Capture and share the beauty of wildlife for future generations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-600 rounded-full p-2 mr-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-lg">
                    <span className="font-bold">Promote Conservation:</span> Support wildlife protection through our conservation partnerships
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-600 rounded-full p-2 mr-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-lg">
                    <span className="font-bold">Educate & Inspire:</span> Raise awareness about wildlife and environmental issues
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-96 rounded-xl shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden text-center">
                <div className="h-64 bg-gradient-to-r from-green-300 to-emerald-400"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-800">Photographer {item}</h3>
                  <p className="text-gray-600 mb-4">Wildlife Specialist</p>
                  <p className="text-gray-700">
                    Passionate about capturing the essence of wildlife and promoting conservation through photography.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;