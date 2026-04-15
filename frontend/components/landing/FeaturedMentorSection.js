import PillButton from "../ui/PillButton";

const mentor = {
  name: "Mihir Raj",
  bio: "Lorem ipsum dolor sit amet isu ubwsybd Lorem ipsum dolor sit amet isu ubwsybdLorem ipsum dolor sit amet isu ubwsybdLorem ipsum",
  image:
    "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=900&q=80",
  stats: [
    { value: "30+", label: "Sessions" },
    { value: "100+", label: "Something" },
    { value: "4.2 ★", label: "Rating" }
  ]
};

export default function FeaturedMentorSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto mt-20 w-full scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-4xl rounded-tl-none bg-[#FFB705] p-5 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-6 lg:rounded-[2.5rem] lg:rounded-tl-none lg:p-8">
        <div className="absolute -top-17 left-0 rounded-tl-4xl rounded-tr-4xl bg-[#F3AE04] px-6 py-4 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
          Learn from the BEST !
        </div>

        <div className="grid gap-6 pt-6 lg:grid-cols-[0.95fr_1fr] lg:items-stretch">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.8rem] lg:aspect-auto lg:h-full lg:min-h-0">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
                {mentor.name}
              </h2>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-black/90 sm:text-2xl">
                {mentor.bio}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center sm:mt-8">
              {mentor.stats.map((item) => (
                <div key={item.label}>
                  <p className="text-3xl font-extrabold leading-none sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-2xl sm:text-3xl">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 items-center justify-around sm:gap-4">
              <PillButton variant="primary" className="h-12 min-w-52.5 text-sm sm:text-lg">
                Book a session &gt;
              </PillButton>
              <PillButton variant="secondary" className="h-12 min-w-52.5 text-sm sm:text-lg">
                Explore Mentors &gt;
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}