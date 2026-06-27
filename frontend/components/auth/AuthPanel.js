"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useAuthStore from "../../store/useAuthStore";
import { authApi } from "../../lib/api";
import { Eye, EyeOff } from "lucide-react";
import UniversalButton from "../ui/universalButton";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "MENTEE",
};

const getPostAuthRoute = (user, fallbackRoute) => {
  if (!user) return fallbackRoute;
  if (user.role !== "ADMIN" && !user.onboardingCompleted) return "/onboarding";
  if (user.role === "MENTOR") return "/mentor/dashboard";
  if (user.role === "MENTEE") return "/mentee/dashboard";
  if (user.role === "ADMIN") return "/admin/dashboard";
  return fallbackRoute;
};

// Simple SVGs
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f08849" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f08849" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f08849" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);

export default function AuthPanel({ initialMode = "login", initialRole = "MENTEE", redirectTo = "/onboarding", guestOnly = false }) {
  const [mode, setMode] = useState(initialMode === "register" ? "register" : "login");
  const [form, setForm] = useState({ ...defaultForm, role: initialRole });
  const [pwdError, setPwdError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "account_not_found") {
        toast.error("Account does not exist. Please sign up first.");
      } else if (errorParam === "email_exists") {
        toast.error("Email already registered with another provider.");
      } else if (errorParam === "authentication_failed") {
        toast.error("Authentication failed. Please try again.");
      } else {
        toast.error("An error occurred during authentication.");
      }

      // Clean up search params to avoid showing the toast again on page reload
      const params = new URLSearchParams(window.location.search);
      params.delete("error");
      const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState(null, "", newRelativePathQuery);
    }
  }, [searchParams]);

  const {
    user,
    isLoading,
    hasCheckedSession,
    checkBackendHealth,
    fetchCurrentUser,
    login,
    register,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    checkBackendHealth().catch(() => {});
    if (!hasCheckedSession) fetchCurrentUser();
  }, [checkBackendHealth, fetchCurrentUser, hasCheckedSession]);

  useEffect(() => {
    setMode(initialMode === "register" ? "register" : "login");
    setForm((prev) => ({ ...prev, role: initialRole }));
  }, [initialMode, initialRole]);

  useEffect(() => {
    if (guestOnly && hasCheckedSession && user) {
      router.replace(getPostAuthRoute(user, redirectTo));
    }
  }, [guestOnly, hasCheckedSession, user, redirectTo, router]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    clearError();
    setPwdError("");

    if (mode === "register" && form.password !== form.confirmPassword) {
      setPwdError("Passwords do not match");
      return;
    }

    try {
      let result;
      if (mode === "login") {
        result = await login({ email: form.email, password: form.password });
      } else {
        result = await register({ 
          name: form.name, 
          email: form.email, 
          password: form.password,
          role: form.role 
        });
      }
      setForm(defaultForm);
      const signedInUser = result?.data?.user;
      router.replace(getPostAuthRoute(signedInUser, redirectTo));
    } catch (_error) {
      // Handled by store.
    }
  };

  if (guestOnly && hasCheckedSession && user) {
    return <div className="text-lg font-semibold">Redirecting to your workspace...</div>;
  }

  const isLogin = mode === "login";

  return (
    <div className="w-full flex justify-center items-center font-sans">
      <div className="w-full max-w-md bg-transparent">
        <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] mb-2">{isLogin ? "Login." : "Signup."}</h2>
        <p className="text-[#8c8c8c] text-sm mb-8">
          {isLogin ? "Welcome back! Please login to continue." : "Join our platform to start connecting and growing."}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "MENTEE" })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-full border-2 transition-all whitespace-nowrap ${
                  form.role === "MENTEE"
                    ? "bg-[#596df2] text-white border-[#596df2]"
                    : "bg-white text-black border-black/80 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                }`}
                style={form.role === "MENTEE" ? {} : { opacity: 0.7 }}
              >
                Signing up as a mentee.
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "MENTOR" })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-full border-2 transition-all whitespace-nowrap ${
                  form.role === "MENTOR"
                    ? "bg-[#f08849] text-white border-[#f08849]"
                    : "bg-white text-black border-black/80 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                }`}
                style={form.role === "MENTOR" ? {} : { opacity: 0.7 }}
              >
                Signing up as a mentor.
              </button>
            </div>
          )}

          {!isLogin && (
             <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon />
              </div>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Username"
                className="w-full rounded-2xl border-2 border-[#e6e2df] py-3.5 pl-12 pr-4 bg-white outline-none focus:border-black/50 transition-colors text-sm"
                required
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MailIcon />
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full rounded-2xl border-2 border-[#e6e2df] py-3.5 pl-12 pr-4 bg-white outline-none focus:border-black/50 transition-colors text-sm"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              className="w-full rounded-2xl border-2 border-[#e6e2df] py-3.5 pl-12 pr-12 bg-white outline-none focus:border-black/50 transition-colors text-sm"
              minLength={6}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                placeholder="Confirm password"
                className="w-full rounded-2xl border-2 border-[#e6e2df] py-3.5 pl-12 pr-12 bg-white outline-none focus:border-black/50 transition-colors text-sm"
                minLength={6}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {pwdError && <p className="text-red-500 text-xs mt-1">{pwdError}</p>}

          <div className="pt-2">
            <UniversalButton
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Please wait..." : isLogin ? "Login →" : "Sign up →"}
            </UniversalButton>
          </div>
        </form>

        <div className="mt-6 text-sm font-semibold text-[#8c8c8c]">
          {isLogin ? "Don't have an account ? " : "Already have an account ? "}
          <button 
            type="button" 
            onClick={() => setMode(isLogin ? "register" : "login")} 
            className="text-[#f08849] hover:underline cursor-pointer ml-1"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </div>

        <div className="mt-8">
          <a
            href={authApi.googleAuthUrl(mode, form.role)}
            className="w-full max-w-[240px] bg-black text-white font-semibold py-3.5 px-4 rounded-3xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors"
          >
            <GoogleIcon />
            {isLogin ? "Log In with Google" : "Sign Up with Google"}
          </a>
        </div>
      </div>
    </div>
  );
}
