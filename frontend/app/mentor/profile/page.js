"use client";

import { User, IndianRupee, Calendar, Clock, Edit2, Save, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";
import { mentorProfileApi, resolveUploadUrl } from "../../../lib/api";
import { toast } from "sonner";

export default function MentorProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    contactNumber: "",
    pgProfile: "",
    expertiseTags: "",
    workExperience: "",
    bio: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await mentorProfileApi.getMine();
        if (res.data?.profile) {
          setProfile(res.data.profile);
          setFormData({
            contactNumber: res.data.profile.contactNumber || "",
            pgProfile: res.data.profile.pgProfile || "",
            expertiseTags: (res.data.profile.expertiseTags || []).join(", "),
            workExperience: res.data.profile.workExperience || "",
            bio: res.data.profile.bio || ""
          });
        }
      } catch (err) {
        toast.error("Failed to load mentor profile data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        expertiseTags: formData.expertiseTags.split(",").map(t => t.trim()).filter(Boolean)
      };
      
      const res = await mentorProfileApi.update(payload);
      if (res.data?.profile) {
        setProfile(res.data.profile);
        toast.success("Profile updated successfully!");
        setIsEditingProfile(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEditing = () => {
    if (profile) {
      setFormData({
        contactNumber: profile.contactNumber || "",
        pgProfile: profile.pgProfile || "",
        expertiseTags: (profile.expertiseTags || []).join(", "),
        workExperience: profile.workExperience || "",
        bio: profile.bio || ""
      });
    }
    setIsEditingProfile(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FFF7F5]">
        <Loader2 className="h-8 w-8 animate-spin text-[#5061E4]" />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-8 lg:p-12 bg-[#FFF7F5] text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Profile Settings</h1>
        <p className="mt-1 text-gray-500 font-medium">Manage your profile and preferences</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Left Column: Profile Picture */}
        <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-0">
          <article
            className="rounded-2xl border-[3px] border-black bg-white p-6"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            <h2 className="text-base font-extrabold text-black">Profile Picture</h2>
            <div className="mt-6 flex justify-center">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border-[3px] border-black shadow-[4px_4px_0_0_#A1A1AA]">
                <img
                  src={profile?.profilePhotoUrl ? resolveUploadUrl(profile.profilePhotoUrl) : "https://i.pravatar.cc/150?img=11"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6"></div>
          </article>
        </div>

        {/* Right Column: Details */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Card 1: Personal Information */}
          <section
            className="rounded-2xl border-[3px] border-black flex flex-col overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #F59E0B" }}
          >
            <div className="bg-[#FDE9E6] px-6 py-4 border-b-[3px] border-black flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <User size={20} strokeWidth={2.5} className="text-black" />
                <h2 className="text-xl font-bold text-black">Personal Information</h2>
              </div>
              {isEditingProfile ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancelEditing}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-white px-4 py-2 text-xs font-bold text-black transition-opacity hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                  >
                    <X size={12} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#F59E0B] px-4 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  <Edit2 size={12} />
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="bg-white p-6 grid gap-6 sm:grid-cols-2 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Full Name</label>
                <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                  {user?.name || "Not set"}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Email Address</label>
                <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                  {user?.email || "Not available"}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Phone Number</label>
                {isEditingProfile ? (
                  <input
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2.5 font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                  />
                ) : (
                  <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                    {profile?.contactNumber || "Not provided"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">B-School</label>
                {isEditingProfile ? (
                  <input
                    name="pgProfile"
                    value={formData.pgProfile}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2.5 font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                  />
                ) : (
                  <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                    {profile?.pgProfile || "Not provided"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Expertise</label>
                {isEditingProfile ? (
                  <input
                    name="expertiseTags"
                    value={formData.expertiseTags}
                    onChange={handleInputChange}
                    placeholder="E.g., Consulting, Strategy"
                    className="rounded-xl border-2 border-black bg-white px-4 py-2.5 font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                  />
                ) : (
                  <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                    {profile?.expertiseTags?.length ? profile.expertiseTags.join(", ") : "None specified"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[0.7rem] text-black">Experience</label>
                {isEditingProfile ? (
                  <input
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-black bg-white px-4 py-2.5 font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#5061E4]"
                  />
                ) : (
                  <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-2.5 font-medium text-gray-700">
                    {profile?.workExperience || "Not provided"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-bold text-[0.7rem] text-black">Bio</label>
                {isEditingProfile ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="rounded-xl border-2 border-black bg-white px-4 py-3 font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#5061E4] resize-none"
                  />
                ) : (
                  <div className="rounded-xl border border-red-200/50 bg-[#FDF8F7] px-4 py-3 font-medium text-gray-700 leading-relaxed min-h-[4rem]">
                    {profile?.bio || "No bio added yet."}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Card 2: Session Pricing */}
          <section
            className="rounded-2xl border-[3px] border-black flex flex-col overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            <div className="bg-[#FDE9E6] px-6 py-4 border-b-[3px] border-black flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <IndianRupee size={20} strokeWidth={2.5} className="text-black" />
                <h2 className="text-xl font-bold text-black">Session Pricing</h2>
              </div>
              <button className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer">
                <Edit2 size={12} />
                Edit Pricing
              </button>
            </div>
            
            <div className="bg-white p-6 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border-2 border-black p-5 flex flex-col justify-center">
                <p className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">1:1 Session</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-black">₹1,500</span>
                </div>
                <p className="mt-0.5 text-[0.65rem] font-bold text-gray-400">per hour</p>
              </article>
              <article className="rounded-2xl border-2 border-black p-5 flex flex-col justify-center">
                <p className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Group Session</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-black">₹2,000</span>
                </div>
                <p className="mt-0.5 text-[0.65rem] font-bold text-gray-400">per hour</p>
              </article>
            </div>
          </section>

          {/* Card 3: Weekly Availability */}
          <section
            className="rounded-2xl border-[3px] border-black flex flex-col overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #F97316" }}
          >
            <div className="bg-[#FDE9E6] px-6 py-4 border-b-[3px] border-black flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} strokeWidth={2.5} className="text-black" />
                <h2 className="text-xl font-bold text-black">Weekly Availability</h2>
              </div>
              <button className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 cursor-pointer">
                <Edit2 size={12} />
                Edit Availability
              </button>
            </div>
            
            <div className="bg-white p-6">
              <p className="text-[0.7rem] font-bold text-gray-500 mb-4">Available Days: 5 of 7</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { day: "Monday", time: "08:00 - 17:00", types: ["1:1", "Group"] },
                  { day: "Tuesday", time: "09:00 - 17:00", types: ["1:1"] },
                  { day: "Wednesday", time: "08:00 - 17:00", types: ["1:1", "Group"] },
                  { day: "Friday", time: "14:00 - 20:00", types: ["1:1"] },
                  { day: "Saturday", time: "10:00 - 18:00", types: ["Group"] },
                ].map((item, idx) => (
                  <article key={idx} className="rounded-2xl border-2 border-black p-4">
                    <p className="text-sm font-bold text-black">{item.day}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[0.65rem] font-bold text-gray-500">
                      <Clock size={12} /> {item.time}
                    </div>
                    <div className="mt-3 flex gap-2">
                      {item.types.includes("1:1") && (
                        <span className="rounded bg-[#5061E4] px-1.5 py-0.5 text-[0.6rem] font-bold text-white tracking-wide">
                          1:1
                        </span>
                      )}
                      {item.types.includes("Group") && (
                        <span className="rounded bg-[#F97316] px-1.5 py-0.5 text-[0.6rem] font-bold text-white tracking-wide">
                          Group
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
