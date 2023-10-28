import React, { useState } from "react";

export const tabMenu = [
  {
    name: "Banter",
  },
  {
    name: "Evidence",
  },
];
const QuestionTabMenu = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (str: string) => void;
}) => {
  return (
    <div className="bg-lightgold flex w-full items-stretch text-gold">
      {tabMenu.map((item) => (
        <div
          onClick={() => setActiveTab(item.name)}
          className={`p-3 w-1/2 text-center ${
            activeTab === item.name ? "font-semibold border-b-2" : ""
          } border-gold`}
          key={item.name}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default QuestionTabMenu;
