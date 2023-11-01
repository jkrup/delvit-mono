import { selectOptionsProps } from "@/types/props";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export interface SelectProps {
  options: selectOptionsProps[];
  post: any;
  setPost: Dispatch<SetStateAction<any>>;
}
const Select = ({ options, post, setPost }: SelectProps) => {
  const [isOpen, setisOpen] = useState(false);

  const handleSelect = (item: any) => {
    setPost(item);
    setisOpen(false);
  };
  return (
    <div>
      <div
        onClick={() => setisOpen(!isOpen)}
        className="border-gray-400 relative mt-5 bg-lightgold flex items-center justify-between rounded-lg border p-3"
      >
        <span>{(post && post?.value) ?? "Title of the post"}</span>
        <BiSolidDownArrow className="text-gold" />
      </div>

      {/* options */}
      {isOpen && (
        <div className="w-11/12 mx-auto absolute bg-white  border border-gray-200">
          {options.map((item) => (
            <div
              onClick={() => handleSelect(item)}
              className="border-b border-gray-200 p-2"
              key={item.key}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
