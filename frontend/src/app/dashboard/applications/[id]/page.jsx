"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  Linkedin,
  Download,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Separator } from "../../../../components/ui/separator";
import { Textarea } from "../../../../components/ui/textarea";
import { Label } from "../../../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { api } from "../../../../lib/api";
import { getInitials, formatDate, formatCurrency } from "../../../../lib/utils";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await api.admin.getApplicationById(params.id);
        setApplication(response.data.application);
      } catch (error) {
        toast.error("Failed to load application");
        router.push("/dashboard/applications");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApplication();
    }
  }, [params.id, router]);

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await api.admin.approveApplication(params.id);
      toast.success("Application approved successfully");
      router.push("/dashboard/applications");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    setSubmitting(true);
    try {
      await api.admin.rejectApplication(params.id, rejectReason);
      toast.success("Application rejected");
      router.push("/dashboard/applications");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  const user = application.user;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/applications">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </Link>

      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="text-2xl">
                {getInitials(user?.name || "U")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="mt-1 text-lg font-medium">{application.headline}</p>
                </div>
                <Badge
                  variant={
                    application.status === "APPROVED"
                      ? "success"
                      : application.status === "REJECTED"
                      ? "destructive"
                      : "secondary"
                  }
                  className="gap-1"
                >
                  {application.status === "APPROVED" && (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  {application.status === "REJECTED" && (
                    <XCircle className="h-3 w-3" />
                  )}
                  {application.status === "PENDING" && (
                    <Clock className="h-3 w-3" />
                  )}
                  {application.status}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{application.yearsOfExperience || 0}+ years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Applied on {formatDate(application.createdAt)}</span>
                </div>
              </div>

              {/* Links */}
              <div className="mt-4 flex gap-3">
                {application.linkedinUrl && (
                  <a
                    href={application.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}
                {application.websiteUrl && (
                  <a
                    href={application.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </Button>
                  </a>
                )}
                {application.resumeUrl && (
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Resume
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-gray-700">
            {application.bio || "No bio provided."}
          </p>
        </CardContent>
      </Card>

      {/* Skills */}
      {application.skills?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      {application.categories?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mentorship Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {application.categories.map((category, i) => (
                <Badge key={i} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience */}
      {application.experience?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                    {exp.description && (
                      <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {application.education?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {application.education.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Details */}
      <Card>
        <CardHeader>
          <CardTitle>Proposed Session Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-gray-600">Session Duration</p>
              <p className="text-lg font-medium">
                {application.sessionDuration || 30} minutes
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-gray-600">Price per Session</p>
              <p className="text-lg font-medium">
                {formatCurrency(application.pricePerSession || 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rejection Reason (if rejected) */}
      {application.status === "REJECTED" && application.rejectionReason && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Rejection Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{application.rejectionReason}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {application.status === "PENDING" && (
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Button
                onClick={handleApprove}
                disabled={submitting}
                className="flex-1 gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {submitting ? "Processing..." : "Approve Application"}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setRejectDialog(true)}
                disabled={submitting}
                className="flex-1 gap-2"
              >
                <XCircle className="h-4 w-4" />
                Reject Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application. This will be
              shared with the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reason">Rejection Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter the reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={submitting || !rejectReason.trim()}
            >
              {submitting ? "Rejecting..." : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
