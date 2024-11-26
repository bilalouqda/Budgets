import React from 'react';

const BudgetTable = () => {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">CATEGORY</th>
            <th className="text-right p-4">ASSIGNED</th>
            <th className="text-right p-4">ACTIVITY</th>
            <th className="text-right p-4">AVAILABLE</th>
          </tr>
        </thead>
        <tbody>
          {/* Category groups and their categories */}
          <tr className="border-t">
            <td colSpan="4" className="p-2 bg-gray-50">
              <button className="flex items-center space-x-2">
                <span>▼</span>
                <span className="font-medium">Bills</span>
              </button>
            </td>
          </tr>
          {/* Add category rows */}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
