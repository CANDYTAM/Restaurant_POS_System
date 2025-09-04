import React from "react";
import { MdSearch, MdFilterList } from "react-icons/md";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedFulfillmentType,
  setSelectedFulfillmentType
}) => {
  const paymentMethods = [
    { value: "all", label: "All Payment Methods" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Cash", label: "Cash" },
    { value: "Digital Wallet", label: "Digital Wallet" },
    { value: "Debit Card", label: "Debit Card" }
  ];

  const fulfillmentTypes = [
    { value: "all", label: "All Types" },
    { value: "Dine In", label: "Dine In" },
    { value: "Takeaway", label: "Takeaway" },
    { value: "Delivery", label: "Delivery" }
  ];

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]" size={20} />
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-[#111827] pl-10 pr-4 py-2 rounded-lg border border-[#d1d5db] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="flex items-center gap-2">
              <MdFilterList className="text-[#6b7280]" size={20} />
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="bg-white text-[#111827] px-3 py-2 rounded-lg border border-[#d1d5db] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] min-w-[160px]"
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedFulfillmentType}
                onChange={(e) => setSelectedFulfillmentType(e.target.value)}
                className="bg-white text-[#111827] px-3 py-2 rounded-lg border border-[#d1d5db] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] min-w-[120px]"
              >
                {fulfillmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedPaymentMethod !== "all" || selectedFulfillmentType !== "all") && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#e5e7eb]">
            <span className="text-[#6b7280] text-sm">Active filters:</span>
            
            {searchTerm && (
              <span className="bg-[#3b82f6] text-white px-2 py-1 rounded text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            
            {selectedPaymentMethod !== "all" && (
              <span className="bg-[#10b981] text-white px-2 py-1 rounded text-xs">
                Payment: {selectedPaymentMethod}
              </span>
            )}
            
            {selectedFulfillmentType !== "all" && (
              <span className="bg-[#f59e0b] text-white px-2 py-1 rounded text-xs">
                Type: {selectedFulfillmentType}
              </span>
            )}
            
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedPaymentMethod("all");
                setSelectedFulfillmentType("all");
              }}
              className="bg-[#ef4444] text-white px-2 py-1 rounded text-xs hover:bg-[#dc2626] transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;