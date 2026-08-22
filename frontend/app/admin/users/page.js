"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";

const ROLES = ["", "MENTOR", "MENTEE", "ADMIN"];

const formatDate = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); } catch { return v; }
};

const ROLE_COLORS = {
  ADMIN: "border-purple-900/50 bg-purple-950/20 text-purple-400",
  MENTOR: "border-blue-900/50 bg-blue-950/20 text-blue-400",
  MENTEE: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [mutatingId, setMutatingId] = useState("");

  const loadUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminApi.listUsers({
        page,
        limit: 20,
        search: search || undefined,
        role: roleFilter || undefined,
        isActive: activeFilter === "" ? undefined : activeFilter === "true",
      });
      setUsers(res.data.users);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, activeFilter]);

  useEffect(() => {
    loadUsers(1);
  }, [loadUsers]);

  const handleToggleActive = async (userId, currentActive) => {
    setMutatingId(userId);
    try {
      await adminApi.toggleUserActive(userId, { isActive: !currentActive });
      toast.success(`User ${currentActive ? "deactivated" : "reactivated"}`);
      loadUsers(pagination.page);
    } catch (err) {
      toast.error(err.message || "Failed to update user");
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Users</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Search, filter, and manage all registered users.</p>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[200px] flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-indigo-500 transition-colors shadow-xs"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors shadow-xs cursor-pointer"
        >
          <option value="">All Roles</option>
          {ROLES.filter(Boolean).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors shadow-xs cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
          {pagination.total} users
        </div>
      </section>

      {/* Table */}
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-xs transition-colors">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-300 dark:border-zinc-800 border-t-indigo-600 dark:border-t-white" />
          </div>
        ) : users.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/50 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-zinc-900 dark:text-white">{u.name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{u.email} · {u.provider}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${ROLE_COLORS[u.role] || "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50"}`}>
                        {u.role}
                      </span>
                      {!u.hasProfile && u.role !== "ADMIN" && (
                        <p className="mt-1.5 text-[10px] text-amber-600 dark:text-amber-500/80">Incomplete Profile</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${u.isActive ? "border-emerald-900/50 bg-emerald-950/20 text-emerald-600 dark:text-emerald-400" : "border-red-900/50 bg-red-950/20 text-red-600 dark:text-red-400"}`}>
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.role !== "ADMIN" && (
                        <button
                          onClick={() => handleToggleActive(u.id, u.isActive)}
                          disabled={mutatingId === u.id}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer ${
                            u.isActive
                              ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                              : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                          }`}
                        >
                          {mutatingId === u.id ? "..." : u.isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
            <button
              onClick={() => loadUsers(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => loadUsers(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
