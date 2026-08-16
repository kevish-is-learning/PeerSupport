"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  Upload,
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import {
  mentorProfileApi,
  resolveUploadUrl,
} from "../../lib/api";
import PillButton from "../ui/PillButton";
import UniversalButton from "../ui/universalButton";

const STEPS = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Education Details", icon: GraduationCap },
  { id: 3, title: "Professional Background", icon: Briefcase },
  { id: 4, title: "Expertise & Profile", icon: BookOpen },
];

// Services are configured later from the mentor dashboard — not during onboarding.

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

const parseLegacyProfile = (value, keys) => Object.fromEntries(
  keys.map((key, index) => [key, (value || "").split("|")[index] || ""]),
);

const getEducationData = (profile) => profile?.education || {
  mba: parseLegacyProfile(profile?.pgProfile, ["college", "specialization", "graduationYear"]),
  undergraduate: parseLegacyProfile(profile?.ugCollegeProfile, ["college", "degree", "specialization", "graduationYear"]),
};

const getExperienceData = (profile) => profile?.professionalExperience || (() => {
  const legacy = parseLegacyProfile(profile?.workExperience, ["years", "company", "role"]);
  return {
    hasExperience: Boolean(legacy.years || legacy.company || legacy.role),
    ...legacy,
  };
})();

export default function MentorOnboardingWizard({
  existingProfile,
  onComplete,
}) {
  const { user, fetchCurrentUser } = useAuthStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepsContainerRef = useRef(null);
  const draftKey = user?.id ? `mentor-onboarding-draft:${user.id}` : null;

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
      const scrollPos = elementOffset - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  const initialEducation = getEducationData(existingProfile);
  const initialExperience = getExperienceData(existingProfile);

  const [hasWorkExperience, setHasWorkExperience] = useState(
    existingProfile?.professionalExperience?.hasExperience !== undefined
      ? Boolean(existingProfile.professionalExperience.hasExperience)
      : Boolean(existingProfile?.workExperience)
  );

  const [formData, setFormData] = useState({
    profilePhotoUrl: existingProfile?.profilePhotoUrl || user?.profilePicture || "",
    fullName: user?.name || "",
    email: user?.email || "",
    contactNumber: existingProfile?.contactNumber || "",

    mbaCollege: initialEducation.mba?.college || "",
    mbaSpecialization: initialEducation.mba?.specialization || "",
    mbaYear: initialEducation.mba?.graduationYear ? String(initialEducation.mba.graduationYear) : "",

    ugCollege: initialEducation.undergraduate?.college || "",
    ugDegree: initialEducation.undergraduate?.degree || "",
    ugSpecialization: initialEducation.undergraduate?.specialization || "",
    ugYear: initialEducation.undergraduate?.graduationYear ? String(initialEducation.undergraduate.graduationYear) : "",

    linkedInUrl: existingProfile?.linkedInUrl || "",
    workExperienceYears: initialExperience.years !== undefined && initialExperience.years !== null ? String(initialExperience.years) : "",
    company: initialExperience.company || "",
    role: initialExperience.role || "",

    expertiseTags: existingProfile?.expertiseTags || [],
    bio: existingProfile?.bio || "",

    mentoringQ1: existingProfile?.mentoringQA?.q1 || "",
    mentoringQ2: existingProfile?.mentoringQA?.q2 || "",
    mentoringQ3: existingProfile?.mentoringQA?.q3 || "",
  });

  const [files, setFiles] = useState({
    profilePhoto: null,
    collegeDocument: null,
  });

  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");

  useEffect(() => {
    if (!draftKey || existingProfile) return;
    const draft = window.localStorage.getItem(draftKey);
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft);
      if (parsed.formData) {
        setFormData((current) => ({
          ...current,
          ...parsed.formData,
          profilePhotoUrl: parsed.formData.profilePhotoUrl || current.profilePhotoUrl || user?.profilePicture || "",
        }));
      }
      if (typeof parsed.hasWorkExperience === "boolean") {
        setHasWorkExperience(parsed.hasWorkExperience);
      }
      if (Number.isInteger(parsed.currentStep)) setCurrentStep(Math.min(4, Math.max(1, parsed.currentStep)));
    } catch {
      window.localStorage.removeItem(draftKey);
    }
  }, [draftKey, existingProfile, user?.profilePicture]);

  useEffect(() => {
    if (!draftKey || existingProfile) return;
    window.localStorage.setItem(
      draftKey,
      JSON.stringify({
        formData: {
          ...formData,
          profilePhotoUrl: formData.profilePhotoUrl?.startsWith("blob:") ? "" : formData.profilePhotoUrl,
        },
        hasWorkExperience,
        currentStep,
      })
    );
  }, [draftKey, existingProfile, formData, hasWorkExperience, currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      const cleaned = value.replace(/[^\d+()\-\s]/g, "").slice(0, 16);
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
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
      const file = files[0];
      if (name === "profilePhoto") {
        if (!file.type.startsWith("image/")) {
          toast.error("Please choose an image file.");
          return;
        }
        setFiles((prev) => ({ ...prev, profilePhoto: file }));
        setPhotoPreviewUrl(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, profilePhotoUrl: "" }));
      } else {
        setFiles((prev) => ({ ...prev, [name]: file }));
      }
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

      const digitsOnly = formData.contactNumber.replace(/\D/g, "");
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        toast.error("Please enter a valid contact number (7-15 digits).");
        return;
      }
    }

    if (currentStep === 2) {
      const currentYear = new Date().getFullYear();
      const mbaYear = Number(formData.mbaYear);
      const ugYear = Number(formData.ugYear);
      if (!formData.mbaCollege.trim() || !formData.ugCollege.trim() || !formData.ugDegree.trim()) {
        toast.error("Please complete your MBA and undergraduate education details.");
        return;
      }
      if (!Number.isInteger(mbaYear) || mbaYear < 1950 || mbaYear > currentYear + 10 || !Number.isInteger(ugYear) || ugYear < 1950 || ugYear > currentYear + 10) {
        toast.error("Please enter valid graduation years.");
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
      if (hasWorkExperience) {
        const yearsNum = Number(formData.workExperienceYears);
        if (
          formData.workExperienceYears === "" ||
          Number.isNaN(yearsNum) ||
          yearsNum < 0 ||
          !formData.company.trim() ||
          !formData.role.trim()
        ) {
          toast.error("Please provide your years of experience, company, and role.");
          return;
        }
      }
    }

    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("fullName", formData.fullName.trim());
    payload.append("contactNumber", formData.contactNumber.trim());
    payload.append("bio", formData.bio);
    payload.append("expertiseTags", JSON.stringify(formData.expertiseTags));
    payload.append("linkedInUrl", formData.linkedInUrl || "");
    payload.append("education", JSON.stringify({
      mba: { college: formData.mbaCollege, specialization: formData.mbaSpecialization, graduationYear: Number(formData.mbaYear) },
      undergraduate: { college: formData.ugCollege, degree: formData.ugDegree, specialization: formData.ugSpecialization, graduationYear: Number(formData.ugYear) },
    }));
    payload.append("professionalExperience", JSON.stringify({
      hasExperience: hasWorkExperience,
      ...(hasWorkExperience ? { years: Number(formData.workExperienceYears), company: formData.company, role: formData.role } : {}),
    }));
    payload.append("mentoringQA", JSON.stringify({
      q1: formData.mentoringQ1,
      q2: formData.mentoringQ2,
      q3: formData.mentoringQ3,
    }));

    if (files.profilePhoto) {
      payload.append("profilePhoto", files.profilePhoto);
    } else if (formData.profilePhotoUrl) {
      payload.append("profilePhotoUrl", formData.profilePhotoUrl);
    }
    if (files.collegeDocument) payload.append("collegeDocument", files.collegeDocument);

    return payload;
  };

  const submitProfile = async (payload) => {
    const result = existingProfile
      ? await mentorProfileApi.update(payload)
      : await mentorProfileApi.create(payload);

    await fetchCurrentUser();
    if (draftKey) window.localStorage.removeItem(draftKey);
    toast.success(result?.message || "Mentor profile saved");
    onComplete?.();
  };

  const handleSubmit = async () => {
    if (!formData.bio.trim()) {
      toast.error("Bio is required.");
      return;
    }
    if (formData.expertiseTags.length === 0) {
      toast.error("Select at least one area of expertise.");
      return;
    }
    const mentoringAnswers = [formData.mentoringQ1, formData.mentoringQ2, formData.mentoringQ3];
    if (mentoringAnswers.some((answer) => !answer.trim())) {
      toast.error("Please complete all mentoring questions.");
      return;
    }
    if (mentoringAnswers.some((answer) => answer.trim().length < 30)) {
      toast.error("Please write at least 30 characters for each mentoring response.");
      return;
    }
    setIsSubmitting(true);
    try {
      await submitProfile(buildPayload());
    } catch (err) {
      toast.error(err?.message || "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-sm text-gray-600 hover:text-black mb-6 font-medium transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </button>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Complete Your Mentor Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Help us know you better to connect you with the right mentees
        </p>
      </div>

      {/* Stepper Header */}
      <div className="bg-white border-2 border-black rounded-2xl p-2 sm:p-6 mb-6 shadow-[6px_6px_0_#FFB705] relative overflow-hidden">
        <div
          ref={stepsContainerRef}
          className="flex w-full items-center overflow-x-auto no-scrollbar scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-full items-center justify-between min-w-[600px] sm:min-w-full px-2 py-1">
            {STEPS.map((step, idx) => {
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;

              return (
                <React.Fragment key={step.id}>
                  <div
                    data-active={isActive ? "true" : undefined}
                    className="flex flex-col items-center z-10 bg-white px-2 sm:px-4 shrink-0 transition-transform duration-300 w-20 sm:w-28"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all shrink-0 ${
                        isCompleted
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : isActive
                            ? "border-yellow-400 bg-yellow-400 text-black"
                            : "border-gray-200 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <span
                      className={`text-[9px] leading-tight sm:text-xs font-bold text-center wrap-break-word mt-1 ${
                        isActive || isCompleted ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="flex-1 h-[2px] mx-1 md:mx-2 relative top-[-10px] sm:top-[-16px] min-w-[12px]">
                      <div
                        className={`h-full w-full ${isCompleted ? "bg-yellow-400" : "bg-gray-200"}`}
                      />
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
          <h2 className="text-xl font-bold mb-6">
            {STEPS[currentStep - 1].title}
          </h2>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Profile Picture
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 shrink-0 rounded-full border border-dashed border-gray-400 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {photoPreviewUrl || formData.profilePhotoUrl ? (
                      <img
                        src={photoPreviewUrl || resolveUploadUrl(formData.profilePhotoUrl)}
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
                      className="cursor-pointer inline-flex items-center bg-[#ffc20f] border-2 border-black px-4 py-2 rounded-xl text-sm hover:bg-[#e6ae0d] transition-colors shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {files.profilePhoto ? "Change Photo" : "Upload Photo"}
                    </label>
                    {files.profilePhoto && (
                      <p className="mt-2 max-w-48 truncate text-xs font-medium text-emerald-700">
                        Selected: {files.profilePhoto.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                {/* have a user icon inside the input */}
                <div className="relative flex items-center">
                  <User
                    size={18}
                    className="absolute left-2 font-bold text-orange-400"
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 pl-8 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={18}
                    className="absolute left-2 font-bold text-orange-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder="your.email@example.com"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 pl-8 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Contact Number
                </label>
                <div className="relative flex items-center">
                  <Phone
                    size={18}
                    className="absolute left-2 font-bold text-orange-400"
                  />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    maxLength="16"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] pr-4 py-3 pl-8 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
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
                      MBA College/B-School{" "}
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
                        Specialization{" "}
                        <span className="text-xs font-normal text-gray-400">(optional)</span>
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
                        Graduation Year{" "}
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear() + 10}
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

              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4">
                <label className="block text-sm font-semibold text-gray-700">College document for verification <span className="font-normal text-gray-400">(optional)</span></label>
                <p className="mt-1 text-xs text-gray-500">Upload a student ID, degree, or marksheet (JPG, PNG, WEBP, HEIC).</p>
                <input
                  type="file"
                  name="collegeDocument"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  onChange={handleFileChange}
                  className="mt-3 block w-full text-sm"
                />
                {(files.collegeDocument || existingProfile?.collegeDocumentUrl) && (
                  <p className="mt-2 text-xs font-medium text-emerald-600">Document ready for review.</p>
                )}
              </div>

              <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🏫</span> Undergraduate Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      College/University{" "}
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
                        Degree{" "}
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
                        Specialization{" "}
                        <span className="text-xs font-normal text-gray-400">(optional)</span>
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
                        Year{" "}
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear() + 10}
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
                  LinkedIn Profile URL{" "}
                  <span className="text-xs font-normal text-gray-400">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold">
                    in
                  </span>
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
                <label className="block text-sm font-semibold mb-2">
                  Do you have work experience?
                </label>
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
                      Years of Work Experience
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
                      Current/Previous Company
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
                        🏢
                      </span>
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
                      Current/Previous Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g., Product Manager, Consultant"
                      className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    />
                  </div>{" "}
                </>
              )}{" "}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Areas of Expertise (Select all that apply)
                </label>
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

              {/* ── Why I Want to Mentor ─────────────────────────────── */}
              <div className="border-2 border-indigo-200 rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-indigo-50/40 to-white shadow-[0_4px_20px_rgba(95,108,243,0.10)]">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Why I Want to Mentor</h3>
                    <p className="text-xs text-gray-500">Help students understand your journey and what drives you to PeerSupport</p>
                  </div>
                </div>

                <div className="space-y-5 mt-5">
                  {/* Q1 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                    <label className="flex items-start gap-2 text-sm font-semibold text-gray-800 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      What inspired you to start mentoring MBA aspirants?
                    </label>
                    <textarea
                      name="mentoringQ1"
                      value={formData.mentoringQ1}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Share the moment or experience that made you want to give back and help students on their MBA journey..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all resize-none"
                    />
                  </div>

                  {/* Q2 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                    <label className="flex items-start gap-2 text-sm font-semibold text-gray-800 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-400 text-white text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      What specific challenges in the MBA journey do you feel most equipped to help students navigate?
                    </label>
                    <textarea
                      name="mentoringQ2"
                      value={formData.mentoringQ2}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g., mock interviews, SOP writing, college shortlisting, managing work-study balance..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all resize-none"
                    />
                  </div>

                  {/* Q3 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-300 transition-colors">
                    <label className="flex items-start gap-2 text-sm font-semibold text-gray-800 mb-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pink-400 text-white text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      What has been your most defining experience during your MBA or career that you&apos;d like to share with mentees?
                    </label>
                    <textarea
                      name="mentoringQ3"
                      value={formData.mentoringQ3}
                      onChange={handleChange}
                      rows={3}
                      placeholder="A failure, a turning point, or a lesson learned that shaped who you are today..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Bio/About Yourself
                </label>
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
          <UniversalButton
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            className={`px-2 sm:px-6 py-2 sm:py-2.5 rounded-full border sm:border-2 border-black font-bold text-xs sm:text-base transition-all ${
              currentStep === 1 || isSubmitting
                ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            &larr; Previous
          </UniversalButton>

          {currentStep < 4 ? (
            <UniversalButton onClick={handleNext} className="cursor-pointer">
              Next &rarr;
            </UniversalButton>
          ) : (
            <UniversalButton
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Complete Profile"}
              {!isSubmitting && (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" /> 
              )}
            </UniversalButton>
          )}
        </div>
      </div>
    </div>
  );
}
