export function LegalSection({ title, children, first = false }) {
  return (
    <section className={first ? "" : "mt-8 sm:mt-10"}>
      {title && (
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
      )}
      <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-gray-600">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

export function LastUpdated({ date }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
      Last updated: {date}
    </p>
  );
}
