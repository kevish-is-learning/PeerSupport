import Link from "next/link";
import PillButton from "../ui/PillButton";
import HeaderAuthButton from "../auth/HeaderAuthButton";

const navItems = [
  { label: "Find Mentors", href: "/mentee/find-mentors" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" }
];

const stats = [
  { value: "400+", label: "Happy Mentees" },
  { value: "50+", label: "B-Schools" },
  { value: "1000+", label: "Hrs of sessions" },
  { value: "4.8", label: "Rating on Google" }
];

function BrandMark() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 -rotate-6 items-center justify-center rounded-[3px] border-[3px] border-[#1a1a1a] bg-[#2563eb]"
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col">
      <header className="w-full border-y border-black bg-[#faf6f4] px-4 py-3.5 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-y-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-8 md:gap-y-0">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandMark />
            <div className="flex flex-col text-[1.35rem] font-bold leading-[0.95] tracking-[-0.04em] text-[#0d0d0f] sm:text-[1.5rem]">
              <span>Peer</span>
              <span>Support</span>
            </div>
          </Link>

          <div className="col-start-2 row-start-1 justify-self-end md:col-start-3">
            <HeaderAuthButton />
          </div>

          <nav
            className="col-span-2 row-start-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.9rem] font-bold text-[#0d0d0f] sm:gap-x-7 sm:text-[0.95rem] md:col-span-1 md:col-start-2 md:row-start-1 md:justify-center"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-opacity hover:opacity-65"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 pb-8 pt-12 text-center sm:px-6 sm:pt-14 lg:px-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl">
          Embrace your MBA career up
          <br />
          to the next level !
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#66686d] sm:text-lg md:text-xl">
          Lorem Ipsum dolor sit amet pisum Lorem Ipsum dolor sit
          <br />
          amet pisum
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <PillButton variant="accent">Primary CTA &gt;</PillButton>
          <PillButton variant="secondary">Secondary CTA &gt;</PillButton>
        </div>
      </div>

      <div
        className="mx-auto mt-auto grid w-full max-w-5xl grid-cols-2 gap-y-7 px-4 pb-12 text-center sm:px-6 md:grid-cols-4 md:gap-x-4 lg:px-8"
        aria-label="Highlights"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <h3 className="text-3xl font-extrabold leading-none tracking-[-0.03em] sm:text-4xl">
              {stat.value}
            </h3>
            <p className="mt-2 text-base text-[#1f1f21] sm:text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}