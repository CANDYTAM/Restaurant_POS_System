import React from "react";

const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center justify-around gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`text-[#ababab] text-lg ${
            activeCategory === category.id && "bg-[#383838] rounded-lg px-5 py-2"
          } rounded-lg px-5 py-2 font-semibold flex items-center gap-2`}
        >
          {category.icon}
          <span className="hidden md:inline">{category.name.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;