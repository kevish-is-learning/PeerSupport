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
  Sparkles,
  HelpCircle,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { mentorProfileApi, resolveUploadUrl } from "../../lib/api";
import UniversalButton from "../ui/universalButton";

const STEPS = [
  { id: 1, title: "Basic Info", fullTitle: "Basic Information", icon: User },
  { id: 2, title: "Education", fullTitle: "Education Details", icon: GraduationCap },
  { id: 3, title: "Background", fullTitle: "Professional Background", icon: Briefcase },
  { id: 4, title: "Expertise", fullTitle: "Expertise & Profile", icon: BookOpen },
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

const parseLegacyProfile = (value, keys) =>
  Object.fromEntries(
    keys.map((key, index) => [key, (value || "").split("|")[index] || ""])
  );

const getEducationData = (profile) =>
  profile?.education || {
    mba: parseLegacyProfile(profile?.pgProfile, [
      "college",
      "specialization",
      "graduationYear",
    ]),
    undergraduate: parseLegacyProfile(profile?.ugCollegeProfile, [
      "college",
      "degree",
      "specialization",
      "graduationYear",
    ]),
  };

const getExperienceData = (profile) =>
  profile?.professionalExperience ||
  (() => {
    const legacy = parseLegacyProfile(profile?.workExperience, [
      "years",
      "company",
      "role",
    ]);
    return {
      hasExperience: Boolean(legacy.years || legacy.company || legacy.role),
      ...legacy,
    };
  })();

const compressImage = async (file, maxWidth = 800, maxHeight = 800, quality = 0.85) => {
  if (!file || !file.type.startsWith("image/")) return file;
  if (typeof window === "undefined" || !window.FileReader) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
            } else {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, ".webp"),
                {
                  type: "image/webp",
                  lastModified: Date.now(),
                }
              );
              resolve(compressedFile);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

export default function MentorOnboardingWizard({
  existingProfile,
  onComplete,
}) {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const draftKey = user?.id ? `mentor-onboarding-draft:${user.id}` : null;

  const initialEducation = getEducationData(existingProfile);
  const initialExperience = getExperienceData(existingProfile);

  const [hasWorkExperience, setHasWorkExperience] = useState(
    existingProfile?.professionalExperience?.hasExperience !== undefined
      ? Boolean(existingProfile.professionalExperience.hasExperience)
      : Boolean(existingProfile?.workExperience)
  );

  const [formData, setFormData] = useState({
    profilePhotoUrl:
      existingProfile?.profilePhotoUrl || user?.profilePicture || "",
    fullName: user?.name || "",
    email: user?.email || "",
    contactNumber: existingProfile?.contactNumber || "",

    mbaCollege: initialEducation.mba?.college || "",
    mbaSpecialization: initialEducation.mba?.specialization || "",
    mbaYear: initialEducation.mba?.graduationYear
      ? String(initialEducation.mba.graduationYear)
      : "",

    ugCollege: initialEducation.undergraduate?.college || "",
    ugDegree: initialEducation.undergraduate?.degree || "",
    ugSpecialization: initialEducation.undergraduate?.specialization || "",
    ugYear: initialEducation.undergraduate?.graduationYear
      ? String(initialEducation.undergraduate.graduationYear)
      : "",

    linkedInUrl: existingProfile?.linkedInUrl || "",
    workExperienceYears:
      initialExperience.years !== undefined && initialExperience.years !== null
        ? String(initialExperience.years)
        : "",
    company: initialExperience.company || "",
    role: initialExperience.role || "",

    expertiseTags: existingProfile?.expertiseTags || [],
    bio: existingProfile?.bio || "",

    mentoringQ1: existingProfile?.mentoringQA?.q1 || "",
    mentoringQ2: existingProfile?.mentoringQA?.q2 || "",
    mentoringQ3: existingProfile?.mentoringQA?.q3 || "",
    mentoringQ4: existingProfile?.mentoringQA?.q4 || "",
    mentoringQ5: existingProfile?.mentoringQA?.q5 || "",
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
          profilePhotoUrl:
            parsed.formData.profilePhotoUrl ||
            current.profilePhotoUrl ||
            user?.profilePicture ||
            "",
        }));
      }
      if (typeof parsed.hasWorkExperience === "boolean") {
        setHasWorkExperience(parsed.hasWorkExperience);
      }
      if (Number.isInteger(parsed.currentStep))
        setCurrentStep(Math.min(4, Math.max(1, parsed.currentStep)));
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
          profilePhotoUrl: formData.profilePhotoUrl?.startsWith("blob:")
            ? ""
            : formData.profilePhotoUrl,
        },
        hasWorkExperience,
        currentStep,
      })
    );
  }, [draftKey, existingProfile, formData, hasWorkExperience, currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
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

  const handleFileChange = async (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles?.[0]) {
      const file = selectedFiles[0];
      if (name === "profilePhoto") {
        if (!file.type.startsWith("image/")) {
          toast.error("Please choose an image file.");
          return;
        }
        setPhotoPreviewUrl(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, profilePhotoUrl: "" }));
        const compressed = await compressImage(file, 800, 800, 0.85);
        setFiles((prev) => ({ ...prev, profilePhoto: compressed }));
      } else {
        setFiles((prev) => ({ ...prev, [name]: file }));
      }
    }
  };

  const validateStep = (stepNumber, showError = true) => {
    // Step 1: Basic Information
    if (stepNumber === 1) {
      if (!files.profilePhoto && !formData.profilePhotoUrl) {
        if (showError) toast.error("Profile picture is required.");
        return false;
      }
      if (!formData.fullName.trim()) {
        if (showError) toast.error("Full name is required.");
        return false;
      }
      if (!formData.email.trim()) {
        if (showError) toast.error("Email is required.");
        return false;
      }
      if (!formData.contactNumber.trim()) {
        if (showError) toast.error("Contact number is required.");
        return false;
      }

      const digitsOnly = formData.contactNumber.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        if (showError) toast.error("Contact number must be exactly 10 digits.");
        return false;
      }
      return true;
    }

    // Step 2: Education Details
    if (stepNumber === 2) {
      const currentYear = new Date().getFullYear();
      const mbaYear = Number(formData.mbaYear);
      const ugYear = Number(formData.ugYear);
      if (!formData.mbaCollege.trim() || !formData.ugCollege.trim() || !formData.ugDegree.trim()) {
        if (showError) toast.error("Please complete your MBA and undergraduate education details.");
        return false;
      }
      if (
        !Number.isInteger(mbaYear) ||
        mbaYear < 1950 ||
        mbaYear > currentYear + 10 ||
        !Number.isInteger(ugYear) ||
        ugYear < 1950 ||
        ugYear > currentYear + 10
      ) {
        if (showError) toast.error("Please enter valid graduation years.");
        return false;
      }
      return true;
    }

    // Step 3: Professional Background
    if (stepNumber === 3) {
      if (formData.linkedInUrl && formData.linkedInUrl.trim()) {
        try {
          new URL(formData.linkedInUrl);
          if (!formData.linkedInUrl.toLowerCase().includes("linkedin.com")) {
            if (showError) toast.error("Please provide a valid LinkedIn URL.");
            return false;
          }
        } catch (_) {
          if (showError) toast.error("Please enter a valid URL including http/https.");
          return false;
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
          if (showError) toast.error("Please provide your years of experience, company, and role.");
          return false;
        }
      }
      return true;
    }

    // Step 4: Expertise & Profile
    if (stepNumber === 4) {
      if (!formData.bio.trim()) {
        if (showError) toast.error("Bio is required.");
        return false;
      }
      if (formData.expertiseTags.length === 0) {
        if (showError) toast.error("Select at least one area of expertise.");
        return false;
      }
      const mentoringAnswers = [
        formData.mentoringQ1,
        formData.mentoringQ2,
        formData.mentoringQ3,
        formData.mentoringQ4,
        formData.mentoringQ5,
      ];
      if (mentoringAnswers.some((answer) => !answer || !answer.trim())) {
        if (showError) toast.error("Please complete all mentoring questions.");
        return false;
      }
      if (mentoringAnswers.some((answer) => answer.trim().length < 30)) {
        if (showError) toast.error("Please write at least 30 characters for each mentoring response.");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleStepClick = (targetStep) => {
    if (isSubmitting) return;
    if (targetStep === currentStep) return;

    // Moving backwards is always allowed directly
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      return;
    }

    // Moving forwards: validate current step and all intermediate steps sequentially
    for (let s = currentStep; s < targetStep; s++) {
      const isValid = validateStep(s, true);
      if (!isValid) {
        if (s !== currentStep) {
          setCurrentStep(s);
        }
        return;
      }
    }

    setCurrentStep(targetStep);
  };

  const handleNext = () => {
    if (currentStep >= 4) return;
    if (validateStep(currentStep, true)) {
      setCurrentStep((prev) => prev + 1);
    }
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
    payload.append(
      "education",
      JSON.stringify({
        mba: {
          college: formData.mbaCollege,
          specialization: formData.mbaSpecialization,
          graduationYear: Number(formData.mbaYear),
        },
        undergraduate: {
          college: formData.ugCollege,
          degree: formData.ugDegree,
          specialization: formData.ugSpecialization,
          graduationYear: Number(formData.ugYear),
        },
      })
    );
    payload.append(
      "professionalExperience",
      JSON.stringify({
        hasExperience: hasWorkExperience,
        ...(hasWorkExperience
          ? {
              years: Number(formData.workExperienceYears),
              company: formData.company,
              role: formData.role,
            }
          : {}),
      })
    );
    payload.append(
      "mentoringQA",
      JSON.stringify({
        q1: formData.mentoringQ1,
        q2: formData.mentoringQ2,
        q3: formData.mentoringQ3,
        q4: formData.mentoringQ4,
        q5: formData.mentoringQ5,
      })
    );

    if (files.profilePhoto) {
      payload.append("profilePhoto", files.profilePhoto);
    } else if (formData.profilePhotoUrl) {
      payload.append("profilePhotoUrl", formData.profilePhotoUrl);
    }
    if (files.collegeDocument)
      payload.append("collegeDocument", files.collegeDocument);

    return payload;
  };

  const submitProfile = async (payload) => {
    const result = existingProfile
      ? await mentorProfileApi.update(payload)
      : await mentorProfileApi.create(payload);

    if (result?.data?.user) {
      setUser(result.data.user);
    }
    if (draftKey) window.localStorage.removeItem(draftKey);
    toast.success(result?.message || "Mentor profile saved");
    onComplete?.();
  };

  const handleSubmit = async () => {
    if (!validateStep(4, true)) return;

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
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-black mb-4 font-semibold transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Home
      </button>

      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
          Complete Your Mentor Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Help us know you better to connect you with the right mentees
        </p>
      </div>

      {/* ── Stepper Header (Minimal & Fully Responsive) ── */}
      <div className="bg-white border-2 border-black rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-5 shadow-[3px_3px_0_#FFB705] sm:shadow-[5px_5px_0_#FFB705]">
        <div className="flex w-full items-center justify-between">
          {STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isCompleted =
              !isActive && (step.id < currentStep || validateStep(step.id, false));

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  disabled={isSubmitting}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${step.id}: ${step.fullTitle}${isActive ? " (Current)" : isCompleted ? " (Completed)" : ""}`}
                  title={isActive ? `Current Step: ${step.fullTitle}` : isCompleted ? `Go to ${step.fullTitle} (Completed)` : `Go to ${step.fullTitle}`}
                  className={`flex flex-col items-center shrink-0 transition-transform duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg group ${
                    isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                  }`}
                >
                  <div
                    className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      isActive
                        ? "border-black bg-[#FFB705] text-black shadow-sm ring-2 ring-[#FFB705]/40"
                        : isCompleted
                          ? "border-black bg-[#FFB705] text-black"
                          : "border-gray-200 text-gray-400 bg-white group-hover:border-gray-300 group-hover:text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    ) : (
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold text-center mt-1 transition-colors leading-tight max-w-[64px] sm:max-w-none truncate ${
                      isActive || isCompleted
                        ? "text-gray-900"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    <span className="hidden sm:inline">{step.fullTitle}</span>
                    <span className="sm:hidden">{step.title}</span>
                  </span>
                </button>

                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-1 xs:mx-1.5 sm:mx-3 relative top-[-10px] sm:top-[-12px] min-w-[6px]">
                    <div
                      className={`h-full w-full transition-colors duration-300 ${
                        step.id < currentStep || validateStep(step.id, false)
                          ? "bg-black"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Form Content Card ── */}
      <div className="bg-white border-2 border-black rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-[4px_4px_0_#4f46e5] sm:shadow-[6px_6px_0_rgba(79,70,229,0.8)] min-h-[380px] flex flex-col justify-between">
        <div>
          {/* Step Title Header */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-black text-gray-900">
              {STEPS[currentStep - 1].fullTitle}
            </h2>
            <span className="text-xs font-bold text-[#5f6cf3] bg-[#5f6cf3]/10 px-2.5 py-0.5 rounded-full">
              Step {currentStep} of 4
            </span>
          </div>

          {/* ══════════ STEP 1: BASIC INFORMATION ══════════ */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-5">
              {/* Profile Photo */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Profile Picture <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden shadow-xs">
                    {photoPreviewUrl || formData.profilePhotoUrl ? (
                      <img
                        src={
                          photoPreviewUrl ||
                          resolveUploadUrl(formData.profilePhotoUrl)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-2xl text-gray-300">👤</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
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
                      className="cursor-pointer inline-flex items-center bg-[#FFB705] border-2 border-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-black hover:bg-[#e6a504] transition-colors shadow-[2px_2px_0_#1a1a1a]"
                    >
                      <Upload className="w-3.5 h-3.5 mr-1.5" />
                      {files.profilePhoto ? "Change Photo" : "Upload Photo"}
                    </label>
                    {files.profilePhoto && (
                      <p className="mt-1.5 text-xs font-semibold text-emerald-700 truncate max-w-full">
                        ✓ {files.profilePhoto.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User
                    size={16}
                    className="absolute left-3 text-orange-400 font-bold"
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-[#fff5f2] px-3 pl-9 text-xs sm:text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail
                    size={16}
                    className="absolute left-3 text-orange-400 font-bold"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder="your.email@example.com"
                    className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-[#fff5f2] px-3 pl-9 text-xs sm:text-sm outline-none text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {formData.contactNumber.length}/10 digits
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Phone
                    size={16}
                    className="absolute left-3 text-orange-400 font-bold"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-[#fff5f2] px-3 pl-9 text-xs sm:text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════ STEP 2: EDUCATION DETAILS ══════════ */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-5">
              {/* MBA Details Card */}
              <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-3.5 sm:p-5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                  <span>🎓</span> MBA Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      MBA College/B-School <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="mbaCollege"
                      value={formData.mbaCollege}
                      onChange={handleChange}
                      className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all cursor-pointer"
                    >
                      <option value="">Select your B-School</option>
                      <option value="IIM Ahmedabad">IIM Ahmedabad</option>
                      <option value="IIM Bangalore">IIM Bangalore</option>
                      <option value="IIM Calcutta">IIM Calcutta</option>
                      <option value="IIM Lucknow">IIM Lucknow</option>
                      <option value="IIM Kozhikode">IIM Kozhikode</option>
                      <option value="FMS Delhi">FMS Delhi</option>
                      <option value="XLRI Jamshedpur">XLRI Jamshedpur</option>
                      <option value="SPJIMR Mumbai">SPJIMR Mumbai</option>
                      <option value="ISB Hyderabad">ISB Hyderabad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Specialization <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="mbaSpecialization"
                        value={formData.mbaSpecialization}
                        onChange={handleChange}
                        placeholder="e.g., Finance, Marketing"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Graduation Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear() + 10}
                        name="mbaYear"
                        value={formData.mbaYear}
                        onChange={handleChange}
                        placeholder="e.g., 2024"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* College Document Upload */}
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-3.5 sm:p-4">
                <label className="block text-xs sm:text-sm font-bold text-gray-700">
                  College document for verification <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Upload student ID, degree, or marksheet (JPG, PNG, WEBP).
                </p>
                <input
                  type="file"
                  name="collegeDocument"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-xs"
                />
                {(files.collegeDocument || existingProfile?.collegeDocumentUrl) && (
                  <p className="mt-1.5 text-xs font-semibold text-emerald-600">
                    ✓ Document ready for review.
                  </p>
                )}
              </div>

              {/* Undergraduate Details Card */}
              <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-3.5 sm:p-5">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                  <span>🏫</span> Undergraduate Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      College/University <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ugCollege"
                      value={formData.ugCollege}
                      onChange={handleChange}
                      placeholder="Enter your undergraduate college name"
                      className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Degree <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ugDegree"
                        value={formData.ugDegree}
                        onChange={handleChange}
                        placeholder="B.Tech, B.Com"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Specialization <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="ugSpecialization"
                        value={formData.ugSpecialization}
                        onChange={handleChange}
                        placeholder="CS, ECE, etc."
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max={new Date().getFullYear() + 10}
                        name="ugYear"
                        value={formData.ugYear}
                        onChange={handleChange}
                        placeholder="e.g., 2020"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ STEP 3: PROFESSIONAL BACKGROUND ══════════ */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                  LinkedIn Profile URL <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-bold text-blue-600 text-xs">
                    in
                  </span>
                  <input
                    type="url"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-[#fff5f2] pl-9 pr-3 text-xs sm:text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Do you have work experience?
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-gray-800">
                    <input
                      type="radio"
                      name="hasWorkExperience"
                      checked={hasWorkExperience}
                      onChange={() => setHasWorkExperience(true)}
                      className="accent-[#5f6cf3] w-4 h-4 cursor-pointer"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-gray-800">
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
                      className="accent-[#5f6cf3] w-4 h-4 cursor-pointer"
                    />
                    <span>No (Fresher)</span>
                  </label>
                </div>
              </div>

              {hasWorkExperience && (
                <div className="bg-[#fff5f2] border border-gray-200 rounded-xl p-3.5 sm:p-5 space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Years of Work Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      name="workExperienceYears"
                      value={formData.workExperienceYears}
                      onChange={handleChange}
                      placeholder="e.g., 3"
                      className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Current/Previous Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Current/Previous Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g., Product Manager, Consultant"
                        className="w-full h-10 sm:h-11 rounded-xl border border-gray-300 bg-white px-3 text-xs sm:text-sm outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════ STEP 4: EXPERTISE & PROFILE ══════════ */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-5">
              {/* Expertise Tags */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                  Areas of Expertise (Select all that apply) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {EXPERTISE_OPTIONS.map((opt) => {
                    const isSelected = formData.expertiseTags.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => handleExpertiseToggle(opt)}
                        className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#5f6cf3] text-white border-black shadow-[2px_2px_0_#1a1a1a]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-black"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-gray-800">
                    Bio / About Yourself <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {formData.bio.length} chars
                  </span>
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell mentees about yourself, your MBA journey, and how you can help them succeed..."
                  className="w-full rounded-xl border border-gray-300 bg-[#fff5f2] p-3 text-xs sm:text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none"
                />
              </div>

              {/* B-School Insights Q&A */}
              <div className="border border-indigo-200 rounded-xl p-3.5 sm:p-5 bg-indigo-50/30 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs">
                    <Sparkles size={13} />
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                      B-School &amp; Mentoring Insights <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Minimum 30 characters for each question
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Q1 */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 leading-snug">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold mr-1.5">1</span>
                      Describe your institute's selection process (WAT, GD, PI, etc.)
                    </label>
                    <textarea
                      name="mentoringQ1"
                      value={formData.mentoringQ1}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Detail the steps of your institute's selection process..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                    />
                    <div className="text-[10px] text-right text-gray-400 mt-0.5">
                      {formData.mentoringQ1.trim().length}/30 min chars
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 leading-snug">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold mr-1.5">2</span>
                      Pattern differences/similarities for Freshers vs Work-Ex candidates?
                    </label>
                    <textarea
                      name="mentoringQ2"
                      value={formData.mentoringQ2}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Explain trends or question patterns you observed..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                    />
                    <div className="text-[10px] text-right text-gray-400 mt-0.5">
                      {formData.mentoringQ2.trim().length}/30 min chars
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 leading-snug">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold mr-1.5">3</span>
                      Top differentiators/pointers of your B-School aspirants should note?
                    </label>
                    <textarea
                      name="mentoringQ3"
                      value={formData.mentoringQ3}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Share 3 key differentiators and pointers..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                    />
                    <div className="text-[10px] text-right text-gray-400 mt-0.5">
                      {formData.mentoringQ3.trim().length}/30 min chars
                    </div>
                  </div>

                  {/* Q4 */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 leading-snug">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold mr-1.5">4</span>
                      Highlights and challenging aspects of campus life?
                    </label>
                    <textarea
                      name="mentoringQ4"
                      value={formData.mentoringQ4}
                      onChange={handleChange}
                      rows={2}
                      placeholder="List key highlights and challenges of campus life..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                    />
                    <div className="text-[10px] text-right text-gray-400 mt-0.5">
                      {formData.mentoringQ4.trim().length}/30 min chars
                    </div>
                  </div>

                  {/* Q5 */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <label className="block text-xs font-bold text-gray-800 mb-1.5 leading-snug">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold mr-1.5">5</span>
                      3 key pointers that tip the interview in the candidate's favor?
                    </label>
                    <textarea
                      name="mentoringQ5"
                      value={formData.mentoringQ5}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Share proven tips that help turn interview decisions in favor..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs outline-none focus:border-indigo-400 focus:bg-white transition-all resize-none"
                    />
                    <div className="text-[10px] text-right text-gray-400 mt-0.5">
                      {formData.mentoringQ5.trim().length}/30 min chars
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Navigation Buttons (Flexible & Responsive) ── */}
        <div className="mt-6 sm:mt-8 flex items-center justify-between gap-3 pt-4 sm:pt-5 border-t border-gray-100">
          <UniversalButton
            onClick={handlePrevious}
            disabled={currentStep === 1 || isSubmitting}
            variant="secondary"
            className="flex-1 sm:flex-initial"
          >
            ← Previous
          </UniversalButton>

          {currentStep < 4 ? (
            <UniversalButton
              onClick={handleNext}
              disabled={isSubmitting}
              variant="yellow"
              className="flex-1 sm:flex-initial"
            >
              Next →
            </UniversalButton>
          ) : (
            <UniversalButton
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="primary"
              className="flex-1 sm:flex-initial"
            >
              {isSubmitting ? "Saving..." : "Complete Profile"}
              {!isSubmitting && <Check className="w-4 h-4 ml-1.5" />}
            </UniversalButton>
          )}
        </div>
      </div>
    </div>
  );
}
