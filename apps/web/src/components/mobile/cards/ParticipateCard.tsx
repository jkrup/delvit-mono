import Clock from "@/components/icons/Clock";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../partials/Button";

export interface pcProps {
  accepted: boolean;
  setAccepted: Dispatch<SetStateAction<boolean>>;
  containerStyle?: string;
}
const ParticipateCard = ({
  accepted,
  setAccepted,
  containerStyle,
}: pcProps) => {
  return (
    <div className={`${containerStyle}`}>
      {accepted ? (
        <div className="rounded p-3 bg-brownish">
          <div className="my-3 flex items-center justify-center text-white">
            <Clock />
            <span className="mx-2">Time Left</span>
            <span className="text-gold tracking-widest">04:31:02</span>
          </div>
          <div className="text-sm text-white text-center my-4">
            You are currently involved in the Truth Consensus Algorithm for
          </div>
          <div className="my-4 px-2 text-white">
            {`'Does Joe Biden Have Dementia?'`}
          </div>
          <Link href={"/participate/evidences"}>
            <a className="italic underline text-gold">
              Click here to view evidence and cast your vote.
            </a>
          </Link>
        </div>
      ) : (
        <div className="rounded p-3 bg-brownish">
          <div className="my-3 text-white">Do you wish to participate ?</div>
          <div className="my-4 px-2 text-gold italic">
            By agreeing to participate, you agree to stake 100 DLV. You have 24
            hours to respond.
          </div>
          <div className="flex items-center my-3 px-2 justify-between">
            <Button
              title="decline"
              onChange={() => null}
              classname="uppercase w-4/10"
            />
            <Button
              title="Agree"
              onChange={() => setAccepted(true)}
              classname="btn"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipateCard;
