/**
 * Neo-brutalist circular card: white disc, border, hard accent shadow.
 * @param {'orange' | 'blue'} accent — problem row uses orange, solution row uses blue
 * @param {boolean} compact — smaller circle for journey ring layout
 */
export default function CircularFeatureCard({
  title,
  description,
  icon: Icon,
  accent = "orange",
  compact = false
}) {
  const blue = "#5061E4";
  const orange = "#F59E0B";
  const iconTile =
    accent === "orange"
      ? "bg-[#F59E0B] text-white"
      : "text-white";
  const iconTileStyle = accent === "blue" ? { backgroundColor: blue } : undefined;

  if (compact) {
    const ring = accent === "orange" ? orange : blue;
    return (
      <article
        className="flex h-[118px] w-[118px] flex-col items-center justify-start rounded-full border-2 border-[#1f2937] bg-white px-2 pb-3 pt-3 text-center sm:h-[132px] sm:w-[132px]"
        style={{
          boxShadow: `4px 4px 0 0 ${ring}`
        }}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-[#1f2937] ${iconTile}`}
          style={iconTileStyle}
        >
          <Icon size={18} strokeWidth={2.5} aria-hidden />
        </div>
        <h3 className="mt-1.5 line-clamp-2 text-[0.65rem] font-extrabold leading-tight text-[#1f2937] sm:text-[0.7rem]">
          {title}
        </h3>
        <p className="mt-0.5 line-clamp-2 max-w-22 text-[0.58rem] leading-tight text-[#6b7280] sm:max-w-24 sm:text-[0.6rem]">
          {description}
        </p>
      </article>
    );
  }

  return (
    <article
      className="flex h-[min(100%,260px)] w-[min(100%,260px)] flex-col items-center justify-start rounded-full border-[3px] border-[#1a1a1a] bg-white px-5 pb-6 pt-7 text-center sm:h-[260px] sm:w-[260px]"
      style={
        accent === "blue"
          ? { boxShadow: `6px 6px 0 0 ${blue}` }
          : { boxShadow: `6px 6px 0 0 ${orange}` }
      }
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-[#1a1a1a] ${iconTile}`}
        style={iconTileStyle}
      >
        <Icon size={22} strokeWidth={2.5} aria-hidden />
      </div>
      <h3 className="mt-3 text-[0.95rem] font-extrabold leading-tight text-[#0d0d0f] sm:text-base">
        {title}
      </h3>
      <p className="mt-2 max-w-52 text-[0.78rem] leading-snug text-[#5c5f69] sm:text-[0.8rem]">
        {description}
      </p>
    </article>
  );
}
