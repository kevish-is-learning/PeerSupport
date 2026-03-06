'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Review, DashboardStats } from '@/types';

export default function MentorRatingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [reviewsRes, statsRes] = await Promise.all([
        mentorService.getRatingsAndFeedback(),
        mentorService.getDashboardStats(),
      ]);
      setReviews(reviewsRes.data?.reviews || []);
      setStats(statsRes.data || null);
    } catch (error: any) {
      console.error('Error loading ratings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? Math.round((reviews.filter((r) => r.rating === rating).length / reviews.length) * 100) 
      : 0,
  }));

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter((r) => r.rating === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Ratings & Feedback</h1>
        <p className="text-gray-600">See what students are saying about your sessions</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Average Rating</p>
              <p className="text-4xl font-bold mt-1">
                {stats?.averageRating?.toFixed(1) || '0.0'}
              </p>
            </div>
            <span className="text-5xl">⭐</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Reviews</p>
              <p className="text-4xl font-bold mt-1">{stats?.totalReviews || 0}</p>
            </div>
            <span className="text-5xl">💬</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">5-Star Reviews</p>
              <p className="text-4xl font-bold mt-1">
                {reviews.filter((r) => r.rating === 5).length}
              </p>
            </div>
            <span className="text-5xl">🏆</span>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-16 text-right">
                {count} ({percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Reviews
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setFilter(rating as 1 | 2 | 3 | 4 | 5)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              filter === rating
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {rating} <span className={filter === rating ? 'text-white' : 'text-yellow-500'}>★</span>
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="font-semibold">
            {filter === 'all' ? 'All Reviews' : `${filter}-Star Reviews`} ({filteredReviews.length})
          </h3>
        </div>
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-6xl">💬</span>
            <h2 className="text-xl font-semibold mt-4">No reviews yet</h2>
            <p className="text-gray-600 mt-2">
              {filter === 'all'
                ? 'Complete sessions to receive feedback from students'
                : `No ${filter}-star reviews found`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">
                        {review.mentee?.user?.name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{review.mentee?.user?.name || 'Anonymous'}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                      {review.comment && (
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Session Info */}
                {review.booking && (
                  <div className="mt-4 ml-16 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <span className="font-medium">Session:</span> {formatDate(review.booking.scheduledAt)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-4">💡 Tips to Improve Your Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <h4 className="font-medium text-blue-800">Be Punctual</h4>
              <p className="text-sm text-blue-700">Start sessions on time and respect the schedule</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h4 className="font-medium text-blue-800">Be Prepared</h4>
              <p className="text-sm text-blue-700">Review mentee profiles before sessions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">👂</span>
            <div>
              <h4 className="font-medium text-blue-800">Listen Actively</h4>
              <p className="text-sm text-blue-700">Understand their needs before giving advice</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h4 className="font-medium text-blue-800">Provide Resources</h4>
              <p className="text-sm text-blue-700">Share helpful materials and follow-up tips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
