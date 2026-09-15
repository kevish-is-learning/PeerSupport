"use client";

/**
 * Minimal shared UI primitives.
 *
 * Deliberately small: a handful of composable pieces that keep the newer pages
 * visually consistent without pulling in a component library.
 */

import { useEffect, useRef, useState } from "react";
import { Loader2, X, ChevronDown, Inbox } from "lucide-react";

export const cx = (...parts) => parts.filter(Boolean).join(" ");

/* ─── Button ──────────────────────────────────────────────────────────────── */

const BUTTON_VARIANTS = {
  primary:
    "bg-[#5061E4] text-white hover:bg-[#4453cc] disabled:hover:bg-[#5061E4] shadow-sm",
  secondary:
    "bg-white text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
};

const BUTTON_SIZES = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-sm gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cx(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5061E4]/40",
        "disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]",
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ─── Surfaces ────────────────────────────────────────────────────────────── */

export function Card({ className, interactive = false, children, ...props }) {
  return (
    <div
      className={cx(
        "rounded-xl border border-gray-200 bg-white",
        interactive &&
          "transition-all hover:border-gray-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const BADGE_TONES = {
  neutral: "bg-gray-100 text-gray-600",
  brand: "bg-[#EEF0FE] text-[#5061E4]",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
};

export function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold",
        BADGE_TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ─── Form fields ─────────────────────────────────────────────────────────── */

const FIELD_BASE =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 " +
  "placeholder-gray-400 transition-colors focus:border-[#5061E4] focus:outline-none " +
  "focus:ring-2 focus:ring-[#5061E4]/10 disabled:bg-gray-50 disabled:text-gray-400";

export function Field({ label, hint, error, required, children }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-xs font-semibold text-gray-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="mt-1 block text-[11px] text-gray-400">{hint}</span>}
      {error && <span className="mt-1 block text-[11px] text-red-500">{error}</span>}
    </label>
  );
}

export function Input({ className, ...props }) {
  return <input className={cx(FIELD_BASE, className)} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={cx(FIELD_BASE, "resize-none", className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select className={cx(FIELD_BASE, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export function Checkbox({ label, description, className, ...props }) {
  return (
    <label className={cx("flex cursor-pointer items-start gap-2.5", className)}>
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#5061E4]"
        {...props}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-gray-800">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-gray-500">{description}</span>
        )}
      </span>
    </label>
  );
}

/* ─── Modal ───────────────────────────────────────────────────────────────── */

export function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    // Prevent the page behind the dialog from scrolling with it.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className={cx(
          "relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl",
          sizes[size]
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-gray-900">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/60 px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Feedback states ─────────────────────────────────────────────────────── */

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 px-6 py-14 text-center">
      <Icon className="h-7 w-7 text-gray-300" strokeWidth={1.5} />
      <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
      {description && <p className="mt-1 max-w-sm text-xs text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cx("animate-pulse rounded-lg bg-gray-100", className)} />;
}

export function Spinner({ className }) {
  return <Loader2 className={cx("h-5 w-5 animate-spin text-gray-400", className)} />;
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */

export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div className={cx("flex gap-1 overflow-x-auto border-b border-gray-200", className)}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cx(
              "relative shrink-0 px-3 py-2.5 text-sm font-semibold transition-colors",
              active ? "text-[#5061E4]" : "text-gray-500 hover:text-gray-800"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cx(
                  "ml-1.5 rounded px-1.5 py-0.5 text-[10px]",
                  active ? "bg-[#EEF0FE] text-[#5061E4]" : "bg-gray-100 text-gray-500"
                )}
              >
                {tab.count}
              </span>
            )}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#5061E4]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Accordion ───────────────────────────────────────────────────────────── */

export function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/70"
            >
              <span className="text-sm font-semibold text-gray-900">{item.title}</span>
              <ChevronDown
                className={cx(
                  "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
            <div
              className={cx(
                "grid transition-all duration-200 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="whitespace-pre-wrap px-5 pb-4 text-sm leading-relaxed text-gray-600">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Razorpay checkout ───────────────────────────────────────────────────── */

/**
 * Load the Razorpay script once and open a checkout.
 * Resolves with the gateway response, or null if the user dismissed it.
 */
export function useRazorpay() {
  const loaded = useRef(false);

  const ensureScript = () =>
    new Promise((resolve, reject) => {
      if (loaded.current || window.Razorpay) {
        loaded.current = true;
        return resolve();
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        loaded.current = true;
        resolve();
      };
      script.onerror = () => reject(new Error("Could not load the payment gateway"));
      document.body.appendChild(script);
    });

  const open = async ({ order, name, description, prefill }) => {
    await ensureScript();

    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: name || "PeerSupport",
        description,
        prefill: prefill || {},
        theme: { color: "#5061E4" },
        handler: (response) => resolve(response),
        modal: { ondismiss: () => resolve(null) },
      });
      checkout.on("payment.failed", (e) =>
        reject(new Error(e?.error?.description || "Payment failed"))
      );
      checkout.open();
    });
  };

  return { open };
}

/* ─── Formatting ──────────────────────────────────────────────────────────── */

export const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
