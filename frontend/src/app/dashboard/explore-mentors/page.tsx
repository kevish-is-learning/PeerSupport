'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { menteeService, MentorWithProfile } from '@/services/mentee.service';

export default function ExploreMentorsPage() {
  const [mentors, setMentors] = useState<MentorWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rating');

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      setLoading(true);
      const response = await menteeService.getAllMentors({ limit: 50 });
      setMentors(response.data?.mentors || []);
    } catch (error) {
      console.error('Failed to load mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const expertiseOptions = [
    'CAT Preparation',
    'Interview Prep',
    'Profile Building',
    'SOP Review',
    'Career Guidance',
    'IIM Specific',
  ];

  const priceRangeOptions = [
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000-2000', label: '₹1000 - ₹2000' },
    { value: '2000+', label: 'Above ₹2000' },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = searchQuery === '' ||
      mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.mentorProfile?.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.mentorProfile?.expertise?.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise = selectedExpertise === '' ||
      mentor.mentorProfile?.expertise?.includes(selectedExpertise);

    let matchesPrice = true;
    if (priceRange && mentor.mentorProfile) {
      const price = mentor.mentorProfile.pricePerSession;
      switch (priceRange) {
        case '0-500':
          matchesPrice = price < 500;
          break;
        case '500-1000':
          matchesPrice = price >= 500 && price < 1000;
          break;
        case '1000-2000':
          matchesPrice = price >= 1000 && price < 2000;
          break;
        case '2000+':
          matchesPrice = price >= 2000;
          break;
      }
    }

    return matchesSearch && matchesExpertise && matchesPrice;
  });

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.mentorProfile?.rating || 0) - (a.mentorProfile?.rating || 0);
      case 'price-low':
        return (a.mentorProfile?.pricePerSession || 0) - (b.mentorProfile?.pricePerSession || 0);
      case 'price-high':
        return (b.mentorProfile?.pricePerSession || 0) - (a.mentorProfile?.pricePerSession || 0);
      case 'reviews':
        return (b.mentorProfile?.totalReviews || 0) - (a.mentorProfile?.totalReviews || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Explore Mentors</h1>
        <p className="text-gray-600">Connect with experienced mentors to guide your MBA journey</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise, or keyword..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expertise</label>
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">All Expertise</option>
              {expertiseOptions.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Any Price</option>
              {priceRangeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {sortedMentors.length} mentors
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      {sortedMentors.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {mentor?.name?.charAt(0).toUpperCase() || 'M'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{mentor?.name}</h3>
                  {mentor?.mentorProfile?.verifiedBadge && (
                    <span className="inline-flex items-center gap-1 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {mentor?.mentorProfile?.bio || 'Experienced mentor ready to guide you.'}
              </p>

              {/* Expertise Tags */}
              {mentor?.mentorProfile?.expertise && mentor?.mentorProfile?.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.mentorProfile.expertise.slice(0, 3).map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {exp}
                    </span>
                  ))}
                  {mentor.mentorProfile.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{mentor.mentorProfile.expertise.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4">
                <div className="text-center">
                  <p className="font-semibold flex items-center gap-1 justify-center">
                    <span className="text-yellow-400">★</span>
                    {mentor.mentorProfile?.rating?.toFixed(1) || '0.0'}
                  </p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{mentor.mentorProfile?.totalReviews || 0}</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">₹{mentor.mentorProfile?.pricePerSession || 0}</p>
                  <p className="text-xs text-gray-500">per session</p>
                </div>
              </div>

              <Link
                href={`/dashboard/mentor/${mentor.id}`}
                className="block w-full text-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
