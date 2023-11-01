import Back from "@/components/icons/Back";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Button from "./Button";

export interface PageHeaderProps {
  title: string;
  goBack?: boolean;
  button?: ReactNode;
}
const PageHeader = ({ title, goBack, button }: PageHeaderProps) => {
  const { back } = useRouter();

  return (
    <div className="flex text-gold bg-white  items-center justify-between p-4">
      <div>
        {goBack && (
          <div onClick={back}>
            <Back />
          </div>
        )}
      </div>

      <span>{title}</span>
      <div>{button}</div>
    </div>
  );
};

export default PageHeader;
