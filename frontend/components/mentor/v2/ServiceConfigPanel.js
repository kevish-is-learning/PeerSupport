"use client";

import { useState, useEffect } from "react";
import { v2Api } from "../../../lib/api";
import { toast } from "sonner";
import { Loader2, Check, X, Clock, IndianRupee, Shield, Zap } from "lucide-react";

const DURATION_OPTIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
];

const BUFFER_OPTIONS = [
  { value: 0, label: "None" },
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
];

const SERVICE_ICONS = {
  "resume-review": "📝",
  "mock-interview": "🎤",
  "profile-review": "👤",
  "sop-review": "📄",
  "gd-practice": "💬",
  "strategy-session": "🎯",
};

export default function ServiceConfigPanel() {
  const [catalogue, setCatalogue] = useState([]);
  const [configs, setConfigs] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catRes, myRes] = await Promise.all([
        v2Api.getServices(),
        v2Api.getMentorServices(),
      ]);

      const services = catRes?.data?.services || [];
      setCatalogue(services);

      // Build config map from existing mentor services
      const configMap = {};
      const mentorServices = myRes?.data?.services || [];
      for (const ms of mentorServices) {
        configMap[ms.serviceId] = {
          isActive: ms.isActive,
          price: ms.price,
          durationMinutes: ms.durationMinutes,
          bufferMinutes: ms.bufferMinutes || 0,
        };
      }
      // For services not yet configured, initialize as inactive
      for (const svc of services) {
        if (!configMap[svc.id]) {
          configMap[svc.id] = {
            isActive: false,
            price: "",
            durationMinutes: 30,
            bufferMinutes: 0,
          };
        }
      }
      setConfigs(configMap);
    } catch (e) {
      toast.error("Failed to load services");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId) => {
    setConfigs((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        isActive: !prev[serviceId]?.isActive,
      },
    }));
  };

  const updateConfig = (serviceId, field, value) => {
    setConfigs((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], [field]: value },
    }));
  };

  const handleSave = async () => {
    // Build payload — only active services
    const services = Object.entries(configs)
      .filter(([, cfg]) => cfg.isActive)
      .map(([serviceId, cfg]) => ({
        serviceId,
        price: Number(cfg.price),
        durationMinutes: cfg.durationMinutes,
        bufferMinutes: cfg.bufferMinutes,
        isActive: true,
      }));

    if (services.length === 0) {
      toast.error("Please activate at least one service");
      return;
    }

    // Validate prices
    const invalid = services.find((s) => !s.price || s.price <= 0);
    if (invalid) {
      toast.error("All active services must have a valid price");
      return;
    }

    setSaving(true);
    try {
      await v2Api.upsertMentorServices(services);
      toast.success("Services updated successfully");
    } catch (e) {
      toast.error(e.message || "Failed to save services");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#5061E4]" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111]">Service Configuration</h2>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Toggle services, set pricing, and configure session durations
        </p>
      </div>

      <div className="space-y-4">
        {catalogue.map((service) => {
          const cfg = configs[service.id] || {};
          const isActive = cfg.isActive;

          return (
            <div
              key={service.id}
              className={`rounded-xl border-[3px] border-black p-5 transition-all ${
                isActive ? "bg-white" : "bg-gray-50 opacity-60"
              }`}
              style={{
                boxShadow: isActive ? "5px 5px 0 0 #5061E4" : "4px 4px 0 0 #d1d5db",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{SERVICE_ICONS[service.slug] || "📦"}</span>
                  <div>
                    <h3 className="text-base font-bold text-[#111]">{service.name}</h3>
                    {service.description && (
                      <p className="mt-0.5 text-xs text-gray-500">{service.description}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`flex h-8 w-14 items-center rounded-full border-2 border-black px-1 transition-colors ${
                    isActive ? "bg-[#5061E4]" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border-2 border-black bg-white transition-transform ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {isActive && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Price */}
                  <div>
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                      <IndianRupee size={12} />
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={cfg.price}
                      onChange={(e) => updateConfig(service.id, "price", e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                      <Clock size={12} />
                      Duration
                    </label>
                    <select
                      value={cfg.durationMinutes}
                      onChange={(e) => updateConfig(service.id, "durationMinutes", Number(e.target.value))}
                      className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                    >
                      {DURATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buffer */}
                  <div>
                    <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                      <Zap size={12} />
                      Buffer
                    </label>
                    <select
                      value={cfg.bufferMinutes}
                      onChange={(e) => updateConfig(service.id, "bufferMinutes", Number(e.target.value))}
                      className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                    >
                      {BUFFER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
          {saving ? "Saving..." : "Save Services"}
        </button>
      </div>
    </div>
  );
}
