"use client";

import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useState, useRef, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadImage } from "@/lib/upload-action";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  MapPin, 
  Edit3,
  Camera,
  Heart,
  History,
  FileText,
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  // Fetch extra profile data from Firestore
  useEffect(() => {
    async function fetchExtraData() {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLocation(docSnap.data().location || "");
        }
      }
    }
    fetchExtraData();
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      // Update Firebase Auth Profile
      await updateProfile(user, { displayName });

      // Update extra data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        location,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update profile" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);
    try {
      const imageUrl = await uploadImage(file) as string;
      await updateProfile(user, { photoURL: imageUrl });
      setMessage({ type: "success", text: "Profile picture updated!" });
    } catch (error: any) {
      setMessage({ type: "error", text: "Failed to upload image" });
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const stats = [
    { label: "Saved Plots", value: "12", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
    { label: "Consultations", value: "3", icon: History, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Docs Verified", value: "8", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[48px] p-8 shadow-3xl border border-border-subtle relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative flex flex-col items-center text-center space-y-6">
                {/* Avatar */}
                <div className="relative group/avatar">
                  <div className="w-32 h-32 rounded-[40px] bg-section border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-primary" />
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    accept="image/*" 
                    onChange={handleImageChange}
                  />
                  <button 
                    onClick={handleImageClick}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-text-primary uppercase tracking-tight italic">
                    {user.displayName || "Plot Buyer"}
                  </h1>
                  <p className="text-sm font-bold text-text-muted uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Verified Member
                  </p>
                </div>

                <div className="w-full h-px bg-border-subtle" />

                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-section flex items-center justify-center text-text-muted group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Email address</p>
                      <p className="text-sm font-bold text-text-primary truncate">{user.email || "Social Login Only"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-section flex items-center justify-center text-text-muted group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Phone Number</p>
                      <p className="text-sm font-bold text-text-primary">{user.phoneNumber || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-section flex items-center justify-center text-text-muted group-hover/item:text-primary group-hover/item:bg-primary/10 transition-all">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Joined IndiaLand</p>
                      <p className="text-sm font-bold text-text-primary">January 2026</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => logout()}
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-2 border-border-subtle hover:border-red-500/30 hover:bg-red-50 hover:text-red-600 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout Account
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-[32px] border border-border-subtle flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xl font-black text-text-primary italic">{stat.value}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-section flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all">
                    <Edit3 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Tabs/Settings */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Feedback Message */}
            {message && (
              <div className={`p-4 rounded-3xl border ${message.type === 'success' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'} flex items-center gap-3 font-bold text-sm italic animate-in fade-in slide-in-from-top-2`}>
                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                {message.text}
              </div>
            )}

            {/* Real Estate Preferences */}
            <div className="bg-white rounded-[48px] p-10 shadow-3xl border border-border-subtle space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight italic">Profile Settings</h2>
                  <p className="text-sm font-bold text-text-muted italic">Manage your account information and preferences.</p>
                </div>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-2xl h-12 px-6 font-black uppercase text-xs tracking-widest bg-primary text-white shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Full Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold text-text-primary outline-none focus:border-primary transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Location Preference</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-14 bg-section rounded-2xl border border-border-subtle pl-14 pr-6 text-sm font-bold text-text-primary outline-none focus:border-primary transition-all"
                      placeholder="e.g. Pune, Maharashtra"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-xs font-black text-text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Activity History
                </h3>
                <div className="space-y-4">
                  {[
                    "Viewed Plot #4218 in Lonavala",
                    "Calculated Stamp Duty for ₹4.5 Cr Property",
                    "Sent inquiry to Property Lawyer in Pune"
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-section border border-border-subtle/50 hover:border-primary/20 transition-all group cursor-default">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-sm font-bold text-text-secondary flex-1">{activity}</p>
                      <span className="text-[10px] font-black text-text-muted uppercase italic">{i === 0 ? "Today" : "3 days ago"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Status Banner */}
            <div className="bg-primary rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                    Premium Account
                  </div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tight">Access Pro Features</h2>
                  <p className="text-sm font-medium text-white/80 max-w-md">Get priority legal consultation, hidden plot details, and real-time valuation alerts.</p>
                </div>
                <Button className="bg-white text-primary rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
