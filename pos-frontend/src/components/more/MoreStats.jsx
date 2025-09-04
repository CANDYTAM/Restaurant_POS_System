import React from "react";
import { 
  MdAssignment,
  MdInventory,
  MdPeople,
  MdLocalBar
} from "react-icons/md";

const MoreStats = () => {
  const stats = [
    { icon: <MdAssignment />, label: "Reports", value: "24", color: "#025cca" },
    { icon: <MdInventory />, label: "Items", value: "156", color: "#02ca3a" },
    { icon: <MdPeople />, label: "Staff", value: "12", color: "#be3e3f" },
    { icon: <MdLocalBar />, label: "VIP Tables", value: "8", color: "#f6b100" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-10 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#262626] rounded-lg p-4">
          <div className="flex items-center justify-between">
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
        </div>
      ))}
    </div>
  );
};

export default MoreStats;