import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import BudgetTable from './BudgetTable';
import BudgetHeader from './BudgetHeader';

const BudgetView = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [view, setView] = useState('all'); // all, underfunded, overfunded, moneyAvailable, snoozed

  return (
    <div className="h-full flex flex-col">
      <MonthSelector 
        selectedMonth={selectedMonth} 
        onMonthChange={setSelectedMonth} 
      />
      
      <BudgetHeader 
        view={view}
        onViewChange={setView}
        availableAmount={-122}
      />
      
      <BudgetTable 
        month={selectedMonth}
        view={view}
      />
    </div>
  );
};

export default BudgetView;
