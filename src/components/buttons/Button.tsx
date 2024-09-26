
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void; // Function to handle click events
  label: string;       // Text to display on the button
  isLoading?: boolean; // Optional loading state
  disabled?: boolean;  // Optional disabled state
  className:string;
}

const Button: React.FC<SubmitButtonProps> = ({ onClick, label, isLoading = false, disabled = false,className }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={className}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
