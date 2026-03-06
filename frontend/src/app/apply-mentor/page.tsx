'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import MentorApplicationForm from '@/components/MentorApplicationForm';

export default function ApplyAsMentorPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }

    // If user is already a mentor with approved status, redirect to dashboard
    if (user?.role === 'MENTOR' && user?.verificationStatus === 'APPROVED') {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Apply as a Mentor</h1>
        <p className="text-gray-600 mt-2">
          Share your expertise and help others achieve their goals. Complete the application below to become a mentor.
        </p>
      </div>
      <MentorApplicationForm />
    </div>
  );
}
