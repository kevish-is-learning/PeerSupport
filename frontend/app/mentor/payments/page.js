const payoutRows = [
  { period: "Apr 1 - Apr 7", amount: "$420", status: "Processed" },
  { period: "Apr 8 - Apr 14", amount: "$360", status: "In Progress" },
  { period: "Apr 15 - Apr 21", amount: "$0", status: "Pending Sessions" },
];

export default function MentorPaymentsPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#fff7ed_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Payments</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Track Earnings & Payouts</h3>
        <p className="mt-2 text-black/70">
          Follow payout cycles, monitor completed sessions, and keep your earnings timeline transparent.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-3 border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
          <p>Cycle</p>
          <p>Amount</p>
          <p>Status</p>
        </div>
        <div className="mt-2 grid gap-2">
          {payoutRows.map((row) => (
            <article key={row.period} className="grid grid-cols-3 rounded-xl border border-black/10 bg-[#fafafa] px-3 py-2 text-sm">
              <p className="font-semibold">{row.period}</p>
              <p className="font-bold">{row.amount}</p>
              <p>{row.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
