const logos = ["Sitemark", "Product.", "PinPoint", "hues", "Rise", "Sitemark", "Product.", "Product."];

const serviceCards = [1, 2, 3];

export default function CuratedServicesSection() {
  return (
    <section className="mx-auto w-full px-4 pb-24 pt-6 text-center sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl">
        Get mentors from colleges you dream of
      </h2>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-4 text-lg font-semibold text-black/80 sm:text-xl">
        {logos.map((logo, index) => (
          <span key={`${logo}-${index}`} className="inline-flex items-center gap-1.5 leading-none">
            <span className="text-black/40">✦</span>
            {logo}
          </span>
        ))}
      </div>

      <h3 className="mx-auto mt-12 max-w-4xl text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl">
        Services which are only curated for YOU !
      </h3>

      <div className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCards.map((card) => (
          <article
            key={card}
            className="h-64 rounded-sm bg-[#efefef] sm:h-72"
            aria-label={`Service card ${card}`}
          />
        ))}
      </div>
    </section>
  );
}
