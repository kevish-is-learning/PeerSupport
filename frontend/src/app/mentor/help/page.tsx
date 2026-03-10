"use client";

import { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Mail,
  FileText,
  AlertCircle,
  Shield,
  BookOpen,
  CreditCard,
} from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      {
        q: "How do I set up my availability?",
        a: "Go to the Availability & Pricing tab. Select a day and time, then click Add Slot. Your available slots will be visible to mentees for booking.",
      },
      {
        q: "How do mentees find my profile?",
        a: "Once your application is approved and you have set up your profile with expertise, pricing, and availability, mentees can discover you through the platform's search and browse features.",
      },
      {
        q: "Can I update my profile after approval?",
        a: "Yes. Visit the Profile tab to update your bio, headline, expertise, social links, education, and work experience at any time.",
      },
    ],
  },
  {
    title: "Sessions & Bookings",
    icon: MessageSquare,
    items: [
      {
        q: "How do sessions work?",
        a: "Mentees book your available slots. You will receive a notification when a booking is made. On the scheduled time, use the meeting link provided in the booking to join the session.",
      },
      {
        q: "Can I reschedule or cancel a booking?",
        a: "Yes. From the Calendar or Inbox tab, you can reschedule a booking to a different available slot, or cancel it. Please respect the cancellation policy (default: 24 hours before the session).",
      },
      {
        q: "What session modes are available?",
        a: "The platform supports Video, Audio, and Chat session modes. The mode is selected by the mentee at the time of booking.",
      },
    ],
  },
  {
    title: "Payments & Payouts",
    icon: CreditCard,
    items: [
      {
        q: "How do I get paid?",
        a: "After a session is completed, earnings are added to your pending balance. Once cleared (typically 2-3 business days), they move to your available balance which you can withdraw.",
      },
      {
        q: "How do I withdraw my earnings?",
        a: "Go to the Payouts tab and click the Withdraw button. Enter the amount and choose your preferred method (Bank Transfer or UPI). Withdrawals are typically processed within 3-5 business days.",
      },
      {
        q: "Can I offer free sessions?",
        a: "Yes. Set your price per session to ₹0 in the Availability & Pricing tab to offer free mentoring sessions.",
      },
    ],
  },
  {
    title: "Policies & Guidelines",
    icon: Shield,
    items: [
      {
        q: "What is the cancellation policy?",
        a: "By default, sessions can be cancelled up to 24 hours before the scheduled time. Late cancellations may affect your rating and standing on the platform.",
      },
      {
        q: "What if a mentee doesn't show up?",
        a: "If a mentee is a no-show, you can mark the session as completed after the scheduled end time. The platform will handle the payment processing accordingly.",
      },
      {
        q: "How are ratings calculated?",
        a: "Your rating is the average of all feedback scores given by mentees after sessions. Higher ratings improve your visibility on the platform.",
      },
    ],
  },
];

export default function MentorHelpPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
        <p className="text-muted-foreground mt-1">
          Find answers and get support for your mentoring activities
        </p>
      </div>

      {/* Contact Support Card */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
            <HelpCircle size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Need direct help?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Our support team is available to help with any issues related to your mentoring,
              payments, or platform usage.
            </p>
          </div>
          <a
            href="mailto:support@peersupport.com"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Mail size={14} /> Contact Support
          </a>
        </div>
      </div>

      {/* Report Issue Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={24} className="text-red-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Report an Issue</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Having a problem with a session, payment, or mentee? Report it and our team will
              investigate.
            </p>
          </div>
          <a
            href="mailto:report@peersupport.com?subject=Issue Report"
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition flex items-center gap-2 whitespace-nowrap border border-red-500/20"
          >
            <FileText size={14} /> Report Issue
          </a>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-4">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title} className="bg-card border border-border rounded-xl">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <section.icon size={18} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item, idx) => {
                const key = `${section.title}-${idx}`;
                const isOpen = openItems[key];
                return (
                  <div key={key}>
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/50 transition"
                    >
                      <span className="text-sm font-medium text-foreground pr-4">
                        {item.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
