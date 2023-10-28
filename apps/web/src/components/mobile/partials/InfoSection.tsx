import Info from "@/components/icons/Info";
import React from "react";

export interface infoProps {
  body: string;
}
const InfoSect = ({ body }: infoProps) => {
  return (
    <div className=" flex bg-lightgold text-darkgrey p-3 px-5 font-light">
      {body}
    </div>
  );
};

export default InfoSect;
