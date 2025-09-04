import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import MoreStats from "../components/more/MoreStats";
import CategoryTabs from "../components/more/CategoryTabs";
import FeaturesGrid from "../components/more/FeatureGrid";
import { moreCategories } from "../components/more/MoreCategories";

const More = () => {
  const [activeCategory, setActiveCategory] = useState("reporting");

  useEffect(() => {
    document.title = "POS | More Features";
  }, []);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            More Features
          </h1>
        </div>
        <CategoryTabs 
          categories={moreCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <MoreStats />
      
      <FeaturesGrid 
        activeCategory={activeCategory}
        categories={moreCategories}
      />

      <BottomNav />
    </section>
  );
};

export default More;