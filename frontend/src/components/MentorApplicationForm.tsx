'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mentorService, MentorApplicationData } from '@/services/mentor.service';
import { ApplicationStatus, SocialLink, WorkExperience, ResumeFile } from '@/types';

// Steps for the application process
const STEPS = [
  { id: 1, title: 'Personal Details & Social Links', description: 'Basic information and social profiles' },
  { id: 2, title: 'Expertise', description: 'Your areas of expertise' },
  { id: 3, title: 'Education', description: 'Educational background' },
  { id: 4, title: 'Work Experience', description: 'Professional experience' },
  { id: 5, title: 'CAT Score', description: 'CAT exam details (optional)' },
  { id: 6, title: 'Certifications', description: 'Professional certifications' },
  { id: 7, title: 'Resumes & Pricing', description: 'Upload resume and set pricing' },
];

const SOCIAL_PLATFORMS = [
  'LinkedIn',
  'Twitter',
  'GitHub',
  'Instagram',
  'YouTube',
  'Facebook',
  'Portfolio Website',
  'Other',
];

export default function MentorApplicationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingApplication, setIsCheckingApplication] = useState(true);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form data state
  const [formData, setFormData] = useState<MentorApplicationData>({
    // Step 1
    bio: '',
    headline: '',
    phone: '',
    location: '',
    socialLinks: [],
    // Step 2
    expertise: [],
    // Step 3
    education10th: ['', '', ''], // [instituteName, score, yearOfPassout]
    education12th: ['', '', ''],
    bachelors: ['', '', '', ''], // [degree, instituteName, score, yearOfPassout]
    masters: ['', '', '', ''],
    // Step 4
    workExperience: [],
    // Step 5
    catScore: undefined,
    catYear: undefined,
    catPercentile: undefined,
    // Step 6
    certifications: [],
    // Step 7
    resumes: [],
    pricePerSession: 0,
  });

  // Temporary inputs
  const [expertiseInput, setExpertiseInput] = useState('');
  const [certificationInput, setCertificationInput] = useState('');
  const [newSocialLink, setNewSocialLink] = useState<SocialLink>({ platform: '', url: '' });
  const [newWorkExp, setNewWorkExp] = useState<WorkExperience>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });
  const [newResume, setNewResume] = useState<ResumeFile>({ name: '', fileUrl: '' });

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const response = await mentorService.getMyApplication();
      if (response.data) {
        setExistingApplication(response.data);
        // Pre-fill form if application exists
        if (response.data.status === 'REJECTED') {
          setFormData({
            bio: response.data.bio || '',
            headline: response.data.headline || '',
            phone: response.data.phone || '',
            location: response.data.location || '',
            socialLinks: response.data.socialLinks || [],
            expertise: response.data.expertise || [],
            education10th: response.data.education10th || ['', '', ''],
            education12th: response.data.education12th || ['', '', ''],
            bachelors: response.data.bachelors || ['', '', '', ''],
            masters: response.data.masters || ['', '', '', ''],
            workExperience: response.data.workExperience || [],
            catScore: response.data.catScore,
            catYear: response.data.catYear,
            catPercentile: response.data.catPercentile,
            certifications: response.data.certifications || [],
            resumes: response.data.resumes || [],
            pricePerSession: response.data.pricePerSession || 0,
          });
        }
      }
    } catch (error) {
      console.log('No existing application found');
    } finally {
      setIsCheckingApplication(false);
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      setMessage(null);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setMessage(null);
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.bio.trim()) {
          setMessage({ type: 'error', text: 'Bio is required' });
          return false;
        }
        if (formData.bio.length < 50) {
          setMessage({ type: 'error', text: 'Bio should be at least 50 characters' });
          return false;
        }
        return true;
      case 2:
        if (formData.expertise.length === 0) {
          setMessage({ type: 'error', text: 'At least one area of expertise is required' });
          return false;
        }
        return true;
      case 7:
        if (!formData.pricePerSession || formData.pricePerSession <= 0) {
          setMessage({ type: 'error', text: 'Valid price per session is required' });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      let response;
      if (existingApplication && existingApplication.status === 'REJECTED') {
        response = await mentorService.updateApplication(formData);
      } else {
        response = await mentorService.submitApplication(formData);
      }

      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setExistingApplication(response.data);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit application',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Social Links handlers
  const addSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) return;
    if ((formData.socialLinks?.length || 0) >= 5) {
      setMessage({ type: 'error', text: 'Maximum 5 social links allowed' });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), { ...newSocialLink }],
    }));
    setNewSocialLink({ platform: '', url: '' });
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks?.filter((_, i) => i !== index),
    }));
  };

  // Expertise handlers
  const addExpertise = () => {
    if (!expertiseInput.trim()) return;
    if (!formData.expertise.includes(expertiseInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()],
      }));
    }
    setExpertiseInput('');
  };

  const removeExpertise = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index),
    }));
  };

  // Work Experience handlers
  const addWorkExperience = () => {
    if (!newWorkExp.company || !newWorkExp.role || !newWorkExp.startDate) {
      setMessage({ type: 'error', text: 'Company, role, and start date are required' });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      workExperience: [...(prev.workExperience || []), { ...newWorkExp }],
    }));
    setNewWorkExp({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
    setMessage(null);
  };

  const removeWorkExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience?.filter((_, i) => i !== index),
    }));
  };

  // Certification handlers
  const addCertification = () => {
    if (!certificationInput.trim()) return;
    if (!formData.certifications?.includes(certificationInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), certificationInput.trim()],
      }));
    }
    setCertificationInput('');
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index),
    }));
  };

  // Resume handlers
  const addResume = () => {
    if (!newResume.name || !newResume.fileUrl) {
      setMessage({ type: 'error', text: 'Resume name and URL are required' });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      resumes: [...(prev.resumes || []), { ...newResume }],
    }));
    setNewResume({ name: '', fileUrl: '' });
    setMessage(null);
  };

  const removeResume = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      resumes: prev.resumes?.filter((_, i) => i !== index),
    }));
  };

  // Loading state
  if (isCheckingApplication) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show status if application is pending or approved
  if (existingApplication && existingApplication.status !== 'REJECTED') {
    return <ApplicationStatusView application={existingApplication} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {currentStep > step.id ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-full h-1 mx-2 ${
                    currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                  style={{ minWidth: '40px' }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Message */}
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

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Step 1: Personal Details & Social Links */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself, your experience, and what you can offer as a mentor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={5}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters (minimum 50)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, headline: e.target.value }))}
                placeholder="e.g., Senior Software Engineer | IIM Ahmedabad | CAT 99.5%ile"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Mumbai, India"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Links (max 5)
              </label>
              <div className="flex gap-2 mb-3">
                <select
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink((prev) => ({ ...prev, platform: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Platform</option>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  value={newSocialLink.url}
                  onChange={(e) => setNewSocialLink((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="Profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.socialLinks?.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                  >
                    <span>
                      <strong>{link.platform}:</strong> {link.url}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Expertise */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Expertise <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                  placeholder="e.g., CAT Preparation, VARC, Quant, Data Interpretation"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addExpertise}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.expertise.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeExpertise(index)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add areas where you can mentor students (e.g., CAT Preparation, Interview Skills, GD)
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Education */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* 10th */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">10th Standard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.education10th?.[0] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education10th || ['', '', ''])];
                    updated[0] = e.target.value;
                    setFormData((prev) => ({ ...prev, education10th: updated }));
                  }}
                  placeholder="School Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.education10th?.[1] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education10th || ['', '', ''])];
                    updated[1] = e.target.value;
                    setFormData((prev) => ({ ...prev, education10th: updated }));
                  }}
                  placeholder="Percentage/CGPA"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.education10th?.[2] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education10th || ['', '', ''])];
                    updated[2] = e.target.value;
                    setFormData((prev) => ({ ...prev, education10th: updated }));
                  }}
                  placeholder="Year of Passout"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* 12th */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">12th Standard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={formData.education12th?.[0] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education12th || ['', '', ''])];
                    updated[0] = e.target.value;
                    setFormData((prev) => ({ ...prev, education12th: updated }));
                  }}
                  placeholder="School Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.education12th?.[1] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education12th || ['', '', ''])];
                    updated[1] = e.target.value;
                    setFormData((prev) => ({ ...prev, education12th: updated }));
                  }}
                  placeholder="Percentage/CGPA"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.education12th?.[2] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.education12th || ['', '', ''])];
                    updated[2] = e.target.value;
                    setFormData((prev) => ({ ...prev, education12th: updated }));
                  }}
                  placeholder="Year of Passout"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Bachelors */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Bachelor&apos;s Degree</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.bachelors?.[0] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.bachelors || ['', '', '', ''])];
                    updated[0] = e.target.value;
                    setFormData((prev) => ({ ...prev, bachelors: updated }));
                  }}
                  placeholder="Degree (e.g., B.Tech, B.Com)"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.bachelors?.[1] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.bachelors || ['', '', '', ''])];
                    updated[1] = e.target.value;
                    setFormData((prev) => ({ ...prev, bachelors: updated }));
                  }}
                  placeholder="College/University"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.bachelors?.[2] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.bachelors || ['', '', '', ''])];
                    updated[2] = e.target.value;
                    setFormData((prev) => ({ ...prev, bachelors: updated }));
                  }}
                  placeholder="Percentage/CGPA"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.bachelors?.[3] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.bachelors || ['', '', '', ''])];
                    updated[3] = e.target.value;
                    setFormData((prev) => ({ ...prev, bachelors: updated }));
                  }}
                  placeholder="Year of Passout"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Masters */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Master&apos;s Degree (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.masters?.[0] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.masters || ['', '', '', ''])];
                    updated[0] = e.target.value;
                    setFormData((prev) => ({ ...prev, masters: updated }));
                  }}
                  placeholder="Degree (e.g., MBA, M.Tech)"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.masters?.[1] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.masters || ['', '', '', ''])];
                    updated[1] = e.target.value;
                    setFormData((prev) => ({ ...prev, masters: updated }));
                  }}
                  placeholder="College/University"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.masters?.[2] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.masters || ['', '', '', ''])];
                    updated[2] = e.target.value;
                    setFormData((prev) => ({ ...prev, masters: updated }));
                  }}
                  placeholder="Percentage/CGPA"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={formData.masters?.[3] || ''}
                  onChange={(e) => {
                    const updated = [...(formData.masters || ['', '', '', ''])];
                    updated[3] = e.target.value;
                    setFormData((prev) => ({ ...prev, masters: updated }));
                  }}
                  placeholder="Year of Passout"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Work Experience */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add Work Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newWorkExp.company}
                  onChange={(e) => setNewWorkExp((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Company Name *"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={newWorkExp.role}
                  onChange={(e) => setNewWorkExp((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Role/Position *"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="month"
                  value={newWorkExp.startDate}
                  onChange={(e) => setNewWorkExp((prev) => ({ ...prev, startDate: e.target.value }))}
                  placeholder="Start Date *"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-4">
                  <input
                    type="month"
                    value={newWorkExp.endDate}
                    onChange={(e) => setNewWorkExp((prev) => ({ ...prev, endDate: e.target.value }))}
                    placeholder="End Date"
                    disabled={newWorkExp.current}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  />
                  <label className="flex items-center gap-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={newWorkExp.current}
                      onChange={(e) =>
                        setNewWorkExp((prev) => ({
                          ...prev,
                          current: e.target.checked,
                          endDate: e.target.checked ? '' : prev.endDate,
                        }))
                      }
                      className="w-4 h-4 text-indigo-600"
                    />
                    Currently Working
                  </label>
                </div>
              </div>
              <textarea
                value={newWorkExp.description}
                onChange={(e) => setNewWorkExp((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your role and responsibilities"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4"
                rows={3}
              />
              <button
                type="button"
                onClick={addWorkExperience}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Experience
              </button>
            </div>

            {/* Experience List */}
            {(formData.workExperience?.length || 0) > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Added Experiences:</h4>
                {formData.workExperience?.map((exp, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                    <h5 className="font-semibold">{exp.role}</h5>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: CAT Score */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <p className="text-gray-600 mb-4">
              If you have attempted CAT exam, please provide your score details. This helps students
              understand your credibility as a mentor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CAT Score</label>
                <input
                  type="number"
                  value={formData.catScore || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      catScore: e.target.value ? parseFloat(e.target.value) : undefined,
                    }))
                  }
                  placeholder="e.g., 180"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CAT Year</label>
                <input
                  type="number"
                  value={formData.catYear || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      catYear: e.target.value ? parseInt(e.target.value) : undefined,
                    }))
                  }
                  placeholder="e.g., 2024"
                  min="2000"
                  max="2030"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Percentile</label>
                <input
                  type="number"
                  value={formData.catPercentile || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      catPercentile: e.target.value ? parseFloat(e.target.value) : undefined,
                    }))
                  }
                  placeholder="e.g., 99.5"
                  step="0.01"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Certifications */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={certificationInput}
                  onChange={(e) => setCertificationInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addCertification}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certifications?.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Resumes & Pricing */}
        {currentStep === 7 && (
          <div className="space-y-8">
            {/* Resumes */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Upload Resume</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newResume.name}
                  onChange={(e) => setNewResume((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Resume Name (e.g., Latest Resume)"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="url"
                  value={newResume.fileUrl}
                  onChange={(e) => setNewResume((prev) => ({ ...prev, fileUrl: e.target.value }))}
                  placeholder="Resume URL (Google Drive, Dropbox link)"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={addResume}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Resume
              </button>

              {/* Resume List */}
              {(formData.resumes?.length || 0) > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.resumes?.map((resume, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                    >
                      <span>
                        <strong>{resume.name}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeResume(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Session Pricing</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Session (INR) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={formData.pricePerSession || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pricePerSession: parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder="500"
                    min="100"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Set your hourly rate. A 15% platform fee will be deducted from your earnings.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Application Status View Component
function ApplicationStatusView({ application }: { application: any }) {
  const getStatusStyles = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          text: 'text-yellow-800',
          icon: '⏳',
        };
      case ApplicationStatus.APPROVED:
        return {
          bg: 'bg-green-50',
          border: 'border-green-300',
          text: 'text-green-800',
          icon: '✅',
        };
      case ApplicationStatus.REJECTED:
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-800',
          icon: '❌',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-800',
          icon: '📋',
        };
    }
  };

  const styles = getStatusStyles(application.status);

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${styles.bg} ${styles.border} border-2 rounded-xl p-8`}>
        <div className="text-center mb-6">
          <span className="text-4xl">{styles.icon}</span>
          <h2 className={`text-2xl font-bold mt-4 ${styles.text}`}>
            Application Status: {application.status}
          </h2>
          <p className="text-gray-600 mt-2">
            Submitted on {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>

        {application.status === ApplicationStatus.PENDING && (
          <div className="bg-white rounded-lg p-6 mt-6">
            <h3 className="font-semibold text-lg mb-2">Your application is under review</h3>
            <p className="text-gray-600">
              Our team is reviewing your application. You will be notified once a decision has been
              made. This usually takes 2-3 business days.
            </p>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> While your application is pending, you cannot set availability
                or open slots for bookings.
              </p>
            </div>
          </div>
        )}

        {application.status === ApplicationStatus.APPROVED && (
          <div className="bg-white rounded-lg p-6 mt-6">
            <h3 className="font-semibold text-lg mb-2">Congratulations! 🎉</h3>
            <p className="text-gray-600">
              Your mentor application has been approved. You can now access your mentor dashboard and
              start accepting bookings.
            </p>
            <a
              href="/dashboard"
              className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Go to Mentor Dashboard
            </a>
          </div>
        )}

        {/* Application Details */}
        <div className="mt-8 space-y-6">
          <h3 className="font-semibold text-lg">Application Details</h3>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-700">Bio</h4>
            <p className="text-gray-600 mt-1">{application.bio}</p>
          </div>

          {application.headline && (
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-700">Headline</h4>
              <p className="text-gray-600 mt-1">{application.headline}</p>
            </div>
          )}

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-700">Expertise</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {application.expertise?.map((item: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-700">Price per Session</h4>
            <p className="text-gray-600 mt-1 text-xl font-bold">₹{application.pricePerSession}</p>
          </div>

          {application.catScore && (
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-700">CAT Score</h4>
              <p className="text-gray-600 mt-1">
                Score: {application.catScore} | Year: {application.catYear} | Percentile:{' '}
                {application.catPercentile}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
