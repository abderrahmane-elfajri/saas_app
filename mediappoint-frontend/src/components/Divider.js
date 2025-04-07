import React from 'react';

const Divider = ({
  orientation = 'horizontal',
  color = 'gray',
  thickness = '1',
  className = '',
  ...props
}) => {
  const colors = {
    gray: 'bg-gray-200',
    blue: 'bg-blue-200',
    red: 'bg-red-200',
    green: 'bg-green-200',
    yellow: 'bg-yellow-200',
  };

  const thicknesses = {
    '1': 'border-t',
    '2': 'border-t-2',
    '4': 'border-t-4',
  };

  const orientationClasses = {
    horizontal: `${thicknesses[thickness]} ${colors[color]}`,
    vertical: `h-full w-${thickness} ${colors[color]}`,
  };

  return (
    <div
      className={`${orientationClasses[orientation]} ${className}`}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
};

export default Divider; 