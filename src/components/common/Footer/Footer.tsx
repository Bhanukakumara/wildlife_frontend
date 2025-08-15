import { 
  Facebook, 
  Twitter, 
  Instagram, 
  YouTube, 
  LocationOn, 
  Phone, 
  Email 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">WildCapture</h3>
            <p className="mb-4 text-green-100">
              Capturing the beauty of wildlife through professional photography.
            </p>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer hover:text-amber-300 transition-colors" />
              <Twitter className="cursor-pointer hover:text-amber-300 transition-colors" />
              <Instagram className="cursor-pointer hover:text-amber-300 transition-colors" />
              <YouTube className="cursor-pointer hover:text-amber-300 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-green-100 hover:text-amber-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-100 hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-green-100 hover:text-amber-300 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <LocationOn className="mr-2 mt-1 text-amber-300" />
                <span className="text-green-100">123 Wildlife Ave, Nature Park, NP 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-amber-300" />
                <span className="text-green-100">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Email className="mr-2 text-amber-300" />
                <span className="text-green-100">info@wildcapture.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-green-100 mb-4">
              Subscribe to get updates on new photos and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 rounded-l text-gray-800 focus:outline-none"
              />
              <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-6 text-center text-green-200">
          <p>&copy; {new Date().getFullYear()} WildCapture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
