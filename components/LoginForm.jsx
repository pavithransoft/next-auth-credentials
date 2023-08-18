"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid place-items-center h-screen">
      <div className="p-5 rounded-lg shadow-lg border border-t-4 border-black">
        <h1 className="text-2xl my-6 font-semibold">
          Welcome back
          <span className="text-xs mx-2 font-normal">Enter your details.</span>
        </h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="w-96 px-6 py-2 rounded-lg placeholder:text-sm border border-gray-500 bg-zinc-50"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="w-96 px-6 py-2 rounded-lg placeholder:text-sm border border-gray-500 bg-zinc-50"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-6 py-2 mb-3 rounded-lg font-semibold cursor-pointer border-2 border-gray-300 text-white bg-black">
            Sign In
          </button>
        </form>
        {error && (
          <span className="px-3 text-sm font-semibold text-red-500">
            {error}
          </span>
        )}
        <Link href={"/register"} className="text-xs grid text-right">
          Don't have an account?
          <span className="text-[0.8rem] font-semibold underline px-1">
            Register
          </span>
        </Link>
      </div>
    </section>
  );
}

export default LoginForm;
