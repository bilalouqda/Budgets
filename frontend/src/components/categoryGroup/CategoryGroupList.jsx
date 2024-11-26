import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategoryGroupModal from './CreateCategoryGroupModal';
import CreateTransactionModal from '../transaction/CreateTransactionModal';

const CategoryGroupList = ({ category, budgetId, onUpdate }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  return (
    <div className="py-4 space-y-4">
      {/* Category Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Total Allocated</p>
            <p className="text-lg font-semibold text-blue-600">
              ${category.allocated || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-lg font-semibold text-red-600">
              ${category.spent || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-lg font-semibold text-green-600">
              ${category.remaining || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Category Groups */}
      {groups.map(group => (
        <div 
          key={group._id} 
          className="bg-gray-50 p-4 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-700">{group.name}</h4>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setSelectedGroup(group);
                  setShowTransactionModal(true);
                }}
                className="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors duration-200"
              >
                Add Transaction
              </button>
              <button
                onClick={() => {
                  setSelectedGroup(group);
                  setShowEditModal(true);
                }}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteGroup(group._id)}
                className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
              >
                Delete
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
            <h5 className="font-medium mb-2 text-gray-700">Transactions</h5>
            <div className="space-y-2">
              {group.transactions?.map(transaction => (
                <div 
                  key={transaction._id} 
                  className="flex justify-between items-center text-sm bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-gray-700">{transaction.description}</span>
                  <span className={`font-medium ${
                    transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    ${transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Modals */}
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
