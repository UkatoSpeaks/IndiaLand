"use client";

import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_LISTINGS, Plot } from "@/lib/data";
import { 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Share2, 
  Heart, 
  TrendingUp, 
  Compass, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Droplets,
  Zap,
  Shield,
  Truck,
  Trees,
  CloudRain,
  Info,
  ExternalLink,
  Navigation,
  X,
  User,
  Mail,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ListingCard } from "@/components/ui/ListingCard";
import { useEffect, useState, useMemo } from "react";

const ICON_MAP: Record<string, any> = {
  Droplets,
  Zap,
  Shield,
  Truck,
  Trees,
  CloudRain
};

import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker 
} from "@react-google-maps/api";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

export default function PlotDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [plot, setPlot] = useState<Plot | null>(null);
  const [isAgentRevealed, setIsAgentRevealed] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  
  // Form states
  const [agentForm, setAgentForm] = useState({ name: "", phone: "" });
  const [loanForm, setLoanForm] = useState({ income: "", duration: "", profession: "Salaried" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<"agent" | "loan" | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  useEffect(() => {
    const foundPlot = MOCK_LISTINGS.find(p => p.id === id);
    if (foundPlot) {
      setPlot(foundPlot);
      // Pre-fill if user is logged in
      if (user) {
        setAgentForm({ name: user.displayName || "", phone: user.phoneNumber || "" });
      }
    }
  }, [id, user]);

  const recommendedPlots = useMemo(() => {
    return MOCK_LISTINGS.filter(p => p.id !== id).slice(0, 3);
  }, [id]);

  const handleAgentInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "property_inquiries"), {
        plotId: id,
        plotTitle: plot?.title,
        userName: agentForm.name,
        userPhone: agentForm.phone,
        userEmail: user?.email || "N/A",
        agentName: plot?.agent.name,
        timestamp: serverTimestamp(),
        status: "New"
      });
      setSuccess("agent");
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoanSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "loan_leads"), {
        plotId: id,
        plotPrice: plot?.price,
        userName: user?.displayName || "Anonymous",
        userPhone: user?.phoneNumber || "N/A",
        userEmail: user?.email || "N/A",
        monthlyIncome: loanForm.income,
        loanDuration: loanForm.duration,
        profession: loanForm.profession,
        timestamp: serverTimestamp(),
        status: "Pending Review"
      });
      setSuccess("loan");
      setTimeout(() => {
        setSuccess(null);
        setIsLoanModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting loan lead:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const openInGoogleMaps = () => {
    if (plot) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${plot.lat},${plot.lng}`, '_blank');
    }
  };

  if (!plot) {
    return (
      <div className="min-h-screen bg-[#F4F4F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-text-muted font-bold">Verifying Plot Records...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      {/* Loan Eligibility Modal */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative">
              <button 
                onClick={() => setIsLoanModalOpen(false)}
                className="absolute top-8 right-8 w-10 h-10 bg-section rounded-2xl flex items-center justify-center text-text-muted hover:text-primary transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-10 space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-text-primary uppercase italic">Loan Eligibility Check</h3>
                  <p className="text-sm font-bold text-text-muted">Fill in your basic details to get instant offers.</p>
                </div>

                {success === "loan" ? (
                  <div className="bg-green-50 border border-green-100 p-8 rounded-[32px] text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-green-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-green-700 italic uppercase">Success!</h4>
                      <p className="text-sm font-bold text-green-600">Our banking expert will contact you within 2 hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLoanSubmission} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Monthly Income (₹)</label>
                      <input 
                        type="number" 
                        required
                        value={loanForm.income}
                        onChange={(e) => setLoanForm({ ...loanForm, income: e.target.value })}
                        placeholder="e.g. 75000"
                        className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold text-text-primary outline-none focus:border-primary transition-all shadow-inner" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Duration (Years)</label>
                        <select 
                          value={loanForm.duration}
                          onChange={(e) => setLoanForm({ ...loanForm, duration: e.target.value })}
                          className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold text-text-primary outline-none focus:border-primary transition-all shadow-inner"
                        >
                          {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} Years</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Profession</label>
                        <select 
                          value={loanForm.profession}
                          onChange={(e) => setLoanForm({ ...loanForm, profession: e.target.value })}
                          className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold text-text-primary outline-none focus:border-primary transition-all shadow-inner"
                        >
                          <option value="Salaried">Salaried</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Business">Business Owner</option>
                        </select>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full h-16 rounded-[24px] bg-primary text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {submitting ? "Processing..." : "Submit Application"}
                    </Button>
                  </form>
                )}
              </div>
           </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] text-text-muted font-bold uppercase tracking-wider mb-8">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push('/')}>Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push('/buy')}>Residential Plots</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary truncate">{plot.location}</span>
        </nav>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 h-[300px] md:h-[500px]">
          <div className="lg:col-span-2 relative rounded-[32px] overflow-hidden group border border-border-subtle shadow-sm">
            <img 
              src={plot.image} 
              alt={plot.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 flex gap-2">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-black text-primary uppercase">Virtual Tour Available</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4">
            <div className="flex-1 relative rounded-[32px] overflow-hidden group border border-border-subtle shadow-sm">
              <img 
                src={plot.images[1] || plot.image} 
                alt="Gallery 2" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="flex-1 relative rounded-[32px] overflow-hidden group border border-border-subtle shadow-sm">
              <img 
                src={plot.images[2] || plot.image} 
                alt="Gallery 3" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-black text-xl italic">+18 Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP CONTENT GRID: Header, Price, Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-8">
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {plot.isRera && (
                  <span className="bg-verified/10 text-verified text-[10px] font-black px-3 py-1.5 rounded-lg border border-verified/20">RERA APPROVED</span>
                )}
                {plot.khataType && (
                  <span className="bg-info/10 text-info text-[10px] font-black px-3 py-1.5 rounded-lg border border-info/20">{plot.khataType} AVAILABLE</span>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-2">
                    {plot.area} {plot.units} {plot.khataType} Plot
                  </h1>
                  <p className="flex items-center gap-2 text-text-secondary font-medium">
                    <MapPin className="w-4 h-4 text-primary" />
                    {plot.subLocation}, {plot.location.split(',')[1]?.trim() || 'Bangalore'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 border border-border-subtle bg-white px-5 py-2.5 rounded-2xl text-[13px] font-bold text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm">
                    <Heart className="w-4 h-4" /> Save
                  </button>
                  <button className="flex items-center gap-2 border border-border-subtle bg-white px-5 py-2.5 rounded-2xl text-[13px] font-bold text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="bg-white p-6 rounded-[28px] border border-border-subtle shadow-sm group hover:border-primary/30 transition-all">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Total Price</span>
                <span className="text-xl font-black text-primary block">{plot.price}</span>
                <span className="text-[11px] font-bold text-text-muted">₹{plot.pricePerSqft} / sq.ft</span>
              </div>
              <div className="bg-white p-6 rounded-[28px] border border-border-subtle shadow-sm group hover:border-primary/30 transition-all">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Plot Area</span>
                <span className="text-xl font-black text-text-primary block">{plot.area} {plot.units}</span>
                <span className="text-[11px] font-bold text-text-muted">High ROI Potential</span>
              </div>
              <div className="bg-white p-6 rounded-[28px] border border-border-subtle shadow-sm group hover:border-primary/30 transition-all">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Facing</span>
                <span className="text-xl font-black text-text-primary block">{plot.facing}</span>
                <span className="text-[11px] font-bold text-text-muted">100% Vastu</span>
              </div>
              <div className="bg-white p-6 rounded-[28px] border border-border-subtle shadow-sm group hover:border-primary/30 transition-all">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2">Ownership</span>
                <span className="text-xl font-black text-text-primary block">{plot.ownership}</span>
                <span className="text-[11px] font-bold text-text-muted">Individual Title</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-2">
              <h3 className="text-xl font-black text-text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Property Description
              </h3>
              <div className="text-text-secondary leading-relaxed space-y-4 font-medium italic">
                {plot.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
          {/* Empty Sidebar placeholder in top grid to move real sidebar down */}
          <div className="hidden lg:block lg:col-span-1" />
        </div>

        {/* BOTTOM CONTENT GRID: Legal, Infrastructure + Sidebar */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Verification Section */}
            <div className="mb-12">
              <h3 className="text-xl font-black text-text-primary mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-verified" /> Legal Documents & Verification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Title Deed (Mother Deed)", status: "Verified & Available" },
                  { label: "Encumbrance Certificate (EC)", status: "Clear for 30 Years" },
                  { label: "Property Tax Receipts", status: "Paid up to 2025" },
                  { label: "Conversion Order (DC)", status: "Non-Agricultural Land" }
                ].map((doc, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-border-subtle flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-verified/10 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-verified" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-text-primary">{doc.label}</p>
                        <p className="text-[11px] font-bold text-verified/80 italic">{doc.status}</p>
                      </div>
                    </div>
                    <button className="text-[11px] font-black text-primary uppercase tracking-tighter hover:underline">View Preview</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Assistance */}
            <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10 mb-12 relative overflow-hidden">
               <div className="relative z-10">
                <h3 className="text-xl font-black text-text-primary mb-2">Home Loan Assistance</h3>
                <p className="text-sm text-text-secondary font-medium mb-6">Get pre-approved loans from India's leading banks at competitive interest rates.</p>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  {['SBI', 'HDFC BANK', 'ICICI BANK', 'AXIS BANK'].map(bank => (
                    <div key={bank} className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-text-muted shadow-sm border border-border-subtle">{bank}</div>
                  ))}
                </div>
                <Button 
                  onClick={() => setIsLoanModalOpen(true)}
                  variant="primary" 
                  className="rounded-2xl px-10 h-14 font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  Check Eligibility
                </Button>
               </div>
               <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
            </div>

            {/* Infrastructure */}
            <div className="mb-12">
              <h3 className="text-xl font-black text-text-primary mb-6">World-Class Infrastructure</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plot.infrastructure.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] || Info;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-border-subtle flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-black text-text-primary">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-text-primary">Location & Neighborhood</h3>
                <button 
                  onClick={openInGoogleMaps}
                  className="flex items-center gap-2 text-primary font-black text-sm hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> Open in Google Maps
                </button>
              </div>
              <div className="h-[400px] w-full bg-section rounded-[32px] border border-border-subtle relative overflow-hidden group shadow-inner">
                 {isLoaded ? (
                   <GoogleMap
                     mapContainerStyle={mapContainerStyle}
                     center={{ lat: plot.lat, lng: plot.lng }}
                     zoom={15}
                     options={{
                       disableDefaultUI: true,
                       styles: [
                        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }] },
                        { "featureType": "administrative.country", "elementType": "geometry", "stylers": [{ "visibility": "on" }] },
                        { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": "20" }] },
                        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": "21" }] },
                        { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": "17" }] },
                        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": "17" }] }
                      ]
                     }}
                   >
                     <Marker position={{ lat: plot.lat, lng: plot.lng }} />
                   </GoogleMap>
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-section animate-pulse">
                     <p className="text-xs font-black text-text-muted uppercase tracking-widest italic">Loading Map View...</p>
                   </div>
                 )}
                 <div className="absolute bottom-6 right-6">
                    <button 
                      onClick={openInGoogleMaps}
                      className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl border border-border-subtle text-[13px] font-black text-text-primary flex items-center gap-2 hover:bg-primary hover:text-white transition-all group"
                    >
                      <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" /> View in Google Maps
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Agent Card / Reveal Button */}
              {!isAgentRevealed ? (
                <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-xl shadow-primary/5 text-center relative z-20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="relative">
                    <div className="w-20 h-20 rounded-[28px] overflow-hidden bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary opacity-40" />
                    </div>
                    <h4 className="text-lg font-black text-text-primary mb-2">Interested in this Plot?</h4>
                    <p className="text-xs font-bold text-text-muted mb-8 italic">Reveal agent details and get a quick callback.</p>
                    <Button 
                      onClick={() => setIsAgentRevealed(true)}
                      variant="primary" 
                      className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 animate-bounce-subtle"
                    >
                      <Phone className="w-5 h-5" /> Contact Agent
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-xl shadow-primary/5 animate-in fade-in slide-in-from-right-4 duration-500 relative z-20">
                  {/* Back Arrow */}
                  <button 
                    onClick={() => setIsAgentRevealed(false)}
                    className="absolute top-6 left-6 w-10 h-10 rounded-full border border-border-subtle hover:border-primary hover:text-primary transition-all flex items-center justify-center text-text-muted bg-white shadow-sm group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex flex-col items-center gap-5 mb-8 pt-6">
                    <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-primary-light ring-4 ring-primary/10">
                      <img src={plot.agent.image} alt={plot.agent.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-black text-text-primary uppercase tracking-tight italic">{plot.agent.name}</h4>
                      <p className="text-sm font-bold text-text-muted mb-2 uppercase">{plot.agent.role}</p>
                      <span className="bg-verified/10 text-verified text-[10px] font-black px-3 py-1.5 rounded-lg border border-verified/20">RERA CERTIFIED</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <a href={`tel:${plot.agent.phone}`} className="w-full h-14 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all active:scale-95">
                      <Phone className="w-5 h-5" /> Call Agent ({plot.agent.phone})
                    </a>
                    <button className="w-full h-14 rounded-2xl border-2 border-[#25D366]/20 bg-[#25D366]/5 text-[#25D366] font-black flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all">
                      <MessageSquare className="w-5 h-5" /> WhatsApp Chat
                    </button>
                  </div>

                  <div className="bg-section/70 rounded-[32px] p-6 border border-border-subtle relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 blur-xl" />
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 text-center relative italic">Request Callback</p>
                    
                    {success === "agent" ? (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-3 text-green-600 font-bold text-xs italic">
                        <CheckCircle2 className="w-4 h-4" /> Inquiry sent successfully!
                      </div>
                    ) : (
                      <form className="space-y-3 relative" onSubmit={handleAgentInquiry}>
                        <input 
                          type="text" 
                          required
                          value={agentForm.name}
                          onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                          placeholder="Full Name" 
                          className="w-full h-12 bg-white rounded-xl border border-border-subtle px-4 text-sm font-bold placeholder:font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                        />
                        <div className="flex gap-2">
                          <input type="text" value="+91" readOnly className="w-14 h-12 bg-white rounded-xl border border-border-subtle px-2 text-sm font-black text-center" />
                          <input 
                            type="tel" 
                            required
                            value={agentForm.phone}
                            onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
                            placeholder="Phone Number" 
                            className="flex-1 h-12 bg-white rounded-xl border border-border-subtle px-4 text-sm font-bold placeholder:font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          />
                        </div>
                        <Button 
                          type="submit"
                          disabled={submitting}
                          variant="primary" 
                          className="w-full h-12 rounded-xl text-[11px] font-black shadow-lg shadow-primary/10 mt-2 uppercase tracking-widest"
                        >
                          {submitting ? "Sending..." : "Get Quick Details"}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* Why Invest Highlights */}
              <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-sm">
                <h4 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2 italic">
                  <TrendingUp className="w-5 h-5 text-primary" /> Why Invest Here?
                </h4>
                <div className="space-y-4">
                  {plot.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1">
                        <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-sm font-bold text-text-secondary leading-snug italic">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended Content */}
        <div className="mt-20 pt-20 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-text-primary uppercase tracking-tight italic">Recommended Plots</h2>
              <p className="text-text-secondary font-medium italic">Based on your interest in Bangalore</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-black text-sm hover:underline" onClick={() => router.push('/buy')}>
              View All Plots <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPlots.map(item => (
              <ListingCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
