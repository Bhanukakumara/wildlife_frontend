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
    <footer className="bg-[linear-gradient(to_right,var(--color-main),var(--color-secondary))] text-[var(--color-accent)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">WildCapture</h3>
            <p className="mb-4 text-[var(--color-main)]">
              Capturing the beauty of wildlife through professional photography.
            </p>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
              <Twitter className="cursor-pointer text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
              <Instagram className="cursor-pointer text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
              <YouTube className="cursor-pointer text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[var(--color-main)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[var(--color-main)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[var(--color-main)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--color-main)] hover:text-[var(--color-secondary)] transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-[var(--color-main)] hover:text-[var(--color-secondary)] transition-colors duration-300">
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
                <LocationOn className="mr-2 mt-1 text-[var(--color-secondary)]" />
                <span className="text-[var(--color-main)]">123 Wildlife Ave, Nature Park, NP 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-[var(--color-secondary)]" />
                <span className="text-[var(--color-main)]">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Email className="mr-2 text-[var(--color-secondary)]" />
                <span className="text-[var(--color-main)]">info@wildcapture.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-[var(--color-main)] mb-4">
              Subscribe to get updates on new photos and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 rounded-l text-[var(--color-accent)] focus:outline-none bg-[var(--color-main)]/80"
              />
              <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] px-4 py-2 rounded-r transition-colors duration-300 text-[var(--color-main)]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-secondary)]/30 mt-12 pt-6 text-center text-[var(--color-main)]">
          <p>&copy; {new Date().getFullYear()} WildCapture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;