"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/stores/adminStore";
import { toast } from "sonner";
import {
  FileCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { format } from "date-fns";

export default function AdminApplicationsPage() {
  const { applications, pagination, fetchApplications, approveApplication, rejectApplication, isLoading } =
    useAdminStore();

  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const loadApplications = () => {
    const params: Record<string, unknown> = { page, limit: 20 };
    if (statusFilter) params.status = statusFilter;
    fetchApplications(params);
  };

  useEffect(() => {
    loadApplications();
  }, [page, statusFilter]);

  const handleApprove = async (appId: string) => {
    if (!confirm("Are you sure you want to approve this application?")) return;
    setActionLoading(true);
    try {
      await approveApplication(appId);
      toast.success("Application approved! User is now a mentor.");
      setSelectedApp(null);
    } catch {
      // handled by interceptor
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (appId: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setActionLoading(true);
    try {
      await rejectApplication(appId, rejectionReason);
      toast.success("Application rejected");
      setSelectedApp(null);
      setRejectionReason("");
    } catch {
      // handled by interceptor
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "REJECTED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-secondary text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mentor Applications</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve mentor applications
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex gap-2 flex-wrap">
          {["PENDING", "APPROVED", "REJECTED", ""].map((status) => (
            <button
              key={status || "all"}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {status || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No applications found
          </div>
        ) : (
          <>
            <div className="divide-y divide-border">
              {applications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-secondary/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                          {app.user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {app.user?.name || "Unknown User"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {app.user?.email}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {app.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {app.expertise?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {app.expertise && app.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-full">
                            +{app.expertise.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Price: ₹{app.pricePerSession}/session</span>
                        <span>Applied: {format(new Date(app.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-xs font-medium transition flex items-center gap-1"
                        >
                          <Eye size={12} /> View Details
                        </button>
                        {app.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              disabled={actionLoading}
                              className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-xs font-medium transition flex items-center gap-1 disabled:opacity-50"
                            >
                              <CheckCircle2 size={12} /> Approve
                            </button>
                            <button
                              onClick={() => setSelectedApp(app)}
                              disabled={actionLoading}
                              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition flex items-center gap-1 disabled:opacity-50"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Showing {applications.length} of {pagination.total} applications
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Page {page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                    className="p-1.5 rounded hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Application Details</h2>
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setRejectionReason("");
                }}
                className="p-2 rounded-lg hover:bg-secondary transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Applicant</h3>
                <p className="text-foreground">{selectedApp.user?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedApp.user?.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Bio</h3>
                <p className="text-sm text-foreground">{selectedApp.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.expertise?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Price per Session
                </h3>
                <p className="text-foreground">₹{selectedApp.pricePerSession}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    selectedApp.status
                  )}`}
                >
                  {selectedApp.status}
                </span>
              </div>

              {selectedApp.status === "PENDING" && (
                <div className="pt-4 border-t border-border space-y-3">
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Rejection reason (optional for approval, required for rejection)"
                    rows={3}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(selectedApp.id)}
                      disabled={actionLoading}
                      className="flex-1 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}
                      Approve Application
                    </button>
                    <button
                      onClick={() => handleReject(selectedApp.id)}
                      disabled={actionLoading}
                      className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <XCircle size={14} />
                      )}
                      Reject Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
