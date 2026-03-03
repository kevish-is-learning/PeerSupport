'use client';

import { useState, useEffect } from 'react';
import { MenteeProfile } from '@/types';
import { profileService } from '@/services/profile.service';

interface MenteeProfileFormProps {
  initialData?: MenteeProfile;
  onSuccess?: (profile: MenteeProfile) => void;
}

export default function MenteeProfileForm({ initialData, onSuccess }: MenteeProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [certificationInput, setCertificationInput] = useState('');

  const [formData, setFormData] = useState({
    dob: initialData?.dob?.split('T')[0] || '',
    education10th: initialData?.education10th || '',
    education12th: initialData?.education12th || '',
    bachelors: initialData?.bachelors || '',
    masters: initialData?.masters || '',
    workExperience: initialData?.workExperience || '',
    certifications: initialData?.certifications || [],
    catScore: initialData?.catScore?.toString() || '',
    expectations: initialData?.expectations || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        catScore: formData.catScore ? parseFloat(formData.catScore) : undefined,
        dob: formData.dob || undefined,
      };

      const response = await profileService.createOrUpdateMenteeProfile(payload);
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

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Education</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            10th Grade
          </label>
          <input
            type="text"
            name="education10th"
            value={formData.education10th}
            onChange={handleChange}
            placeholder="School name, percentage/grade, year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            12th Grade
          </label>
          <input
            type="text"
            name="education12th"
            value={formData.education12th}
            onChange={handleChange}
            placeholder="School name, percentage/grade, year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bachelor's Degree
          </label>
          <input
            type="text"
            name="bachelors"
            value={formData.bachelors}
            onChange={handleChange}
            placeholder="University, degree, year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Master's Degree
          </label>
          <input
            type="text"
            name="masters"
            value={formData.masters}
            onChange={handleChange}
            placeholder="University, degree, year"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Professional Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Experience
          </label>
          <textarea
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your work experience..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
              placeholder="Add certification"
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
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CAT Score (Percentile)
          </label>
          <input
            type="number"
            name="catScore"
            value={formData.catScore}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="Enter CAT percentile"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      {/* Expectations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mentoring Expectations</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What are you looking for from mentoring?
          </label>
          <textarea
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your goals and expectations..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}
