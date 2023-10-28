import React from "react";

export interface BtnProps {
  title: string;
  onChange: () => void;
  classname?: string;
}
const Button = ({ title, onChange, classname }: BtnProps) => {
  return (
    <button
      className={`p-2 rounded border border-gold ${classname} font-typo text-gold text-center`}
      onClick={onChange}
    >
      {title}
    </button>
  );
};

export default Button;
