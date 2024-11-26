import React from 'react';

export const Progress = ({ value, className, ...props }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`} {...props}>
      <div
        className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${value}%` }}
      >
        {value.toFixed(0)}%
      </div>
    </div>
  );
};