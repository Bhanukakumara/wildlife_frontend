import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="checkbox"
          className={classes}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label className="font-medium text-gray-700">
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
});

export default Checkbox;