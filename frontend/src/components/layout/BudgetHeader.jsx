// import React from 'react';

// const BudgetHeader = ({ view, onViewChange, availableAmount }) => {
//   return (
//     <div className="bg-white border-b">
//       <div className="flex items-center p-4">
//         <div className="flex space-x-2">
//           <button
//             className={`px-3 py-1 rounded ${view === 'all' ? 'bg-blue-100 text-blue-800' : ''}`}
//             onClick={() => onViewChange('all')}
//           >
//             All
//           </button>
//           <button
//             className={`px-3 py-1 rounded ${view === 'underfunded' ? 'bg-blue-100 text-blue-800' : ''}`}
//             onClick={() => onViewChange('underfunded')}
//           >
//             Underfunded
//           </button>
//           {/* Add other view buttons */}
//         </div>

//         {availableAmount < 0 && (
//           <div className="ml-auto bg-red-100 text-red-800 px-4 py-2 rounded-lg">
//             {availableAmount}$ You assigned more than you have
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BudgetHeader;
