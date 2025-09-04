import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesGrid = ({ activeCategory, categories }) => {
  const activeData = categories.find(cat => cat.id === activeCategory);

  const getCategoryDescription = (categoryId) => {
    const descriptions = {
      reporting: "",
      inventory: "",
      employee: "",
      nightlife: ""
    };
    return descriptions[categoryId] || "";
  };

  return (
    <div className="px-10 h-[500px] overflow-y-scroll scrollbar-hide">
      <div className="mb-6">
        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-2">
          {activeData?.name}
        </h2>
        <p className="text-[#ababab] text-sm">
          {getCategoryDescription(activeCategory)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeData?.features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            categoryColor={activeData.color}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;