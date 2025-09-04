import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import DateRangePicker from "../components/eod/DateRangePicker";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionModal from "../components/transactions/TransactionModal";
import { MdCalendarToday, MdReceipt, MdTrendingUp, MdAttachMoney } from "react-icons/md";

const TransactionSummaries = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Mock data - replace with actual API call
  const mockTransactions = [
    {
      id: "TXN-001",
      date: "2025-06-26",
      transactionCount: 127,
      totalAmount: 4875.50,
      averageAmount: 38.39,
      paymentMethods: {
        cash: { count: 45, amount: 1125.75 },
        card: { count: 67, amount: 2987.25 },
        digital: { count: 15, amount: 762.50 }
      },
      categories: {
        food: { count: 78, amount: 2340.00 },
        beverages: { count: 89, amount: 1867.50 },
        vipServices: { count: 23, amount: 668.00 }
      },
      hourlyPeaks: [
        { hour: "19:00", count: 18, amount: 720.50 },
        { hour: "20:00", count: 25, amount: 1125.75 },
        { hour: "21:00", count: 32, amount: 1580.25 }
      ]
    },
    {
      id: "TXN-002",
      date: "2025-06-25",
      transactionCount: 145,
      totalAmount: 5240.75,
      averageAmount: 36.14,
      paymentMethods: {
        cash: { count: 52, amount: 1310.19 },
        card: { count: 78, amount: 3147.45 },
        digital: { count: 15, amount: 783.11 }
      },
      categories: {
        food: { count: 89, amount: 2673.95 },
        beverages: { count: 97, amount: 1982.30 },
        vipServices: { count: 28, amount: 584.50 }
      },
      hourlyPeaks: [
        { hour: "19:00", count: 22, amount: 864.75 },
        { hour: "20:00", count: 28, amount: 1285.50 },
        { hour: "21:00", count: 35, amount: 1647.25 }
      ]
    },
    {
      id: "TXN-003",
      date: "2025-06-24",
      transactionCount: 98,
      totalAmount: 3890.25,
      averageAmount: 39.70,
      paymentMethods: {
        cash: { count: 34, amount: 856.15 },
        card: { count: 51, amount: 2334.75 },
        digital: { count: 13, amount: 699.35 }
      },
      categories: {
        food: { count: 62, amount: 1867.15 },
        beverages: { count: 68, amount: 1556.10 },
        vipServices: { count: 18, amount: 467.00 }
      },
      hourlyPeaks: [
        { hour: "19:00", count: 15, amount: 597.75 },
        { hour: "20:00", count: 19, amount: 756.50 },
        { hour: "21:00", count: 24, amount: 958.00 }
      ]
    },
    {
      id: "TXN-004",
      date: "2025-06-23",
      transactionCount: 178,
      totalAmount: 6120.00,
      averageAmount: 34.38,
      paymentMethods: {
        cash: { count: 63, amount: 1530.00 },
        card: { count: 89, amount: 3672.00 },
        digital: { count: 26, amount: 918.00 }
      },
      categories: {
        food: { count: 105, amount: 3060.00 },
        beverages: { count: 118, amount: 2448.00 },
        vipServices: { count: 34, amount: 612.00 }
      },
      hourlyPeaks: [
        { hour: "19:00", count: 28, amount: 1020.00 },
        { hour: "20:00", count: 35, amount: 1530.00 },
        { hour: "21:00", count: 42, amount: 2040.00 }
      ]
    }
  ];

  useEffect(() => {
    document.title = "POS | Transaction Summaries";
    setFilteredTransactions(mockTransactions);
  }, []);

  const handleDateRangeFilter = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setFilteredTransactions(mockTransactions);
      return;
    }

    const filtered = mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const calculateStats = () => {
    const totalTransactions = filteredTransactions.reduce((sum, t) => sum + t.transactionCount, 0);
    const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const averageTransaction = totalRevenue / totalTransactions || 0;

    return {
      totalTransactions,
      totalRevenue,
      averageTransaction,
      totalDays: filteredTransactions.length
    };
  };

  const stats = calculateStats();

  const statsCards = [
    {
      label: "Total Transactions",
      value: stats.totalTransactions.toString(),
      icon: <MdReceipt />,
      color: "#025cca"
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <MdAttachMoney />,
      color: "#02ca3a"
    },
    {
      label: "Average Transaction",
      value: `$${stats.averageTransaction.toFixed(2)}`,
      icon: <MdTrendingUp />,
      color: "#be3e3f"
    },
    {
      label: "Days Covered",
      value: stats.totalDays.toString(),
      icon: <MdCalendarToday />,
      color: "#f6b100"
    }
  ];

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Transaction Summaries
          </h1>
        </div>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="bg-[#025cca] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0147a3] transition-colors"
        >
          <MdCalendarToday />
          Filter by Date
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 px-10 mb-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-[#262626] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg text-white text-xl"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-[#ababab] text-sm">{stat.label}</p>
                <p className="text-[#f5f5f5] text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range Picker */}
      {showDatePicker && (
        <DateRangePicker
          onDateRangeChange={handleDateRangeFilter}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Transaction Table */}
      <div className="px-10 h-[calc(100vh-300px)] overflow-y-scroll scrollbar-hide">
        <TransactionTable
          transactions={filteredTransactions}
          onTransactionClick={handleTransactionClick}
        />
      </div>

      {/* Transaction Modal */}
      {showModal && selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}

      <BottomNav />
    </section>
  );
};

export default TransactionSummaries;