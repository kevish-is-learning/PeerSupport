'use client';

import { useState } from 'react';
import { MentorProfile } from '@/types';
import { profileService } from '@/services/profile.service';

interface MentorProfileFormProps {
  initialData?: MentorProfile;
  onSuccess?: (profile: MentorProfile) => void;
}

export default function MentorProfileForm({ initialData, onSuccess }: MentorProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');

  const [formData, setFormData] = useState({
    bio: initialData?.bio || '',
    expertise: initialData?.expertise || [],
    certifications: initialData?.certifications || [],
    pricePerSession: initialData?.pricePerSession?.toString() || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()],
      }));
      setExpertiseInput('');
    }
  };

  const handleRemoveExpertise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  };

  const handleAddCertification = () => {
    if (certificationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certificationInput.trim()],
      }));
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!formData.bio.trim()) {
      setMessage({ type: 'error', text: 'Bio is required' });
      return;
    }

    if (formData.expertise.length === 0) {
      setMessage({ type: 'error', text: 'At least one area of expertise is required' });
      return;
    }

    if (!formData.pricePerSession || parseFloat(formData.pricePerSession) <= 0) {
      setMessage({ type: 'error', text: 'Valid price per session is required' });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        bio: formData.bio,
        expertise: formData.expertise,
        certifications: formData.certifications,
        pricePerSession: parseFloat(formData.pricePerSession),
      };

      const response = await profileService.createOrUpdateMentorProfile(payload);
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

      {/* Bio */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Professional Bio</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={6}
            required
            placeholder="Tell mentees about your background, experience, and what you can help them with..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 50 characters recommended
          </p>
        </div>
      </div>

      {/* Expertise */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Areas of Expertise</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Expertise <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
              placeholder="e.g., Career Counseling, Interview Prep, MBA Guidance"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddExpertise}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.expertise.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.expertise.map((exp, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {exp}
                  <button
                    type="button"
                    onClick={() => handleRemoveExpertise(index)}
                    className="text-blue-600 hover:text-blue-900 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No expertise added yet</p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Certifications</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Certification
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
              placeholder="e.g., MBA from IIM Ahmedabad, PMP Certified"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Session Pricing</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Per Session (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="pricePerSession"
            value={formData.pricePerSession}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            placeholder="e.g., 500"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Set your consultation fee per session
          </p>
        </div>
      </div>

      {/* Verification Status (Read-only) */}
      {initialData && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Verification Status</h3>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  initialData.verificationStatus === 'APPROVED'
                    ? 'bg-green-100 text-green-800'
                    : initialData.verificationStatus === 'REJECTED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {initialData.verificationStatus}
              </span>
            </div>
            {initialData.verifiedBadge && (
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                <span>✓</span>
                <span>Verified Mentor</span>
              </div>
            )}
            {initialData.rating > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">Rating:</span>
                <span className="text-sm font-medium">
                  ⭐ {initialData.rating.toFixed(1)} ({initialData.totalReviews} reviews)
                </span>
              </div>
            )}
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
