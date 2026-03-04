'use client';

import { useState } from 'react';
import { AdminProfile } from '@/types';
import { profileService } from '@/services/profile.service';

interface AdminProfileFormProps {
  initialData?: AdminProfile;
  onSuccess?: (profile: AdminProfile) => void;
}

export default function AdminProfileForm({ initialData, onSuccess }: AdminProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [permissionInput, setPermissionInput] = useState('');

  const [formData, setFormData] = useState({
    department: initialData?.department || '',
    permissions: initialData?.permissions || [],
    phoneNumber: initialData?.phoneNumber || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPermission = () => {
    if (permissionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionInput.trim()],
      }));
      setPermissionInput('');
    }
  };

  const handleRemovePermission = (index: number) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await profileService.createOrUpdateAdminProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      if (onSuccess && response.data) {
        onSuccess(response.data);
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Admin Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Admin Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Operations, Support, Finance"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Permissions & Access</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Permission
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={permissionInput}
              onChange={(e) => setPermissionInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPermission())}
              placeholder="e.g., user_management, booking_management"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddPermission}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.permissions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.permissions.map((perm, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {perm}
                  <button
                    type="button"
                    onClick={() => handleRemovePermission(index)}
                    className="text-purple-600 hover:text-purple-900 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No permissions added yet</p>
          )}
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Suggested Permissions:</h4>
          <div className="flex flex-wrap gap-2">
            {['user_management', 'booking_management', 'payment_management', 'content_management', 'analytics_view', 'system_settings'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  if (!formData.permissions.includes(suggestion)) {
                    setFormData(prev => ({
                      ...prev,
                      permissions: [...prev.permissions, suggestion],
                    }));
                  }
                }}
                className="px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Stats (Read-only) */}
      {initialData && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Admin Activity</h3>
          
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            {initialData.lastLoginAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Login:</span>
                <span className="text-sm font-medium">
                  {new Date(initialData.lastLoginAt).toLocaleString()}
                </span>
              </div>
            )}
            {/* <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Account Created:</span>
              <span className="text-sm font-medium">
                {new Date(initialData.createdAt || '').toLocaleDateString()}
              </span>
            </div> */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Permissions:</span>
              <span className="text-sm font-medium">
                {formData.permissions.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
}
