import React from 'react';

const Radio = ({
  label,
  name,
  value,
  checked,
  onChange,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}) => {
  const radioStyles = `
    h-4 w-4
    ${error
      ? 'border-red-300 text-red-600 focus:ring-red-500'
      : 'border-gray-300 text-blue-600 focus:ring-blue-500'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
  `;

  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          type="radio"
          name={name}
          id={`${name}-${value}`}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={radioStyles}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-description` : undefined}
          {...props}
        />
        {label && (
          <label
            htmlFor={`${name}-${value}`}
            className={`ml-2 block text-sm ${
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

export default Radio; 