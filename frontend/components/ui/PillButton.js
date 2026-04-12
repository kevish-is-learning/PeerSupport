export default function PillButton({
  href = "#",
  children,
  variant = "primary",
  className = ""
}) {
  const variants = {
    primary: "bg-[#5f6cf3] text-[#f8f8ff]",
    secondary: "bg-[#f3f0ee] text-[#343434]",
    accent: "bg-[#ffc20f] text-[#0d0d0f]"
  };

  return (
    <a
      href={href}
      className={`inline-flex h-11 min-w-41.25 items-center justify-center rounded-full border-2 border-black px-5 text-sm font-semibold shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}