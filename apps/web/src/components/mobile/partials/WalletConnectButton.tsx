import { useWeb3Modal } from "@web3modal/react";
import { ReactNode, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface WCBtnProps {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}
export default function WalletConnectButton({
  label,
  icon,
  onClick,
}: WCBtnProps) {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  // const label = isConnected ? "Disconnect" : "Connect Custom";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  // function onClick() {
  //   if (isConnected) {
  //     disconnect();
  //   } else {
  //     onOpen();
  //   }
  // }

  return (
    <button
      className={
        "justify-center rounded-xl font-bold p-4 my-2 bg-gold hover:bg-yellow-500 hover:drop-shadow text-white flex items-center"
      }
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="text-xl animate-spin" />
      ) : (
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{label}</span>
        </div>
      )}
    </button>
  );
}
