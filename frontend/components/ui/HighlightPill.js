export default function HighlightPill({
  text,
  variant = "primary",
  className = "",
  icon,
  children
}) {
  const variants = {
    primary: "bg-[#5061E4] text-[#FFFFFF]",
    secondary: "bg-[#FFB800] text-[#1f2937]",
    orange: "bg-[#FB923C] text-[#FFFFFF]",
    blue: "bg-[#5061E4] text-[#FFFFFF]"
  };
  const tone = variants[variant] ?? variants.primary;

  return (
    <div
      className={`inline-flex min-w-41.25 items-center justify-center rounded-full border-2 border-black py-3 px-5 text-sm font-medium shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[0px_0px_0_rgba(0,0,0,1)] ${tone} ${className}`}
    >
      {children ?? (
        <>
          {icon ? <span className="mr-2 inline-flex shrink-0 items-center">{icon}</span> : null}
          {text}
        </>
      )}
    </div>
  );
}
