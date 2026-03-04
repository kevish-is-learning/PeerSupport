'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { Role } from '@/types';

export default function SelectRolePage() {
  const router = useRouter();
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<'MENTEE' | 'MENTOR' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
    // If user already has a role other than the default, redirect to dashboard
    if (isInitialized && user?.role && user.role !== Role.MENTEE) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isInitialized, user, router]);

  const handleSelectRole = async (role: 'MENTEE' | 'MENTOR') => {
    setSelectedRole(role);
    setIsLoading(true);

    try {
      // For now, just redirect based on selection
      // The actual role update will happen during profile setup
      if (role === 'MENTEE') {
        router.push('/onboarding/mentee');
      } else {
        router.push('/apply-mentor');
      }
    } catch (error) {
      console.error('Failed to select role:', error);
      setIsLoading(false);
    }
  };

  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">PeerSupport</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome, {user?.name || 'there'}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              How would you like to use PeerSupport?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mentee Option */}
            <button
              onClick={() => handleSelectRole('MENTEE')}
              disabled={isLoading}
              className={`p-8 rounded-xl border-2 text-left transition-all hover:shadow-lg disabled:opacity-50 ${
                selectedRole === 'MENTEE'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Mentee</h2>
              <p className="text-gray-600 mb-4">
                I want to learn from experienced mentors and prepare for my MBA journey
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Connect with verified mentors
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Book 1-on-1 mentoring sessions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Attend webinars & workshops
                </li>
              </ul>
            </button>

            {/* Mentor Option */}
            <button
              onClick={() => handleSelectRole('MENTOR')}
              disabled={isLoading}
              className={`p-8 rounded-xl border-2 text-left transition-all hover:shadow-lg disabled:opacity-50 ${
                selectedRole === 'MENTOR'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Mentor</h2>
              <p className="text-gray-600 mb-4">
                I want to share my knowledge and guide aspiring MBA candidates
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set your own availability
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Earn from mentoring sessions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Build your professional brand
                </li>
              </ul>
            </button>
          </div>

          {isLoading && (
            <div className="mt-8 text-center text-gray-600">
              <div className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Setting up your account...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
