import React from "react";
import { MdVisibility, MdLocalBar, MdPeople, MdAttachMoney } from "react-icons/md";

const ReportsTable = ({ reports, onReportClick }) => {
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

  if (reports.length === 0) {
    return (
      <div className="bg-[#262626] rounded-lg p-8 text-center">
        <MdAttachMoney className="text-[#ababab] text-6xl mx-auto mb-4" />
        <h3 className="text-[#f5f5f5] text-lg font-semibold mb-2">No Reports Found</h3>
        <p className="text-[#ababab] text-sm">
          No sales reports found for the selected date range.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#262626] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#383838] px-6 py-4">
        <h2 className="text-[#f5f5f5] text-lg font-semibold">Sales Reports</h2>
        <p className="text-[#ababab] text-sm">Click on any report to view details</p>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-[#383838]">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => onReportClick(report)}
            className="px-6 py-4 hover:bg-[#2c2c2c] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              {/* Date and Status */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-[#f5f5f5] font-semibold">
                      {formatDate(report.date)}
                    </h3>
                  </div>
                  <span className="text-xs bg-[#02ca3a] text-white px-2 py-1 rounded-lg">
                    {report.status}
                  </span>
                </div>
                <p className="text-[#ababab] text-sm mt-1">
                  {report.totalTransactions} transactions • {report.totalItems} items sold
                </p>
              </div>

              {/* Key Metrics */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-[#025cca]">
                    <MdAttachMoney size={16} />
                    <span className="text-[#f5f5f5] font-semibold">
                      {formatCurrency(report.totalRevenue)}
                    </span>
                  </div>
                  <p className="text-[#ababab] text-xs">Revenue</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 text-[#f6b100]">
                    <MdLocalBar size={16} />
                    <span className="text-[#f5f5f5] font-semibold">
                      {report.vipBottles}
                    </span>
                  </div>
                  <p className="text-[#ababab] text-xs">VIP Bottles</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-1 text-[#be3e3f]">
                    <MdPeople size={16} />
                    <span className="text-[#f5f5f5] font-semibold">
                      {report.vipCustomers}
                    </span>
                  </div>
                  <p className="text-[#ababab] text-xs">VIP Guests</p>
                </div>

                <button className="text-[#025cca] hover:text-[#0147a3] transition-colors">
                  <MdVisibility size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTable;