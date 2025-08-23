import React from 'react';
import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from '../../../types/Breadcrumb';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="py-4">
      {items.map((item, index) => (
        <span key={item.path}>
          {index > 0 && ' > '}
          {index === items.length - 1 ? (
            <span className="text-primary">{item.label}</span>
          ) : (
            <Link to={item.path} className="text-decoration-none text-muted">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
