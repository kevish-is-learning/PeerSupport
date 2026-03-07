"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Mail,
  Shield,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { useAdminStore } from "../../../stores/adminStore";
import { api } from "../../../lib/api";
import { getInitials, formatDate } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";
import { toast } from "sonner";

export default function UsersPage() {
  const { users, usersLoading, totalUsers, fetchUsers } = useAdminStore();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionDialog, setActionDialog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const limit = 20;

  useEffect(() => {
    const filters = {
      page,
      limit,
      search: search || undefined,
      role: roleFilter !== "ALL" ? roleFilter : undefined,
      isActive: statusFilter !== "ALL" ? statusFilter === "ACTIVE" : undefined,
    };
    fetchUsers(filters);
  }, [fetchUsers, page, search, roleFilter, statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleAction = async () => {
    if (!selectedUser || !actionDialog) return;
    setSubmitting(true);
    try {
      switch (actionDialog) {
        case "activate":
          await api.admin.updateUser(selectedUser.id, { isActive: true });
          toast.success("User activated successfully");
          break;
        case "deactivate":
          await api.admin.updateUser(selectedUser.id, { isActive: false });
          toast.success("User deactivated successfully");
          break;
        case "makeAdmin":
          await api.admin.updateUser(selectedUser.id, { role: "ADMIN" });
          toast.success("User promoted to admin");
          break;
        case "delete":
          await api.admin.deleteUser(selectedUser.id);
          toast.success("User deleted successfully");
          break;
      }
      fetchUsers({ page, limit });
      setActionDialog(null);
      setSelectedUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "MENTOR":
        return "default";
      case "MENTEE":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-gray-600">
          Manage all users on the platform
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MENTOR">Mentor</SelectItem>
                <SelectItem value="MENTEE">Mentee</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Users ({totalUsers})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-600">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.profilePicture} />
                            <AvatarFallback>
                              {getInitials(user.name || "U")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant={user.isActive ? "success" : "outline"}
                          className={!user.isActive ? "text-red-600" : ""}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setActionDialog(
                                  user.isActive ? "deactivate" : "activate"
                                );
                              }}
                            >
                              {user.isActive ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            {user.role !== "ADMIN" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionDialog("makeAdmin");
                                }}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Make Admin
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedUser(user);
                                setActionDialog("delete");
                              }}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalUsers > limit && (
            <div className="mt-4 flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {page} of {Math.ceil(totalUsers / limit)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(totalUsers / limit)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={!!actionDialog} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog === "activate" && "Activate User"}
              {actionDialog === "deactivate" && "Deactivate User"}
              {actionDialog === "makeAdmin" && "Promote to Admin"}
              {actionDialog === "delete" && "Delete User"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog === "activate" &&
                `Are you sure you want to activate ${selectedUser?.name}?`}
              {actionDialog === "deactivate" &&
                `Are you sure you want to deactivate ${selectedUser?.name}? They will not be able to access the platform.`}
              {actionDialog === "makeAdmin" &&
                `Are you sure you want to promote ${selectedUser?.name} to admin? They will have full access to the platform.`}
              {actionDialog === "delete" &&
                `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button
              variant={actionDialog === "delete" ? "destructive" : "default"}
              onClick={handleAction}
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
