import React from 'react';
import NavigationBar from '../navBar/navbar';
import { useNavigate } from 'react-router-dom';
export default function About() {
    const navigate = useNavigate();
    return (    
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <NavigationBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div style={{cursor: 'pointer'}} onClick={() => navigate(-1)} className="text-blue-500 mb-4">back</div>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        About Create Budget
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Your Personal Finance Management Solution
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create Budget is designed to help you take control of your financial life. 
                            We provide simple yet powerful tools to track expenses, set budgets, and 
                            achieve your financial goals.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Key Features
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                            <li>Easy budget creation and management</li>
                            <li>Expense tracking and categorization</li>
                            <li>Visual reports and analytics</li>
                            <li>Secure data storage</li>
                            <li>User-friendly interface</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Personal Budgeting
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create custom budgets tailored to your needs and financial goals.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Expense Tracking
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Monitor your spending patterns and identify areas for improvement.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Financial Insights
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Get detailed analytics and reports to make informed financial decisions.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Get Started Today
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Join thousands of users who are already managing their finances better with Create Budget.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/register'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                    >
                        Create Your Account
                    </button>
                </div>
            </div>
        </div>
    );
}
