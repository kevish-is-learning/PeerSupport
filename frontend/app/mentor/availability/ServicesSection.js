"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Clock, Timer, X, Loader2, Trash2, IndianRupee } from "lucide-react";
import { mentorServiceApi } from "../../../lib/api";
import { toast } from "sonner";

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

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  durationMinutes: 30,
  bufferMinutes: 0,
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const loadServices = useCallback(async () => {
    try {
      const res = await mentorServiceApi.getMine();
      setServices(res.data?.services || []);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const openCreate = () => {
    setEditingService(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditingService(svc);
    setForm({
      title: svc.title || "",
      description: svc.description || "",
      price: svc.price || "",
      durationMinutes: svc.durationMinutes || 30,
      bufferMinutes: svc.bufferMinutes || 0,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setForm(EMPTY_FORM);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
    const price = Number(form.price);
    if (!price || price < 50 || price > 2000) return toast.error("Price must be ₹50 – ₹2000");

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        price,
        durationMinutes: form.durationMinutes,
        bufferMinutes: form.bufferMinutes,
      };

      if (editingService) {
        await mentorServiceApi.update(editingService.id, payload);
        toast.success("Service updated!");
      } else {
        await mentorServiceApi.create(payload);
        toast.success("Service created!");
      }
      closeModal();
      await loadServices();
    } catch (e) {
      toast.error(e.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (svc) => {
    setTogglingId(svc.id);
    try {
      await mentorServiceApi.toggle(svc.id);
      await loadServices();
    } catch (e) {
      toast.error(e.message || "Failed to toggle service");
    } finally {
      setTogglingId(null);
    }
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-IN").format(p);

  if (loading) {
    return (
      <>
        {/* Header row skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div />
          <div className="h-11 w-40 rounded-xl bg-gray-200 animate-pulse border-[3px] border-gray-200"></div>
        </div>
        {/* Service cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[20px] border-[2.5px] border-gray-200 bg-white p-6 flex flex-col gap-3 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mt-1"></div>
              <div className="flex items-baseline gap-2 mt-2">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
              </div>
              <div className="flex items-center justify-between pt-2 mt-4 border-t border-gray-100">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-7 w-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-5 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_#000] hover:opacity-90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Plus size={16} strokeWidth={3} /> Add a Service
        </button>
      </div>

      {/* Empty state */}
      {services.length === 0 && (
        <div className="rounded-[20px] border-[3px] border-dashed border-gray-300 bg-white p-16 text-center">
          <IndianRupee size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="font-bold text-gray-400">No services yet</p>
          <p className="text-sm text-gray-400 mt-1">Click &quot;Add a Service&quot; to create your first offering.</p>
        </div>
      )}

      {/* Service cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-[20px] border-[2.5px] border-[#C4B5FD] bg-white p-6 flex flex-col gap-3 transition-all hover:shadow-lg"
          >
            {/* Title row */}
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-black text-black leading-tight pr-2">
                {svc.title}
              </h3>
              <button
                onClick={() => openEdit(svc)}
                className="shrink-0 flex items-center justify-center h-9 w-9 rounded-lg border-[2px] border-gray-200 bg-white text-gray-500 hover:border-black hover:text-black transition-all"
              >
                <Edit2 size={15} />
              </button>
            </div>

            {/* Description */}
            {svc.description && (
              <p className="text-sm text-gray-500 leading-relaxed -mt-1">
                {svc.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold text-gray-400">₹</span>
              <span className="text-2xl font-black text-black">
                ₹{formatPrice(svc.price)}
              </span>
            </div>

            {/* Duration & Buffer pills */}
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center justify-between rounded-xl bg-[#F9FAFB] border border-gray-100 px-4 py-2.5">
                <span className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                  <Clock size={14} /> Duration:
                </span>
                <span className="text-sm font-bold text-black">
                  {svc.durationMinutes} min
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#F9FAFB] border border-gray-100 px-4 py-2.5">
                <span className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                  <Timer size={14} /> Buffer Time:
                </span>
                <span className="text-sm font-bold text-black">
                  {svc.bufferMinutes > 0 ? `${svc.bufferMinutes} min` : "None"}
                </span>
              </div>
            </div>

            {/* Active toggle */}
            <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100">
              <span className={`text-sm font-bold ${svc.isActive ? "text-emerald-600" : "text-gray-400"}`}>
                {svc.isActive ? "Active" : "Inactive"}
              </span>
              <button
                onClick={() => handleToggle(svc)}
                disabled={togglingId === svc.id}
                className={`relative inline-flex h-7 w-12 items-center rounded-full border-[2px] transition-all duration-200 ${
                  svc.isActive
                    ? "bg-emerald-500 border-emerald-600"
                    : "bg-gray-200 border-gray-300"
                } ${togglingId === svc.id ? "opacity-50" : "cursor-pointer"}`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                    svc.isActive ? "translate-x-[22px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal card */}
          <div
            className="relative w-full max-w-lg rounded-[24px] border-[3px] border-black bg-white overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b-[3px] border-black">
              <h3 className="text-lg font-black text-black">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={closeModal}
                className="flex items-center justify-center h-8 w-8 rounded-lg border-[2px] border-gray-200 hover:border-black transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-7 flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Service Title <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Mock Interview, Resume Review"
                  className="rounded-xl border-[3px] border-black px-4 py-3 text-base font-bold focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Description <span className="text-gray-300">(optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of this service"
                  className="rounded-xl border-[3px] border-black px-4 py-3 text-base font-bold resize-none focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Price (₹50 – ₹2,000) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-gray-400">₹</span>
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="500"
                    className="w-full rounded-xl border-[3px] border-black pl-9 pr-4 py-3 text-base font-bold focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                  />
                </div>
              </div>

              {/* Duration & Buffer row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                    Duration <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.durationMinutes}
                    onChange={(e) => setForm((f) => ({ ...f, durationMinutes: Number(e.target.value) }))}
                    className="rounded-xl border-[3px] border-black px-4 py-3 text-base font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                    Buffer
                  </label>
                  <select
                    value={form.bufferMinutes}
                    onChange={(e) => setForm((f) => ({ ...f, bufferMinutes: Number(e.target.value) }))}
                    className="rounded-xl border-[3px] border-black px-4 py-3 text-base font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                  >
                    {BUFFER_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-7 py-5 border-t-[3px] border-black bg-[#FAFAFA]">
              <button
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border-[3px] border-black bg-white px-5 py-2.5 text-sm font-black hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_#000] hover:opacity-90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 transition-all"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {editingService ? "Save Changes" : "Create Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
