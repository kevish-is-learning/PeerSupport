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
  const [resumes, setResumes] = useState(initialData?.resumes || []);
  const [newResumeName, setNewResumeName] = useState('');
  const [newResumeUrl, setNewResumeUrl] = useState('');
  const [isAddingResume, setIsAddingResume] = useState(false);

  const [formData, setFormData] = useState({
    dob: initialData?.dob?.split('T')[0] || '',
    education10th: initialData?.education10th || ['', '', ''], // [instituteName, score, yearOfPassout]
    education12th: initialData?.education12th || ['', '', ''],
    bachelors: initialData?.bachelors || ['', '', ''],
    masters: initialData?.masters || ['', '', ''],
    workExperience: initialData?.workExperience || '',
    certifications: initialData?.certifications || [],
    catScore: initialData?.catScore?.toString() || '',
    expectations: initialData?.expectations || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (field: 'education10th' | 'education12th' | 'bachelors' | 'masters', index: number, value: string) => {
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

    setIsAddingResume(true);
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
    } finally {
      setIsAddingResume(false);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      await profileService.deleteResumeById(resumeId);
      setResumes(prev => prev.filter(r => r.id !== resumeId));
      setMessage({ type: 'success', text: 'Resume deleted successfully' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to delete resume' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      // Filter out education arrays where all fields are empty
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
        
        {/* 10th Grade */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            10th Grade
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                School/Institute Name
              </label>
              <input
                type="text"
                value={formData.education10th[0]}
                onChange={(e) => handleEducationChange('education10th', 0, e.target.value)}
                placeholder="e.g., ABC High School"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Score/Percentage
              </label>
              <input
                type="text"
                value={formData.education10th[1]}
                onChange={(e) => handleEducationChange('education10th', 1, e.target.value)}
                placeholder="e.g., 85% or 8.5 CGPA"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Year of Pass Out
              </label>
              <input
                type="text"
                value={formData.education10th[2]}
                onChange={(e) => handleEducationChange('education10th', 2, e.target.value)}
                placeholder="e.g., 2015"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* 12th Grade */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            12th Grade
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                School/Institute Name
              </label>
              <input
                type="text"
                value={formData.education12th[0]}
                onChange={(e) => handleEducationChange('education12th', 0, e.target.value)}
                placeholder="e.g., XYZ Sr. Secondary School"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Score/Percentage
              </label>
              <input
                type="text"
                value={formData.education12th[1]}
                onChange={(e) => handleEducationChange('education12th', 1, e.target.value)}
                placeholder="e.g., 90% or 9.0 CGPA"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Year of Pass Out
              </label>
              <input
                type="text"
                value={formData.education12th[2]}
                onChange={(e) => handleEducationChange('education12th', 2, e.target.value)}
                placeholder="e.g., 2017"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bachelor's Degree */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Bachelor's Degree
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                University/College Name
              </label>
              <input
                type="text"
                value={formData.bachelors[0]}
                onChange={(e) => handleEducationChange('bachelors', 0, e.target.value)}
                placeholder="e.g., Delhi University"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Score/CGPA
              </label>
              <input
                type="text"
                value={formData.bachelors[1]}
                onChange={(e) => handleEducationChange('bachelors', 1, e.target.value)}
                placeholder="e.g., 8.5 CGPA or 75%"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Year of Pass Out
              </label>
              <input
                type="text"
                value={formData.bachelors[2]}
                onChange={(e) => handleEducationChange('bachelors', 2, e.target.value)}
                placeholder="e.g., 2021"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Master's Degree */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Master's Degree
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                University/College Name
              </label>
              <input
                type="text"
                value={formData.masters[0]}
                onChange={(e) => handleEducationChange('masters', 0, e.target.value)}
                placeholder="e.g., IIM Ahmedabad"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Score/CGPA
              </label>
              <input
                type="text"
                value={formData.masters[1]}
                onChange={(e) => handleEducationChange('masters', 1, e.target.value)}
                placeholder="e.g., 9.0 CGPA or 80%"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Year of Pass Out
              </label>
              <input
                type="text"
                value={formData.masters[2]}
                onChange={(e) => handleEducationChange('masters', 2, e.target.value)}
                placeholder="e.g., 2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
          </div>
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

      {/* Resume Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Resumes</h3>
        
        {/* Existing Resumes */}
        {resumes.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uploaded Resumes
            </label>
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{resume.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteResume(resume.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Resume */}
        <div className="p-4 border border-gray-200 rounded-lg space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Add New Resume
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Resume Name/Title
              </label>
              <input
                type="text"
                value={newResumeName}
                onChange={(e) => setNewResumeName(e.target.value)}
                placeholder="e.g., Software Engineer Resume 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Resume URL
              </label>
              <input
                type="url"
                value={newResumeUrl}
                onChange={(e) => setNewResumeUrl(e.target.value)}
                placeholder="https://example.com/resume.pdf or Google Drive link"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your resume to Google Drive, Dropbox, or any cloud storage and paste the shareable link here
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddResume}
              disabled={isAddingResume}
              className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isAddingResume ? 'Adding...' : 'Add Resume'}
            </button>
          </div>
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
