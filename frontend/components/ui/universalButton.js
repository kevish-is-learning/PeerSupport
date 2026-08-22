export default function UniversalButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const variants = {
    primary: "bg-[#5f6cf3] text-white shadow-[2px_2px_0_#1a1a1a] sm:shadow-[3px_3px_0_#1a1a1a] hover:bg-[#4f5de8]",
    secondary: "bg-[#f3f0ee] text-[#343434] shadow-[2px_2px_0_#1a1a1a] sm:shadow-[3px_3px_0_#1a1a1a] hover:bg-[#e8e4e0]",
    yellow: "bg-[#FFB705] text-black shadow-[2px_2px_0_#1a1a1a] sm:shadow-[3px_3px_0_#1a1a1a] hover:bg-[#e6a504]",
    accent: "bg-[#2E2E2E] text-white shadow-[2px_2px_0_#FFB705] sm:shadow-[3px_3px_0_#FFB705] border-none hover:bg-black",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex cursor-pointer h-10 sm:h-11 min-w-0 items-center justify-center rounded-full border-2 border-black px-4 sm:px-6 text-xs sm:text-sm font-bold transition-all hover:translate-y-0.5 hover:shadow-none active:translate-y-0.5 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}