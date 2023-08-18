"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function UserInfo() {
  const { data: session } = useSession();

  return (
    <section className="grid place-items-center h-screen">
      <div className="grid gap-3 shadow-lg rounded-lg p-8 border border-t-4 border-black">
        <h1 className="font-bold">
          Name : <span className="font-normal">{session?.user?.name}</span>
        </h1>
        <h1 className="font-bold">
          Email : <span className="font-normal">{session?.user?.email}</span>
        </h1>
        <button
          className="px-6 py-2 mt-5 rounded-lg font-semibold cursor-pointer border-2 border-gray-300 text-white bg-black"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}

export default UserInfo;
