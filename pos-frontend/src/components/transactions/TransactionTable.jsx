import React from "react";
import { MdVisibility, MdReceipt, MdTrendingUp, MdAttachMoney, MdCreditCard } from "react-icons/md";

const TransactionTable = ({ transactions, onTransactionClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getMostUsedPaymentMethod = (paymentMethods) => {
    const methods = Object.entries(paymentMethods);
    const mostUsed = methods.reduce((prev, current) => 
      prev[1].count > current[1].count ? prev : current
    );
    return {
      method: mostUsed[0],
      count: mostUsed[1].count,
      percentage: ((mostUsed[1].count / methods.reduce((sum, [, data]) => sum + data.count, 0)) * 100).toFixed(1)
    };
  };

  const getTopCategory = (categories) => {
    const cats = Object.entries(categories);
    const topCategory = cats.reduce((prev, current) => 
      prev[1].amount > current[1].amount ? prev : current
    );
    return {
      category: topCategory[0],
      amount: topCategory[1].amount,
      percentage: ((topCategory[1].amount / cats.reduce((sum, [, data]) => sum + data.amount, 0)) * 100).toFixed(1)
    };
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-[#262626] rounded-lg p-8 text-center">
        <MdReceipt className="text-[#ababab] text-6xl mx-auto mb-4" />
        <h3 className="text-[#f5f5f5] text-lg font-semibold mb-2">No Transaction Data Found</h3>
        <p className="text-[#ababab] text-sm">
          No transaction summaries found for the selected date range.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#262626] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#383838] px-6 py-4">
        <h2 className="text-[#f5f5f5] text-lg font-semibold">Daily Transaction Summaries</h2>
        <p className="text-[#ababab] text-sm">Click on any summary to view detailed breakdown</p>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-[#383838]">
        {transactions.map((transaction) => {
          const topPaymentMethod = getMostUsedPaymentMethod(transaction.paymentMethods);
          const topCategory = getTopCategory(transaction.categories);
          
          return (
            <div
              key={transaction.id}
              onClick={() => onTransactionClick(transaction)}
              className="px-6 py-4 hover:bg-[#2c2c2c] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Date and Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h3 className="text-[#f5f5f5] font-semibold">
                        {formatDate(transaction.date)}
                      </h3>
                    </div>
                    <span className="text-xs bg-[#025cca] text-white px-2 py-1 rounded-lg">
                      {transaction.id}
                    </span>
                  </div>
                  <p className="text-[#ababab] text-sm mt-1">
                    {transaction.transactionCount} transactions • Avg: {formatCurrency(transaction.averageAmount)}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-[#02ca3a]">
                      <MdAttachMoney size={16} />
                      <span className="text-[#f5f5f5] font-semibold">
                        {formatCurrency(transaction.totalAmount)}
                      </span>
                    </div>
                    <p className="text-[#ababab] text-xs">Total Revenue</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-1 text-[#f6b100]">
                      <MdCreditCard size={16} />
                      <span className="text-[#f5f5f5] font-semibold">
                        {topPaymentMethod.method} ({topPaymentMethod.percentage}%)
                      </span>
                    </div>
                    <p className="text-[#ababab] text-xs">Top Payment</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-1 text-[#be3e3f]">
                      <MdTrendingUp size={16} />
                      <span className="text-[#f5f5f5] font-semibold">
                        {topCategory.category} ({topCategory.percentage}%)
                      </span>
                    </div>
                    <p className="text-[#ababab] text-xs">Top Category</p>
                  </div>

                  <button className="text-[#025cca] hover:text-[#0147a3] transition-colors">
                    <MdVisibility size={20} />
                  </button>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="mt-3 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#025cca] rounded-full"></div>
                  <span className="text-[#ababab] text-xs">
                    Cash: {transaction.paymentMethods.cash.count} ({formatCurrency(transaction.paymentMethods.cash.amount)})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#02ca3a] rounded-full"></div>
                  <span className="text-[#ababab] text-xs">
                    Card: {transaction.paymentMethods.card.count} ({formatCurrency(transaction.paymentMethods.card.amount)})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#f6b100] rounded-full"></div>
                  <span className="text-[#ababab] text-xs">
                    Digital: {transaction.paymentMethods.digital.count} ({formatCurrency(transaction.paymentMethods.digital.amount)})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionTable;