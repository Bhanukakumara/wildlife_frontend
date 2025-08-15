import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const Title: React.FC<TitleProps> = ({
  children,
  variant = 'h1',
  className = '',
  align = 'left',
}) => {
  const baseClasses = 'font-bold text-green-800';
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const variantClasses = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    h5: 'text-lg md:text-xl',
    h6: 'text-base md:text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${alignClasses[align]} ${className}`;
  
  const renderHeading = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={classes}>{children}</h1>;
      case 'h2':
        return <h2 className={classes}>{children}</h2>;
      case 'h3':
        return <h3 className={classes}>{children}</h3>;
      case 'h4':
        return <h4 className={classes}>{children}</h4>;
      case 'h5':
        return <h5 className={classes}>{children}</h5>;
      case 'h6':
        return <h6 className={classes}>{children}</h6>;
      default:
        return <h1 className={classes}>{children}</h1>;
    }
  };
  
  return renderHeading();
};

export default Title;