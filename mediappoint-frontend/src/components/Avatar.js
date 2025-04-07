import React from 'react';

const Avatar = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded',
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div
      className={`relative inline-block ${sizes[size]} ${shapes[shape]} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} ${shapes[shape]} object-cover`}
        />
      ) : (
        <div
          className={`${sizes[size]} ${shapes[shape]} ${getBackgroundColor(
            alt
          )} flex items-center justify-center text-white font-medium`}
        >
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};

export default Avatar; 