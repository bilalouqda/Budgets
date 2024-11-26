import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const handlePrevMonth = () => {
    onMonthChange(subMonths(selectedMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(selectedMonth, 1));
  };

  const handleNoteClick = () => {
    // Add note functionality here
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">
            {format(selectedMonth, 'MMM yyyy')}
          </span>
          <button 
            onClick={handleNoteClick}
            className="text-gray-500 hover:text-gray-700"
          >
            Enter a note...
          </button>
        </div>
        
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex space-x-2">
        <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          All
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          Underfunded
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          Overfunded
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          Money Available
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          Snoozed
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
