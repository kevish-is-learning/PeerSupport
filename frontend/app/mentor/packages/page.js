"use client";

import { useCallback, useEffect, useState } from "react";
import { Layers, Plus, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { packageApi, mentorServiceApi } from "../../../lib/api";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Skeleton,
  Textarea,
  formatCurrency,
} from "../../../components/ui/kit";

export default function MentorPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const [pkgRes, svcRes] = await Promise.all([
        packageApi.listMine(),
        mentorServiceApi.getMine(),
      ]);
      setPackages(pkgRes.data?.packages || []);
      setServices((svcRes.data?.services || []).filter((s) => s.isActive));
    } catch (err) {
      toast.error(err.message || "Could not load your packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (pkg) => {
    try {
      const res = await packageApi.remove(pkg.id);
      toast.success(
        res.data?.retired
          ? "Package retired — existing purchases stay valid"
          : "Package deleted"
      );
      load();
    } catch (err) {
      toast.error(err.message || "Could not remove that package");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Session Packages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Bundle sessions at a discount. Mentees buy once and redeem across bookings.
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          disabled={services.length === 0}
        >
          <Plus className="h-4 w-4" />
          New package
        </Button>
      </header>

      {!loading && services.length === 0 && (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          Add at least one active service before creating a package.
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      )}

      {!loading && packages.length === 0 && (
        <EmptyState
          icon={Layers}
          title="No packages yet"
          description="A 5-session bundle at a modest discount is the easiest way to earn repeat bookings."
          action={
            services.length > 0 && (
              <Button
                size="sm"
                onClick={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
              >
                Create a package
              </Button>
            )
          }
        />
      )}

      {!loading && packages.length > 0 && (
        <div className="space-y-3">
          {packages.map((pkg) => {
            const discount =
              pkg.listPrice && pkg.listPrice > pkg.price
                ? Math.round(((pkg.listPrice - pkg.price) / pkg.listPrice) * 100)
                : 0;

            return (
              <Card key={pkg.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-900">{pkg.title}</h2>
                      {pkg.isActive ? (
                        <Badge tone="success">Live</Badge>
                      ) : (
                        <Badge tone="neutral">Hidden</Badge>
                      )}
                      {discount > 0 && <Badge tone="brand">{discount}% off</Badge>}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {pkg.sessionCount} × {pkg.serviceName} · valid {pkg.validityDays} days
                    </p>
                    {pkg.description && (
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                        {pkg.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-gray-900">
                      {formatCurrency(pkg.price)}
                    </p>
                    <p className="-mt-0.5 text-[11px] text-gray-400">
                      {formatCurrency(pkg.perSessionPrice)}/session
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Users className="h-3.5 w-3.5" />
                    {pkg.totalPurchases} purchase{pkg.totalPurchases === 1 ? "" : "s"}
                  </span>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(pkg);
                        setFormOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(pkg)}>
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <PackageFormModal
        open={formOpen}
        pkg={editing}
        services={services}
        onClose={() => setFormOpen(false)}
        onSaved={() => {
          setFormOpen(false);
          load();
        }}
      />
    </div>
  );
}

function PackageFormModal({ open, pkg, services, onClose, onSaved }) {
  const isEdit = Boolean(pkg);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(
      pkg
        ? {
            title: pkg.title,
            description: pkg.description || "",
            mentorServiceId: pkg.mentorServiceId,
            sessionCount: String(pkg.sessionCount),
            price: String(pkg.price),
            validityDays: String(pkg.validityDays),
            isActive: pkg.isActive,
          }
        : {
            title: "",
            description: "",
            mentorServiceId: services[0]?.id ?? "",
            sessionCount: "5",
            price: "",
            validityDays: "180",
            isActive: true,
          }
    );
  }, [open, pkg, services]);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const selectedService = services.find((s) => s.id === form.mentorServiceId);
  const listPrice = selectedService
    ? selectedService.price * (Number(form.sessionCount) || 0)
    : 0;
  const price = Number(form.price) || 0;
  const discount = listPrice > 0 && price > 0 ? Math.round(((listPrice - price) / listPrice) * 100) : 0;

  const handleSave = async () => {
    if (form.title.trim().length < 3) return toast.error("Give the package a title");
    if (!form.mentorServiceId) return toast.error("Pick a service");

    const sessionCount = Number(form.sessionCount);
    if (!Number.isInteger(sessionCount) || sessionCount < 2) {
      return toast.error("A package needs at least 2 sessions");
    }
    if (price <= 0) return toast.error("Enter a price above zero");
    if (listPrice > 0 && price > listPrice) {
      return toast.error("Package price can't exceed the cost of booking individually");
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        sessionCount,
        price,
        validityDays: Number(form.validityDays) || 180,
        isActive: form.isActive,
      };

      if (isEdit) {
        await packageApi.update(pkg.id, payload);
        toast.success("Package updated");
      } else {
        await packageApi.create({ ...payload, mentorServiceId: form.mentorServiceId });
        toast.success("Package created");
      }
      onSaved();
    } catch (err) {
      toast.error(err.message || "Could not save that package");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit package" : "New package"}
      description="Mentees pay once and redeem sessions over time."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving}>
            {isEdit ? "Save changes" : "Create package"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Title" required>
          <Input
            value={form.title ?? ""}
            onChange={set("title")}
            placeholder="e.g. 5-session interview intensive"
            maxLength={120}
          />
        </Field>

        <Field label="Service" required hint={isEdit ? "Service can't be changed after creation" : undefined}>
          <Select value={form.mentorServiceId ?? ""} onChange={set("mentorServiceId")} disabled={isEdit}>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title} — {formatCurrency(service.price)}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Sessions" required>
            <Input
              type="number"
              min={2}
              max={50}
              value={form.sessionCount ?? ""}
              onChange={set("sessionCount")}
            />
          </Field>
          <Field label="Total price (₹)" required>
            <Input type="number" min={1} value={form.price ?? ""} onChange={set("price")} />
          </Field>
        </div>

        {listPrice > 0 && (
          <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Booked individually</span>
              <span>{formatCurrency(listPrice)}</span>
            </div>
            <div className="mt-1 flex justify-between font-semibold text-gray-900">
              <span>Package price</span>
              <span>{price > 0 ? formatCurrency(price) : "—"}</span>
            </div>
            {discount > 0 && (
              <p className="mt-1.5 font-semibold text-emerald-600">
                Mentee saves {formatCurrency(listPrice - price)} ({discount}%)
              </p>
            )}
            {price > listPrice && (
              <p className="mt-1.5 font-semibold text-red-500">
                This costs more than booking individually.
              </p>
            )}
          </div>
        )}

        <Field label="Validity (days)" hint="How long a mentee has to use the sessions">
          <Input
            type="number"
            min={7}
            max={730}
            value={form.validityDays ?? ""}
            onChange={set("validityDays")}
          />
        </Field>

        <Field label="Description">
          <Textarea
            value={form.description ?? ""}
            onChange={set("description")}
            rows={3}
            maxLength={1000}
            placeholder="What does this package cover?"
          />
        </Field>

        <Checkbox
          checked={form.isActive ?? true}
          onChange={set("isActive")}
          label="Visible to mentees"
          description="Turn off to hide it without affecting existing purchases."
        />
      </div>
    </Modal>
  );
}
