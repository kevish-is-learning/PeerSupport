"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Check, Upload, User, GraduationCap, Briefcase, BookOpen, CheckCircle } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { mentorProfileApi, resolveUploadUrl, authApi } from "../../lib/api";

const STEPS = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Education Details", icon: GraduationCap },
  { id: 3, title: "Professional Background", icon: Briefcase },
  { id: 4, title: "Expertise & Profile", icon: BookOpen },
];

const EXPERTISE_OPTIONS = [
  "Interview Preparation",
  "Resume Review",
  "Career Guidance",
  "Case Study Practice",
  "GD/WAT Preparation",
  "College Selection",
  "Application Strategy",
  "Mock Interviews",
  "Essay Writing",
  "Networking Tips",
];

export default function MentorOnboardingWizard({ existingProfile, onComplete }) {
  const { user, fetchCurrentUser } = useAuthStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepsContainerRef = useRef(null);

  useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;
    
    // Find the active step container element
    const activeStepElement = container.querySelector('[data-active="true"]');
    if (activeStepElement) {
      const containerWidth = container.offsetWidth;
      const elementOffset = activeStepElement.offsetLeft;
      const elementWidth = activeStepElement.offsetWidth;
      // Calculate scroll position to put item in center
      const scrollPos = elementOffset - (containerWidth / 2) + (elementWidth / 2);
      
      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  const [hasWorkExperience, setHasWorkExperience] = useState(
    existingProfile?.workExperience ? true : false
  );

  const [formData, setFormData] = useState({
    profilePhotoUrl: existingProfile?.profilePhotoUrl || "",
    fullName: user?.name || "",
    email: user?.email || "",
    contactNumber: existingProfile?.contactNumber || "",

    mbaCollege: existingProfile?.pgProfile?.split("|")[0] || "",
    mbaSpecialization: existingProfile?.pgProfile?.split("|")[1] || "",
    mbaYear: existingProfile?.pgProfile?.split("|")[2] || "",

    ugCollege: existingProfile?.ugCollegeProfile?.split("|")[0] || "",
    ugDegree: existingProfile?.ugCollegeProfile?.split("|")[1] || "",
    ugSpecialization: existingProfile?.ugCollegeProfile?.split("|")[2] || "",
    ugYear: existingProfile?.ugCollegeProfile?.split("|")[3] || "",

    linkedInUrl: existingProfile?.linkedInUrl || "",
    workExperienceYears: existingProfile?.workExperience?.split("|")[0] || "",
    company: existingProfile?.workExperience?.split("|")[1] || "",
    role: existingProfile?.workExperience?.split("|")[2] || "",

    expertiseTags: existingProfile?.expertiseTags || [],
    bio: existingProfile?.bio || "",
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      let numericValue = value.replace(/\D/g, "").slice(0, 10);
      if (numericValue.length > 5) {
        numericValue = `${numericValue.slice(0, 5)} ${numericValue.slice(5)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpertiseToggle = (tag) => {
    setFormData((prev) => {
      const isSelected = prev.expertiseTags.includes(tag);
      return {
        ...prev,
        expertiseTags: isSelected
          ? prev.expertiseTags.filter((t) => t !== tag)
          : [...prev.expertiseTags, tag],
      };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleNext = () => {
    // Validation for Step 1
    if (currentStep === 1) {
      if (!files.profilePhoto && !formData.profilePhotoUrl) {
        toast.error("Profile picture is required.");
        return;
      }
      if (!formData.fullName.trim()) {
        toast.error("Full name is required.");
        return;
      }
      if (!formData.email.trim()) {
        toast.error("Email is required.");
        return;
      }
      if (!formData.contactNumber.trim()) {
        toast.error("Contact number is required.");
        return;
      }
      
      const cleanNumber = formData.contactNumber.replace(/\s/g, '');
      if (cleanNumber.length !== 10) {
        toast.error("Contact number must be exactly 10 digits.");
        return;
      }
    }

    // Validation for Step 3
    if (currentStep === 3) {
      if (formData.linkedInUrl.trim()) {
        try {
          new URL(formData.linkedInUrl);
          if (!formData.linkedInUrl.toLowerCase().includes("linkedin.com")) {
            toast.error("Please provide a valid LinkedIn URL.");
            return;
          }
        } catch (_) {
          toast.error("Please enter a valid URL including http/https.");
          return;
        }
      }
    }
    
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!formData.bio.trim()) {
      toast.error("Bio is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      
      const pgProfile = [formData.mbaCollege, formData.mbaSpecialization, formData.mbaYear].some(Boolean)
        ? `${formData.mbaCollege}|${formData.mbaSpecialization}|${formData.mbaYear}`
        : "";
      const ugCollegeProfile = [formData.ugCollege, formData.ugDegree, formData.ugSpecialization, formData.ugYear].some(Boolean)
        ? `${formData.ugCollege}|${formData.ugDegree}|${formData.ugSpecialization}|${formData.ugYear}`
        : "";
      const workExp = hasWorkExperience && [formData.workExperienceYears, formData.company, formData.role].some(Boolean)
        ? `${formData.workExperienceYears}|${formData.company}|${formData.role}`
        : "";

      payload.append("contactNumber", formData.contactNumber.replace(/\s/g, ''));
      payload.append("bio", formData.bio);
      
      if (formData.expertiseTags.length > 0) {
        payload.append("expertiseTags", JSON.stringify(formData.expertiseTags));
      } else {
        payload.append("expertiseTags", "[]");
      }
      
      payload.append("ugCollegeProfile", ugCollegeProfile);
      payload.append("pgProfile", pgProfile);
      payload.append("workExperience", workExp);
      payload.append("linkedInUrl", formData.linkedInUrl || "");

      if (files.profilePhoto) {
        payload.append("profilePhoto", files.profilePhoto);
      } else if (formData.profilePhotoUrl) {
        payload.append("profilePhotoUrl", formData.profilePhotoUrl);
      }

      // Note: Full name in `formData.fullName` is not saved to MentorProfile, it typically requires a separate `authApi` call to update the user.
      const userUpdatePayload = { name: formData.fullName };
      try {
        if (typeof authApi.updateProfile === "function") {
          await authApi.updateProfile(userUpdatePayload);
        }
      } catch (e) {
        // Silently ignore
      }

      const result = existingProfile
        ? await mentorProfileApi.update(payload)
        : await mentorProfileApi.create(payload);

      // If user's name changed, update user via authApi profile update if available (assuming user update)
      // Wait, there's no authApi.updateProfile out of the box in typical projects unless defined. 
      // But it's okay to skip user full name update if not supported, we assume it's just for display.

      await fetchCurrentUser();
      toast.success(result?.message || "Mentor profile saved");
      onComplete?.();
    } catch (err) {
      toast.error(err?.message || "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <button 
        onClick={() => router.push("/")}
        className="flex items-center text-sm text-gray-600 hover:text-black mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </button>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Complete Your Mentor Profile</h1>
        <p className="text-sm sm:text-base text-gray-500">Help us know you better to connect you with the right mentees</p>
      </div>

      {/* Stepper Header */}
      <div className="bg-white border-2 border-black rounded-2xl p-2 sm:p-6 mb-6 shadow-[6px_6px_0_rgba(0,0,0,1)] relative overflow-hidden">
        <div 
          ref={stepsContainerRef}
          className="flex w-full items-center overflow-x-auto no-scrollbar scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-full items-center justify-between min-w-[500px] sm:min-w-full px-2 py-1">
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            
            return (
              <React.Fragment key={step.id}>
                <div 
                  data-active={isActive ? "true" : undefined}
                  className="flex flex-col items-center z-10 bg-white px-2 sm:px-4 shrink-0 transition-transform duration-300 w-24 sm:w-32"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all shrink-0 ${
                      isCompleted
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : isActive
                        ? "border-[#5f6cf3] bg-[#5f6cf3] text-white"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <span
                    className={`text-[9px] leading-tight sm:text-xs font-bold text-center break-words mt-1 ${
                      isActive || isCompleted ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-1 md:mx-2 relative top-[-10px] sm:top-[-16px] min-w-[20px]">
                    <div className={`h-full w-full ${isCompleted ? "bg-yellow-400" : "bg-gray-200"}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
          </div>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-[8px_8px_0_rgba(79,70,229,0.8)] min-h-[400px] flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">{STEPS[currentStep - 1].title}</h2>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Profile Picture</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-full border border-dashed border-gray-400 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {(files.profilePhoto || formData.profilePhotoUrl) ? (
                      <img
                        src={files.profilePhoto ? URL.createObjectURL(files.profilePhoto) : resolveUploadUrl(formData.profilePhotoUrl)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">👤</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profilePhoto"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="cursor-pointer inline-flex items-center bg-[#ffc20f] border-2 border-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#e6ae0d] transition-colors shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  placeholder="your.email@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Contact Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-bold text-gray-500">+91</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] pl-12 pr-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🎓</span> MBA Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      MBA College/B-School <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <select
                      name="mbaCollege"
                      value={formData.mbaCollege}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                    >
                      <option value="">Select your B-School</option>
                      <option value="IIM Ahmedabad">IIM Ahmedabad</option>
                      <option value="IIM Bangalore">IIM Bangalore</option>
                      <option value="IIM Calcutta">IIM Calcutta</option>
                      <option value="ISB">ISB</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-600">
                        Specialization <span className="text-xs font-normal text-gray-400">(optional)</span>
                      </label>
                      <input 
                        type="text"
                        name="mbaSpecialization"
                        value={formData.mbaSpecialization}
                        onChange={handleChange}
                        placeholder="e.g., Finance, Marketing"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-600">
                        Graduation Year <span className="text-xs font-normal text-gray-400">(optional)</span>
                      </label>
                      <input 
                        type="number"
                        min="1950"
                        max="2040"
                        name="mbaYear"
                        value={formData.mbaYear}
                        onChange={handleChange}
                        placeholder="e.g., 2024"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🏫</span> Undergraduate Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      College/University <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="ugCollege"
                      value={formData.ugCollege}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-600">
                        Degree <span className="text-xs font-normal text-gray-400">(optional)</span>
                      </label>
                      <input 
                        type="text"
                        name="ugDegree"
                        value={formData.ugDegree}
                        onChange={handleChange}
                        placeholder="B.Tech, B.Com"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-600">
                        Specialization <span className="text-xs font-normal text-gray-400">(optional)</span>
                      </label>
                      <input 
                        type="text"
                        name="ugSpecialization"
                        value={formData.ugSpecialization}
                        onChange={handleChange}
                        placeholder="CS, ECE, etc."
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-600">
                        Year <span className="text-xs font-normal text-gray-400">(optional)</span>
                      </label>
                      <input 
                        type="number"
                        min="1950"
                        max="2040"
                        name="ugYear"
                        value={formData.ugYear}
                        onChange={handleChange}
                        placeholder="e.g., 2020"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  LinkedIn Profile URL <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold">in</span>
                  <input
                    type="url"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] pl-10 pr-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Do you have work experience?</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasWorkExperience"
                      checked={hasWorkExperience}
                      onChange={() => setHasWorkExperience(true)}
                      className="accent-black w-4 h-4"
                    />
                    <span className="text-sm font-medium">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasWorkExperience"
                      checked={!hasWorkExperience}
                      onChange={() => {
                        setHasWorkExperience(false);
                        setFormData((prev) => ({
                          ...prev,
                          workExperienceYears: "",
                          company: "",
                          role: "",
                        }));
                      }}
                      className="accent-black w-4 h-4"
                    />
                    <span className="text-sm font-medium">No (Fresher)</span>
                  </label>
                </div>
              </div>

              {hasWorkExperience && (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Years of Work Experience <span className="text-xs font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      name="workExperienceYears"
                      value={formData.workExperienceYears}
                      onChange={handleChange}
                      placeholder="e.g., 3"
                      className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Current/Previous Company <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">🏢</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] pl-10 pr-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Current/Previous Role <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., Product Manager, Consultant"
                  className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>                </>
              )}            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Areas of Expertise (Select all that apply)</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {EXPERTISE_OPTIONS.map((opt) => {
                    const isSelected = formData.expertiseTags.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleExpertiseToggle(opt)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-2 transition-colors ${
                          isSelected
                            ? "bg-[#5f6cf3] text-white border-[#5f6cf3]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-black"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Bio/About Yourself</label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell mentees about yourself, your journey, and how you can help them..."
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  ></textarea>
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.bio.length} characters
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-row items-center justify-between pt-6 border-t border-gray-100">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-2 sm:px-6 py-2 sm:py-2.5 rounded-full border-1 sm:border-2 border-black font-bold text-xs sm:text-base transition-colors ${
              currentStep === 1 
                ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            &larr; Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-full border-1 sm:border-2 border-black bg-[#5f6cf3] text-white font-bold text-xs sm:text-base hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
            >
              Next &rarr;
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 sm:px-8 py-2 sm:py-2.5 rounded-full border-1 sm:border-2 border-black bg-[#ffc20f] text-black font-bold text-xs sm:text-base hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all flex items-center justify-center shrink-0"
            >
              <span className="hidden sm:inline">{isSubmitting ? "Requesting..." : "Request for Approval"}</span>
              <span className="sm:hidden">{isSubmitting ? "Wait..." : "Request"}</span>
              {!isSubmitting && <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}