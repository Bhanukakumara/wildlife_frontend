import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${errorClasses} ${widthClasses} ${className}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
});

export default TextArea;