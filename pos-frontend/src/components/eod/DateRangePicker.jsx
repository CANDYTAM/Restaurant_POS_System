import React, { useState } from "react";
import { MdClose, MdCalendarToday } from "react-icons/md";

const DateRangePicker = ({ onDateRangeChange, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilter = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    onDateRangeChange(start, end);
    onClose();
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    onDateRangeChange(null, null);
    onClose();
  };

  const quickDateOptions = [
    { label: "Today", days: 0 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 }
  ];

  const handleQuickDate = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    
    onDateRangeChange(start, end);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] rounded-lg p-6 w-96 max-w-[90vw]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#f5f5f5] text-lg font-semibold flex items-center gap-2">
            <MdCalendarToday />
            Filter by Date Range
          </h3>
          <button
            onClick={onClose}
            className="text-[#ababab] hover:text-[#f5f5f5] transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Quick Date Options */}
        <div className="mb-6">
          <p className="text-[#ababab] text-sm mb-3">Quick Select:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickDateOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuickDate(option.days)}
                className="bg-[#383838] text-[#f5f5f5] px-3 py-2 rounded-lg text-sm hover:bg-[#4a4a4a] transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Range */}
        <div className="mb-6">
          <p className="text-[#ababab] text-sm mb-3">Custom Range:</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#ababab] text-xs mb-1 block">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#383838] text-[#f5f5f5] px-3 py-2 rounded-lg border border-[#4a4a4a] focus:border-[#025cca] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[#ababab] text-xs mb-1 block">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#383838] text-[#f5f5f5] px-3 py-2 rounded-lg border border-[#4a4a4a] focus:border-[#025cca] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApplyFilter}
            className="flex-1 bg-[#025cca] text-white px-4 py-2 rounded-lg hover:bg-[#0147a3] transition-colors"
          >
            Apply Filter
          </button>
          <button
            onClick={handleClearFilter}
            className="flex-1 bg-[#383838] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#4a4a4a] transition-colors"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;