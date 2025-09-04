import React from "react";
import { 
  MdClose, 
  MdPrint, 
  MdFileDownload, 
  MdAttachMoney, 
  MdLocalBar,
  MdPeople,
  MdShoppingCart,
  MdTrendingUp,
  MdAccessTime,
  MdStar
} from "react-icons/md";

const ReportModal = ({ report, onClose }) => {
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
    // PDF export functionality
    alert("PDF export functionality would be implemented here");
  };

  const handleExportCSV = () => {
    // CSV export functionality
    const csvData = [
      ['Metric', 'Value'],
      ['Date', report.date],
      ['Total Revenue', report.totalRevenue],
      ['Total Transactions', report.totalTransactions],
      ['Total Items Sold', report.totalItems],
      ['VIP Bottles Sold', report.vipBottles],
      ['Regular Customers', report.regularCustomers],
      ['VIP Customers', report.vipCustomers]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eod-report-${report.date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Mock detailed data for nightlife business
  const topSellingItems = [
    { name: "Dom Pérignon Vintage", quantity: 8, revenue: 2400.00, category: "VIP Bottles" },
    { name: "Premium Vodka Bottle", quantity: 12, revenue: 1800.00, category: "VIP Bottles" },
    { name: "Craft Cocktail", quantity: 45, revenue: 675.00, category: "Beverages" },
    { name: "VIP Table Service", quantity: 15, revenue: 1200.00, category: "Services" },
    { name: "Appetizer Platter", quantity: 28, revenue: 420.00, category: "Food" }
  ];

  const hourlyBreakdown = [
    { hour: "6:00 PM", transactions: 8, revenue: 240.00 },
    { hour: "7:00 PM", transactions: 12, revenue: 365.00 },
    { hour: "8:00 PM", transactions: 18, revenue: 720.00 },
    { hour: "9:00 PM", transactions: 25, revenue: 1125.00 },
    { hour: "10:00 PM", transactions: 32, revenue: 1580.00 },
    { hour: "11:00 PM", transactions: 22, revenue: 985.50 },
    { hour: "12:00 AM", transactions: 10, revenue: 459.00 }
  ];

  const paymentMethods = [
    { method: "Credit Card", count: 78, percentage: 61.4, amount: 2993.25 },
    { method: "Cash", count: 32, percentage: 25.2, amount: 1228.50 },
    { method: "VIP Account", count: 17, percentage: 13.4, amount: 653.75 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#262626] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#383838]">
          <div>
            <h2 className="text-[#f5f5f5] text-2xl font-bold">
              EOD Sales Report
            </h2>
            <p className="text-[#ababab] text-sm">
              {formatDate(report.date)}
            </p>
          </div>
          <div className="flex items-center gap-3">
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
                <MdAttachMoney className="text-[#025cca] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Total Revenue</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {formatCurrency(report.totalRevenue)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdShoppingCart className="text-[#02ca3a] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">Transactions</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {report.totalTransactions}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdLocalBar className="text-[#f6b100] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">VIP Bottles</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {report.vipBottles}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#383838] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MdPeople className="text-[#be3e3f] text-2xl" />
                <div>
                  <p className="text-[#ababab] text-sm">VIP Guests</p>
                  <p className="text-[#f5f5f5] text-xl font-bold">
                    {report.vipCustomers}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Selling Items */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdStar className="text-[#f6b100]" />
                Top Selling Items
              </h3>
              <div className="space-y-3">
                {topSellingItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f5f5f5] font-medium">{item.name}</p>
                      <p className="text-[#ababab] text-sm">
                        {item.category} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[#02ca3a] font-semibold">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hourly Breakdown */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdAccessTime className="text-[#025cca]" />
                Hourly Breakdown
              </h3>
              <div className="space-y-3">
                {hourlyBreakdown.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f5f5f5] font-medium">{hour.hour}</p>
                      <p className="text-[#ababab] text-sm">
                        {hour.transactions} transactions
                      </p>
                    </div>
                    <p className="text-[#02ca3a] font-semibold">
                      {formatCurrency(hour.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdAttachMoney className="text-[#be3e3f]" />
                Payment Methods
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-[#f5f5f5] font-medium">{payment.method}</p>
                      <p className="text-[#ababab] text-sm">
                        {payment.count} transactions ({payment.percentage}%)
                      </p>
                    </div>
                    <p className="text-[#02ca3a] font-semibold">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Analytics */}
            <div className="bg-[#383838] rounded-lg p-6">
              <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4 flex items-center gap-2">
                <MdTrendingUp className="text-[#f6b100]" />
                Customer Analytics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Regular Customers</span>
                  <span className="text-[#f5f5f5] font-semibold">{report.regularCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">VIP Customers</span>
                  <span className="text-[#f5f5f5] font-semibold">{report.vipCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">Average Transaction</span>
                  <span className="text-[#f5f5f5] font-semibold">
                    {formatCurrency(report.totalRevenue / report.totalTransactions)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#ababab]">VIP Conversion Rate</span>
                  <span className="text-[#f5f5f5] font-semibold">
                    {((report.vipCustomers / (report.regularCustomers + report.vipCustomers)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-8 bg-[#383838] rounded-lg p-6">
            <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4">Report Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Sales Performance</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• Peak hour: 10:00 PM - 11:00 PM</li>
                  <li>• Best performing category: VIP Bottles</li>
                  <li>• Average items per transaction: {(report.totalItems / report.totalTransactions).toFixed(1)}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Customer Insights</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• VIP customer ratio: {((report.vipCustomers / (report.regularCustomers + report.vipCustomers)) * 100).toFixed(1)}%</li>
                  <li>• Repeat customer rate: 34%</li>
                  <li>• Average spend per VIP: {formatCurrency((report.totalRevenue * 0.6) / report.vipCustomers)}</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#f5f5f5] font-medium mb-2">Operational Notes</h4>
                <ul className="text-[#ababab] text-sm space-y-1">
                  <li>• Staff on duty: 8 members</li>
                  <li>• System uptime: 99.8%</li>
                  <li>• No major incidents reported</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;