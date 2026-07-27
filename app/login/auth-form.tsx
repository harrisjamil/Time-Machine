"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BG = "/images/biotime.png";

type Mode = "login" | "signup";

const inputClassName =
  "h-14 w-full rounded-2xl border border-white/20 bg-white px-5 text-lg text-black outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand/60 sm:h-16 sm:text-xl";

const labelClassName = "mb-3 block text-base text-white sm:text-lg";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignup
        ? { fullName, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      if (isSignup) {
        toast.success(
          `Account created for @${data.admin.username}. Please sign in.`,
        );
        setMode("login");
        setFullName("");
        setPassword("");
        return;
      }

      toast.success(`Welcome back, ${data.admin.fullName}!`);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("admin", JSON.stringify(data.admin));
      }
      router.push("/dashboard");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
  }

  return (
    <div className="animate-fade-scale relative flex h-full w-full max-w-[480px] items-center justify-center lg:max-w-[520px]">
      <div className="flex w-full max-w-[420px] flex-col items-center bg-transparent px-2 py-10 sm:max-w-[460px] sm:py-12 lg:min-h-[calc(100vh-4rem)] lg:justify-center">
        <div className="flex w-full flex-col items-center text-white">
          <h2 className="mt-8 w-full text-center font-display text-4xl font-bold leading-tight text-white sm:mt-10 sm:text-5xl">
            {isSignup ? "Create account" : "Welcome back"}
          </h2>
          <p className="mt-3 w-full text-center text-base text-white/75 sm:text-lg">
            {isSignup
              ? "Fill in your details to get started"
              : "Please enter your details"}
          </p>

          <form
            className="mt-10 w-full space-y-7 sm:mt-12 sm:space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-7">
              {isSignup ? (
                <label className="block">
                  <span className={labelClassName}>Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={inputClassName}
                    required
                  />
                </label>
              ) : null}

              <label className="block">
                <span className={labelClassName}>Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClassName}
                  required
                />
              </label>

              <label className="block">
                <span className={labelClassName}>Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClassName}
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex h-14 w-full cursor-pointer items-center overflow-hidden rounded-full pl-7 pr-2.5 text-left shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:h-16"
            >
              <Image
                src={BG}
                alt=""
                fill
                className="object-cover"
                sizes="420px"
              />
              <span className="absolute inset-0 bg-black/40" />
              <span className="relative z-10 flex-1 font-display text-base font-bold tracking-wide text-white sm:text-lg">
                {loading
                  ? isSignup
                    ? "Creating..."
                    : "Signing in..."
                  : isSignup
                    ? "Sign Up"
                    : "Sign In"}
              </span>
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-black transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-12 sm:w-12">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 11L11 3M11 3H5.5M11 3V8.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </form>

          <p className="mt-7 w-full text-center text-base text-white/75 sm:text-lg">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="cursor-pointer font-semibold text-brand hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="cursor-pointer font-semibold text-brand hover:underline"
                >
                  Create new account
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
