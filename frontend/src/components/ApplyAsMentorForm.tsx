'use client';

import { useState, useEffect } from 'react';
import { applicationService } from '@/services/application.service';
import { ApplicationStatus } from '@/types';

export default function ApplyAsMentorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');

  const [formData, setFormData] = useState({
    bio: '',
    expertise: [] as string[],
    certifications: [] as string[],
    pricePerSession: '',
  });

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const response = await applicationService.getMyApplication();
      if (response.data) {
        setExistingApplication(response.data);
      }
    } catch (error: any) {
      // No existing application, user can submit
      console.log('No existing application found');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
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
    if (certificationInput.trim() && !formData.certifications.includes(certificationInput.trim())) {
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
      const response = await applicationService.submitApplication({
        bio: formData.bio,
        expertise: formData.expertise,
        certifications: formData.certifications,
        pricePerSession: parseFloat(formData.pricePerSession),
      });

      setMessage({ type: 'success', text: 'Application submitted successfully! We will review it shortly.' });
      setExistingApplication(response.data);
      
      // Clear form
      setFormData({
        bio: '',
        expertise: [],
        certifications: [],
        pricePerSession: '',
      });
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit application' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If user already has an application, show status
  if (existingApplication) {
    const getStatusColor = (status: ApplicationStatus) => {
      switch (status) {
        case ApplicationStatus.PENDING:
          return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case ApplicationStatus.APPROVED:
          return 'bg-green-100 text-green-800 border-green-300';
        case ApplicationStatus.REJECTED:
          return 'bg-red-100 text-red-800 border-red-300';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-300';
      }
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className={`border-2 rounded-lg p-6 ${getStatusColor(existingApplication.status)}`}>
          <h2 className="text-2xl font-bold mb-4">Mentor Application Status</h2>
          
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Status: </span>
              <span className="text-lg uppercase">{existingApplication.status}</span>
            </div>

            <div>
              <span className="font-semibold">Submitted on: </span>
              {new Date(existingApplication.createdAt).toLocaleDateString()}
            </div>

            {existingApplication.status === ApplicationStatus.PENDING && (
              <p className="mt-4 text-sm">
                Your application is under review. You will be notified once it has been processed.
              </p>
            )}

            {existingApplication.status === ApplicationStatus.APPROVED && (
              <div className="mt-4">
                <p className="text-sm mb-2">
                  🎉 Congratulations! Your application has been approved.
                </p>
                <p className="text-sm">
                  You are now registered as a mentor. You can access your mentor dashboard from your profile.
                </p>
              </div>
            )}

            {existingApplication.status === ApplicationStatus.REJECTED && (
              <div className="mt-4">
                <p className="text-sm mb-2">
                  Unfortunately, your application was not approved at this time.
                </p>
                {existingApplication.rejectionReason && (
                  <div className="mt-2">
                    <span className="font-semibold">Reason: </span>
                    <p className="text-sm mt-1">{existingApplication.rejectionReason}</p>
                  </div>
                )}
              </div>
            )}

            {/* Show application details */}
            <div className="mt-6 pt-6 border-t border-current/20">
              <h3 className="font-semibold mb-3">Application Details</h3>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Bio: </span>
                  <p className="mt-1">{existingApplication.bio}</p>
                </div>

                <div>
                  <span className="font-medium">Expertise: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {existingApplication.expertise.map((exp: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-white/50 rounded">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {existingApplication.certifications.length > 0 && (
                  <div>
                    <span className="font-medium">Certifications: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {existingApplication.certifications.map((cert: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-white/50 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="font-medium">Price per Session: </span>
                  ₹{existingApplication.pricePerSession}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show application form if no existing application
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-2">Apply to Become a Mentor</h2>
        <p className="text-gray-600 mb-6">
          Share your expertise and help mentees achieve their goals. Fill out the form below to submit your application.
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us about yourself, your background, and why you want to be a mentor..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Areas of Expertise <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                placeholder="Enter an area of expertise and press Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddExpertise}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.expertise.map((exp, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {exp}
                  <button
                    type="button"
                    onClick={() => handleRemoveExpertise(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certifications (Optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                placeholder="Enter a certification and press Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddCertification}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-2"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Price per Session */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Session (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="pricePerSession"
              value={formData.pricePerSession}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="e.g., 1500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
