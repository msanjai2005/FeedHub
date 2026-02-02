import React from 'react';
import { FaPlus } from 'react-icons/fa'; // or any other plus icon from react-icons

const BlueCirclePlus = ({ 
  size = 60, 
  color = '#0062ff', 
  iconColor = 'white',
  iconSize, // Optional: override icon size
  className = '',
  onClick
}) => {
  const circleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Calculate icon size if not provided
  const calculatedIconSize = iconSize || size * 0.4;

  return (
    <div 
      className={`blue-circle-plus ${className}`}
      style={circleStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <FaPlus color={iconColor} size={calculatedIconSize} />
    </div>
  );
};

export default BlueCirclePlus;