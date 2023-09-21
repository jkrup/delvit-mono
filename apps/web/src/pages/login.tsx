import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { OfflineAminoSigner } from "@cosmjs/amino";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import ArticlesFeed from "../components/ArticlesFeed";
import PopularTopics from "../components/PopularTopics";
import UserMenu from "../components/UserMenu";
import hstkLogoUrl from "../imgs/hstk-logo.png";

// Skeleton that will be blurred
const HomePage = () => {
  return (
    <div>
      <div className="bg-black h-24 flex flex-row p-4 justify-between">
        <Link href="/">

          <Image
            alt="Delvit Logo"
            className="cursor-pointer rounded-full mx-4 h-[64px] w-[64px]"
            src={hstkLogoUrl}
          />

        </Link>
        <form className="grow my-auto flex space-x-8 justify-center max-w-screen-md">
          <div className="flex items-center bg-zinc-500 text-zinc-100 space-x-2 flex-1 rounded-sm px-2 overflow-hidden">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <input
              className="grow max-w-screen-md bg-zinc-500 h-8 text-zinc-100 flex-1 outline-none"
              type="text"
              placeholder="Search Truth"
              name="search"
            />
          </div>
          <button className="bg-slate-600 px-6 text-zinc-50 font-bold">
            Search
          </button>
        </form>
        <UserMenu />
      </div>
      <div className="pt-4 bg-zinc-700 min-h-screen">
        <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
          {/* Main SubSection */}
          <ArticlesFeed />

          {/* Right SubSection */}
          <div className="flex flex-col space-y-2">
            {" "}
            {/* Col 2 */}
            {/* <TopContent /> */}
            <PopularTopics />
          </div>
        </div>
      </div>
    </div>
  );
};

interface Keplr {
  enable: (chainId: string) => Promise<any>;
  getOfflineSigner: (chainId: string) => OfflineAminoSigner;
}

const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const [loggingIn, setLoggingIn] = useState(false);

  const router = useRouter();

  const loginWithMetamask = async () => {
    setLoggingIn(true);
    if ((window as any).ethereum) {
      try {
        const ethereum = (window as any).ethereum as any;
        const req = await ethereum.request({ method: "eth_requestAccounts" });
        if (req.length === 0) {
          throw new Error("No MetaMask accounts");
        }
        const address = req[0]; //TODO: fetch nonce

        const signature: string = await ethereum.request({
          method: "personal_sign",
          params: [address, "Login to DLV"], //TODO: add nonce
          from: address,
        });

        console.log(signature);

        signIn("metamask", {
          signature,
          address,
          callbackUrl: "/profile",
        }).then((sir) => {
          console.log(sir);
        });
      } catch (err) {
        console.error(err);
        setLoggingIn(false);
        return;
      }
    } else {
      // Error no metamask detected
      alert("No metamask detected");
      setLoggingIn(false);
    }
  };

  const loginWithKeplr = async () => {
    const chainId = "cosmoshub-4";
    const msgToSign = "LogMeIn";
    const signDoc = {
      msgs: [
        {
          type: "hstk-login",
          value: msgToSign,
        },
      ],
      fee: {
        amount: [],
        // Note: this needs to be 0 gas to comply with ADR36, but Keplr current throws an error. See: https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-036-arbitrary-signature.md#decision
        gas: "0",
      },
      chain_id: chainId,
      memo: "Login to DLV",
      account_number: "0",
      sequence: "0",
    };

    setLoggingIn(true);

    if ((window as any).keplr) {
      try {
        const keplr: Keplr = (window as any).keplr;
        await keplr.enable(chainId);
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        const account = accounts[0];

        if (!account) {
          throw new Error("No Keplr accounts");
        }

        const { signed, signature } = await offlineSigner.signAmino(
          account.address,
          signDoc
        );

        const payload = JSON.stringify({
          signed,
          signature,
          pk: Array.from(account.pubkey),
        });

        signIn("credentials", {
          keplr: payload,
          callbackUrl: "/profile",
        }).then((sir) => {
          setLoggingIn(false);
          if (sir) {
            const { error, status, ok, url } = sir;
            if (error) {
              console.error(error);
            }
            console.log({ status, ok, url });
          }
        });
      } catch (err) {
        console.error(err);
        setLoggingIn(false);
        return;
      }
    } else {
      // Error no keplr detected
      alert("No Keplr Wallet detected");
      setLoggingIn(false);
    }
  };

  if (router.query["auto"] === "google") {
    signIn("google")
  }
  if (router.query["auto"] === "facebook") {
    signIn("facebook")
  }
  if (router.query["auto"] === "keplr") {
    let q = router.query;
    delete q["auto"];
    loginWithKeplr()
  }
  if (router.query["auto"] === "metamask") {
    let q = router.query;
    delete q["auto"];
    loginWithMetamask()
  }

  if (session) {
    setTimeout(() => router.replace("/"), 0);
    return (
      <div>
        Signed in as {session.user?.name} <br />
        <button
          onClick={() =>
            signOut().then(() => {
              router.replace("/");
            })
          }
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Delvit | Login</title>
        <meta name="description" content="Delvit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="blur">
        <HomePage />
      </div>
      <div className="absolute top-0 left-0 w-full grid min-h-screen bg-zinc-700/50">
        <div
          className={
            "m-auto bg-white p-12 py-4 w-[400px] rounded-xl drop-shadow-2xl flex flex-col space-y-3" +
            (loggingIn && " blur")
          }
        >
          <div className="mx-auto">
            <Image
              alt="Delvit Logo"
              className="cursor-pointer rounded-full mx-4 h-[64px] w-[64px]"
              src={hstkLogoUrl}
            />
          </div>
          <div className="pb-4 text-center w-full flex flex-col">
            <h2 className="text-3xl pb-4">Login With:</h2>
            <button
              className={
                "text-xl justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => signIn("email")}
            >
              Email
            </button>
            <button
              className={
                "text-xl justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => signIn("google")}
            >
              Google
            </button>
            {/* <button
              className={
                "justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => signIn("github")}
            >
              Login With GitHub
            </button> */}
            {/* <button
              className={
                "justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => signIn("facebook")}
            >
              Login With Facebook
            </button> */}
            <button
              className={
                "justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => loginWithMetamask()}
            >
              <div className="w-8 mr-2">
                <img alt="Login with MetaMask" src="/metamask.svg" />
              </div>
              <div className="text-xl">Metamask</div>
            </button>
            <button
              className={
                "justify-center rounded-xl font-bold p-4 my-2 bg-slate-700 hover:bg-slate-600 hover:drop-shadow text-white flex items-center"
              }
              onClick={() => loginWithKeplr()}
            >
              <Image
                alt="Login with Keplr"
                width={130}
                height={28}
                src="/keplr_w.svg"
              />
            </button>
          </div>
          <a href="https://www.keplr.app/" className="self-end text-sm pt-1">
            Install Keplr Wallet
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
