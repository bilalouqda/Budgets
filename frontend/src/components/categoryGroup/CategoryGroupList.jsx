import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategoryGroupModal from './CreateCategoryGroupModal';
import CreateTransactionModal from '../transaction/CreateTransactionModal';

const CategoryGroupList = ({ category, budgetId, onUpdate }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, [category._id]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/category-groups/category/${category._id}`);
      console.log("response.data", response.data);

      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await axios.delete(`http://localhost:3000/category-groups/${groupId}`);
        fetchGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  const handleUpdateGroup = async (groupId, updatedData) => {
    try {
      await axios.patch(`http://localhost:3000/category-groups/${groupId}`, updatedData);
      fetchGroups();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const fetchTransactionsByCategoryGroup = async (groupId) => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions/category-group/${groupId}`);
      setTransactions(response.data);
    } catch (error) {
      setError('Error loading transactions');
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${transactionId}`);
      setTransactions(transactions.filter(t => t._id !== transactionId));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleUpdateTransaction = async (transactionId, updatedData) => {
    try {
      await axios.patch(`http://localhost:3000/transactions/${transactionId}`, updatedData);
      fetchTransactionsByCategoryGroup(selectedGroup._id);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <div className="py-4 space-y-4">
      <div className="max-h-96 overflow-y-auto">
        {groups.map(group => (
          <div
            key={group._id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-700">{group._id}</h4>
              <h4 className="font-semibold text-gray-700">{group.name}</h4>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowTransactionModal(true);
                  }}
                  className="px-2 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs transition-colors duration-200"
                  >
                  Add Transaction
                </button>
                <button
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowEditModal(true);
                  }}
                  className="px-2 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs transition-colors duration-200"
                  >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGroup(group._id)}
                  className="px-2 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs transition-colors duration-200"
                  >
                  Delete
                </button>
                <button
                  onClick={() => fetchTransactionsByCategoryGroup(group._id)}
                  className="px-2 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md text-xs transition-colors duration-200"
                >
                  Show Transactions
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="bg-white p-3 rounded-md">
                <p className="text-gray-500">Allocated</p>
                <p className="text-lg font-semibold">${group.allocated}</p>
              </div>
              <div className="bg-white p-3 rounded-md">
                <p className="text-gray-500">Spent</p>
                <p className="text-lg font-semibold">${group.spent}</p>
              </div>
            </div>

            {/* Transactions List */}
            <div className="mt-4">
              <div className="space-y-2">
                {transactions.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2 text-gray-700">Transactions</h5>
                    <table className="min-w-full bg-white rounded-md shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left">Description</th>
                          <th className="py-2 px-4 text-left">Amount</th>
                          <th className="py-2 px-4 text-left">Type</th>
                          <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(transaction => (
                          <tr key={transaction._id} className="hover:bg-gray-100 transition-colors duration-200">
                            <td className="py-2 px-4">{transaction.description}</td>
                            <td className={`py-2 px-4 ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
                              }`}>
                              ${transaction.amount}
                            </td>
                            <td className="py-2 px-4">
                              {transaction.type}
                            </td>
                            <td className="py-2 px-4 space-x-2">
                              <button
                                onClick={() => handleUpdateTransaction(transaction._id, {/* updatedData */ })}
                                className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors duration-200"
                                
                              >
                                Update
                              </button>
                              <button
                                onClick={() => handleDeleteTransaction(transaction._id)}
                                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

 
      {selectedGroup && (
        <>
          <CreateTransactionModal
            isOpen={showTransactionModal}
            onClose={(newTransaction) => {
              setShowTransactionModal(false);
              setSelectedGroup(null);
              if (newTransaction) {
                fetchGroups();
              }
            }}
            categoryGroupId={selectedGroup._id}
            budgetId={budgetId}
          />

          <CreateCategoryGroupModal
            isOpen={showEditModal}
            onClose={(updatedGroup) => {
              setShowEditModal(false);
              setSelectedGroup(null);
              if (updatedGroup) {
                fetchGroups();
              }
            }}
            categoryId={category._id}
            budgetId={budgetId}
            initialData={selectedGroup}
            isEditing={true}
          />
        </>
      )}
    </div>
  );
};

export default CategoryGroupList;
