"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Mail,
  Linkedin,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Separator } from "../../../../components/ui/separator";
import { api } from "../../../../lib/api";
import { getInitials, formatCurrency, formatDate, formatTime } from "../../../../lib/utils";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";

export default function MentorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await api.mentee.getMentorById(params.id);
        setMentor(response.data.mentor);
      } catch (error) {
        toast.error("Failed to load mentor profile");
        router.push("/dashboard/mentors");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMentor();
    }
  }, [params.id, router]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!mentor) return;
      setSlotsLoading(true);
      try {
        const response = await api.mentee.getMentorSlots(mentor.id);
        setSlots(response.data.slots || []);
      } catch (error) {
        console.error("Failed to fetch slots", error);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlots();
  }, [mentor]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!mentor) return;
      setReviewsLoading(true);
      try {
        const response = await api.mentee.getMentorReviews(mentor.id);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [mentor]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!mentor) {
    return null;
  }

  const profile = mentor.mentorProfile;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/mentors">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Mentors
        </Button>
      </Link>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <Avatar className="h-32 w-32">
              <AvatarImage src={mentor.profilePicture} />
              <AvatarFallback className="text-3xl">
                {getInitials(mentor.name || "M")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {mentor.name}
                    {profile?.isVerified && (
                      <CheckCircle className="ml-2 inline h-5 w-5 text-blue-500" />
                    )}
                  </h1>
                  <p className="mt-1 text-lg text-gray-600">
                    {profile?.headline || "Expert Mentor"}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {profile?.rating?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-gray-500">
                        ({profile?.totalReviews || 0} reviews)
                      </span>
                    </div>
                    {profile?.yearsOfExperience && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{profile.yearsOfExperience}+ years</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(profile?.pricePerSession || 0)}
                  </p>
                  <p className="text-sm text-gray-600">
                    per {profile?.sessionDuration || 30} min session
                  </p>
                </div>
              </div>

              {/* Skills */}
              {profile?.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Social Links */}
              <div className="mt-4 flex gap-3">
                {profile?.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}
                {profile?.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="slots">Available Slots</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-gray-700">
                {profile?.bio || "No bio provided."}
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          {profile?.experience?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.experience.map((exp, i) => (
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {profile?.education?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Calendar className="h-5 w-5" />
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
        </TabsContent>

        <TabsContent value="slots">
          <Card>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
            </CardHeader>
            <CardContent>
              {slotsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : slots.length === 0 ? (
                <div className="py-8 text-center">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No available slots</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slots
                    .filter((slot) => slot.status === "AVAILABLE")
                    .map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {formatDate(slot.startTime)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatTime(slot.startTime)} -{" "}
                            {formatTime(slot.endTime)}
                          </p>
                        </div>
                        <Link
                          href={`/dashboard/book/${mentor.id}?slot=${slot.id}`}
                        >
                          <Button size="sm">Book</Button>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : reviews.length === 0 ? (
                <div className="py-8 text-center">
                  <Star className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.mentee?.profilePicture} />
                          <AvatarFallback>
                            {getInitials(review.mentee?.name || "U")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.mentee?.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
