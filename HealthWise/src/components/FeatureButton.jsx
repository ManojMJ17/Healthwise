import React from "react";

const FeatureButton = ({ name, Icon }) => {
  return (
    <button className="flex gap-2 p-4 py-5 items-center rounded-lg border-1 border-gray-600 cursor-pointer">
      {Icon && <Icon className="w-5 h-5" />}
      <span>{name}</span>
    </button>
  );
};

export default FeatureButton;
