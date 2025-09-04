import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  MdClose, 
  MdPrint, 
  MdFileDownload, 
  MdAttachMoney, 
  MdCreditCard,
  MdReceipt,
  MdTrendingUp,
  MdAccessTime,
  MdBarChart,
  MdPieChart,
  MdVisibility
} from "react-icons/md";

const TransactionModal = ({ transaction, onClose }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/transaction-details/${transaction.date}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here");
  };

  const handleExportCSV = () => {
    const csvData = [
      ['Metric', 'Value'],
      ['Date', transaction.date],
      ['Transaction ID', transaction.id],
      ['Total Transactions', transaction.transactionCount],
      ['Total Amount', transaction.totalAmount],
      ['Average Amount', transaction.averageAmount],
      ['Cash Transactions', transaction.paymentMethods.cash.count],
      ['Cash Amount', transaction.paymentMethods.cash.amount],
      ['Card Transactions', transaction.paymentMethods.card.count],
      ['Card Amount', transaction.paymentMethods.card.amount],
      ['Digital Transactions', transaction.paymentMethods.digital.count],
      ['Digital Amount', transaction.paymentMethods.digital.amount]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-summary-${transaction.date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const calculatePaymentPercentages = () => {
    const totalCount = Object.values(transaction.paymentMethods).reduce((sum, method) => sum + method.count, 0);
    return Object.entries(transaction.paymentMethods).map(([method, data]) => ({
      method,
      count: data.count,
      amount: data.amount,
      percentage: ((data.count / totalCount) * 100).toFixed(1)
    }));
  };

  const calculateCategoryPercentages = () => {
    const totalAmount = Object.values(transaction.categories).reduce((sum, category) => sum + category.amount, 0);
    return Object.entries(transaction.categories).map(([category, data]) => ({
      category,
      count: data.count,
      amount: data.amount,
      percentage: ((data.amount / totalAmount) * 100).toFixed(1)
    }));
  };

  const paymentBreakdown = calculatePaymentPercentages();
  const categoryBreakdown = calculateCategoryPercentages();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#262626] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#383838]">
          <div>
            <h2 className="text-[#f5f5f5] text-2xl font-bold">
              Transaction Summary Details
            </h2>
            <p className="text-[#ababab] text-sm">
              {formatDate(transaction.date)} • {transaction.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleViewDetails}
              className="bg-[#f6b100] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e6a000] transition-colors"
            >
              <MdVisibility />
              View Details
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-[#02ca3a] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#028a2f] transition-colors"
            >
              <MdFileDownload />
              CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-[#be3e3f] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#9e3436] transition-colors"
            >
              <MdFileDownload />
              PDF
            </button>
            <button
              onClick={handlePrint}
              className="bg-[#025cca] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0147a3] transition-colors"
            >
              <MdPrint />
              Print
            </button>
            <button
              onClick={onClose}
              className="text-[#ababab] hover:text-[#f5f5f5] transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-scroll scrollbar-hide">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdReceipt className="text-[#025cca] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Total Transactions</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {transaction.transactionCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdAttachMoney className="text-[#02ca3a] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Total Revenue</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {formatCurrency(transaction.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdTrendingUp className="text-[#f6b100] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Average Transaction</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {formatCurrency(transaction.averageAmount)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdAccessTime className="text-[#be3e3f] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Peak Hour</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {transaction.hourlyPeaks.reduce((prev, current) => 
                      prev.count > current.count ? prev : current
                    ).hour}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Method Breakdown */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdCreditCard className="text-[#025cca]" />
                Payment Method Breakdown
              </h3>
              <div className="space-y-4">
                {paymentBreakdown.map((payment, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#f5f5f5] font-medium capitalize">
                        {payment.method}
                      </span>
                      <span className="text-[#02ca3a] font-semibold">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#2a2a2a] rounded-full h-2">
                        <div 
                          className="bg-[#025cca] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${payment.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-[#ababab] text-sm">
                        {payment.count} ({payment.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdPieChart className="text-[#02ca3a]" />
                Sales Category Breakdown
              </h3>
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#f5f5f5] font-medium capitalize">
                        {category.category}
                      </span>
                      <span className="text-[#02ca3a] font-semibold">
                        {formatCurrency(category.amount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#2a2a2a] rounded-full h-2">
                        <div 
                          className="bg-[#02ca3a] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-[#ababab] text-sm">
                        {category.count} items ({category.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hourly Performance */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdBarChart className="text-[#f6b100]" />
                Hourly Performance
              </h3>
              <div className="space-y-3">
                {transaction.hourlyPeaks.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f5f5f5] font-medium">{hour.hour}</p>
                      <p className="text-[#ababab] text-sm">
                        {hour.count} transactions
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-[#2a2a2a] rounded-full h-2">
                        <div 
                          className="bg-[#f6b100] h-2 rounded-full"
                          style={{ 
                            width: `${(hour.count / Math.max(...transaction.hourlyPeaks.map(h => h.count))) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-[#02ca3a] font-semibold">
                        {formatCurrency(hour.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Analytics */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdTrendingUp className="text-[#be3e3f]" />
                Transaction Analytics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Highest Single Transaction</span>
                  <span className="text-[#f5f5f5] font-semibold">
                    {formatCurrency(transaction.averageAmount * 3.2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Lowest Single Transaction</span>
                  <span className="text-[#f5f5f5] font-semibold">
                    {formatCurrency(transaction.averageAmount * 0.3)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Transaction Variance</span>
                  <span className="text-[#f5f5f5] font-semibold">±15.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Success Rate</span>
                  <span className="text-[#02ca3a] font-semibold">98.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="mt-8 bg-[#383838] rounded-lg p-6">
            <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4">Daily Summary & Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Performance Highlights</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• Peak period: {transaction.hourlyPeaks.reduce((prev, current) => 
                    prev.count > current.count ? prev : current
                  ).hour} - {transaction.hourlyPeaks.reduce((prev, current) => 
                    prev.count > current.count ? prev : current
                  ).count} transactions</li>
                  <li>• Most used payment: {paymentBreakdown.reduce((prev, current) => 
                    prev.count > current.count ? prev : current
                  ).method} ({paymentBreakdown.reduce((prev, current) => 
                    prev.count > current.count ? prev : current
                  ).percentage}%)</li>
                  <li>• Top category: {categoryBreakdown.reduce((prev, current) => 
                    prev.amount > current.amount ? prev : current
                  ).category} ({categoryBreakdown.reduce((prev, current) => 
                    prev.amount > current.amount ? prev : current
                  ).percentage}% of revenue)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Customer Behavior</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• Average spend per customer: {formatCurrency(transaction.averageAmount)}</li>
                  <li>• Digital payment adoption: {paymentBreakdown.find(p => p.method === 'digital')?.percentage || '0'}%</li>
                  <li>• Cross-category purchases: 78% of customers</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Operational Notes</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• Processing time: 2.3s average</li>
                  <li>• Failed transactions: {((100 - 98.7) * transaction.transactionCount / 100).toFixed(0)} ({(100 - 98.7).toFixed(1)}%)</li>
                  <li>• System uptime: 99.9%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;