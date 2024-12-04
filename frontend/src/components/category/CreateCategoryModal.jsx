import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategoryModal = ({ isOpen, onClose, budgetId }) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    budget: budgetId,
    isHidden: false
  });

  useEffect(() => {
    setCategoryData((prevData) => ({
      ...prevData,
      budget: budgetId
    }));
  }, [budgetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/categories', categoryData);
      console.log('Response Data:', response.data);
      onClose(response.data);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Category Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={categoryData.name}
              onChange={(e) => setCategoryData({...categoryData, name: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={categoryData.isHidden}
                onChange={(e) => setCategoryData({...categoryData, isHidden: e.target.checked})}
                className="mr-2"
              />
              Hidden
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
