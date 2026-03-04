'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { profileService } from '@/services/profile.service';

interface CATAttempt {
  year: string;
  score: string;
  percentile: string;
}

export default function MenteeOnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    // Personal Info
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    dob: '',
    gender: '',
    city: '',

    // Educational Details - 10th
    education10th: ['', '', ''], // [instituteName, score, yearOfPassout]
    
    // Educational Details - 12th
    education12th: ['', '', ''],
    
    // Bachelors
    bachelors: ['', '', ''],
    bachelorsDegree: '',
    
    // Masters
    hasMasters: false,
    masters: ['', '', ''],
    mastersDegree: '',
    
    // Work Experience
    hasWorkExperience: false,
    workExperience: '',
    workExperienceYears: '',
    currentCompany: '',
    currentRole: '',
    
    // Certifications
    certifications: [] as string[],
    
    // CAT History
    catAttempts: [] as CATAttempt[],
    
    // Resume
    resumeUrl: '',
    
    // Expectations
    expectations: '',
    targetColleges: '',
  });

  const [certificationInput, setCertificationInput] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  const handleAddCATAttempt = () => {
    setFormData(prev => ({
      ...prev,
      catAttempts: [...prev.catAttempts, { year: '', score: '', percentile: '' }],
    }));
  };

  const handleCATAttemptChange = (index: number, field: keyof CATAttempt, value: string) => {
    setFormData(prev => {
      const updated = [...prev.catAttempts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, catAttempts: updated };
    });
  };

  const handleRemoveCATAttempt = (index: number) => {
    setFormData(prev => ({
      ...prev,
      catAttempts: prev.catAttempts.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Prepare the payload
      const payload = {
        dob: formData.dob || undefined,
        education10th: formData.education10th.some(v => v) ? formData.education10th : [],
        education12th: formData.education12th.some(v => v) ? formData.education12th : [],
        bachelors: formData.bachelors.some(v => v) ? [...formData.bachelors, formData.bachelorsDegree] : [],
        masters: formData.hasMasters && formData.masters.some(v => v) ? [...formData.masters, formData.mastersDegree] : [],
        workExperience: formData.hasWorkExperience 
          ? `${formData.workExperienceYears} years at ${formData.currentCompany} as ${formData.currentRole}. ${formData.workExperience}`
          : undefined,
        certifications: formData.certifications,
        catScore: formData.catAttempts.length > 0 && formData.catAttempts[formData.catAttempts.length - 1].percentile
          ? parseFloat(formData.catAttempts[formData.catAttempts.length - 1].percentile)
          : undefined,
        expectations: formData.expectations || undefined,
      };

      await profileService.createOrUpdateMenteeProfile(payload);
      router.push('/dashboard');
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save profile. Please try again.',
      });
    } finally {
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

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Education' },
    { number: 3, title: 'Experience' },
    { number: 4, title: 'CAT & Goals' },
    { number: 5, title: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">PeerSupport</Link>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-600 hover:text-black text-sm"
            >
              Skip for now →
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step.number
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  currentStep >= step.number ? 'text-black font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                <p className="text-gray-600">Let's start with your basic details</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., Mumbai"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Educational Details</h2>
                <p className="text-gray-600">Tell us about your academic journey</p>
              </div>

              {/* 10th Standard */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">10</span>
                  Class 10th
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">School Name</label>
                    <input
                      type="text"
                      value={formData.education10th[0]}
                      onChange={(e) => handleEducationChange('education10th', 0, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="School name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Score (%)</label>
                    <input
                      type="text"
                      value={formData.education10th[1]}
                      onChange={(e) => handleEducationChange('education10th', 1, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 92.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year of Passing</label>
                    <input
                      type="text"
                      value={formData.education10th[2]}
                      onChange={(e) => handleEducationChange('education10th', 2, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 2018"
                    />
                  </div>
                </div>
              </div>

              {/* 12th Standard */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">12</span>
                  Class 12th
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">School Name</label>
                    <input
                      type="text"
                      value={formData.education12th[0]}
                      onChange={(e) => handleEducationChange('education12th', 0, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="School name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Score (%)</label>
                    <input
                      type="text"
                      value={formData.education12th[1]}
                      onChange={(e) => handleEducationChange('education12th', 1, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 88.2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year of Passing</label>
                    <input
                      type="text"
                      value={formData.education12th[2]}
                      onChange={(e) => handleEducationChange('education12th', 2, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>
              </div>

              {/* Bachelors */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">🎓</span>
                  Bachelor's Degree
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">College/University</label>
                    <input
                      type="text"
                      value={formData.bachelors[0]}
                      onChange={(e) => handleEducationChange('bachelors', 0, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="College name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree</label>
                    <input
                      type="text"
                      name="bachelorsDegree"
                      value={formData.bachelorsDegree}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., B.Tech in Computer Science"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">CGPA / Percentage</label>
                    <input
                      type="text"
                      value={formData.bachelors[1]}
                      onChange={(e) => handleEducationChange('bachelors', 1, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 8.5 CGPA or 85%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year of Passing</label>
                    <input
                      type="text"
                      value={formData.bachelors[2]}
                      onChange={(e) => handleEducationChange('bachelors', 2, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>
              </div>

              {/* Masters */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">🎓</span>
                    Master's Degree
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasMasters"
                      checked={formData.hasMasters}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">I have a Master's degree</span>
                  </label>
                </div>
                {formData.hasMasters && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">College/University</label>
                        <input
                          type="text"
                          value={formData.masters[0]}
                          onChange={(e) => handleEducationChange('masters', 0, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="College name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Degree</label>
                        <input
                          type="text"
                          name="mastersDegree"
                          value={formData.mastersDegree}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="e.g., M.Tech in Data Science"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">CGPA / Percentage</label>
                        <input
                          type="text"
                          value={formData.masters[1]}
                          onChange={(e) => handleEducationChange('masters', 1, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="e.g., 8.5 CGPA or 85%"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Year of Passing</label>
                        <input
                          type="text"
                          value={formData.masters[2]}
                          onChange={(e) => handleEducationChange('masters', 2, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="e.g., 2026"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Work Experience & Certifications */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Experience & Certifications</h2>
                <p className="text-gray-600">Share your professional experience and achievements</p>
              </div>

              {/* Work Experience */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">💼</span>
                    Work Experience
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasWorkExperience"
                      checked={formData.hasWorkExperience}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">I have work experience</span>
                  </label>
                </div>
                {formData.hasWorkExperience && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Years of Experience</label>
                        <select
                          name="workExperienceYears"
                          value={formData.workExperienceYears}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="">Select</option>
                          <option value="0-1">Less than 1 year</option>
                          <option value="1-2">1-2 years</option>
                          <option value="2-3">2-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Company</label>
                        <input
                          type="text"
                          name="currentCompany"
                          value={formData.currentCompany}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Role</label>
                      <input
                        type="text"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Brief Description</label>
                      <textarea
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-24"
                        placeholder="Describe your key responsibilities and achievements..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm">📜</span>
                  Certifications
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={certificationInput}
                    onChange={(e) => setCertificationInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                  <button
                    type="button"
                    onClick={handleAddCertification}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>
                {formData.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {cert}
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No certifications added yet</p>
                )}
              </div>

              {/* Resume Upload */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">📄</span>
                  Resume
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Resume URL (Google Drive / Dropbox link)</label>
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Share a viewable link to your latest resume</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: CAT History & Goals */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">CAT History & Goals</h2>
                <p className="text-gray-600">Tell us about your CAT attempts and MBA aspirations</p>
              </div>

              {/* CAT Attempts */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">📊</span>
                    CAT Attempts
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddCATAttempt}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    + Add Attempt
                  </button>
                </div>
                {formData.catAttempts.length > 0 ? (
                  <div className="space-y-4">
                    {formData.catAttempts.map((attempt, index) => (
                      <div key={index} className="grid md:grid-cols-4 gap-4 items-end p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium mb-1">Year</label>
                          <select
                            value={attempt.year}
                            onChange={(e) => handleCATAttemptChange(index, 'year', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                          >
                            <option value="">Select</option>
                            {[2025, 2024, 2023, 2022, 2021, 2020].map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Score</label>
                          <input
                            type="text"
                            value={attempt.score}
                            onChange={(e) => handleCATAttemptChange(index, 'score', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="e.g., 180"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Percentile</label>
                          <input
                            type="text"
                            value={attempt.percentile}
                            onChange={(e) => handleCATAttemptChange(index, 'percentile', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="e.g., 98.5"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCATAttempt(index)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No CAT attempts added. Click "Add Attempt" if you've taken CAT before.
                  </p>
                )}
              </div>

              {/* Target Colleges */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm">🎯</span>
                  Target Colleges
                </h3>
                <div>
                  <textarea
                    name="targetColleges"
                    value={formData.targetColleges}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-24"
                    placeholder="e.g., IIM Ahmedabad, IIM Bangalore, IIM Calcutta, ISB Hyderabad..."
                  />
                </div>
              </div>

              {/* Expectations */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-sm">💭</span>
                  What do you expect from mentoring?
                </h3>
                <div>
                  <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
                    placeholder="Tell us what kind of guidance you're looking for - CAT preparation strategy, interview prep, profile building, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review Your Profile</h2>
                <p className="text-gray-600">Please review your information before submitting</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Personal Info</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {formData.name}</p>
                    <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                    {formData.dob && <p><span className="text-gray-600">DOB:</span> {formData.dob}</p>}
                    {formData.city && <p><span className="text-gray-600">City:</span> {formData.city}</p>}
                  </div>
                </div>

                {/* Education Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Education</h3>
                  <div className="space-y-2 text-sm">
                    {formData.education10th[0] && (
                      <p><span className="text-gray-600">10th:</span> {formData.education10th[0]} ({formData.education10th[1]}%)</p>
                    )}
                    {formData.education12th[0] && (
                      <p><span className="text-gray-600">12th:</span> {formData.education12th[0]} ({formData.education12th[1]}%)</p>
                    )}
                    {formData.bachelors[0] && (
                      <p><span className="text-gray-600">Bachelors:</span> {formData.bachelorsDegree} from {formData.bachelors[0]}</p>
                    )}
                    {formData.hasMasters && formData.masters[0] && (
                      <p><span className="text-gray-600">Masters:</span> {formData.mastersDegree} from {formData.masters[0]}</p>
                    )}
                  </div>
                </div>

                {/* Experience Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Experience</h3>
                  {formData.hasWorkExperience ? (
                    <div className="space-y-2 text-sm">
                      <p>{formData.currentRole} at {formData.currentCompany}</p>
                      <p className="text-gray-600">{formData.workExperienceYears} years of experience</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Fresher / No work experience</p>
                  )}
                </div>

                {/* CAT Summary */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">CAT History</h3>
                  {formData.catAttempts.length > 0 ? (
                    <div className="space-y-1 text-sm">
                      {formData.catAttempts.map((attempt, index) => (
                        <p key={index}>
                          CAT {attempt.year}: {attempt.percentile}%ile (Score: {attempt.score})
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">First time CAT aspirant</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              {formData.certifications.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Expectations */}
              {formData.expectations && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-500 uppercase">Expectations</h3>
                  <p className="text-sm text-gray-700">{formData.expectations}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ← Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Complete Profile & Go to Dashboard'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
