import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import DateRangePicker from "../components/eod/DateRangePicker";
import ReportsTable from "../components/eod/ReportsTable";
import ReportModal from "../components/eod/ReportModal";
import { MdCalendarToday, MdFilterList, MdAssignment } from "react-icons/md";

const EODReports = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredReports, setFilteredReports] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Mock data - replace with actual API call
  const mockReports = [
    {
      id: 1,
      date: "2025-06-26",
      totalRevenue: 4875.50,
      totalTransactions: 127,
      totalItems: 342,
      vipBottles: 8,
      regularCustomers: 98,
      vipCustomers: 29,
      status: "completed"
    },
    {
      id: 2,
      date: "2025-06-25",
      totalRevenue: 5240.75,
      totalTransactions: 145,
      totalItems: 398,
      vipBottles: 12,
      regularCustomers: 115,
      vipCustomers: 30,
      status: "completed"
    },
    {
      id: 3,
      date: "2025-06-24",
      totalRevenue: 3890.25,
      totalTransactions: 98,
      totalItems: 267,
      vipBottles: 5,
      regularCustomers: 78,
      vipCustomers: 20,
      status: "completed"
    },
    {
      id: 4,
      date: "2025-06-23",
      totalRevenue: 6120.00,
      totalTransactions: 178,
      totalItems: 456,
      vipBottles: 15,
      regularCustomers: 142,
      vipCustomers: 36,
      status: "completed"
    }
  ];

  useEffect(() => {
    document.title = "POS | EOD Sales Reports";
    setFilteredReports(mockReports);
  }, []);

  const handleDateRangeFilter = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setFilteredReports(mockReports);
      return;
    }

    const filtered = mockReports.filter(report => {
      const reportDate = new Date(report.date);
      return reportDate >= startDate && reportDate <= endDate;
    });
    setFilteredReports(filtered);
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const stats = [
    {
      label: "Total Reports",
      value: filteredReports.length.toString(),
      icon: <MdAssignment />,
      color: "#025cca"
    },
    {
      label: "Average Revenue",
      value: `$${(filteredReports.reduce((sum, r) => sum + r.totalRevenue, 0) / filteredReports.length || 0).toFixed(0)}`,
      icon: <MdCalendarToday />,
      color: "#02ca3a"
    },
    {
      label: "Total Transactions",
      value: filteredReports.reduce((sum, r) => sum + r.totalTransactions, 0).toString(),
      icon: <MdFilterList />,
      color: "#be3e3f"
    }
  ];

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            EOD Sales Reports
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
      <div className="grid grid-cols-3 gap-4 px-10 mb-6">
        {stats.map((stat, index) => (
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

      {/* Reports Table */}
      <div className="px-10 h-[calc(100vh-300px)] overflow-y-scroll scrollbar-hide">
        <ReportsTable
          reports={filteredReports}
          onReportClick={handleReportClick}
        />
      </div>

      {/* Report Modal */}
      {showModal && selectedReport && (
        <ReportModal
          report={selectedReport}
          onClose={closeModal}
        />
      )}

      <BottomNav />
    </section>
  );
};

export default EODReports;