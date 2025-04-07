import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
  items,
  separator = '/',
  className = '',
  ...props
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-500">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className="text-blue-600 hover:text-blue-800"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 