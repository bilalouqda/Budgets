import React, { useState } from 'react';
import axios from 'axios';

const CreateBudgetModal = ({ isOpen, onClose, userId }) => {
  const [budgetData, setBudgetData] = useState({
    name: '',
    month: '',
    targetAmount: 0,
    owner: userId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...budgetData,
        owner: userId
      };
      
      console.log('Sending budget data:', dataToSend);
      
      const response = await axios.post('http://localhost:3000/budgets', dataToSend);
      onClose(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create New Budget</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Budget Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={budgetData.name}
              onChange={(e) => setBudgetData({...budgetData, name: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Month</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={budgetData.month}
              onChange={(e) => setBudgetData({...budgetData, month: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Target Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={budgetData.targetAmount}
              onChange={(e) => setBudgetData({...budgetData, targetAmount: Number(e.target.value)})}
              required
            />
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
              Create Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBudgetModal;
