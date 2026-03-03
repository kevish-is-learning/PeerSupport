'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { profileService } from '@/services/profile.service';
import { updateProfileSchema, changePasswordSchema } from '@/lib/validations';
import { Role, MenteeProfile, MentorProfile, AdminProfile } from '@/types';
import MenteeProfileForm from '@/components/MenteeProfileForm';
import MentorProfileForm from '@/components/MentorProfileForm';
import AdminProfileForm from '@/components/AdminProfileForm';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'account' | 'roleProfile' | 'password'>('account');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [roleProfile, setRoleProfile] = useState<MenteeProfile | MentorProfile | AdminProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    profilePicture: user?.profilePicture || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load role-specific profile
  useEffect(() => {
    if (activeTab === 'roleProfile' && user?.role) {
      loadRoleProfile();
    }
  }, [activeTab, user?.role]);

  const loadRoleProfile = async () => {
    setIsLoadingProfile(true);
    try {
      let response;
      switch (user?.role) {
        case Role.MENTEE:
          response = await profileService.getMenteeProfile();
          break;
        case Role.MENTOR:
          response = await profileService.getMentorProfile();
          break;
        case Role.ADMIN:
          response = await profileService.getAdminProfile();
          break;
      }
      if (response?.data) {
        setRoleProfile(response.data);
      }
    } catch (error: any) {
      // Profile might not exist yet, which is fine
      if (error.response?.status !== 404) {
        console.error('Error loading profile:', error);
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const result = updateProfileSchema.safeParse(profileData);
    if (!result.success) {
      setMessage({ type: 'error', text: result.error.errors[0].message });
      return;
    }

    setIsEditingProfile(true);
    try {
      const response = await authService.updateProfile(profileData);
      if (response.data) {
        setUser(response.data);
        setMessage({ type: 'success', text: 'Profile updated successfully' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setIsEditingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const result = changePasswordSchema.safeParse(passwordData);
    if (!result.success) {
      setMessage({ type: 'error', text: result.error.errors[0].message });
      return;
    }

    setIsChangingPassword(true);
    try {
      await authService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setMessage({ type: 'success', text: 'Password changed successfully' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleRoleProfileSuccess = (profile: any) => {
    setRoleProfile(profile);
    setMessage({ type: 'success', text: 'Role profile updated successfully' });
  };

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case Role.MENTEE:
        return 'Mentee Profile';
      case Role.MENTOR:
        return 'Mentor Profile';
      case Role.ADMIN:
        return 'Admin Profile';
      default:
        return 'Role Profile';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-gray-600 mb-6">Manage your account and {getRoleLabel(user?.role || Role.MENTEE).toLowerCase()}</p>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'account'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Account Info
          </button>
          <button
            onClick={() => setActiveTab('roleProfile')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'roleProfile'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {getRoleLabel(user?.role || Role.MENTEE)}
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === 'password'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Change Password
          </button>
        </div>

        <div className="p-6">
          {message && activeTab === 'account' && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-600'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}
            >
              {message.text}
            </div>
          )}

          {activeTab === 'account' ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
                <input
                  type="text"
                  value={profileData.profilePicture}
                  onChange={(e) =>
                    setProfileData({ ...profileData, profilePicture: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input
                  type="text"
                  value={user?.role}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Account Status</label>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user?.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user?.isVerified
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {user?.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isEditingProfile}
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isEditingProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          ) : activeTab === 'roleProfile' ? (
            <div>
              {isLoadingProfile ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  <p className="mt-2 text-gray-600">Loading profile...</p>
                </div>
              ) : (
                <>
                  {user?.role === Role.MENTEE && (
                    <MenteeProfileForm
                      initialData={roleProfile as MenteeProfile}
                      onSuccess={handleRoleProfileSuccess}
                    />
                  )}
                  {user?.role === Role.MENTOR && (
                    <MentorProfileForm
                      initialData={roleProfile as MentorProfile}
                      onSuccess={handleRoleProfileSuccess}
                    />
                  )}
                  {user?.role === Role.ADMIN && (
                    <AdminProfileForm
                      initialData={roleProfile as AdminProfile}
                      onSuccess={handleRoleProfileSuccess}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {message && (
                <div
                  className={`mb-4 p-3 rounded ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-600'
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isChangingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
