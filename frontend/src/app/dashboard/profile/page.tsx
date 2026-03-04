'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { profileService } from '@/services/profile.service';
import { MenteeProfile, Resume } from '@/types';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<MenteeProfile | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    dob: '',
    education10th: ['', '', ''],
    education12th: ['', '', ''],
    bachelors: ['', '', ''],
    masters: ['', '', ''],
    workExperience: '',
    certifications: [] as string[],
    catScore: '',
    expectations: '',
  });

  const [certificationInput, setCertificationInput] = useState('');
  const [newResumeName, setNewResumeName] = useState('');
  const [newResumeUrl, setNewResumeUrl] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [profileRes, resumesRes] = await Promise.all([
        profileService.getCurrentProfile().catch(() => ({ data: null })),
        profileService.getResumes().catch(() => ({ data: [] })),
      ]);

      const profileData = profileRes.data?.profile as MenteeProfile;
      setProfile(profileData);
      setResumes(resumesRes.data || []);

      if (profileData) {
        setFormData({
          dob: profileData.dob?.split('T')[0] || '',
          education10th: profileData.education10th || ['', '', ''],
          education12th: profileData.education12th || ['', '', ''],
          bachelors: profileData.bachelors || ['', '', ''],
          masters: profileData.masters || ['', '', ''],
          workExperience: profileData.workExperience || '',
          certifications: profileData.certifications || [],
          catScore: profileData.catScore?.toString() || '',
          expectations: profileData.expectations || '',
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (
    field: 'education10th' | 'education12th' | 'bachelors' | 'masters',
    index: number,
    value: string
  ) => {
    setFormData(prev => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
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

  const handleAddResume = async () => {
    if (!newResumeName.trim() || !newResumeUrl.trim()) {
      setMessage({ type: 'error', text: 'Please provide both resume name and URL' });
      return;
    }

    try {
      const response = await profileService.addResume(newResumeName.trim(), newResumeUrl.trim());
      if (response.data) {
        setResumes(prev => [...prev, response.data]);
        setNewResumeName('');
        setNewResumeUrl('');
        setMessage({ type: 'success', text: 'Resume added successfully' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add resume' });
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      await profileService.deleteResumeById(resumeId);
      setResumes(prev => prev.filter(r => r.id !== resumeId));
      setMessage({ type: 'success', text: 'Resume deleted successfully' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete resume' });
    }
  };

  const handleSave = async () => {
    setMessage(null);
    try {
      const isEducationEmpty = (edu: string[]) => edu.every(field => !field.trim());

      const payload = {
        dob: formData.dob || undefined,
        education10th: !isEducationEmpty(formData.education10th) ? formData.education10th : [],
        education12th: !isEducationEmpty(formData.education12th) ? formData.education12th : [],
        bachelors: !isEducationEmpty(formData.bachelors) ? formData.bachelors : [],
        masters: !isEducationEmpty(formData.masters) ? formData.masters : [],
        workExperience: formData.workExperience || undefined,
        certifications: formData.certifications,
        catScore: formData.catScore ? parseFloat(formData.catScore) : undefined,
        expectations: formData.expectations || undefined,
      };

      const response = await profileService.createOrUpdateMenteeProfile(payload);
      setProfile(response.data);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isEditing
              ? 'bg-black text-white hover:bg-gray-800'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* User Basic Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {user?.role}
              </span>
              {user?.isVerified && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="border-t border-gray-100 pt-6">
          <label className="block text-sm font-medium mb-2">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ) : (
            <p className="text-gray-700">{formData.dob || 'Not specified'}</p>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Education</h3>
        
        <div className="space-y-6">
          {/* 10th */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">10</span>
              Class 10th
            </h4>
            {isEditing ? (
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.education10th[0]}
                  onChange={(e) => handleEducationChange('education10th', 0, e.target.value)}
                  placeholder="School Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.education10th[1]}
                  onChange={(e) => handleEducationChange('education10th', 1, e.target.value)}
                  placeholder="Score (%)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.education10th[2]}
                  onChange={(e) => handleEducationChange('education10th', 2, e.target.value)}
                  placeholder="Year"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {formData.education10th[0] 
                  ? `${formData.education10th[0]} - ${formData.education10th[1]}% (${formData.education10th[2]})`
                  : 'Not specified'}
              </p>
            )}
          </div>

          {/* 12th */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">12</span>
              Class 12th
            </h4>
            {isEditing ? (
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.education12th[0]}
                  onChange={(e) => handleEducationChange('education12th', 0, e.target.value)}
                  placeholder="School Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.education12th[1]}
                  onChange={(e) => handleEducationChange('education12th', 1, e.target.value)}
                  placeholder="Score (%)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.education12th[2]}
                  onChange={(e) => handleEducationChange('education12th', 2, e.target.value)}
                  placeholder="Year"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {formData.education12th[0]
                  ? `${formData.education12th[0]} - ${formData.education12th[1]}% (${formData.education12th[2]})`
                  : 'Not specified'}
              </p>
            )}
          </div>

          {/* Bachelors */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs">🎓</span>
              Bachelor's Degree
            </h4>
            {isEditing ? (
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.bachelors[0]}
                  onChange={(e) => handleEducationChange('bachelors', 0, e.target.value)}
                  placeholder="College Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.bachelors[1]}
                  onChange={(e) => handleEducationChange('bachelors', 1, e.target.value)}
                  placeholder="CGPA / %"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.bachelors[2]}
                  onChange={(e) => handleEducationChange('bachelors', 2, e.target.value)}
                  placeholder="Year"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {formData.bachelors[0]
                  ? `${formData.bachelors[0]} - ${formData.bachelors[1]} (${formData.bachelors[2]})`
                  : 'Not specified'}
              </p>
            )}
          </div>

          {/* Masters */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs">🎓</span>
              Master's Degree
            </h4>
            {isEditing ? (
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.masters[0]}
                  onChange={(e) => handleEducationChange('masters', 0, e.target.value)}
                  placeholder="College Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.masters[1]}
                  onChange={(e) => handleEducationChange('masters', 1, e.target.value)}
                  placeholder="CGPA / %"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  value={formData.masters[2]}
                  onChange={(e) => handleEducationChange('masters', 2, e.target.value)}
                  placeholder="Year"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {formData.masters[0]
                  ? `${formData.masters[0]} - ${formData.masters[1]} (${formData.masters[2]})`
                  : 'Not specified'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Work Experience & CAT Score */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
          {isEditing ? (
            <textarea
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              placeholder="Describe your work experience..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
            />
          ) : (
            <p className="text-gray-700">{formData.workExperience || 'No work experience added'}</p>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">CAT Score</h3>
          {isEditing ? (
            <input
              type="number"
              name="catScore"
              value={formData.catScore}
              onChange={handleChange}
              placeholder="e.g., 98.5"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ) : (
            <p className="text-3xl font-bold text-blue-600">
              {formData.catScore ? `${formData.catScore}%ile` : '-'}
            </p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        {isEditing && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={certificationInput}
              onChange={(e) => setCertificationInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
              placeholder="Add a certification..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Add
            </button>
          </div>
        )}
        {formData.certifications.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-2"
              >
                {cert}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-blue-400 hover:text-red-500"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No certifications added</p>
        )}
      </div>

      {/* Resumes */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">My Resumes</h3>
        
        {/* Add Resume Form */}
        <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-4">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              value={newResumeName}
              onChange={(e) => setNewResumeName(e.target.value)}
              placeholder="Resume name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="url"
              value={newResumeUrl}
              onChange={(e) => setNewResumeUrl(e.target.value)}
              placeholder="Google Drive / Dropbox URL"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleAddResume}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Add Resume
            </button>
          </div>
        </div>

        {/* Resume List */}
        {resumes.length > 0 ? (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 font-semibold text-sm">PDF</span>
                  </div>
                  <div>
                    <p className="font-medium">{resume.name}</p>
                    <p className="text-sm text-gray-500">Uploaded {formatDate(resume.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No resumes uploaded yet</p>
        )}
      </div>

      {/* Expectations */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Career Expectations</h3>
        {isEditing ? (
          <textarea
            name="expectations"
            value={formData.expectations}
            onChange={handleChange}
            placeholder="Describe what you're looking for in your MBA journey..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
          />
        ) : (
          <p className="text-gray-700">{formData.expectations || 'No expectations specified'}</p>
        )}
      </div>

      {/* Cancel Button */}
      {isEditing && (
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setIsEditing(false);
              loadProfile(); // Reset to original data
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
