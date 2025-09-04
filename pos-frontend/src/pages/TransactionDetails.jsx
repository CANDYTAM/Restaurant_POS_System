import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TransactionDetailsTable from "../components/transactions/TransactionDetailsTable";
import ExportControls from "../components/transactions/ExportControls";
import SearchAndFilter from "../components/transactions/SearchAndFilter";
import { 
  MdPrint, 
  MdFileDownload, 
  MdSearch,
  MdReceipt,
  MdAttachMoney,
  MdCreditCard,
  MdRestaurant
} from "react-icons/md";

const TransactionDetails = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'dateTime', direction: 'desc' });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedFulfillmentType, setSelectedFulfillmentType] = useState("all");

  // Mock data for individual transactions on the selected date
  const mockTransactions = [
    {
      id: "ORD-001",
      dateTime: "2025-06-26 19:23:45",
      orderId: "12345678",
      location: "Table 7",
      paymentMethod: "Credit Card",
      fulfillmentType: "Dine In",
      orderTotal: 127.50,
      customerName: "John Smith",
      items: 4,
      status: "Completed"
    },
    {
      id: "ORD-002",
      dateTime: "2025-06-26 19:35:12",
      orderId: "12345679",
      location: "Bar Counter",
      paymentMethod: "Cash",
      fulfillmentType: "Dine In",
      orderTotal: 89.25,
      customerName: "Sarah Johnson",
      items: 3,
      status: "Completed"
    },
    {
      id: "ORD-003",
      dateTime: "2025-06-26 19:41:33",
      orderId: "12345680",
      location: "VIP Section",
      paymentMethod: "Digital Wallet",
      fulfillmentType: "Dine In",
      orderTotal: 450.00,
      customerName: "Mike Wilson",
      items: 8,
      status: "Completed"
    },
    {
      id: "ORD-004",
      dateTime: "2025-06-26 19:52:18",
      orderId: "12345681",
      location: "Table 3",
      paymentMethod: "Credit Card",
      fulfillmentType: "Takeaway",
      orderTotal: 67.75,
      customerName: "Emily Davis",
      items: 2,
      status: "Completed"
    },
    {
      id: "ORD-005",
      dateTime: "2025-06-26 20:05:47",
      orderId: "12345682",
      location: "Table 12",
      paymentMethod: "Cash",
      fulfillmentType: "Dine In",
      orderTotal: 156.30,
      customerName: "Robert Brown",
      items: 6,
      status: "Completed"
    },
    {
      id: "ORD-006",
      dateTime: "2025-06-26 20:18:22",
      orderId: "12345683",
      location: "VIP Booth 2",
      paymentMethod: "Credit Card",
      fulfillmentType: "Dine In",
      orderTotal: 890.00,
      customerName: "David Lee",
      items: 12,
      status: "Completed"
    },
    {
      id: "ORD-007",
      dateTime: "2025-06-26 20:31:09",
      orderId: "12345684",
      location: "Table 5",
      paymentMethod: "Digital Wallet",
      fulfillmentType: "Dine In",
      orderTotal: 98.50,
      customerName: "Lisa Garcia",
      items: 3,
      status: "Completed"
    },
    {
      id: "ORD-008",
      dateTime: "2025-06-26 20:44:55",
      orderId: "12345685",
      location: "Bar Counter",
      paymentMethod: "Cash",
      fulfillmentType: "Takeaway",
      orderTotal: 45.25,
      customerName: "James Martinez",
      items: 2,
      status: "Completed"
    }
  ];

  useEffect(() => {
    document.title = `POS | Transactions - ${date}`;
    setFilteredTransactions(mockTransactions);
  }, [date]);

  useEffect(() => {
    let filtered = mockTransactions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by payment method
    if (selectedPaymentMethod !== "all") {
      filtered = filtered.filter(transaction =>
        transaction.paymentMethod === selectedPaymentMethod
      );
    }

    // Filter by fulfillment type
    if (selectedFulfillmentType !== "all") {
      filtered = filtered.filter(transaction =>
        transaction.fulfillmentType === selectedFulfillmentType
      );
    }

    // Sort data
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, selectedPaymentMethod, selectedFulfillmentType, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
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

  const calculateStats = () => {
    const totalTransactions = filteredTransactions.length;
    const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.orderTotal, 0);
    const averageTransaction = totalRevenue / totalTransactions || 0;
    const totalItems = filteredTransactions.reduce((sum, t) => sum + t.items, 0);

    return {
      totalTransactions,
      totalRevenue,
      averageTransaction,
      totalItems
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
      label: "Average Order",
      value: `$${stats.averageTransaction.toFixed(2)}`,
      icon: <MdCreditCard />,
      color: "#be3e3f"
    },
    {
      label: "Total Items",
      value: stats.totalItems.toString(),
      icon: <MdRestaurant />,
      color: "#f6b100"
    }
  ];

  return (
    <section className="bg-[#f9fafb] min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-6 bg-white border-b border-[#e5e7eb]">
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-[#111827] text-xl lg:text-2xl font-bold tracking-tight">
              POS Transactions
            </h1>
            <p className="text-[#6b7280] text-sm">
              {formatDate(date)} • {mockTransactions.length} transactions
            </p>
          </div>
        </div>
        <ExportControls 
          data={filteredTransactions}
          date={date}
        />
      </div>

      {/* Stats Cards */}
      <div className="px-6 lg:px-10 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-[#e5e7eb] p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2 rounded-lg text-white text-lg lg:text-xl"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[#6b7280] text-xs lg:text-sm">{stat.label}</p>
                  <p className="text-[#111827] text-lg lg:text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Controls */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          selectedFulfillmentType={selectedFulfillmentType}
          setSelectedFulfillmentType={setSelectedFulfillmentType}
        />

        {/* Transaction Table */}
        <div className="mt-6">
          <TransactionDetailsTable
            transactions={filteredTransactions}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default TransactionDetails;