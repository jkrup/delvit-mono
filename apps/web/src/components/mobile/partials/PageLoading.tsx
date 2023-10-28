import Image from "next/image";
import React from "react";

const PageLoading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center bg-white items-center">
      <div>
        <Image
          width={200}
          height={200}
          src={"/logoxl.svg"}
          alt="loading page logo"
        />
      </div>

      <div className="text-xl">DELVIT</div>
    </div>
  );
};

export default PageLoading;
