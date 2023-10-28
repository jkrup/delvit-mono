import React from "react";

const Skeleton = () => {
  return (
    <div className="col-span-2 p-2 flex flex-col space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          return (
            <div key={i} className="bg-slate-200 rounded-md h-40 animate-pulse">
              {" "}
            </div>
          );
        })}
    </div>
  );
};

export default Skeleton;
