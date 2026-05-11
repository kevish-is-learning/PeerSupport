"use client";

import {
  User,
  IndianRupee,
  Calendar,
  Edit2,
  Save,
  X,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Camera,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../store/useAuthStore";
import { mentorProfileApi, mentorServiceApi, authApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

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

const IIM_SCHOOLS = [
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "IIM Indore",
  "ISB",
  "XLRI",
  "FMS Delhi",
  "MDI Gurgaon",
  "SP Jain",
  "JBIMS",
  "IMT Ghaziabad",
  "Other",
];

// Service types are fetched from the backend — no hardcoding.

const DAYS_ORDER = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];
const DAY_LABELS = {MONDAY:"Monday",TUESDAY:"Tuesday",WEDNESDAY:"Wednesday",THURSDAY:"Thursday",FRIDAY:"Friday",SATURDAY:"Saturday",SUNDAY:"Sunday"};

const SERVICE_PALETTES = [
  { text: "text-[#5061E4]", bg: "bg-[#EEF0FF]", border: "border-[#5061E4]" },
  { text: "text-[#F59E0B]", bg: "bg-[#FFF7ED]", border: "border-[#F59E0B]" },
  { text: "text-[#F97316]", bg: "bg-[#FFF3EE]", border: "border-[#F97316]" },
  { text: "text-[#22C55E]", bg: "bg-[#F0FDF4]", border: "border-[#22C55E]" },
  { text: "text-[#F43F5E]", bg: "bg-[#FFF1F2]", border: "border-[#F43F5E]" },
  { text: "text-[#0EA5E9]", bg: "bg-[#F0F9FF]", border: "border-[#0EA5E9]" },
  { text: "text-[#A855F7]", bg: "bg-[#FDF4FF]", border: "border-[#A855F7]" },
];

function SectionCard({ children, shadow = "#F59E0B", className = "" }) {
  return (
    <section
      className={`rounded-2xl border-[3px] border-black flex flex-col overflow-hidden ${className}`}
      style={{ boxShadow: `6px 6px 0 0 ${shadow}` }}
    >
      {children}
    </section>
  );
}

function CardHeader({ icon: Icon, title, shadow, children }) {
  return (
    <div className="bg-[#FDE9E6] px-6 py-4 border-b-[3px] border-black flex justify-between items-center flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Icon size={20} strokeWidth={2.5} />
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function EditBtn({ onClick, label = "Edit" }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white hover:opacity-90 cursor-pointer"
    >
      <Edit2 size={12} /> {label}
    </button>
  );
}

function SaveCancelBtns({ onSave, onCancel, saving }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onCancel}
        disabled={saving}
        className="flex items-center gap-1 rounded-xl border-[3px] border-black bg-white px-4 py-2 text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
      >
        <X size={12} /> Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-1 rounded-xl border-[3px] border-black bg-[#F59E0B] px-4 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <Save size={12} />
        )}{" "}
        Save Changes
      </button>
    </div>
  );
}

export default function MentorProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Edit states
  const [editingSection, setEditingSection] = useState(null); // 'personal'|'services'|'pricing'
  const [saving, setSaving] = useState(false);

  // Service types catalogue from backend
  const [serviceTypeCatalogue, setServiceTypeCatalogue] = useState([]);

  // Wizard state
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardPricing, setWizardPricing] = useState({});
  const [skippedWizard, setSkippedWizard] = useState(false);

  // Personal form
  const [personalForm, setPersonalForm] = useState({
    fullName: "",
    contactNumber: "",
    bSchool: "",
    bSchoolYear: "",
    expertiseTagsArr: [],
    bio: "",
    workExpYears: "",
    workExpCompany: "",
    workExpRole: "",
  });

  // Services form — stores array of { serviceType, pricePerSession }
  const [servicesForm, setServicesForm] = useState([]);

  // Pricing form — keyed by serviceType enum value
  const [pricingForm, setPricingForm] = useState({});

  const loadProfile = async () => {
    try {
      const res = await mentorProfileApi.getMine();
      const p = res.data?.profile;
      if (p) {
        setProfile(p);
        const pg = (p.pgProfile || "").split("|");
        const we = (p.workExperience || "").split("|");
        // Services are now normalized objects
        setServicesForm((p.services || []).map((s) => s.serviceType));
        const pf = {};
        (p.services || []).forEach((s) => { pf[s.serviceType] = s.pricePerSession; });
        setPricingForm(pf);

        setPersonalForm({
          fullName: p.name || "",
          contactNumber: p.contactNumber || "",
          bSchool: pg[0] || "",
          bSchoolYear: pg[2] || "",
          expertiseTagsArr: p.expertiseTags || [],
          bio: p.bio || "",
          workExpYears: we[0] || "",
          workExpCompany: we[1] || "",
          workExpRole: we[2] || "",
        });
        // Already set above from normalized p.services
      }
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch service types catalogue from backend
  useEffect(() => {
    mentorServiceApi.getTypes().then((res) => {
      setServiceTypeCatalogue(Array.isArray(res.data?.types) ? res.data.types : []);
    }).catch(() => {});
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile?.services) {
      const wp = {};
      profile.services.filter((s) => !s.pricePerSession || s.pricePerSession <= 0).forEach((s) => { wp[s.serviceType] = ""; });
      setWizardPricing(wp);
    }
  }, [profile]);

  const saveSection = async (payload) => {
    setSaving(true);
    try {
      const res = await mentorProfileApi.update(payload);
      setProfile(res.data?.profile);
      toast.success("Saved!");
      setEditingSection(null);
    } catch (e) {
      toast.error(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const savePersonal = async () => {
    setSaving(true);
    try {
      // Update user name via auth API if changed
      if (personalForm.fullName && personalForm.fullName !== profile?.name) {
        try {
          await authApi.updateProfile({ name: personalForm.fullName });
        } catch (_) {}
      }
      const pgParts = profile?.pgProfile?.split("|") || ["", "", ""];
      const newPgProfile = `${personalForm.bSchool}|${pgParts[1] || ""}|${personalForm.bSchoolYear}`;
      const newWorkExperience = `${personalForm.workExpYears}|${personalForm.workExpCompany}|${personalForm.workExpRole}`;
      const res = await mentorProfileApi.update({
        contactNumber: personalForm.contactNumber,
        bio: personalForm.bio,
        expertiseTags: personalForm.expertiseTagsArr,
        pgProfile: newPgProfile,
        workExperience: newWorkExperience,
      });
      const updated = { ...res.data?.profile, name: personalForm.fullName };
      setProfile(updated);
      toast.success("Saved!");
      setEditingSection(null);
    } catch (e) {
      toast.error(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const saveServices = async () => {
    setSaving(true);
    try {
      // Build services payload from selected types + existing pricing
      const svcPayload = servicesForm.map((st) => ({
        serviceType: st,
        pricePerSession: pricingForm[st] || 0,
        isActive: true,
      }));
      await mentorServiceApi.upsert(svcPayload);
      await loadProfile();
      toast.success("Services saved!");
      setEditingSection(null);
    } catch (e) {
      toast.error(e.message || "Failed to save services.");
    } finally {
      setSaving(false);
    }
  };

  const savePricing = async () => {
    setSaving(true);
    try {
      const svcPayload = (profile?.services || []).map((s) => ({
        serviceType: s.serviceType,
        pricePerSession: pricingForm[s.serviceType] || 0,
        isActive: true,
      }));
      await mentorServiceApi.upsert(svcPayload);
      await loadProfile();
      toast.success("Pricing saved!");
      setEditingSection(null);
    } catch (e) {
      toast.error(e.message || "Failed to save pricing.");
    } finally {
      setSaving(false);
    }
  };

  const toggleService = (s) =>
    setServicesForm((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    // Keep existing required data so it doesn't get cleared during update
    formData.append("contactNumber", profile?.contactNumber || "");
    formData.append("bio", profile?.bio || "");

    if (profile?.linkedInUrl)
      formData.append("linkedInUrl", profile.linkedInUrl);
    if (profile?.ugCollegeProfile)
      formData.append("ugCollegeProfile", profile.ugCollegeProfile);
    if (profile?.pgProfile) formData.append("pgProfile", profile.pgProfile);
    if (profile?.workExperience)
      formData.append("workExperience", profile.workExperience);
    if (profile?.certifications)
      formData.append("certifications", profile.certifications);

    if (profile?.expertiseTags?.length) {
      formData.append("expertiseTags", JSON.stringify(profile.expertiseTags));
    }
    // Services, pricing, and availability are now managed by their own APIs
    // No need to send them when uploading a photo

    try {
      setSaving(true);
      const toastId = toast.loading("Uploading photo...");
      const res = await mentorProfileApi.update(formData);
      setProfile(res.data?.profile);
      toast.success("Profile photo updated!", { id: toastId });
    } catch (err) {
      toast.error(err.message || "Failed to upload photo");
      toast.dismiss();
    } finally {
      setSaving(false);
      e.target.value = ""; // Reset input
    }
  };

  // Derived flags — using normalized services
  const services = profile?.services || [];
  const availability = profile?.availability || [];

  const pricingMissing = services.length > 0 && services.some((s) => !s.pricePerSession || s.pricePerSession <= 0);
  const availabilityMissing = services.length > 0 && availability.length === 0;

  // Count availability stats
  const availDays = new Set();
  let availSlotsCount = 0;
  availability.forEach((dayEntry) => {
    if (dayEntry.slots?.length > 0) {
      availDays.add(dayEntry.dayOfWeek);
      availSlotsCount += dayEntry.slots.length;
    }
  });

  const missingPricingServices = services.filter((s) => !s.pricePerSession || s.pricePerSession <= 0);
  const showPricingWizard = !skippedWizard && missingPricingServices.length > 0;

  const handleWizardNext = async () => {
    if (wizardStep < missingPricingServices.length - 1) {
      setWizardStep((prev) => prev + 1);
    } else {
      // Final step, save all
      setSaving(true);
      try {
        const svcPayload = (profile?.services || []).map((s) => ({
          serviceType: s.serviceType,
          pricePerSession: wizardPricing[s.serviceType] || s.pricePerSession || 0,
          isActive: true,
        }));
        await mentorServiceApi.upsert(svcPayload);
        await loadProfile();
        toast.success("Pricing setup complete!");
      } catch (err) {
        toast.error("Failed to save pricing");
      } finally {
        setSaving(false);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FFF7F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#5061E4]" />
      </div>
    );

  return (
    <div className="w-full h-full overflow-y-auto p-6 lg:p-10 bg-[#FFF7F5] text-black">
      {showPricingWizard ? (
        <div className="flex flex-col items-center justify-center min-h-[600px] max-w-2xl mx-auto w-full py-10">
          <h2 className="text-4xl font-extrabold text-[#111] mb-2">
            Set Up Your Pricing
          </h2>
          <p className="text-gray-500 font-medium mb-8">
            Let's set prices for your services to get you started
          </p>

          <div className="flex gap-2 mb-10 w-48">
            {missingPricingServices.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full border border-black/10 ${i <= wizardStep ? "bg-[#5061E4]" : "bg-gray-200"}`}
              />
            ))}
          </div>

          <div className="w-full rounded-[2rem] border-[3px] border-black bg-white p-10 relative shadow-[10px_10px_0_0_#5061E4] mb-10">
            <div className="flex justify-center mb-6">
              <div className="h-14 w-14 rounded-xl border-[3px] border-black bg-[#F59E0B] flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                <span className="text-2xl font-black">{wizardStep + 1}</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-[#111] mb-2">
                {missingPricingServices[wizardStep]?.label}
              </h3>
              <p className="text-gray-500 font-medium">
                How much would you like to charge per session?
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Set Your Price (₹)
              </label>
              <div className="relative max-w-md mx-auto">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={
                    wizardPricing[missingPricingServices[wizardStep]?.serviceType] || ""
                  }
                  onChange={(e) =>
                    setWizardPricing((prev) => ({
                      ...prev,
                      [missingPricingServices[wizardStep]?.serviceType]: e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleWizardNext()}
                  className="w-full rounded-2xl border-[3px] border-black bg-[#FDF8F7] py-6 pl-14 pr-6 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-[#5061E4]/20"
                  placeholder="0"
                />
              </div>
            </div>

            <button
              onClick={handleWizardNext}
              disabled={
                saving || !wizardPricing[missingPricingServices[wizardStep]?.serviceType]
              }
              className={`w-full rounded-2xl border-[3px] border-black py-5 text-lg font-black transition-all shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 ${
                wizardPricing[missingPricingServices[wizardStep]?.serviceType]
                  ? "bg-[#5061E4] text-white hover:opacity-90"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? (
                <Loader2 className="animate-spin" />
              ) : wizardStep < missingPricingServices.length - 1 ? (
                <>
                  Next Service <ArrowLeft className="rotate-180" size={20} />
                </>
              ) : (
                <>
                  Complete Setup <Check size={20} />
                </>
              )}
            </button>
            <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-wider">
              Press Enter to continue
            </p>
          </div>

          <button
            onClick={() => setSkippedWizard(true)}
            className="rounded-xl border-[3px] border-black bg-white px-8 py-4 text-sm font-black shadow-[4px_4px_0_0_#000] hover:bg-gray-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            Skip for now, I'll set this up later
          </button>
        </div>
      ) : (
        <>
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">
              Profile Settings
            </h1>
            <p className="mt-1 text-gray-500 font-medium">
              Manage your profile and preferences
            </p>
          </header>

          {/* Alert banners */}
          {pricingMissing && (
            <div
              className="mb-4 rounded-2xl border-[3px] border-black bg-white p-4 flex items-start gap-4"
              style={{ boxShadow: "4px 4px 0 0 #5061E4" }}
            >
              <IndianRupee
                className="mt-0.5 shrink-0 text-[#5061E4]"
                size={20}
              />
              <div className="flex-1">
                <p className="font-bold text-sm">Complete Your Pricing Setup</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Your services won't be visible to mentees until you set up
                  pricing for all your services.
                </p>
              </div>
              <button
                onClick={() => setEditingSection("pricing")}
                className="shrink-0 flex items-center gap-1 rounded-xl border-2 border-black bg-[#5061E4] px-3 py-2 text-xs font-bold text-white hover:opacity-90"
              >
                <IndianRupee size={12} /> Set Up Pricing Now
              </button>
            </div>
          )}

          {availabilityMissing && (
            <div
              className="mb-6 rounded-2xl border-[3px] border-black bg-white p-4 flex items-start gap-4"
              style={{ boxShadow: "4px 4px 0 0 #F59E0B" }}
            >
              <Calendar className="mt-0.5 shrink-0 text-[#F59E0B]" size={20} />
              <div className="flex-1">
                <p className="font-bold text-sm">Set Up Your Availability</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Mentees need to know when you're available for sessions. Add
                  your weekly availability now.
                </p>
              </div>
              <button
                onClick={() => router.push("/mentor/availability")}
                className="shrink-0 flex items-center gap-1 rounded-xl border-2 border-black bg-[#F59E0B] px-3 py-2 text-xs font-bold text-black hover:opacity-90"
              >
                <Calendar size={12} /> Set Up Availability Now
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left sticky card */}
            <div className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-0">
              <article
                className="rounded-2xl border-[3px] border-black bg-white p-6 text-center"
                style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
              >
                <span className="inline-block rounded-full border-2 border-[#5061E4] px-3 py-0.5 text-[10px] font-bold text-[#5061E4] mb-3">
                  Your Public Profile
                </span>
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <div className="h-24 w-24 overflow-hidden rounded-2xl border-[3px] border-black bg-white">
                      <img
                        src={
                          profile?.profilePhotoUrl
                            ? resolveUploadUrl(profile.profilePhotoUrl)
                            : "https://i.pravatar.cc/150?img=11"
                        }
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <label
                      className={`absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-[#5061E4] text-white hover:bg-[#4050d0] transition-colors shadow-[2px_2px_0_0_#000] ${saving ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <Camera size={14} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={saving}
                      />
                    </label>
                  </div>
                </div>
                <p className="font-extrabold text-base">
                  {profile?.name || user?.name || "Mentor"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {profile?.pgProfile?.split("|")[0] || ""}{" "}
                  {profile?.pgProfile?.split("|")[2]
                    ? `• ${profile.pgProfile.split("|")[2]}`
                    : ""}
                </p>
                {(profile?.expertiseTags || []).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="inline-block mt-2 mr-1 rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-semibold text-gray-600"
                  >
                    {t}
                  </span>
                ))}
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                  {profile?.bio?.slice(0, 100)}
                  {profile?.bio?.length > 100 ? "..." : ""}
                </p>
              </article>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
              {/* Personal Information */}
              <SectionCard
                shadow="#000"
                className="border-2 border-black shadow-[6px_6px_0_0_#000]"
              >
                <CardHeader icon={User} title="Personal Information">
                  {editingSection === "personal" ? (
                    <SaveCancelBtns
                      onSave={savePersonal}
                      onCancel={() => {
                        const pg = (profile?.pgProfile || "").split("|");
                        const we = (profile?.workExperience || "").split("|");
                        setPersonalForm({
                          fullName: profile?.name || "",
                          contactNumber: profile?.contactNumber || "",
                          bSchool: pg[0] || "",
                          bSchoolYear: pg[2] || "",
                          expertiseTagsArr: profile?.expertiseTags || [],
                          bio: profile?.bio || "",
                          workExpYears: we[0] || "",
                          workExpCompany: we[1] || "",
                          workExpRole: we[2] || "",
                        });
                        setEditingSection(null);
                      }}
                      saving={saving}
                    />
                  ) : (
                    <EditBtn
                      onClick={() => setEditingSection("personal")}
                      label="Edit Profile"
                    />
                  )}
                </CardHeader>
                <div className="bg-white p-8 flex flex-col gap-8">
                  {editingSection === "personal" ? (
                    <div className="grid gap-6 sm:grid-cols-2 text-sm">
                      {/* Edit Form */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          value={personalForm.fullName}
                          onChange={(e) =>
                            setPersonalForm((p) => ({
                              ...p,
                              fullName: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          value={personalForm.contactNumber}
                          onChange={(e) =>
                            setPersonalForm((p) => ({
                              ...p,
                              contactNumber: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          B-School
                        </label>
                        <select
                          value={personalForm.bSchool}
                          onChange={(e) =>
                            setPersonalForm((p) => ({
                              ...p,
                              bSchool: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm bg-white"
                        >
                          <option value="">Select B-School</option>
                          {IIM_SCHOOLS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          Batch Year
                        </label>
                        <input
                          type="number"
                          min="1990"
                          max="2040"
                          value={personalForm.bSchoolYear}
                          onChange={(e) =>
                            setPersonalForm((p) => ({
                              ...p,
                              bSchoolYear: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          Work Experience
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="number"
                            min="0"
                            placeholder="Years"
                            value={personalForm.workExpYears}
                            onChange={(e) =>
                              setPersonalForm((p) => ({
                                ...p,
                                workExpYears: e.target.value,
                              }))
                            }
                            className="rounded-xl border border-black px-4 py-2.5 text-sm"
                          />
                          <input
                            placeholder="Company"
                            value={personalForm.workExpCompany}
                            onChange={(e) =>
                              setPersonalForm((p) => ({
                                ...p,
                                workExpCompany: e.target.value,
                              }))
                            }
                            className="rounded-xl border border-black px-4 py-2.5 text-sm"
                          />
                          <input
                            placeholder="Role"
                            value={personalForm.workExpRole}
                            onChange={(e) =>
                              setPersonalForm((p) => ({
                                ...p,
                                workExpRole: e.target.value,
                              }))
                            }
                            className="rounded-xl border border-black px-4 py-2.5 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          About / Bio
                        </label>
                        <textarea
                          rows={4}
                          value={personalForm.bio}
                          onChange={(e) =>
                            setPersonalForm((p) => ({
                              ...p,
                              bio: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm resize-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="font-bold text-[0.7rem] text-black uppercase tracking-wider">
                          Expertise
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {EXPERTISE_OPTIONS.map((opt) => {
                            const sel =
                              personalForm.expertiseTagsArr.includes(opt);
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setPersonalForm((p) => ({
                                    ...p,
                                    expertiseTagsArr: sel
                                      ? p.expertiseTagsArr.filter(
                                          (t) => t !== opt,
                                        )
                                      : [...p.expertiseTagsArr, opt],
                                  }))
                                }
                                className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${sel ? "bg-[#5061E4] text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-black"}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Read-only View */}
                      <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {profile?.name || user?.name}
                        </h3>
                        <div className="flex flex-col gap-2">
                          {user?.email && (
                            <div className="flex items-center gap-3 text-gray-500">
                              <Mail
                                size={18}
                                className="text-[#5061E4] shrink-0"
                              />
                              <span className="text-sm font-medium">
                                {user.email}
                              </span>
                            </div>
                          )}
                          {profile?.contactNumber && (
                            <div className="flex items-center gap-3 text-gray-500">
                              <Phone
                                size={18}
                                className="text-[#5061E4] shrink-0"
                              />
                              <span className="text-sm font-medium">
                                {profile.contactNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {(profile?.pgProfile ||
                        profile?.workExperience ||
                        profile?.expertiseTags?.length > 0 ||
                        profile?.bio) && <hr className="border-gray-100" />}

                      {/* Education */}
                      {profile?.pgProfile &&
                        profile.pgProfile.split("|")[0] && (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-gray-900">
                              <GraduationCap
                                size={20}
                                className="text-[#F59E0B]"
                              />
                              <h4 className="font-bold text-sm">Education</h4>
                            </div>
                            <div className="pl-7">
                              <p className="font-bold text-gray-900">
                                {profile.pgProfile.split("|")[0]}
                              </p>
                              {profile.pgProfile.split("|")[2] && (
                                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                                  Batch of {profile.pgProfile.split("|")[2]}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Professional Background */}
                      {(profile?.expertiseTags?.length > 0 ||
                        profile?.workExperience) && (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-gray-900">
                            <Briefcase size={20} className="text-[#F59E0B]" />
                            <h4 className="font-bold text-sm">
                              Professional Background
                            </h4>
                          </div>
                          <div className="pl-7 flex flex-col gap-4">
                            {profile?.expertiseTags?.length > 0 && (
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                  Expertise
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {profile.expertiseTags.map((t) => (
                                    <span
                                      key={t}
                                      className="rounded-full border border-[#5061E4]/20 bg-[#5061E4]/5 px-3 py-1 text-[10px] text-[#5061E4] font-bold uppercase tracking-wider"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {profile?.workExperience && (
                              <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                  Experience
                                </p>
                                <p className="text-gray-700 text-sm font-medium">
                                  {(() => {
                                    const we =
                                      profile.workExperience.split("|");
                                    const yrs = we[0] ? `${we[0]} years` : "";
                                    const company = we[1] ? ` at ${we[1]}` : "";
                                    const role = we[2] ? ` as ${we[2]}` : "";
                                    return (
                                      `${yrs}${company}${role}` ||
                                      "Not provided"
                                    );
                                  })()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* About */}
                      {profile?.bio && (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-gray-900">
                            <User size={20} className="text-[#5061E4]" />
                            <h4 className="font-bold text-sm">About</h4>
                          </div>
                          <div className="pl-7">
                            <p className="text-gray-500 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                              {profile.bio}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </SectionCard>

              {/* Services Offered */}
              <SectionCard shadow="#22C55E">
                <CardHeader icon={Sparkles} title="Services Offered">
                  {editingSection === "services" ? (
                    <SaveCancelBtns
                      onSave={saveServices}
                      onCancel={() => {
                        setServicesForm((profile?.services || []).map((s) => s.serviceType));
                        setEditingSection(null);
                      }}
                      saving={saving}
                    />
                  ) : (
                    <EditBtn
                      onClick={() => setEditingSection("services")}
                      label="Edit Services"
                    />
                  )}
                </CardHeader>
                <div className="bg-white p-6">
                  {editingSection === "services" ? (
                    <>
                      <p className="text-xs text-gray-500 mb-4">
                        Select the services you want to offer to mentees
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceTypeCatalogue.map((svc) => {
                          const sel = servicesForm.includes(svc.value);
                          return (
                            <button
                              key={svc.value}
                              onClick={() => toggleService(svc.value)}
                              type="button"
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all text-left ${sel ? "bg-[#5061E4] text-white border-[#5061E4]" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}
                            >
                              <span
                                className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center ${sel ? "border-white bg-white" : "border-gray-400"}`}
                              >
                                {sel && (
                                  <CheckCircle className="w-3.5 h-3.5 text-[#5061E4]" />
                                )}
                              </span>
                              {svc.label}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : services.length === 0 ? (
                    <div className="flex flex-col items-center py-6 text-center">
                      <Sparkles size={32} className="text-gray-300 mb-2" />
                      <p className="text-sm font-bold text-gray-400">
                        No services added yet
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Click "Edit Services" to add the services you offer
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((s) => (
                        <div
                          key={s.serviceType}
                          className="flex items-center gap-2 rounded-xl border-2 border-[#22C55E] bg-[#F0FDF4] px-4 py-3"
                        >
                          <CheckCircle
                            size={16}
                            className="text-[#22C55E] shrink-0"
                          />
                          <span className="font-semibold text-sm text-gray-800">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Service Pricing */}
              <SectionCard shadow="#5061E4">
                <CardHeader icon={IndianRupee} title="Service Pricing">
                  {editingSection === "pricing" ? (
                    <SaveCancelBtns
                      onSave={savePricing}
                      onCancel={() => {
                        const pf = {};
                        (profile?.services || []).forEach((s) => { pf[s.serviceType] = s.pricePerSession; });
                        setPricingForm(pf);
                        setEditingSection(null);
                      }}
                      saving={saving}
                    />
                  ) : services.length > 0 ? (
                    <EditBtn
                      onClick={() => {
                        const pf = {};
                        (profile?.services || []).forEach((s) => { pf[s.serviceType] = s.pricePerSession; });
                        setPricingForm(pf);
                        setEditingSection("pricing");
                      }}
                      label="Edit Pricing"
                    />
                  ) : null}
                </CardHeader>
                <div className="bg-white p-6">
                  {services.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      Add services first to set pricing.
                    </p>
                  ) : (
                    <>
                      {pricingMissing && editingSection !== "pricing" && (
                        <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                          <AlertCircle
                            size={16}
                            className="text-amber-500 shrink-0"
                          />
                          <p className="text-xs font-semibold text-amber-700">
                            Complete Your Pricing Setup — Your services won't be
                            visible to mentees until you set up pricing for all
                            selected services.
                          </p>
                        </div>
                      )}
                      {editingSection === "pricing" && (
                        <p className="text-xs text-gray-500 mb-4">
                          Set individual prices for each of your services
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((s) => (
                          <div
                            key={s.serviceType}
                            className="rounded-xl border-2 border-gray-200 p-4"
                          >
                            <p className="text-xs font-bold text-gray-500 mb-2">
                              {s.label}
                            </p>
                            {editingSection === "pricing" ? (
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  value={pricingForm[s.serviceType] ?? ""}
                                  onChange={(e) =>
                                    setPricingForm((p) => ({
                                      ...p,
                                      [s.serviceType]:
                                        e.target.value === ""
                                          ? ""
                                          : Number(e.target.value),
                                    }))
                                  }
                                  placeholder="0"
                                  className="w-full pl-8 pr-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"
                                />
                              </div>
                            ) : (
                              <p
                                className={`text-lg font-extrabold ${s.pricePerSession ? "text-black" : "text-gray-400"}`}
                              >
                                {s.pricePerSession ? `₹${s.pricePerSession}` : "Not set"}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </SectionCard>

              {/* Weekly Availability */}
              <SectionCard shadow="#F97316">
                <CardHeader icon={Calendar} title="Weekly Availability">
                  {services.length > 0 &&
                    (() => {
                      const pricedCount = services.filter(
                        (s) => s.pricePerSession > 0,
                      ).length;
                      if (pricedCount === 0) {
                        return (
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                            <IndianRupee size={12} /> Set pricing first
                          </span>
                        );
                      }
                      return (
                        <button
                          onClick={() => router.push("/mentor/availability")}
                          className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white hover:opacity-90"
                        >
                          <Edit2 size={12} /> Edit Availability
                        </button>
                      );
                    })()}
                </CardHeader>
                <div className="bg-white p-6">
                  {services.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      Add services first to set availability.
                    </p>
                  ) : availability.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-center">
                      <Calendar size={36} className="text-gray-300 mb-2" />
                      <p className="text-sm font-bold text-gray-400">Not set</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Set up your weekly availability to let mentees know when
                        you're free
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="rounded-xl border border-[#5061E4] bg-[#EEF0FF] p-4">
                          <p className="text-2xl font-extrabold text-[#5061E4]">
                            {availDays.size}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold mt-1">
                            Days Available
                          </p>
                        </div>
                        <div className="rounded-xl border border-[#F59E0B] bg-[#FFF7ED] p-4">
                          <p className="text-2xl font-extrabold text-[#F59E0B]">
                            {availSlotsCount}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold mt-1">
                            Total Slots
                          </p>
                        </div>
                        <div className="rounded-xl border border-[#F97316] bg-[#FFF3EE] p-4">
                          <p className="text-2xl font-extrabold text-[#F97316]">
                            {services.length}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold mt-1">
                            Active Services
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {availability.map((dayEntry) => {
                          const slots = dayEntry.slots || [];
                          if (slots.length === 0) return null;

                          return (
                            <div
                              key={dayEntry.dayOfWeek}
                              className="rounded-2xl border border-black bg-[#FAF9F6] overflow-hidden"
                            >
                              <div className="px-5 py-4 border-b border-black flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-extrabold text-black">
                                    {dayEntry.dayLabel}
                                  </h3>
                                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    {slots.length} slot
                                    {slots.length !== 1 ? "s" : ""}
                                  </p>
                                </div>
                                <Calendar size={20} className="text-gray-400" />
                              </div>
                              <div className="p-5 space-y-3 bg-white">
                                <div className="flex flex-wrap gap-2">
                                  {slots.map((sl, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-1.5 rounded-lg border border-black bg-white px-3 py-1.5"
                                    >
                                      <Clock
                                        size={12}
                                        className="text-gray-500"
                                      />
                                      <span className="text-xs font-semibold text-black">
                                        {sl.startTime} - {sl.endTime}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
