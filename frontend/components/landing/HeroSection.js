import PillButton from "../ui/PillButton";
import HeaderAuthButton from "../auth/HeaderAuthButton";

const navItems = ["Home", "Mentors", "Community", "Resources"];

const stats = [
  { value: "400+", label: "Happy Mentees" },
  { value: "50+", label: "B-Schools" },
  { value: "1000+", label: "Hrs of sessions" },
  { value: "4.8", label: "Rating on Google" }
];

function BrandMark() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 3H23V17H9C5.686 17 3 14.314 3 11C3 7.686 5.686 5 9 5V3Z"
        fill="#5A67E8"
      />
      <path
        d="M19 17H33V31C33 34.314 30.314 37 27 37C23.686 37 21 34.314 21 31V21H19V17Z"
        fill="#5A67E8"
      />
      <path d="M25 3H39V17H25V3Z" fill="#5A67E8" opacity="0.95" />
      <path d="M3 23H17V37H3V23Z" fill="#5A67E8" opacity="0.95" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col">
      <header className="mx-auto flex w-full flex-wrap items-center justify-between gap-4 border-b border-black/5 bg-[#FFFFFF]/95 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div className="flex flex-col text-[1.5rem] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[1.75rem]">
            <span>Peer</span>
            <span>Support</span>
          </div>
        </div>

        <nav
          className="order-3 flex w-full flex-wrap items-center justify-center gap-4 text-[0.95rem] font-medium sm:order-0 sm:w-auto sm:gap-6 sm:text-[1rem]"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a href="#" key={item} className="transition-opacity hover:opacity-70">
              {item}
            </a>
          ))}
          <HeaderAuthButton />
        </nav>


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