import React from 'react';

const Switch = ({
  label,
  name,
  checked,
  onChange,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  const switchStyles = `
    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${checked ? 'bg-blue-600' : 'bg-gray-200'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const toggleStyles = `
    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
    ${checked ? 'translate-x-5' : 'translate-x-0'}
  `;

  return (
    <div className={className}>
      <div className="flex items-center">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          name={name}
          onClick={onChange}
          disabled={disabled}
          className={switchStyles}
          {...props}
        >
          <span className="sr-only">Toggle {label}</span>
          <span className={toggleStyles} />
        </button>
        {label && (
          <label
            htmlFor={name}
            className={`ml-3 block text-sm ${
              disabled ? 'text-gray-500' : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Switch; 