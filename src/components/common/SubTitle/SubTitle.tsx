import React from 'react';

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SubTitle: React.FC<SubTitleProps> = ({
  children,
  className = '',
  align = 'left',
}) => {
  const baseClasses = 'text-gray-600';
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const classes = `${baseClasses} ${alignClasses[align]} ${className}`;
  
  return (
    <p className={classes}>
      {children}
    </p>
  );
};

export default SubTitle;