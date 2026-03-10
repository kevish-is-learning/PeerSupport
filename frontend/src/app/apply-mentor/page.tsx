"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  type MentorApplicationInput,
  type SocialLink,
  type WorkExperience,
} from "@/lib/validators/mentor";
import {
  Loader2,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  "Personal Details",
  "Expertise",
  "Education",
  "Work Experience",
  "CAT Score",
  "Certifications",
  "Resumes & Pricing",
];

const EXPERTISE_OPTIONS = [
  "CAT Preparation",
  "MBA Admissions",
  "GMAT Preparation",
  "Career Counseling",
  "Interview Preparation",
  "Resume Building",
  "Group Discussion",
  "Personality Development",
  "Data Interpretation",
  "Logical Reasoning",
  "Verbal Ability",
  "Quantitative Aptitude",
];

export default function ApplyMentorPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, fetchMe, fetchMentorApplication, mentorApplication } =
    useAuthStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [form, setForm] = useState<Partial<MentorApplicationInput>>({
    bio: "",
    headline: "",
    phone: "",
    location: "",
    socialLinks: [],
    expertise: [],
    education10th: ["", "", ""],
    education12th: ["", "", ""],
    bachelors: ["", "", "", ""],
    masters: ["", "", "", ""],
    workExperience: [],
    catScore: null,
    catYear: null,
    catPercentile: null,
    certifications: [],
    resumes: [],
    pricePerSession: 0,
  });

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchMentorApplication();
    }
  }, [isLoading, isAuthenticated, fetchMentorApplication]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // If application already exists, redirect to status page
  useEffect(() => {
    if (mentorApplication) {
      router.replace("/application-status");
    }
  }, [mentorApplication, router]);

  // If already a mentor
  useEffect(() => {
    if (user?.role === "MENTOR") {
      router.replace("/mentor/dashboard");
    }
  }, [user, router]);

  const updateForm = (updates: Partial<MentorApplicationInput>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = () => {
    setErrors({});
    const schemas = [
      step1Schema,
      step2Schema,
      step3Schema,
      step4Schema,
      step5Schema,
      step6Schema,
      step7Schema,
    ];
    const result = schemas[currentStep].safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        education10th: (form.education10th || []).filter((s) => s.trim()),
        education12th: (form.education12th || []).filter((s) => s.trim()),
        bachelors: (form.bachelors || []).filter((s) => s.trim()),
        masters: (form.masters || []).filter((s) => s.trim()),
        certifications: (form.certifications || []).filter((s) => typeof s === "string" ? s.trim() : true),
      };

      await api.post("/users/mentor-applications", payload);
      toast.success("Application submitted successfully!");
      await fetchMentorApplication();
      router.push("/application-status");
    } catch {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  // Social links management
  const addSocialLink = () => {
    const links = form.socialLinks || [];
    if (links.length >= 5) return;
    updateForm({ socialLinks: [...links, { platform: "", url: "" }] });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const links = [...(form.socialLinks || [])];
    links[index] = { ...links[index], [field]: value };
    updateForm({ socialLinks: links });
  };

  const removeSocialLink = (index: number) => {
    const links = (form.socialLinks || []).filter((_, i) => i !== index);
    updateForm({ socialLinks: links });
  };

  // Work experience management
  const addWorkExperience = () => {
    const exp: WorkExperience = { company: "", role: "", startDate: "", endDate: null, description: "" };
    updateForm({ workExperience: [...(form.workExperience || []), exp] });
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const exps = [...(form.workExperience || [])];
    exps[index] = { ...exps[index], [field]: value };
    updateForm({ workExperience: exps });
  };

  const removeWorkExperience = (index: number) => {
    updateForm({ workExperience: (form.workExperience || []).filter((_, i) => i !== index) });
  };

  // Certifications management
  const addCertification = () => {
    updateForm({ certifications: [...(form.certifications || []), ""] });
  };

  const updateCertification = (index: number, value: string) => {
    const certs = [...(form.certifications || [])];
    certs[index] = value;
    updateForm({ certifications: certs });
  };

  const removeCertification = (index: number) => {
    updateForm({ certifications: (form.certifications || []).filter((_, i) => i !== index) });
  };

  // Expertise toggle
  const toggleExpertise = (exp: string) => {
    const current = form.expertise || [];
    if (current.includes(exp)) {
      updateForm({ expertise: current.filter((e) => e !== exp) });
    } else {
      updateForm({ expertise: [...current, exp] });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mentor Application</h1>
          <p className="text-muted-foreground mt-2">
            Complete all steps to submit your mentor application
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <span>{index + 1}</span>
                )}
                <span className="hidden sm:inline">{step}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-4 h-0.5 mx-1 ${index < currentStep ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          {/* Step 1: Personal Details */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">Bio *</label>
                <textarea
                  value={form.bio || ""}
                  onChange={(e) => updateForm({ bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  placeholder="Tell us about yourself and your experience..."
                />
                {errors.bio && <p className="text-destructive text-sm mt-1">{errors.bio}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Headline</label>
                <input
                  type="text"
                  value={form.headline || ""}
                  onChange={(e) => updateForm({ headline: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. IIM Ahmedabad | CAT 99.5%ile"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone || ""}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input
                    type="text"
                    value={form.location || ""}
                    onChange={(e) => updateForm({ location: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Social Links</label>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    disabled={(form.socialLinks || []).length >= 5}
                    className="text-sm text-primary hover:underline disabled:opacity-50 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                {(form.socialLinks || []).map((link, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateSocialLink(idx, "platform", e.target.value)}
                      className="w-1/3 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Platform"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateSocialLink(idx, "url", e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="URL"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(idx)}
                      className="text-destructive hover:text-destructive/80 px-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Expertise */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Select Your Expertise *</h2>
              {errors.expertise && (
                <p className="text-destructive text-sm">{errors.expertise}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_OPTIONS.map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => toggleExpertise(exp)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      (form.expertise || []).includes(exp)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 mt-4">
                  Custom Expertise (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. Coding, Finance"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.currentTarget.value.trim();
                      if (input && !(form.expertise || []).includes(input)) {
                        updateForm({ expertise: [...(form.expertise || []), input] });
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Education Details</h2>

              {(["education10th", "education12th"] as const).map((level) => (
                <div key={level} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase">
                    {level === "education10th" ? "10th Standard" : "12th Standard"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={(form[level] || [])[0] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", ""])];
                        arr[0] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Institute Name"
                    />
                    <input
                      type="text"
                      value={(form[level] || [])[1] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", ""])];
                        arr[1] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Score/Percentage"
                    />
                    <input
                      type="text"
                      value={(form[level] || [])[2] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", ""])];
                        arr[2] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Year of Passing"
                    />
                  </div>
                </div>
              ))}

              {(["bachelors", "masters"] as const).map((level) => (
                <div key={level} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase">
                    {level === "bachelors" ? "Bachelors" : "Masters"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={(form[level] || [])[0] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", "", ""])];
                        arr[0] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      value={(form[level] || [])[1] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", "", ""])];
                        arr[1] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Institute Name"
                    />
                    <input
                      type="text"
                      value={(form[level] || [])[2] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", "", ""])];
                        arr[2] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Score/CGPA"
                    />
                    <input
                      type="text"
                      value={(form[level] || [])[3] || ""}
                      onChange={(e) => {
                        const arr = [...(form[level] || ["", "", "", ""])];
                        arr[3] = e.target.value;
                        updateForm({ [level]: arr });
                      }}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Year of Passing"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Work Experience */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                  type="button"
                  onClick={addWorkExperience}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              {(form.workExperience || []).length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No work experience added yet. Click &quot;Add Experience&quot; to add.
                </p>
              )}

              {(form.workExperience || []).map((exp, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Experience {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(idx)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateWorkExperience(idx, "company", e.target.value)}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateWorkExperience(idx, "role", e.target.value)}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Role/Position"
                    />
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(idx, "startDate", e.target.value)}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="date"
                      value={exp.endDate || ""}
                      onChange={(e) => updateWorkExperience(idx, "endDate", e.target.value)}
                      className="px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <textarea
                    value={exp.description || ""}
                    onChange={(e) => updateWorkExperience(idx, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Brief description of your role..."
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 5: CAT Score */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">CAT Score (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">CAT Score</label>
                  <input
                    type="number"
                    value={form.catScore ?? ""}
                    onChange={(e) =>
                      updateForm({ catScore: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 180"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">CAT Year</label>
                  <input
                    type="number"
                    value={form.catYear ?? ""}
                    onChange={(e) =>
                      updateForm({ catYear: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">CAT Percentile</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.catPercentile ?? ""}
                    onChange={(e) =>
                      updateForm({
                        catPercentile: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 99.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Certifications */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Certifications</h2>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {(form.certifications || []).length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No certifications added. Click &quot;Add&quot; to add one.
                </p>
              )}
              {(form.certifications || []).map((cert, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => updateCertification(idx, e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Certification name or description"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertification(idx)}
                    className="text-destructive hover:text-destructive/80 px-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Step 7: Resumes & Pricing */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Resumes & Pricing</h2>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Price Per Session (INR) *
                </label>
                <input
                  type="number"
                  value={form.pricePerSession || ""}
                  onChange={(e) =>
                    updateForm({ pricePerSession: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 500 (enter 0 for free)"
                />
                {errors.pricePerSession && (
                  <p className="text-destructive text-sm mt-1">{errors.pricePerSession}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Resumes (Optional)</label>
                  <button
                    type="button"
                    onClick={() =>
                      updateForm({
                        resumes: [...(form.resumes || []), { name: "", fileUrl: "" }],
                      })
                    }
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Resume
                  </button>
                </div>
                {(form.resumes || []).map((resume, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resume.name}
                      onChange={(e) => {
                        const resumes = [...(form.resumes || [])];
                        resumes[idx] = { ...resumes[idx], name: e.target.value };
                        updateForm({ resumes });
                      }}
                      className="w-1/3 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Name"
                    />
                    <input
                      type="url"
                      value={resume.fileUrl}
                      onChange={(e) => {
                        const resumes = [...(form.resumes || [])];
                        resumes[idx] = { ...resumes[idx], fileUrl: e.target.value };
                        updateForm({ resumes });
                      }}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="File URL"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateForm({
                          resumes: (form.resumes || []).filter((_, i) => i !== idx),
                        })
                      }
                      className="text-destructive hover:text-destructive/80 px-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2.5 border border-border rounded-lg text-foreground hover:bg-secondary transition disabled:opacity-40 flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Back
            </button>
            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
