import React from "react";

interface ChartIconProps {
  size?: number;
  className?: string;
}

export const ChartIcon: React.FC<ChartIconProps> = ({
  size = 24,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 3V18C3 19.1046 3.89543 20 5 20H21"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 14L11.5 9.5L15.5 13.5L21 8"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8H21V12"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
