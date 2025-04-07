import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 transform -translate-x-2 -translate-y-1/2',
    right: 'left-full top-1/2 transform translate-x-2 -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2',
    right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute ${positionClasses[position]} z-10`}
          role="tooltip"
        >
          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 max-w-xs">
            {content}
            <div
              className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${arrowClasses[position]}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip; 