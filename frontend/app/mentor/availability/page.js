"use client";

import ServicesSection from "./ServicesSection";
import AvailabilityCalendar from "../../../components/mentor/v2/AvailabilityCalendar";
import { useState } from "react";
import { Settings, CalendarDays } from "lucide-react";

const TABS = [
  { id: "services", label: "Services", icon: Settings },
  { id: "availability", label: "Availability", icon: CalendarDays },
];

export default function MentorAvailabilityV2Page() {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 bg-[#FAF9F6]">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Availability</h1>
        <p className="mt-1 text-gray-500 font-medium">
          Configure your services and set your availability schedule
        </p>
      </header>

      {/* Tab Switcher */}
      <div className="mb-8 flex gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-black transition-all ${
                isActive
                  ? "border-black bg-[#10B981] text-white shadow-[3px_3px_0_0_#000]"
                  : "border-black bg-white text-black hover:bg-gray-50"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "services" && <ServicesSection />}
      {activeTab === "availability" && <AvailabilityCalendar />}
    </div>
  );
}
