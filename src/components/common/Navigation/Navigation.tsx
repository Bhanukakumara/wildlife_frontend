import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

interface NavigationProps {
  items: NavItem[];
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ items, className = '' }) => {
  return (
    <nav className={className}>
      <ul className="flex space-x-8">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="text-green-100 hover:text-amber-300 transition-colors font-medium"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
