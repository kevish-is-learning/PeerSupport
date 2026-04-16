export default function HighlightPill({
  text,
  variant,
  className = "",
}) {
  const variants = {
    primary: "bg-[#5763E6] text-[#FFFFFF]",
    secondary: "bg-[#FFB705] text-[#2E2E2E]",
  };
  return (
    <div
      className={`inline-flex p-2 min-w-41.25 items-center justify-center rounded-full border-2 border-black px-5 text-sm font-medium shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[0px_0px_0_rgba(0,0,0,1)] ${variants[variant]} ${className}`}
    >
      {text}
    </div>
  );
}
