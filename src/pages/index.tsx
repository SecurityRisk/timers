import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import {
  FaCopy,
  FaDiscord,
  FaGoogle,
  FaSignOutAlt,
  FaTwitch,
} from "react-icons/fa";
import Image from "next/image";

const copyUrlToClipboard = (path: string) => () => {
  if (!process.browser) return;
  navigator.clipboard.writeText(`${window.location.origin}${path}`);
};

const NavButtons: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: sesh } = useSession();

  return (
    <div className="flex gap-2">
      {/* <button
        onClick={copyUrlToClipboard(`/embed/${userId}`)}
        className="flex gap-2 rounded bg-gray-200 p-4 font-bold text-gray-800 hover:bg-gray-100"
      >
        Copy embed url <FaCopy size={24} />
      </button>
      <button
        onClick={copyUrlToClipboard(`/ask/${sesh?.user?.name?.toLowerCase()}`)}
        className="flex gap-2 rounded bg-gray-200 p-4 font-bold text-gray-800 hover:bg-gray-100"
      >
        Copy Q&A url <FaCopy size={24} />
      </button> */}
      <button
        onClick={() => signOut()}
        className="flex gap-2 rounded bg-gray-200 p-4 font-bold text-gray-800 hover:bg-gray-100"
      >
        Logout <FaSignOutAlt size={24} />
      </button>
    </div>
  );
};

const HomeContents = () => {
  const { data } = useSession();

  if (!data)
    return (
      <div className="flex grow flex-col items-center justify-center">
        <div className="text-2xl font-bold">Please log in below</div>
        <div className="p-4" />
        <button
          onClick={() => signIn("discord")}
          className="flex items-center gap-2 mb-4 rounded bg-gray-200 px-4 py-2 text-2xl text-black"
        >
          <span></span>
          <FaDiscord />
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 mb-4 rounded bg-gray-200 px-4 py-2 text-2xl text-black"
        >
          <span></span>
          <FaGoogle />
        </button>
        <button
          onClick={() => signIn("twitch")}
          className="flex items-center gap-2 mb-4 rounded bg-gray-200 px-4 py-2 text-2xl text-black"
        >
          <span></span>
          <FaTwitch />
        </button>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between bg-gray-800 py-4 px-8 shadow">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          {data.user?.image && (
            <img
              src={data.user?.image}
              alt="pro pic"
              className="w-16 rounded-full"
            />
          )}
          {data.user?.name}
        </h1>
        <NavButtons userId={data.user?.id!} />
      </div>
      {/*<LazyQuestionsView />*/}
    </div>
  );
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  return (
    <>
      <Head>
        <title>Timers</title>
        <meta name="description" content="Timers usable by anyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex h-screen w-screen flex-col justify-between">
        <HomeContents />
        <div className="flex w-full justify-between bg-black/40 py-4 px-8">
          <span>Quickly created by Hunter</span>
          <div className="flex gap-4">
            <a
              href="https://github.com/securityrisk/timers"
              className="text-blue-300"
            >
              Github
            </a>
            <a
              href="https://twitter.com/hunterboone_"
              className="text-blue-300"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
