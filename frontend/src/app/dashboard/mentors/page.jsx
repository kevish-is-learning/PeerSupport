"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Star, MapPin, Briefcase, Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useMenteeStore } from "../../../stores/menteeStore";
import { getInitials, formatCurrency } from "../../../lib/utils";
import { Spinner } from "../../../components/ui/spinner";

export default function MentorsPage() {
  const { mentors, mentorsLoading, fetchMentors, totalMentors } = useMenteeStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    fetchMentors({ page, limit, search: search || undefined });
  }, [fetchMentors, page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMentors({ page: 1, limit, search: search || undefined });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Mentors</h1>
        <p className="mt-1 text-gray-600">
          Connect with experienced professionals in your field
        </p>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, skill, or expertise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
            <Button type="button" variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {mentorsLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : mentors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No mentors found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            Showing {mentors.length} of {totalMentors} mentors
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.profilePicture} />
                      <AvatarFallback className="text-lg">
                        {getInitials(mentor.name || "M")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {mentor.mentorProfile?.headline || "Expert Mentor"}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {mentor.mentorProfile?.rating?.toFixed(1) || "N/A"}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({mentor.mentorProfile?.totalReviews || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                    {mentor.mentorProfile?.bio || "Experienced professional ready to help you grow."}
                  </p>

                  {mentor.mentorProfile?.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {mentor.mentorProfile.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.mentorProfile.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{mentor.mentorProfile.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    {mentor.mentorProfile?.yearsOfExperience && (
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{mentor.mentorProfile.yearsOfExperience}+ years</span>
                      </div>
                    )}
                    {mentor.mentorProfile?.sessionDuration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{mentor.mentorProfile.sessionDuration} min</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(mentor.mentorProfile?.pricePerSession || 0)}
                      </span>
                      <span className="text-sm text-gray-600">/session</span>
                    </div>
                    <Link href={`/dashboard/mentors/${mentor.id}`}>
                      <Button size="sm">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalMentors > limit && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm">
                Page {page} of {Math.ceil(totalMentors / limit)}
              </span>
              <Button
                variant="outline"
                disabled={page >= Math.ceil(totalMentors / limit)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
