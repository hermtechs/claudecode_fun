import { useState } from 'react';
import './App.css';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionFilters from './components/TransactionFilters';
import TransactionTable from './components/TransactionTable';

const CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const INITIAL_TRANSACTIONS = [
  { id: 1, description: "Salary", amount: "5000", type: "income", category: "salary", date: "2025-01-01" },
  { id: 2, description: "Rent", amount: "1200", type: "expense", category: "housing", date: "2025-01-02" },
  { id: 3, description: "Groceries", amount: "150", type: "expense", category: "food", date: "2025-01-03" },
  { id: 4, description: "Freelance Work", amount: "800", type: "expense", category: "salary", date: "2025-01-05" },
  { id: 5, description: "Electric Bill", amount: "95", type: "expense", category: "utilities", date: "2025-01-06" },
  { id: 6, description: "Dinner Out", amount: "65", type: "expense", category: "food", date: "2025-01-07" },
  { id: 7, description: "Gas", amount: "45", type: "expense", category: "transport", date: "2025-01-08" },
  { id: 8, description: "Netflix", amount: "15", type: "expense", category: "entertainment", date: "2025-01-10" },
];

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== "all" && t.type !== filterType) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    return true;
  });

  const handleAdd = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />

      <TransactionForm categories={CATEGORIES} onAdd={handleAdd} />

      <div className="transactions">
        <h2>Transactions</h2>
        <TransactionFilters
          categories={CATEGORIES}
          filterType={filterType}
          filterCategory={filterCategory}
          onFilterTypeChange={setFilterType}
          onFilterCategoryChange={setFilterCategory}
        />
        <TransactionTable transactions={filteredTransactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
