'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { mentorService } from '@/services/mentor.service';
import { Incentive } from '@/types';

export default function MentorIncentivesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [incentives, setIncentives] = useState<Incentive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'MENTOR') {
      router.push('/dashboard');
      return;
    }
    loadIncentives();
  }, [user, router]);

  const loadIncentives = async () => {
    try {
      setIsLoading(true);
      const response = await mentorService.getIncentives();
      setIncentives(response.data?.incentives || []);
    } catch (error: any) {
      console.error('Error loading incentives:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimIncentive = async (incentiveId: string) => {
    setClaimingId(incentiveId);
    setMessage(null);
    
    try {
      await mentorService.claimIncentive(incentiveId);
      setMessage({ type: 'success', text: 'Incentive claimed successfully! Amount added to your balance.' });
      loadIncentives();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to claim incentive',
      });
    } finally {
      setClaimingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getIncentiveIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'referral':
        return '👥';
      case 'milestone':
        return '🏆';
      case 'performance':
        return '📈';
      case 'bonus':
        return '🎁';
      case 'seasonal':
        return '🎄';
      default:
        return '💎';
    }
  };

  // Separate active and claimed incentives
  const activeIncentives = incentives.filter((i) => !i.isClaimed);
  const claimedIncentives = incentives.filter((i) => i.isClaimed);
  const totalClaimed = claimedIncentives.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = activeIncentives.reduce((sum, i) => sum + i.amount, 0);

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
        <h1 className="text-2xl font-bold">Incentives & Rewards</h1>
        <p className="text-gray-600">Earn bonuses for your achievements</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Available to Claim</p>
          <p className="text-3xl font-bold mt-1">₹{totalPending.toLocaleString()}</p>
          <p className="text-sm opacity-75 mt-2">{activeIncentives.length} incentives</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Total Claimed</p>
          <p className="text-3xl font-bold mt-1">₹{totalClaimed.toLocaleString()}</p>
          <p className="text-sm opacity-75 mt-2">{claimedIncentives.length} rewards received</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90">Total Incentives</p>
          <p className="text-3xl font-bold mt-1">{incentives.length}</p>
          <p className="text-sm opacity-75 mt-2">All time</p>
        </div>
      </div>

      {/* Available Incentives */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b bg-purple-50">
          <h3 className="font-semibold text-purple-800">🎁 Available to Claim</h3>
        </div>
        {activeIncentives.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-6xl">🎯</span>
            <h2 className="text-xl font-semibold mt-4">No pending incentives</h2>
            <p className="text-gray-600 mt-2">Complete more sessions to unlock rewards</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activeIncentives.map((incentive) => (
              <div key={incentive.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{getIncentiveIcon(incentive.type)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{incentive.title}</h3>
                      <p className="text-sm text-gray-600">{incentive.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Earned on: {formatDate(incentive.createdAt)}
                        {incentive.expiresAt && (
                          <span className="text-red-500 ml-2">
                            • Expires: {formatDate(incentive.expiresAt)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₹{incentive.amount.toLocaleString()}</p>
                    <button
                      onClick={() => handleClaimIncentive(incentive.id)}
                      disabled={claimingId === incentive.id}
                      className="mt-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      {claimingId === incentive.id ? 'Claiming...' : 'Claim Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to Earn Incentives */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-lg mb-4">📚 How to Earn Incentives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl">🏆</span>
            <h4 className="font-semibold mt-2">Milestone Bonuses</h4>
            <p className="text-sm text-gray-600 mt-1">
              Complete 10, 25, 50, 100 sessions to unlock bonus rewards
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <span className="text-2xl">⭐</span>
            <h4 className="font-semibold mt-2">High Ratings</h4>
            <p className="text-sm text-gray-600 mt-1">
              Maintain a 4.8+ rating to earn performance bonuses
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <span className="text-2xl">👥</span>
            <h4 className="font-semibold mt-2">Referrals</h4>
            <p className="text-sm text-gray-600 mt-1">
              Refer other mentors and earn ₹500 per successful referral
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <span className="text-2xl">📈</span>
            <h4 className="font-semibold mt-2">Top Performer</h4>
            <p className="text-sm text-gray-600 mt-1">
              Be a top mentor of the month to get featured and earn bonuses
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <span className="text-2xl">🔥</span>
            <h4 className="font-semibold mt-2">Streak Bonuses</h4>
            <p className="text-sm text-gray-600 mt-1">
              Complete sessions consistently for weekly streak rewards
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <span className="text-2xl">🎄</span>
            <h4 className="font-semibold mt-2">Seasonal Events</h4>
            <p className="text-sm text-gray-600 mt-1">
              Participate in special campaigns for limited-time bonuses
            </p>
          </div>
        </div>
      </div>

      {/* Claimed History */}
      {claimedIncentives.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="font-semibold">✅ Claimed Incentives</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {claimedIncentives.map((incentive) => (
              <div key={incentive.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getIncentiveIcon(incentive.type)}</span>
                    <div>
                      <h4 className="font-medium">{incentive.title}</h4>
                      <p className="text-xs text-gray-500">
                        Claimed on: {formatDate(incentive.claimedAt || incentive.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">+₹{incentive.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
