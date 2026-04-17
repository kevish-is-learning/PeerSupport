import AuthPanel from "../../components/auth/AuthPanel";
import Image from "next/image";

export const metadata = {
  title: "Auth | Peer Support",
  description: "Login or create your account",
};

export default function AuthPage({ searchParams }) {
  const mode = searchParams?.mode === "register" ? "register" : "login";

  return (
    <main className="min-h-screen text-[#0d0d0f] flex min-h-[100dvh]">
      {/* Left side illustration */}
      <div className="hidden lg:flex w-1/2 bg-[#d7d1cc] relative overflow-hidden flex-col items-center justify-center">
        <div className="absolute top-[20%] w-[350px] aspect-[4/7] border border-black border-b-0 overflow-hidden pt-4 z-10 box-border bg-white" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '70px 70px' }}>
          <div className="w-[85%] aspect-square bg-[#f55246] mx-auto mt-[20%] flex items-center justify-center relative">
            {/* The circle with face */}
            <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] absolute z-20">
              <circle cx="50" cy="50" r="32" fill="none" stroke="#2c2f33" strokeWidth="8" strokeLinecap="round" />
              <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="#2c2f33" strokeWidth="10" strokeLinecap="round" className="opacity-80" />
              
              <circle cx="36" cy="40" r="4" fill="#2c2f33" />
              <circle cx="64" cy="40" r="4" fill="#2c2f33" />
              <path d="M 33 55 Q 50 75 67 55" fill="none" stroke="#2c2f33" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute bottom-0 w-[110%] ml-[-5%] z-20 flex flex-wrap leading-none" style={{ gap: '0px' }}>
             <div className="w-full flex justify-between px-[5%] -mb-[1px]">
               <div className="w-[30%] aspect-square bg-[#86a6f6]" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
               <div className="w-[30%] aspect-square bg-[#86a6f6]" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
               <div className="w-[30%] aspect-square bg-[#86a6f6]" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
             </div>
             <div className="w-full flex justify-between">
               <div className="w-[23%] aspect-[0.9] bg-[#225bf0]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
               <div className="w-[23%] aspect-[0.9] bg-[#225bf0]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
               <div className="w-[23%] aspect-[0.9] bg-[#225bf0]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
               <div className="w-[23%] aspect-[0.9] bg-[#225bf0]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 bg-[#fdfaf7] flex text-left p-8 sm:p-12 lg:p-20 relative overflow-y-auto items-center justify-center">
        <div className="w-full max-w-[420px] mx-auto">
          <AuthPanel initialMode={mode} redirectTo="/onboarding" guestOnly />
        </div>
      </div>
    </main>
  );
}
