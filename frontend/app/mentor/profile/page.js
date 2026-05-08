"use client";

import { User, IndianRupee, Calendar, Edit2, Save, X, Loader2, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../store/useAuthStore";
import { mentorProfileApi, authApi, resolveUploadUrl } from "../../../lib/api";
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
  "IIM Ahmedabad","IIM Bangalore","IIM Calcutta","IIM Lucknow",
  "IIM Kozhikode","IIM Indore","ISB","XLRI","FMS Delhi",
  "MDI Gurgaon","SP Jain","JBIMS","IMT Ghaziabad","Other",
];

const SERVICES_OPTIONS = [
  "SoP Review / Discussion",
  "Resume Curation / Review",
  "Mock Interview",
  "WAT and GD Preparation",
  "Know Your College",
  "One-on-one Connect",
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

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
      <button onClick={onCancel} disabled={saving}
        className="flex items-center gap-1 rounded-xl border-[3px] border-black bg-white px-4 py-2 text-xs font-bold hover:bg-gray-50 disabled:opacity-50">
        <X size={12}/> Cancel
      </button>
      <button onClick={onSave} disabled={saving}
        className="flex items-center gap-1 rounded-xl border-[3px] border-black bg-[#F59E0B] px-4 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50">
        {saving ? <Loader2 size={12} className="animate-spin"/> : <Save size={12}/>} Save Changes
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

  // Personal form
  const [personalForm, setPersonalForm] = useState({
    fullName: "",
    contactNumber: "",
    bSchool: "",
    bSchoolYear: "",
    expertiseTagsArr: [],
    bio: "",
  });

  // Services form
  const [servicesForm, setServicesForm] = useState([]);

  // Pricing form
  const [pricingForm, setPricingForm] = useState({});

  const loadProfile = async () => {
    try {
      const res = await mentorProfileApi.getMine();
      const p = res.data?.profile;
      if (p) {
        setProfile(p);
        const pg = (p.pgProfile || "").split("|");
        setPersonalForm({
          fullName: p.name || "",
          contactNumber: p.contactNumber || "",
          bSchool: pg[0] || "",
          bSchoolYear: pg[2] || "",
          expertiseTagsArr: p.expertiseTags || [],
          bio: p.bio || "",
        });
        setServicesForm(p.servicesOffered || []);
        setPricingForm(p.servicePricing || {});
      }
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadProfile(); }, []);

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
        try { await authApi.updateProfile({ name: personalForm.fullName }); } catch (_) {}
      }
      const pgParts = profile?.pgProfile?.split("|") || ["","",""];
      const newPgProfile = `${personalForm.bSchool}|${pgParts[1] || ""}|${personalForm.bSchoolYear}`;
      const res = await mentorProfileApi.update({
        contactNumber: personalForm.contactNumber,
        bio: personalForm.bio,
        expertiseTags: personalForm.expertiseTagsArr,
        pgProfile: newPgProfile,
        workExperience: profile?.workExperience || "",
        servicesOffered: profile?.servicesOffered || [],
        servicePricing: profile?.servicePricing || {},
        weeklyAvailability: profile?.weeklyAvailability || {},
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

  const saveServices = () => saveSection({
    contactNumber: profile.contactNumber,
    bio: profile.bio,
    servicesOffered: servicesForm,
    expertiseTags: profile.expertiseTags || [],
    servicePricing: profile?.servicePricing || {},
    weeklyAvailability: profile?.weeklyAvailability || {},
  });

  const savePricing = () => saveSection({
    contactNumber: profile.contactNumber,
    bio: profile.bio,
    servicesOffered: profile.servicesOffered || [],
    expertiseTags: profile.expertiseTags || [],
    servicePricing: pricingForm,
    weeklyAvailability: profile?.weeklyAvailability || {},
  });

  const toggleService = (s) =>
    setServicesForm(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s]);

  // Derived flags
  const services = profile?.servicesOffered || [];
  const pricing = profile?.servicePricing || {};
  const availability = profile?.weeklyAvailability || {};

  const pricingMissing = services.length > 0 && services.some(s => !pricing[s]);
  const availabilityMissing = services.length > 0 && Object.keys(availability).length === 0;

  // Count availability stats
  const availDays = new Set();
  const availSlots = [];
  Object.values(availability).forEach(svcDays => {
    Object.entries(svcDays).forEach(([day, slots]) => {
      if (slots.length > 0) availDays.add(day);
      availSlots.push(...slots);
    });
  });

  if (isLoading) return (
    <div className="flex h-full w-full items-center justify-center bg-[#FFF7F5]">
      <Loader2 className="h-8 w-8 animate-spin text-[#5061E4]" />
    </div>
  );

  return (
    <div className="w-full h-full overflow-y-auto p-6 lg:p-10 bg-[#FFF7F5] text-black">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Profile Settings</h1>
        <p className="mt-1 text-gray-500 font-medium">Manage your profile and preferences</p>
      </header>

      {/* Alert banners */}
      {pricingMissing && (
        <div className="mb-4 rounded-2xl border-[3px] border-black bg-white p-4 flex items-start gap-4" style={{boxShadow:"4px 4px 0 0 #5061E4"}}>
          <IndianRupee className="mt-0.5 shrink-0 text-[#5061E4]" size={20}/>
          <div className="flex-1">
            <p className="font-bold text-sm">Complete Your Pricing Setup</p>
            <p className="text-xs text-gray-500 mt-0.5">Your services won't be visible to mentees until you set up pricing for all your services.</p>
          </div>
          <button onClick={() => setEditingSection('pricing')}
            className="shrink-0 flex items-center gap-1 rounded-xl border-2 border-black bg-[#5061E4] px-3 py-2 text-xs font-bold text-white hover:opacity-90">
            <IndianRupee size={12}/> Set Up Pricing Now
          </button>
        </div>
      )}

      {availabilityMissing && (
        <div className="mb-6 rounded-2xl border-[3px] border-black bg-white p-4 flex items-start gap-4" style={{boxShadow:"4px 4px 0 0 #F59E0B"}}>
          <Calendar className="mt-0.5 shrink-0 text-[#F59E0B]" size={20}/>
          <div className="flex-1">
            <p className="font-bold text-sm">Set Up Your Availability</p>
            <p className="text-xs text-gray-500 mt-0.5">Mentees need to know when you're available for sessions. Add your weekly availability now.</p>
          </div>
          <button onClick={() => router.push("/mentor/availability")}
            className="shrink-0 flex items-center gap-1 rounded-xl border-2 border-black bg-[#F59E0B] px-3 py-2 text-xs font-bold text-black hover:opacity-90">
            <Calendar size={12}/> Set Up Availability Now
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left sticky card */}
        <div className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-0">
          <article className="rounded-2xl border-[3px] border-black bg-white p-6 text-center" style={{boxShadow:"6px 6px 0 0 #5061E4"}}>
            <span className="inline-block rounded-full border-2 border-[#5061E4] px-3 py-0.5 text-[10px] font-bold text-[#5061E4] mb-3">Your Public Profile</span>
            <div className="flex justify-center mb-3">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-[3px] border-black">
                <img src={profile?.profilePhotoUrl ? resolveUploadUrl(profile.profilePhotoUrl) : "https://i.pravatar.cc/150?img=11"} alt="Profile" className="h-full w-full object-cover"/>
              </div>
            </div>
            <p className="font-extrabold text-base">{profile?.name || user?.name || "Mentor"}</p>
            <p className="text-xs text-gray-500 mt-0.5">{profile?.pgProfile?.split("|")[0] || ""} {profile?.pgProfile?.split("|")[2] ? `• ${profile.pgProfile.split("|")[2]}` : ""}</p>
            {(profile?.expertiseTags || []).slice(0,2).map(t => (
              <span key={t} className="inline-block mt-2 mr-1 rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-semibold text-gray-600">{t}</span>
            ))}
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">{profile?.bio?.slice(0, 100)}{profile?.bio?.length > 100 ? "..." : ""}</p>
            <button className="mt-4 w-full rounded-xl border-2 border-black bg-[#5061E4] py-2 text-xs font-bold text-white hover:opacity-90">Preview Full Profile</button>
          </article>
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col gap-6 w-full min-w-0">

          {/* Personal Information */}
          <SectionCard shadow="#F59E0B">
            <CardHeader icon={User} title="Personal Information">
              {editingSection === 'personal'
                ? <SaveCancelBtns onSave={savePersonal} onCancel={() => {
                    const pg=(profile?.pgProfile||"").split("|");
                    setPersonalForm({ fullName:profile?.name||"", contactNumber:profile?.contactNumber||"", bSchool:pg[0]||"", bSchoolYear:pg[2]||"", expertiseTagsArr:profile?.expertiseTags||[], bio:profile?.bio||""});
                    setEditingSection(null);
                  }} saving={saving}/>
                : <EditBtn onClick={() => setEditingSection('personal')} label="Edit Profile"/>}
            </CardHeader>
            <div className="bg-white p-6 grid gap-4 sm:grid-cols-2 text-sm">

              {/* Full Name - editable */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Full Name</label>
                {editingSection==='personal' ? (
                  <input value={personalForm.fullName} onChange={e=>setPersonalForm(p=>({...p,fullName:e.target.value}))}
                    className="rounded-xl border-2 border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"/>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700">{profile?.name || user?.name || "Not provided"}</div>
                )}
              </div>

              {/* Email - always read-only */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Email Address</label>
                <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-500">{user?.email || "Not available"}</div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Phone Number</label>
                {editingSection==='personal' ? (
                  <input value={personalForm.contactNumber} onChange={e=>setPersonalForm(p=>({...p,contactNumber:e.target.value}))}
                    className="rounded-xl border-2 border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"/>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700">{profile?.contactNumber || "Not provided"}</div>
                )}
              </div>

              {/* B-School name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">B-School</label>
                {editingSection==='personal' ? (
                  <select value={personalForm.bSchool} onChange={e=>setPersonalForm(p=>({...p,bSchool:e.target.value}))}
                    className="rounded-xl border-2 border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm bg-white">
                    <option value="">Select B-School</option>
                    {IIM_SCHOOLS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700">{profile?.pgProfile?.split("|")[0] || "Not provided"}</div>
                )}
              </div>

              {/* Batch Year */}
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Batch Year</label>
                {editingSection==='personal' ? (
                  <input type="number" min="1990" max="2040" value={personalForm.bSchoolYear} onChange={e=>setPersonalForm(p=>({...p,bSchoolYear:e.target.value}))}
                    placeholder="e.g. 2024"
                    className="rounded-xl border-2 border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"/>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700">{profile?.pgProfile?.split("|")[2] || "Not provided"}</div>
                )}
              </div>

              {/* Work Experience — managed on its own page */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-bold text-[0.7rem] text-black">Work Experience</label>
                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-3">
                  <span className="text-sm text-gray-700">
                    {profile?.workExperience ? (() => {
                      const [y,c,r] = profile.workExperience.split("|");
                      return [y && `${y} yrs`, c, r].filter(Boolean).join(" • ");
                    })() : "Not provided"}
                  </span>
                  <a href="/mentor/work-experience"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#5061E4] hover:underline shrink-0 ml-4">
                    Manage →
                  </a>
                </div>
              </div>

              {/* Area of Expertise - tag picker */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-bold text-[0.7rem] text-black">Area of Expertise</label>
                {editingSection==='personal' ? (
                  <div className="flex flex-wrap gap-2">
                    {EXPERTISE_OPTIONS.map(opt => {
                      const sel = personalForm.expertiseTagsArr.includes(opt);
                      return (
                        <button key={opt} type="button"
                          onClick={() => setPersonalForm(p => ({ ...p, expertiseTagsArr: sel ? p.expertiseTagsArr.filter(t=>t!==opt) : [...p.expertiseTagsArr, opt] }))}
                          className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${ sel ? "bg-[#5061E4] text-white border-[#5061E4]" : "bg-white text-gray-600 border-gray-300 hover:border-[#5061E4]" }`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700">
                    {profile?.expertiseTags?.length ? profile.expertiseTags.join(", ") : "Not provided"}
                  </div>
                )}
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-bold text-[0.7rem] text-black">Bio</label>
                {editingSection==='personal' ? (
                  <textarea value={personalForm.bio} onChange={e=>setPersonalForm(p=>({...p,bio:e.target.value}))} rows={3}
                    className="rounded-xl border-2 border-black px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#5061E4] resize-none text-sm"/>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-[#FDF8F7] px-4 py-2.5 text-gray-700 leading-relaxed">{profile?.bio || "No bio added."}</div>
                )}
              </div>

            </div>
          </SectionCard>

          {/* Services Offered */}
          <SectionCard shadow="#22C55E">
            <CardHeader icon={Sparkles} title="Services Offered">
              {editingSection === 'services'
                ? <SaveCancelBtns onSave={saveServices} onCancel={() => { setServicesForm(profile?.servicesOffered||[]); setEditingSection(null); }} saving={saving}/>
                : <EditBtn onClick={() => setEditingSection('services')} label="Edit Services"/>}
            </CardHeader>
            <div className="bg-white p-6">
              {editingSection === 'services' ? (
                <>
                  <p className="text-xs text-gray-500 mb-4">Select the services you want to offer to mentees</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES_OPTIONS.map(s => {
                      const sel = servicesForm.includes(s);
                      return (
                        <button key={s} onClick={() => toggleService(s)} type="button"
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all text-left ${sel ? "bg-[#5061E4] text-white border-[#5061E4]" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>
                          <span className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center ${sel?"border-white bg-white":"border-gray-400"}`}>
                            {sel && <CheckCircle className="w-3.5 h-3.5 text-[#5061E4]"/>}
                          </span>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : services.length === 0 ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <Sparkles size={32} className="text-gray-300 mb-2"/>
                  <p className="text-sm font-bold text-gray-400">No services added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Edit Services" to add the services you offer</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map(s => (
                    <div key={s} className="flex items-center gap-2 rounded-xl border-2 border-[#22C55E] bg-[#F0FDF4] px-4 py-3">
                      <CheckCircle size={16} className="text-[#22C55E] shrink-0"/>
                      <span className="font-semibold text-sm text-gray-800">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          {/* Service Pricing */}
          <SectionCard shadow="#5061E4">
            <CardHeader icon={IndianRupee} title="Service Pricing">
              {editingSection === 'pricing'
                ? <SaveCancelBtns onSave={savePricing} onCancel={() => { setPricingForm(profile?.servicePricing||{}); setEditingSection(null); }} saving={saving}/>
                : services.length > 0
                  ? <EditBtn onClick={() => { setPricingForm(profile?.servicePricing||{}); setEditingSection('pricing'); }} label="Edit Pricing"/>
                  : null}
            </CardHeader>
            <div className="bg-white p-6">
              {services.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Add services first to set pricing.</p>
              ) : (
                <>
                  {pricingMissing && editingSection !== 'pricing' && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                      <AlertCircle size={16} className="text-amber-500 shrink-0"/>
                      <p className="text-xs font-semibold text-amber-700">Complete Your Pricing Setup — Your services won't be visible to mentees until you set up pricing for all selected services.</p>
                    </div>
                  )}
                  {editingSection === 'pricing' && (
                    <p className="text-xs text-gray-500 mb-4">Set individual prices for each of your services</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map(s => (
                      <div key={s} className="rounded-xl border-2 border-gray-200 p-4">
                        <p className="text-xs font-bold text-gray-500 mb-2">{s}</p>
                        {editingSection === 'pricing' ? (
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">₹</span>
                            <input type="number" min="0" value={pricingForm[s] ?? ""}
                              onChange={e => setPricingForm(p => ({...p, [s]: e.target.value === "" ? "" : Number(e.target.value)}))}
                              placeholder="0"
                              className="w-full pl-8 pr-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5061E4] text-sm"/>
                          </div>
                        ) : (
                          <p className={`text-lg font-extrabold ${pricing[s] ? "text-black" : "text-gray-400"}`}>
                            {pricing[s] ? `₹${pricing[s]}` : "Not set"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  {editingSection === 'pricing' && (
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-amber-600">
                      <AlertCircle size={12}/> Platform fee of 10% will be deducted from your earnings. Set competitive pricing to attract more mentees.
                    </p>
                  )}
                </>
              )}
            </div>
          </SectionCard>

          {/* Weekly Availability */}
          <SectionCard shadow="#F97316">
            <CardHeader icon={Calendar} title="Weekly Availability">
              {services.length > 0 && (() => {
                const pricedCount = services.filter(s => pricing[s]).length;
                if (pricedCount === 0) {
                  return (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                      <IndianRupee size={12}/> Set pricing first
                    </span>
                  );
                }
                return (
                  <button onClick={() => router.push("/mentor/availability")}
                    className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white hover:opacity-90">
                    <Edit2 size={12}/> Edit Availability
                  </button>
                );
              })()}
            </CardHeader>
            <div className="bg-white p-6">
              {services.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Add services first to set availability.</p>
              ) : Object.keys(availability).length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <Calendar size={36} className="text-gray-300 mb-2"/>
                  <p className="text-sm font-bold text-gray-400">Not set</p>
                  <p className="text-xs text-gray-400 mt-1">Set up your weekly availability to let mentees know when you're free</p>
                </div>
              ) : (
                <>
                  <div className="flex gap-6 mb-5">
                    <div className="text-center"><p className="text-2xl font-extrabold text-[#5061E4]">{availDays.size}</p><p className="text-xs text-gray-500">Days Available</p></div>
                    <div className="text-center"><p className="text-2xl font-extrabold text-[#22C55E]">{Object.keys(availability).length}</p><p className="text-xs text-gray-500">Services Set</p></div>
                    <div className="text-center"><p className="text-2xl font-extrabold text-[#F59E0B]">{availSlots.length}</p><p className="text-xs text-gray-500">Per week</p></div>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(availability).map(([svc, days]) => {
                      const activeDays = Object.entries(days).filter(([,slots]) => slots.length > 0);
                      if (activeDays.length === 0) return null;
                      return (
                        <div key={svc}>
                          <p className="text-xs font-bold text-gray-500 mb-2">{svc}</p>
                          {activeDays.map(([day, slots]) => (
                            <div key={day} className="mb-2 rounded-xl border border-gray-200 bg-[#FDF8F7] px-4 py-2.5 flex items-start gap-3">
                              <span className="text-xs font-bold text-gray-700 w-24 shrink-0 pt-0.5">{day}</span>
                              <div className="flex flex-wrap gap-2">
                                {slots.map((sl,i) => (
                                  <span key={i} className="rounded-full bg-[#5061E4]/10 border border-[#5061E4]/30 px-2 py-0.5 text-xs font-semibold text-[#5061E4]">
                                    {sl.start} – {sl.end}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
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
    </div>
  );
}
