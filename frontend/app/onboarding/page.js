"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/useAuthStore";
import MentorOnboardingWizard from "../../components/mentor/MentorOnboardingWizard";
import MenteeOnboardingWizard from "../../components/mentee/MenteeOnboardingWizard";
import { menteeProfileApi, mentorProfileApi } from "../../lib/api";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoading, hasCheckedSession, fetchCurrentUser } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  useEffect(() => {
    const fetchProfile = async () => {
       if (!user || user.role === 'ADMIN') {
         setIsFetching(false);
         return;
       }
       if (user.onboardingCompleted) {
         router.replace(`/${user.role.toLowerCase()}/profile`);
         return;
       }

       const hasExistingProfile =
         (user.role === 'MENTEE' && Boolean(user.menteeProfileId)) ||
         (user.role === 'MENTOR' && Boolean(user.mentorProfileId));

       if (!hasExistingProfile) {
         setProfileData(null);
         setIsFetching(false);
         return;
       }

       try {
         setIsFetching(true);
         if (user.role === 'MENTEE') {
            const result = await menteeProfileApi.getMine();
            setProfileData(result.data?.profile || null);
         } else if (user.role === 'MENTOR') {
            const result = await mentorProfileApi.getMine();
            setProfileData(result.data?.profile || null);
         }
       } catch (err) {
         setProfileData(null);
       } finally {
         setIsFetching(false);
       }
    };
    
    if (hasCheckedSession && !user) {
      router.replace("/auth?mode=login");
    } else if (hasCheckedSession && user) {
       fetchProfile();
    }
  }, [user, hasCheckedSession, router]);

  if (!hasCheckedSession || isLoading || isFetching) {
    return (
      <main className="min-h-screen bg-[#FCF8F5] px-4 py-10 flex items-center justify-center">
         <div className="text-center font-bold text-xl">Loading onboarding...</div>
      </main>
    );
  }

  if (!user || user.role === 'ADMIN') return null;

  return (
    <main className="min-h-screen bg-[#FCF8F5]">
      {user.role === 'MENTEE' ? (
        <MenteeOnboardingWizard 
           existingProfile={profileData} 
           onComplete={() => {
             router.replace("/mentee/profile");
           }}
        />
      ) : (
        <MentorOnboardingWizard 
           existingProfile={profileData} 
           onComplete={() => {
             router.replace("/mentor/profile");
           }}
        />
      )}
    </main>
  );
}
