import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'option';
  theme?: 'teacher' | 'student';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  theme = 'teacher',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  let baseStyles = "font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  let themeStyles = "";

  if (variant === 'primary') {
    baseStyles += " py-3 px-6 rounded-xl shadow-md active:scale-95 active:shadow-none";
    if (theme === 'teacher') {
      themeStyles = "bg-[#003366] text-white hover:bg-[#002244]";
    } else {
      themeStyles = "bg-[#FF9800] text-white border-b-4 border-[#E65100] hover:bg-[#F57C00] active:translate-y-1 active:border-b-0";
    }
  } else if (variant === 'secondary') {
    baseStyles += " py-2 px-4 rounded-lg";
    themeStyles = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  } else if (variant === 'option') {
    baseStyles += " p-4 rounded-xl border-2 text-left bg-white hover:bg-gray-50 mb-2";
    themeStyles = "border-gray-200 text-gray-700";
  }

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${themeStyles} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};