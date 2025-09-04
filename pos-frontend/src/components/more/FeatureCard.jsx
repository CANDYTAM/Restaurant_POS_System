import React from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const FeatureCard = ({ feature, categoryColor }) => {
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    if (feature.status === "available") {
      // Navigate to the feature's route
      navigate(feature.route);
    } else if (feature.status === "coming-soon") {
      // Show coming soon message
      enqueueSnackbar(`${feature.name} - Coming Soon!`, { 
        variant: "info",
        autoHideDuration: 2000 
      });
    } else {
      // Handle other statuses (in-development, beta, etc.)
      enqueueSnackbar(`${feature.name} - ${feature.status}`, { 
        variant: "warning",
        autoHideDuration: 2000 
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: {
        text: "Available",
        bgColor: "bg-[#2e4a2e]",
        textColor: "text-[#02ca3a]"
      },
      "coming-soon": {
        text: "Coming Soon",
        bgColor: "bg-[#4a452e]",
        textColor: "text-[#f6b100]"
      },
      "in-development": {
        text: "In Development",
        bgColor: "bg-[#3e3e4a]",
        textColor: "text-[#025cca]"
      },
      beta: {
        text: "Beta",
        bgColor: "bg-[#4a2e3e]",
        textColor: "text-[#be3e3f]"
      }
    };

    const config = statusConfig[status] || statusConfig["coming-soon"];
    
    return (
      <span className={`text-xs ${config.textColor} ${config.bgColor} px-2 py-1 rounded-lg`}>
        {config.text}
      </span>
    );
  };

  return (
    <div 
      onClick={handleFeatureClick}
      className="bg-[#262626] p-6 rounded-lg hover:bg-[#2c2c2c] transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-lg text-white text-2xl flex-shrink-0"
          style={{ backgroundColor: categoryColor }}
        >
          {feature.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[#f5f5f5] text-lg font-semibold mb-2">
            {feature.name}
          </h3>
          <p className="text-[#ababab] text-sm leading-relaxed">
            {feature.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            {getStatusBadge(feature.status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;