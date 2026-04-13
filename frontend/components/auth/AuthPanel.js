"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/useAuthStore";
import { authApi } from "../../lib/api";

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

const getPostAuthRoute = (user, fallbackRoute) => {
  if (!user) {
    return fallbackRoute;
  }

  if (user.role !== "ADMIN" && !user.onboardingCompleted) {
    return "/onboarding";
  }

  if (user.role === "MENTOR") {
    return "/mentor/dashboard";
  }

  if (user.role === "MENTEE") {
    return "/mentee/dashboard";
  }

  if (user.role === "ADMIN") {
    return "/admin/dashboard";
  }

  return fallbackRoute;
};

export default function AuthPanel({ initialMode = "login", redirectTo = "/profile", guestOnly = false }) {
  const [mode, setMode] = useState(initialMode === "register" ? "register" : "login");
  const [form, setForm] = useState(defaultForm);
  const router = useRouter();

  const {
    user,
    isLoading,
    isConnected,
    hasCheckedSession,
    checkBackendHealth,
    fetchCurrentUser,
    login,
    register,
    logout,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    checkBackendHealth().catch(() => {});
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [checkBackendHealth, fetchCurrentUser, hasCheckedSession]);

  useEffect(() => {
    setMode(initialMode === "register" ? "register" : "login");
  }, [initialMode]);

  useEffect(() => {
    if (guestOnly && hasCheckedSession && user) {
      router.replace(getPostAuthRoute(user, redirectTo));
    }
  }, [guestOnly, hasCheckedSession, user, redirectTo, router]);

  const healthLabel = useMemo(() => {
    if (isConnected === null) return "Checking backend...";
    return isConnected ? "Backend connected" : "Backend offline";
  }, [isConnected]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    clearError();

    try {
      let result;

      if (mode === "login") {
        result = await login({ email: form.email, password: form.password });
      } else {
        result = await register({ name: form.name, email: form.email, password: form.password });
      }

      setForm(defaultForm);
      const signedInUser = result?.data?.user;
      router.replace(getPostAuthRoute(signedInUser, redirectTo));
    } catch (_error) {
      // Handled by store.
    }
  };

  const onLogout = async () => {
    clearError();
    try {
      await logout();
    } catch (_error) {
      // Handled by store.
    }
  };

  if (guestOnly && hasCheckedSession && user) {
    return (
      <div className="mx-auto mt-8 w-full max-w-2xl rounded-[1.75rem] border-2 border-black bg-white p-5 text-left shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-6">
        <p className="text-lg font-semibold">You are already logged in. Redirecting to your workspace...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl rounded-[1.75rem] border-2 border-black bg-white p-5 text-left shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">Frontend-Backend Auth</h3>
        <span
          className={`rounded-full border border-black px-3 py-1 text-sm font-semibold ${
            isConnected ? "bg-[#c6f6d5]" : "bg-[#fed7d7]"
          }`}
        >
          {healthLabel}
        </span>
      </div>

      {!user ? (
        <>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-full border-2 border-black px-4 py-2 text-sm font-semibold ${
                mode === "login" ? "bg-[#ffc20f]" : "bg-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-full border-2 border-black px-4 py-2 text-sm font-semibold ${
                mode === "register" ? "bg-[#5f6cf3] text-white" : "bg-white"
              }`}
            >
              Register
            </button>
            <a
              href={authApi.googleAuthUrl()}
              className="ml-auto rounded-full border-2 border-black bg-[#f3f0ee] px-4 py-2 text-sm font-semibold"
            >
              Continue with Google
            </a>
          </div>

          <form onSubmit={onSubmit} className="mt-4 grid gap-3">
            {mode === "register" ? (
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Name"
                className="rounded-xl border border-black/30 px-4 py-3 outline-none focus:border-black"
                required
              />
            ) : null}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="rounded-xl border border-black/30 px-4 py-3 outline-none focus:border-black"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="rounded-xl border border-black/30 px-4 py-3 outline-none focus:border-black"
              minLength={6}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 rounded-xl border-2 border-black bg-[#ffc20f] px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>
        </>
      ) : (
        <div className="mt-4 rounded-xl border border-black/20 bg-[#f7fafc] p-4">
          <p className="text-sm text-black/70">Logged in as</p>
          <p className="text-lg font-bold">{user.name || user.email}</p>
          <p className="text-sm text-black/70">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.replace(getPostAuthRoute(user, redirectTo))}
              className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoading}
              className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
