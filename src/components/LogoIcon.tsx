import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = "h-8 w-8" }) => {
  return (
    <img 
      src="/logo.webp" 
      alt="Clean Solutions Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default LogoIcon;