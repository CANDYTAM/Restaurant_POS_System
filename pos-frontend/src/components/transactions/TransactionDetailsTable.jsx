import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdSort } from "react-icons/md";

const TransactionDetailsTable = ({ transactions, sortConfig, onSort }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }),
      timezone: 'GMT+8'
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <MdSort className="text-[#ababab]" size={14} />;
    }
    return sortConfig.direction === 'desc' 
      ? <MdKeyboardArrowDown className="text-[#025cca]" size={14} />
      : <MdKeyboardArrowUp className="text-[#025cca]" size={14} />;
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-[#262626] rounded-lg p-8 text-center">
        <h3 className="text-[#f5f5f5] text-lg font-semibold mb-2">No Transactions Found</h3>
        <p className="text-[#ababab] text-sm">
          No transactions match your current search and filter criteria.
        </p>
      </div>
    );
  }

  const columns = [
    { key: 'dateTime', label: 'Transaction date', sortable: true, width: 'w-48' },
    { key: 'orderId', label: 'Order id', sortable: true, width: 'w-24' },
    { key: 'location', label: 'Location', sortable: true, width: 'w-64' },
    { key: 'paymentMethod', label: 'Payment method', sortable: true, width: 'w-32' },
    { key: 'fulfillmentType', label: 'Fulfillment type', sortable: true, width: 'w-32' },
    { key: 'orderTotal', label: 'Order total', sortable: true, width: 'w-24' }
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#e5e7eb]">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${column.width} px-4 py-3 text-left text-[#374151] text-sm font-medium ${
                    column.sortable ? 'cursor-pointer hover:bg-[#f3f4f6]' : ''
                  }`}
                  onClick={() => column.sortable && onSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb] bg-white">
            {transactions.map((transaction, index) => {
              const dateTime = formatDateTime(transaction.dateTime);
              return (
                <tr
                  key={transaction.id}
                  className={`hover:bg-[#f9fafb] transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <div className="text-[#111827] font-medium">
                        {dateTime.date}, {dateTime.time}
                      </div>
                      <div className="text-[#6b7280] text-xs">
                        {dateTime.timezone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#111827] font-medium">
                      {transaction.orderId}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#111827]">
                      {transaction.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#111827]">
                      {transaction.paymentMethod}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#111827]">
                      {transaction.fulfillmentType}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-[#111827] font-medium">
                      {formatCurrency(transaction.orderTotal)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden divide-y divide-[#e5e7eb] bg-white">
        {transactions.map((transaction, index) => {
          const dateTime = formatDateTime(transaction.dateTime);
          return (
            <div key={transaction.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[#111827] font-semibold text-sm">#{transaction.orderId}</p>
                  <p className="text-[#6b7280] text-sm">{transaction.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#111827] font-semibold text-sm">
                    {formatCurrency(transaction.orderTotal)}
                  </p>
                  <p className="text-[#6b7280] text-xs">{transaction.items} items</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-[#6b7280] text-xs mb-1">Date & Time</p>
                  <p className="text-[#111827] text-sm">
                    {dateTime.date}, {dateTime.time}
                  </p>
                  <p className="text-[#6b7280] text-xs">{dateTime.timezone}</p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-xs mb-1">Location</p>
                  <p className="text-[#111827] text-sm">{transaction.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[#6b7280] text-xs mb-1">Payment Method</p>
                  <p className="text-[#111827] text-sm">{transaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-[#6b7280] text-xs mb-1">Fulfillment Type</p>
                  <p className="text-[#111827] text-sm">{transaction.fulfillmentType}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionDetailsTable;
