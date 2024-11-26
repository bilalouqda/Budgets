import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategoryGroupModal from '../categoryGroup/CreateCategoryGroupModal';
import CategoryGroupList from '../categoryGroup/CategoryGroupList';

const CategoryList = ({ budgetId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [budgetId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/budget/${budgetId}`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:3000/categories/${categoryId}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div>
      {categories.map(category => (
        <div key={category._id} className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setIsGroupModalOpen(true);
                }}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Add Group
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setShowEditModal(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <CategoryGroupList
            category={category}
            budgetId={budgetId}
            onUpdate={fetchCategories}
          />
        </div>
      ))}

      {selectedCategory && (
        <>
          <CreateCategoryGroupModal
            isOpen={isGroupModalOpen}
            onClose={() => {
              setIsGroupModalOpen(false);
              setSelectedCategory(null);
              fetchCategories();
            }}
            categoryId={selectedCategory._id}
            budgetId={budgetId}
          />

          {/* Add EditCategoryModal component here */}
        </>
      )}
    </div>
  );
};

export default CategoryList;
