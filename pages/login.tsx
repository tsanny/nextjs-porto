import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setisLoggingIn] = useState(true);

  const router = useRouter();
  const { login, signup } = useAuth();

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
        router.push("/");
      } catch (error) {
        setError("Incorrect email or password");
      }
      return;
    }
    await signup(email, password);
    router.push("/");
  }

  return (
    <>
      <div
        className="flex-1 text-xm sm:text-sm flex flex-col justify-center items-center
      gap-2 sm:gap-4"
      >
        <h1 className="text-2xl select-none sm:text-4xl uppercase">
          {isLoggingIn ? "Login" : "Register"}
        </h1>
        {error && (
          <div className="w-full max-w-[30ch] text-center border-rose-400 border border-solid text-rose-400 py-2">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 
        p-2 w-full max-w-[30ch]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900
        p-2 w-full max-w-[30ch]"
        />

        <button
          onClick={submitHandler}
          className="w-full max-w-[30ch] border border-white 
        uppercase border-solid duration-300 relative after:absolute after:top-0
        after:right-full after:bg-white after:z-10 after:w-full after:h-full
        overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
        >
          <h2 className="relative z-20">SUBMIT</h2>
        </button>
        <h2
          onClick={() => setisLoggingIn(!isLoggingIn)}
          className="duration-300 hover:scale-110 cursor-pointer"
        >
          {!isLoggingIn ? "Login" : "Register"}
        </h2>
      </div>
    </>
  );
}
