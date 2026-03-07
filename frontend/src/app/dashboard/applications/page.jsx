"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useAdminStore } from "../../../stores/adminStore";
import { api } from "../../../lib/api";
import { getInitials, formatDate } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function ApplicationsPage() {
  const {
    applications,
    applicationsLoading,
    totalApplications,
    fetchApplications,
  } = useAdminStore();
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    fetchApplications({
      page,
      limit,
      status: statusFilter !== "ALL" ? statusFilter : undefined,
      search: search || undefined,
    });
  }, [fetchApplications, page, statusFilter, search]);

  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const approvedCount = applications.filter((a) => a.status === "APPROVED").length;
  const rejectedCount = applications.filter((a) => a.status === "REJECTED").length;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleQuickAction = async (applicationId, action) => {
    try {
      if (action === "approve") {
        await api.admin.approveApplication(applicationId);
        toast.success("Application approved");
      } else {
        await api.admin.rejectApplication(applicationId, "Application rejected");
        toast.success("Application rejected");
      }
      fetchApplications({ page, limit, status: statusFilter });
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mentor Applications</h1>
        <p className="mt-1 text-gray-600">
          Review and manage mentor applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === "PENDING" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter("PENDING")}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === "APPROVED" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter("APPROVED")}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-colors ${
            statusFilter === "REJECTED" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setStatusFilter("REJECTED")}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-red-100 p-3">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({totalApplications})</CardTitle>
        </CardHeader>
        <CardContent>
          {applicationsLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : applications.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-600">No applications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={app.user?.profilePicture} />
                      <AvatarFallback>
                        {getInitials(app.user?.name || "U")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{app.user?.name}</h3>
                          <p className="text-sm text-gray-600">{app.user?.email}</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">
                            {app.headline}
                          </p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{app.yearsOfExperience || 0}+ years exp</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          <span>
                            {app.skills?.slice(0, 3).join(", ") || "No skills listed"}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {app.bio}
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        Applied on {formatDate(app.createdAt)}
                      </p>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <Link href={`/dashboard/applications/${app.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      {app.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleQuickAction(app.id, "approve")}
                            className="gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleQuickAction(app.id, "reject")}
                            className="gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalApplications > limit && (
            <div className="mt-4 flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {page} of {Math.ceil(totalApplications / limit)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(totalApplications / limit)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
