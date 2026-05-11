
export default function UniversalButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}) {
  const variants = {
    primary: "bg-[#5f6cf3] text-[#FFFFFF] shadow-[3px_3px_0_#1a1a1a]",
    secondary: "bg-[#f3f0ee] text-[#343434] shadow-[3px_3px_0_#1a1a1a]",
    yellow: "bg-[#FFB705] text-[#000000] shadow-[3px_3px_0_#1a1a1a]",
    accent:
      "bg-[#2E2E2E] text-[#FFFFFF] shadow-[3px_3px_0_#FFB705] border-none",
  };

  return (
    <button
      className={`inline-flex cursor-pointer h-11 min-w-41.25 items-center justify-center rounded-full border-2 border-black px-5 text-sm font-semibold transition-all hover:translate-y-0.5 hover:shadow-[0px_0px_0_rgba(0,0,0,1)] ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}