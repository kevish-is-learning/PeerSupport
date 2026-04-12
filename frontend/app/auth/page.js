import AuthPanel from "../../components/auth/AuthPanel";

export const metadata = {
  title: "Auth | Peer Support",
  description: "Login or create your account",
};

export default function AuthPage({ searchParams }) {
  const mode = searchParams?.mode === "register" ? "register" : "login";

  return (
    <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Welcome Back</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#66686d] sm:text-lg">
          Sign in to continue your mentorship journey, or create an account in a few seconds.
        </p>
      </div>

      <AuthPanel initialMode={mode} redirectTo="/" />
    </main>
  );
}
