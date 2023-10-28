import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";

export interface popupProps {
  setshowPopup: Dispatch<SetStateAction<boolean>>;
}

const Popup = ({ setshowPopup }: popupProps) => {
  return (
    <div className="absolute h-1/3 -bottom-5 w-full bg-gold text-white rounded-t-lg">
      <div className="w-full flex justify-center -translate-y-7">
        <Image width={100} height={100} src={"/logo.svg"} alt="logo" />
      </div>
      <div
        onClick={() => setshowPopup(false)}
        className="float-right m-4 p-2 justify-end -translate-y-20 text-black"
      >
        <IoMdClose className="w-6 h-6" />
      </div>
      <div className="w-10/12 -translate-y-4 mx-auto">
        <div className="italic text-justify">
          Alert - you have been randomly selected to participate in the Truth
          Consensus Algorithm
        </div>
        <div className="mt-2 p-2 text-center">
          <Link href={`/participate/new`} className="underline italic text-blue-900">
            
              click here for info
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
