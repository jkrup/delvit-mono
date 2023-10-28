import React from "react";

const CardBody = ({ desc }: { desc: string }) => {
  return <div className="my-3 text-sm font-light">{desc}</div>;
};

export default CardBody;
