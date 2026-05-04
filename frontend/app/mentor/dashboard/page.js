import { IndianRupee, Calendar, Users, Star } from "lucide-react";

const statsCards = [
  {
    label: "Total Revenue",
    value: "₹45,600",
    subtitle: "This month: ₹12,400",
    icon: IndianRupee,
    shadowColor: "#5061E4",
    iconColor: "text-[#5061E4]",
  },
  {
    label: "Total Sessions",
    value: "28",
    subtitle: "This month: 8",
    icon: Calendar,
    shadowColor: "#F59E0B",
    iconColor: "text-[#F59E0B]",
  },
  {
    label: "Active Mentees",
    value: "8",
    subtitle: "Total: 12",
    icon: Users,
    shadowColor: "#F97316",
    iconColor: "text-[#F97316]",
  },
  {
    label: "Average Rating",
    value: "4.8",
    subtitle: "96.4% completion rate",
    icon: Star,
    shadowColor: "#4F46E5",
    iconColor: "text-[#F59E0B]",
  },
];

export default function MentorDashboardPage() {
  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Home</h1>
        <p className="mt-1 text-gray-500 font-medium">Welcome back! Here's your mentoring overview</p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-xl border-[3px] border-black bg-white p-5"
              style={{ boxShadow: `6px 6px 0 0 ${stat.shadowColor}` }}
            >
              <div className="mb-4">
                <Icon size={24} className={stat.iconColor} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-black">{stat.value}</p>
                <p className="mt-1 text-sm font-bold text-gray-500">{stat.label}</p>
                <p className="mt-1 text-xs font-semibold text-gray-400">{stat.subtitle}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
