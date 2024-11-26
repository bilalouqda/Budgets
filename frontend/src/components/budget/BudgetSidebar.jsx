import React, { useState } from 'react';
import CreateCategoryModal from '../category/CreateCategoryModal';
import CategoryList from '../category/CategoryList';

const BudgetSidebar = ({ budget, onLogout }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <div className="w-64 w-full bg-blue-900 h-full p-4 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">{budget.name}</h2>
        <p className="text-sm text-white">
          Target: ${budget.targetAmount}
        </p>
      </div>
      
      {/* <button
        onClick={() => setIsCategoryModalOpen(true)}
        className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md
          hover:bg-gray-200 transform active:scale-95 transition-all duration-150"
      >
        + New Category
      </button> */}

      {/* <div className="my-4">
        <CategoryList budgetId={budget._id} />
      </div> */}

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900
            transform active:scale-95 transition-all duration-150"
        >
          Logout
        </button>
      </div>
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        budgetId={budget._id}
      />
    </div>
  );
};

export default BudgetSidebar;
