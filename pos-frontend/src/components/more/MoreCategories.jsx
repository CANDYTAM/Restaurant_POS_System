import { 
    MdBarChart, 
    MdInventory, 
    MdPeople, 
    MdLocalBar,
    MdAssignment,
    MdTrendingUp,
    MdAttachMoney,
    MdWarning,
    MdAccessTime,
    MdPersonAdd,
    MdStar,
    MdEventAvailable,
    MdPercent,
    MdEmojiEvents
  } from "react-icons/md";
  
  export const moreCategories = [
    {
      id: "reporting",
      name: "Reporting & Analytics",
      icon: <MdBarChart />,
      color: "#025cca",
      features: [
        { 
          id: "eod-reports",
          icon: <MdAssignment />, 
          name: "End-of-day (EOD) sales reports", 
          description: "Daily sales summaries and closure reports",
          status: "available",
          route: "/eod-reports"
        },
        { 
          id: "transaction-summaries",
          icon: <MdTrendingUp />, 
          name: "Transaction summaries", 
          description: "Detailed transaction breakdowns",
          status: "available",
          route: "/transaction-summaries"
        },
        { 
          id: "revenue-reports",
          icon: <MdAttachMoney />, 
          name: "Revenue reports", 
          description: "Comprehensive revenue analytics",
          status: "coming-soon",
          route: "/revenue-reports"
        }
      ]
    },
    {
      id: "inventory",
      name: "Inventory Management",
      icon: <MdInventory />,
      color: "#02ca3a",
      features: [
        { 
          id: "stock-tracking",
          icon: <MdInventory />, 
          name: "Real-time stock tracking", 
          description: "Live inventory monitoring",
          status: "coming-soon",
          route: "/stock-tracking"
        },
        { 
          id: "stock-alerts",
          icon: <MdWarning />, 
          name: "Low stock alerts", 
          description: "Automated inventory warnings",
          status: "coming-soon",
          route: "/stock-alerts"
        },
        { 
          id: "stock-records",
          icon: <MdAssignment />, 
          name: "Stock-in / stock-out records", 
          description: "Complete inventory movement logs",
          status: "coming-soon",
          route: "/stock-records"
        }
      ]
    },
    {
      id: "employee",
      name: "Employee Management",
      icon: <MdPeople />,
      color: "#be3e3f",
      features: [
        { 
          id: "role-access",
          icon: <MdPersonAdd />, 
          name: "Role-based access control", 
          description: "Manage staff permissions and roles",
          status: "coming-soon",
          route: "/role-access"
        },
        { 
          id: "time-tracking",
          icon: <MdAccessTime />, 
          name: "Clock-in/clock-out", 
          description: "Employee time tracking system",
          status: "coming-soon",
          route: "/time-tracking"
        },
        { 
          id: "sales-commission",
          icon: <MdStar />, 
          name: "Sales tracking for commission", 
          description: "Individual performance metrics",
          status: "coming-soon",
          route: "/sales-commission"
        }
      ]
    },
    {
      id: "nightlife",
      name: "Nightlife / Bars / Lounges",
      icon: <MdLocalBar />,
      color: "#f6b100",
      features: [
        { 
          id: "vip-bottles",
          icon: <MdLocalBar />, 
          name: "VIP Bottle Tracking", 
          description: "Bottle service and open-tab management",
          status: "coming-soon",
          route: "/vip-bottles"
        },
        { 
          id: "reservations",
          icon: <MdEventAvailable />, 
          name: "Pre-ordering or reservation integration", 
          description: "Advanced booking system",
          status: "coming-soon",
          route: "/reservations"
        },
        { 
          id: "dynamic-pricing",
          icon: <MdPercent />, 
          name: "Dynamic pricing / Happy Hour pricing", 
          description: "Time-based pricing controls",
          status: "coming-soon",
          route: "/dynamic-pricing"
        },
        { 
          id: "loyalty-program",
          icon: <MdEmojiEvents />, 
          name: "Club point redemption system", 
          description: "Customer loyalty program management",
          status: "coming-soon",
          route: "/loyalty-program"
        }
      ]
    }
  ];