import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  Wine, 
  Calendar, 
  DollarSign, 
  Gift,
  FileText,
  TrendingUp,
  AlertTriangle,
  Clock,
  UserCheck,
  Star,
  CalendarCheck,
  Percent,
  Award
} from 'lucide-react';

const More = () => {
  const [activeSection, setActiveSection] = useState(null);

  const menuSections = [
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      icon: BarChart3,
      color: 'bg-blue-500',
      items: [
        { icon: FileText, name: 'End-of-day (EOD) sales reports', description: 'Daily sales summaries and closure reports' },
        { icon: TrendingUp, name: 'Transaction summaries', description: 'Detailed transaction breakdowns' },
        { icon: DollarSign, name: 'Revenue reports', description: 'Comprehensive revenue analytics' }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      color: 'bg-green-500',
      items: [
        { icon: Package, name: 'Real-time stock tracking', description: 'Live inventory monitoring' },
        { icon: AlertTriangle, name: 'Low stock alerts', description: 'Automated inventory warnings' },
        { icon: FileText, name: 'Stock-in / stock-out records', description: 'Complete inventory movement logs' }
      ]
    },
    {
      id: 'employee',
      title: 'Employee Management',
      icon: Users,
      color: 'bg-purple-500',
      items: [
        { icon: UserCheck, name: 'Role-based access control', description: 'Manage staff permissions and roles' },
        { icon: Clock, name: 'Clock-in/clock-out', description: 'Employee time tracking system' },
        { icon: Star, name: 'Sales tracking to employee for commission', description: 'Individual performance metrics' }
      ]
    },
    {
      id: 'nightlife',
      title: 'Nightlife / Bars / Lounges',
      icon: Wine,
      color: 'bg-amber-500',
      items: [
        { icon: Wine, name: 'VIP Bottle Tracking', description: 'Bottle service and open-tab management' },
        { icon: CalendarCheck, name: 'Pre-ordering or reservation integration', description: 'Advanced booking system' },
        { icon: Percent, name: 'Dynamic pricing / Happy Hour pricing', description: 'Time-based pricing controls' },
        { icon: Award, name: 'Club point redemption system', description: 'Customer loyalty program management' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Features</h1>
        <p className="text-gray-400">Comprehensive management tools for your nightlife business</p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuSections.map((section) => {
          const IconComponent = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <div
              key={section.id}
              className={`bg-gray-800 rounded-xl p-6 transition-all duration-300 cursor-pointer border-2 ${
                isActive ? 'border-white/20 bg-gray-750' : 'border-transparent hover:border-white/10'
              }`}
              onClick={() => setActiveSection(isActive ? null : section.id)}
            >
              {/* Section Header */}
              <div className="flex items-center mb-4">
                <div className={`${section.color} p-3 rounded-lg mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>

              {/* Section Items */}
              <div className={`space-y-3 transition-all duration-300 ${
                isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}>
                {section.items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <ItemIcon className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-white mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show/Hide Indicator */}
              <div className="flex items-center justify-center mt-4">
                <div className={`w-6 h-1 bg-gray-600 rounded-full transition-all duration-300 ${
                  isActive ? 'rotate-90 bg-white/40' : ''
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Reports</p>
          <p className="text-xl font-bold">24</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Package className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Items</p>
          <p className="text-xl font-bold">156</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Staff</p>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <Wine className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">VIP Tables</p>
          <p className="text-xl font-bold">8</p>
        </div>
      </div>
    </div>
  );
};

export default More;