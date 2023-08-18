"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <section className="grid place-items-center h-screen">
      <div className="p-5 rounded-lg shadow-lg border border-t-4 border-black">
        <h1 className="text-2xl my-6 font-semibold">
          Create an account
          <span className="text-xs mx-2 font-normal">
            Fill all the details.
          </span>
        </h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-96 px-6 py-2 rounded-lg placeholder:text-sm border border-gray-500 bg-zinc-50"
            onChange={(e) => setName(e.target.value)}
          />
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
            Sign Up
          </button>
        </form>
        {error && (
          <span className="px-3 text-sm font-semibold text-red-500">
            {error}
          </span>
        )}
        <Link href={"/"} className="text-xs grid text-right">
          Already have an account?
          <span className="text-[0.8rem] font-semibold underline px-1">
            Login
          </span>
        </Link>
      </div>
    </section>
  );
}

export default RegisterForm;
