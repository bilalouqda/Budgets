import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CategoryGroupData {
  name: string;
  budget: string;  // Will be converted to ObjectId on backend
  category: string; // Will be converted to ObjectId on backend
  allocated: number;
  spent: number;
  order: number;
  isHidden: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: (data?: any) => void;
  categoryId: string;
  budgetId: string;
}

const CreateCategoryGroupModal: React.FC<Props> = ({ isOpen, onClose, categoryId, budgetId }) => {
  const [groupData, setGroupData] = useState<CategoryGroupData>({
    name: '',
    category: categoryId,
    budget: budgetId,
    allocated: 0,
    spent: 0,
    order: 0,
    isHidden: false
  });
  useEffect(() => {
    setGroupData((prevData) => ({
      ...prevData,
      category: categoryId,
      budget: budgetId
    }));
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    try {
      const response = await axios.post<CategoryGroupData>('http://localhost:3000/category-groups', groupData);
      console.log(response.data);

      onClose(response.data);
    } catch (error) {
      console.error('Error creating category group:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white p-8 rounded-lg w-96 shadow-xl transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Category Group</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={groupData.name}
              onChange={(e) => setGroupData({...groupData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allocated Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={groupData.allocated}
              onChange={(e) => setGroupData({...groupData, allocated: Number(e.target.value)})}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transform active:scale-95 transition-all duration-200"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryGroupModal;
