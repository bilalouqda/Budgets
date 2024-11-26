import React, { useState } from 'react';
import axios from 'axios';

const CreateTransactionModal = ({ isOpen, onClose, categoryGroupId, budgetId }) => {
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    isReconciled: false,
    categoryGroup: categoryGroupId,
    budget: budgetId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/transactions', transactionData);
      onClose(response.data);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={transactionData.amount}
              onChange={(e) => setTransactionData({...transactionData, amount: Number(e.target.value)})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={transactionData.description}
              onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={transactionData.date}
              onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <select
              className="w-full p-2 border rounded"
              value={transactionData.type}
              onChange={(e) => setTransactionData({...transactionData, type: e.target.value})}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={transactionData.isReconciled}
                onChange={(e) => setTransactionData({...transactionData, isReconciled: e.target.checked})}
                className="mr-2"
              />
              Reconciled
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
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransactionModal;
