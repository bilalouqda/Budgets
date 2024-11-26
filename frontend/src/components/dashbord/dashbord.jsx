import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, Layout, Grid,} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const progressData = [
    {
      title: "Members Progress",
      amount: "$75,6365",
      percentage: "+9.0%",
      timeframe: "Since last month",
      progressPercent: 90
    },
    {
      title: "User Engagement",
      amount: "$25,467",
      percentage: "+15.2%",
      timeframe: "Compared to last month",
      progressPercent: 60
    },
    {
      title: "Sales Overview",
      amount: "$125,879",
      percentage: "-2.5%",
      timeframe: "Compared to last month",
      progressPercent: 75
    }
  ];

  const tableData = [
    { id: 1, firstName: "John", lastName: "Doe", username: "@johndoe" },
    { id: 2, firstName: "Jane", lastName: "Smith", username: "@janesmith" },
    { id: 3, firstName: "Michael Jordan", username: "@mj23" },
    { id: 4, firstName: "Albert Einstein", username: "@einstein" },
    { id: 5, firstName: "Marie Curie", username: "@mariecurie" }
  ];

  const CircularProgress = ({ percentage }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= percentage) {
            clearInterval(timer);
            return percentage;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }, [percentage]);

    return (
      <div className="relative w-20 h-20">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#777fe2 ${progress * 3.6}deg, #ff7882 0deg)`
          }}
        >
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <span className="text-sm font-bold" style={{ color: '#777fe2' }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <NavigationBar />

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300 bg-gray-800 text-white p-4`}>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="text-white">
              <Grid size={24} />
            </button>
            {isSidebarExpanded && <span className="text-xl font-bold">Admin</span>}
          </div>
          
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded">
              {/* <User size={20} /> */}
              {isSidebarExpanded && <span>Profile</span>}
            </a>
            <a href="#" className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded">
              {/* <Agenda size={20} /> */}
              {isSidebarExpanded && <span>Task</span>}
            </a>
            <a href="#" className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded">
              {/* <Protection size={20} /> */}
              {isSidebarExpanded && <span>Auth</span>}
            </a>
            <a href="#" className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded">
              {/* <Layout size={20} /> */}
              {isSidebarExpanded && <span>Multi Level</span>}
            </a>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-4 text-white hover:bg-gray-700 p-2 rounded w-full"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              {isSidebarExpanded && <span>{isDarkMode ? 'Light' : 'Dark'}</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Navbar */}
          <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-4 pr-10 py-2 border dark:bg-gray-700 dark:border-gray-600 rounded"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-bold">SK</span>
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            </div>
          </nav>

          {/* Dashboard Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {progressData.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-xl font-bold mb-2">{item.amount}</p>
                      <div>
                        <span className="text-green-500 mr-2">{item.percentage}</span>
                        <span className="text-sm">{item.timeframe}</span>
                      </div>
                    </div>
                    <CircularProgress percentage={item.progressPercent} />
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <h2 className="text-xl font-bold mb-4">Avg. Agent Earnings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">First Name</th>
                    <th className="p-4 text-left">Last Name</th>
                    <th className="p-4 text-left">Username</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(row => (
                    <tr key={row.id} className="border-t dark:border-gray-700">
                      <td className="p-4">{row.id}</td>
                      <td className="p-4">{row.firstName}</td>
                      <td className="p-4">{row.lastName || ''}</td>
                      <td className="p-4">{row.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 p-4 mt-8">
            <div className="container mx-auto flex justify-between items-center">
              <div>
                <a href="#" className="font-bold">Admin Panel</a>
              </div>
              <div className="hidden md:flex gap-4">
                <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</a>
                <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">About Us</a>
                <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms & Conditions</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;