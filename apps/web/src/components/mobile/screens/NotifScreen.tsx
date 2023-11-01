import Wallet from "@/components/icons/Wallet";
import Image from "next/image";
import React from "react";
import BottomTab from "../partials/BottomTab";
import PageHeader from "../partials/PageHeader";

const NotifScreen = () => {
  return (
    <div>
      <PageHeader title="Notification" />

      {/* new notif card */}
      <div className="bg-white  mt-1 text-sm">
        <h4 className="text-gold p-3">New</h4>
        <div className="flex bg-lightgold p-4 font-light items-center">
          <div className="mr-2 w-1/10 flex items-baseline">
            <Image
              width={25}
              height={25}
              src={"/pic1.svg"}
              alt="profile pic 1"
            />
            <div className="-ml-3 z-10">
              <Image
                width={25}
                height={25}
                src={"/pic2.svg"}
                alt="profile pic 2"
              />
            </div>
          </div>
          <div className="flex justify-between w-9/10">
            <span>Gracie, alec and 43 more agreed your question</span>
            <span className="text-gold">1h</span>
          </div>
        </div>
      </div>
      {/* last notif card */}
      <div>
        <h4 className="text-gold p-3">Last days</h4>
        <div className="border-y border-lightgold p-3 flex items-center">
          <div className="w-1/10">
            <Image
              width={32}
              height={32}
              src={"/pic1.svg"}
              alt="profile pic 1"
            />
          </div>
          <div className="w-9/10 flex justify-between">
            <div>
              You have earned <span className="text-gold"> 8 </span>Delvit
              coins. <span className="ml-2 text-gold">2d</span>
            </div>
            <div>
              <Wallet width={"25"} height={"18"} />
            </div>
          </div>
        </div>
      </div>
      <BottomTab />
    </div>
  );
};

export default NotifScreen;
