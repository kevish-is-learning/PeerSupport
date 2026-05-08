"use client";

import { Briefcase, Save, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { mentorProfileApi } from "../../../lib/api";
import { toast } from "sonner";

export default function WorkExperiencePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [hasWorkExp, setHasWorkExp] = useState(false);
  const [form, setForm] = useState({ workYears: "", workCompany: "", workRole: "" });

  useEffect(() => {
    mentorProfileApi.getMine().then(res => {
      const p = res.data?.profile;
      if (p) {
        setProfile(p);
        if (p.workExperience) {
          const [y, c, r] = p.workExperience.split("|");
          setHasWorkExp(true);
          setForm({ workYears: y || "", workCompany: c || "", workRole: r || "" });
        }
      }
    }).catch(() => toast.error("Failed to load profile."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setSaved(false);
    try {
      const workExp = hasWorkExp && (form.workYears || form.workCompany || form.workRole)
        ? `${form.workYears}|${form.workCompany}|${form.workRole}`
        : "";

      const res = await mentorProfileApi.update({
        contactNumber: profile.contactNumber,
        bio: profile.bio,
        expertiseTags: profile.expertiseTags || [],
        pgProfile: profile.pgProfile || "",
        workExperience: workExp,
        servicesOffered: profile.servicesOffered || [],
        servicePricing: profile.servicePricing || {},
        weeklyAvailability: profile.weeklyAvailability || {},
      });
      setProfile(res.data?.profile);
      setSaved(true);
      toast.success("Work experience saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      toast.error(e.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  // Derived display for the summary card
  const currentWE = profile?.workExperience;
  const [displayY, displayC, displayR] = (currentWE || "").split("|");

  if (isLoading) return (
    <div className="flex h-full w-full items-center justify-center bg-[#FFF7F5]">
      <Loader2 className="animate-spin text-[#5061E4]" size={32}/>
    </div>
  );

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FFF7F5] p-6 lg:p-10 text-black">

      {/* Page header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#5061E4] border-[3px] border-black flex items-center justify-center">
            <Briefcase size={18} className="text-white"/>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Work Experience</h1>
        </div>
        <p className="text-gray-500 font-medium mt-1 ml-13">
          Share your professional background to build trust with mentees.
        </p>
      </header>

      <div className="max-w-2xl flex flex-col gap-6">

        {/* Current summary card */}
        {currentWE && (
          <div className="rounded-2xl border-[3px] border-black bg-white p-5" style={{boxShadow:"5px 5px 0 0 #22C55E"}}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Current Experience</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF0FF] border-2 border-[#5061E4] flex items-center justify-center shrink-0">
                <Briefcase size={20} className="text-[#5061E4]"/>
              </div>
              <div>
                {displayC && <p className="font-extrabold text-base text-gray-900">{displayC}</p>}
                {displayR && <p className="font-semibold text-sm text-gray-600">{displayR}</p>}
                {displayY && (
                  <span className="inline-block mt-1 rounded-full bg-[#EEF0FF] border border-[#5061E4] px-2.5 py-0.5 text-xs font-bold text-[#5061E4]">
                    {displayY} {Number(displayY) === 1 ? "year" : "years"} experience
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit form */}
        <div className="rounded-2xl border-[3px] border-black bg-white overflow-hidden" style={{boxShadow:"6px 6px 0 0 #F59E0B"}}>
          <div className="bg-[#FDE9E6] px-6 py-4 border-b-[3px] border-black flex items-center gap-2">
            <Briefcase size={18} strokeWidth={2.5}/>
            <h2 className="text-lg font-bold">Update Work Experience</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Yes / No */}
            <div>
              <label className="block text-sm font-bold mb-3">Do you have work experience?</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" checked={hasWorkExp} onChange={() => setHasWorkExp(true)}
                    className="accent-[#5061E4] w-4 h-4"/>
                  <span className="text-sm font-semibold">Yes</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="radio" checked={!hasWorkExp}
                    onChange={() => { setHasWorkExp(false); setForm({ workYears:"", workCompany:"", workRole:"" }); }}
                    className="accent-[#5061E4] w-4 h-4"/>
                  <span className="text-sm font-semibold">No (Fresher)</span>
                </label>
              </div>
            </div>

            {/* Conditional detail fields */}
            {hasWorkExp && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700">
                    Years of Experience <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="number" min="0" step="0.5"
                    value={form.workYears}
                    onChange={e => setForm(p => ({ ...p, workYears: e.target.value }))}
                    placeholder="e.g. 3"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#5061E4] focus:outline-none focus:ring-2 focus:ring-[#5061E4]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700">
                    Company <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.workCompany}
                    onChange={e => setForm(p => ({ ...p, workCompany: e.target.value }))}
                    placeholder="e.g. McKinsey"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#5061E4] focus:outline-none focus:ring-2 focus:ring-[#5061E4]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700">
                    Role <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.workRole}
                    onChange={e => setForm(p => ({ ...p, workRole: e.target.value }))}
                    placeholder="e.g. Consultant"
                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#5061E4] focus:outline-none focus:ring-2 focus:ring-[#5061E4]/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Save */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {saving
                  ? <Loader2 size={14} className="animate-spin"/>
                  : saved
                    ? <CheckCircle size={14}/>
                    : <Save size={14}/>
                }
                {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
              </button>
              {saved && (
                <span className="text-xs font-semibold text-[#22C55E] flex items-center gap-1">
                  <CheckCircle size={12}/> Changes saved successfully
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tip card */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">💡 Tips</p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-[#5061E4] font-bold mt-0.5">•</span> Mentees value real-world industry experience — be specific about your role.</li>
            <li className="flex items-start gap-2"><span className="text-[#5061E4] font-bold mt-0.5">•</span> If you've worked at multiple companies, mention the most recent or most relevant one.</li>
            <li className="flex items-start gap-2"><span className="text-[#5061E4] font-bold mt-0.5">•</span> Freshers can still mentor effectively — your B-school experience matters!</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
