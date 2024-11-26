import React, { useState, useEffect } from 'react';
import { authService } from '../../services/auth.service';
import NavigationBar from '../navBar/navbar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(true);

  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers]);

  const fetchUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data.data.users);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await authService.updateUserRole(userId, newRole);
      fetchUsers();
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await authService.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const toggleUsersList = () => {
    setShowUsers(!showUsers);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen flex flex-col max-w-7xl mx-auto">
      {/* <NavigationBar /> */}
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 bg-gray-800 text-white">
          <div className="w-full">
            <div className="p-6">
              <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>
            <nav className="mt-6">
              <button
                onClick={toggleUsersList}
                className={`w-full flex items-center px-6 py-3 bg-gray-700 mt-6 hover:bg-gray-900 ${showUsers ? 'bg-gray-700' : ''
                  }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Manage Users
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-6 py-3 mt-6 hover:bg-gray-900 bg-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
              <button
                onClick={() => navigate('/about')}
                className="w-full flex items-center px-6 py-3 mt-6 hover:bg-gray-900 bg-gray-700"
              >
                About
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="p-6">
            {error && (
              <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {showUsers && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    {/* Mobile view */}
                    <div className="block md:hidden">
                      {users.map((user) => (
                        <div key={user._id} className="p-4 border-b border-gray-200">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Username:</span>
                              <span>{user.username}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Email:</span>
                              <span>{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Created:</span>
                              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Role:</span>
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                className="ml-2 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                            <div className="mt-2">
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                              >
                                Delete User
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop view */}
                    <div className="hidden md:block">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <select
                                  value={user.role}
                                  onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Button - Fixed position */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleUsersList}
          className="p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <button
          onClick={handleLogout}
          className="p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;