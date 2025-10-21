import React from "react";

interface DashboardIconProps {
  size?: number;
  className?: string;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({
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
        d="M4 6C4 4.89543 4.89543 4 6 4H10C11.1046 4 12 4.89543 12 6V10C12 11.1046 11.1046 12 10 12H6C4.89543 12 4 11.1046 4 10V6Z"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14C12 12.8954 12.8954 12 14 12H18C19.1046 12 20 12.8954 20 14V18C20 19.1046 19.1046 20 18 20H14C12.8954 20 12 19.1046 12 18V14Z"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14C4 12.8954 4.89543 12 6 12H10C11.1046 12 12 12.8954 12 14V18C12 19.1046 11.1046 20 10 20H6C4.89543 20 4 19.1046 4 18V14Z"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12 4.89543 12.8954 4 14 4H18C19.1046 4 20 4.89543 20 6V10C20 11.1046 19.1046 12 18 12H14C12.8954 12 12 11.1046 12 10V6Z"
        stroke="#474A51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
