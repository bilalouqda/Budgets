import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBudgetModal from './budget/CreateBudgetModal';
import CreateCategoryModal from './category/CreateCategoryModal';
import BudgetSidebar from './budget/BudgetSidebar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import UpdateCategoryModal from './category/UpdateCategoryModal';
import CategoryGroupList from './categoryGroup/CategoryGroupList';
import CreateCategoryGroupModal from './categoryGroup/CreateCategoryGroupModal';

const BudgetPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showCategoryGroupModal, setShowCategoryGroupModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.sub);
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      checkUserBudget();
    }
  }, [userId]);

  useEffect(() => {
    if (currentBudget) {
      fetchCategories();
      fetchTransactions();
    }
  }, [currentBudget]);

  const checkUserBudget = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/budgets/owner/${userId}`);
      if (response.data.length === 0) {
        setShowBudgetModal(true);
      } else {
        setCurrentBudget(response.data[0]);
      }
    } catch (error) {
      setError('Error loading budget data');
      console.error('Error checking user budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/budget/${currentBudget._id}`);
      setCategories(response.data);
    } catch (error) {
      setError('Error loading categories');
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/transactions/budget/${currentBudget._id}`);
      setTransactions(response.data);
    } catch (error) {
      setError('Error loading transactions');
      console.error('Error fetching transactions:', error);
    }
  };

  const handleBudgetCreate = (newBudget) => {
    setCurrentBudget(newBudget);
    setShowBudgetModal(false);
  };

  const handleCategoryCreate = async (newCategory) => {
    await fetchCategories();
    setShowCategoryModal(false);
  };

  const handleTransactionCreate = async (newTransaction) => {
    await fetchTransactions();
    setShowTransactionModal(false);
  };

  const calculateCategoryTotals = (categoryId) => {
    const categoryTransactions = transactions.filter(
      transaction => transaction.categoryGroup.category === categoryId
    );

    const totalSpent = categoryTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const categoryGroups = categories.find(cat => cat._id === categoryId)?.categoryGroups || [];
    const totalAllocated = categoryGroups.reduce(
      (sum, group) => sum + group.allocated,
      0
    );

    return { totalSpent, totalAllocated };
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${categoryId}`);
      await fetchCategories();
    } catch (error) {
      setError('Error deleting category');
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdateCategory = async (categoryId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/categories/${categoryId}`, updatedData);
      await fetchCategories();
      setShowUpdateCategoryModal(false);
      setEditingCategory(null);
    } catch (error) {
      setError('Error updating category');
      console.error('Error updating category:', error);
    }
  };

  const handleCategoryGroupCreate = async (newCategoryGroup) => {
    await fetchCategories();
    setShowCategoryGroupModal(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={checkUserBudget}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {currentBudget && (
          <BudgetSidebar
            budget={currentBudget}
            onLogout={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentBudget ? (
          <div>
            {/* Header Section */}
            <div className="bg-white shadow-sm p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentBudget.name}
                </h1>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md
                    hover:bg-gray-200 transform active:scale-95 transition-all duration-150"
                >
                  + New Category
                </button>
              </div>
              <div className="mt-2 text-gray-600">
                <p>Target Amount: ${currentBudget.targetAmount.toFixed(2)}</p>
                <p>Month: {new Date(currentBudget.month).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Categories Table */}
            <div className="p-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Allocated
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Spent
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map(category => {
                      const { totalSpent, totalAllocated } = calculateCategoryTotals(category._id);
                      return (
                        <React.Fragment key={category._id}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-gray-900">
                                  {category.name}
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setShowCategoryGroupModal(true);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                  <PlusIcon className="h-5 w-5 text-gray-500 hover:text-blue-500" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                              ${totalAllocated.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                              ${totalSpent.toFixed(2)}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${totalAllocated - totalSpent >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                              ${(totalAllocated - totalSpent).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedCategory(category);
                                    setShowTransactionModal(true);
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Add Transaction
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingCategory(category);
                                    setShowUpdateCategoryModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(category._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5" className="px-6">
                              <div className={`overflow-hidden transition-all duration-300 ${selectedCategory?._id === category._id ? 'max-h-[500px]' : 'max-h-0'
                                }`}>
                                <CategoryGroupList
                                  category={category}
                                  budgetId={currentBudget._id}
                                  onUpdate={fetchCategories}
                                />
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-xl">
              Create a budget to get started
            </p>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Budget
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateBudgetModal
        isOpen={showBudgetModal}
        onClose={handleBudgetCreate}
        userId={userId}
      />

      <CreateCategoryModal
        isOpen={showCategoryModal}
        onClose={handleCategoryCreate}
        budgetId={currentBudget?._id}
      />

      <CreateCategoryGroupModal
        isOpen={showCategoryGroupModal}
        onClose={handleCategoryGroupCreate}
        categoryId={selectedCategory?._id}
        budgetId={currentBudget?.id}
      />

      {/* <CreateTransactionModal
        isOpen={showTransactionModal}
        onClose={handleTransactionCreate}
        budgetId={currentBudget?._id}
        categoryId={selectedCategory?._id}
      /> */}

      <UpdateCategoryModal
        isOpen={showUpdateCategoryModal}
        onClose={handleUpdateCategory}
        category={editingCategory}
      />
    </div>
  );
};

export default BudgetPage;