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

export default function PlotDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [plot, setPlot] = useState<Plot | null>(null);
  const [isAgentRevealed, setIsAgentRevealed] = useState(false);

  useEffect(() => {
    const foundPlot = MOCK_LISTINGS.find(p => p.id === id);
    if (foundPlot) {
      setPlot(foundPlot);
    }
  }, [id]);

  const recommendedPlots = useMemo(() => {
    return MOCK_LISTINGS.filter(p => p.id !== id).slice(0, 3);
  }, [id]);

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
                    {plot.subLocation}, Bangalore | Near Outer Ring Road
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
                <span className="text-[11px] font-bold text-text-muted">~ 2.75 Guntas</span>
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
                <Button variant="primary" className="rounded-2xl px-10 h-14 font-black shadow-xl shadow-primary/20">Check Eligibility</Button>
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
                <button className="flex items-center gap-2 text-primary font-black text-sm hover:underline">
                  <ExternalLink className="w-4 h-4" /> Open in Google Maps
                </button>
              </div>
              <div className="h-[400px] w-full bg-white rounded-[32px] border border-border-subtle relative overflow-hidden group">
                 <img src="/map-placeholder.png" alt="Map" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-primary text-white p-3 rounded-2xl shadow-2xl">
                           <MapPin className="w-6 h-6" />
                         </div>
                      </div>
                    </div>
                 </div>
                 <div className="absolute bottom-6 right-6">
                    <button className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl border border-border-subtle text-[13px] font-black text-text-primary flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                      <Navigation className="w-4 h-4" /> View in Google Maps
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
                <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-xl shadow-primary/5 text-center relative z-20">
                  <div className="w-20 h-20 rounded-[28px] overflow-hidden bg-primary-light mx-auto mb-6">
                    <img src={plot.agent.image} alt="Agent Placeholder" className="w-full h-full object-cover grayscale opacity-50" />
                  </div>
                  <h4 className="text-lg font-black text-text-primary mb-2">Interested in this Plot?</h4>
                  <p className="text-xs font-bold text-text-muted mb-8">Reveal agent details and get a quick callback.</p>
                  <Button 
                    onClick={() => setIsAgentRevealed(true)}
                    variant="primary" 
                    className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 animate-bounce-subtle"
                  >
                    <Phone className="w-5 h-5" /> Contact Agent
                  </Button>
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
                      <h4 className="text-xl font-black text-text-primary">{plot.agent.name}</h4>
                      <p className="text-sm font-bold text-text-muted mb-2">{plot.agent.role}</p>
                      <span className="bg-verified/10 text-verified text-[10px] font-black px-3 py-1.5 rounded-lg border border-verified/20">RERA CERTIFIED</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <button className="w-full h-14 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all active:scale-95">
                      <Phone className="w-5 h-5" /> Call Agent ({plot.agent.phone})
                    </button>
                    <button className="w-full h-14 rounded-2xl border-2 border-[#25D366]/20 bg-[#25D366]/5 text-[#25D366] font-black flex items-center justify-center gap-3 hover:bg-[#25D366] hover:text-white transition-all">
                      <MessageSquare className="w-5 h-5" /> WhatsApp Chat
                    </button>
                  </div>

                  <div className="bg-section/50 rounded-3xl p-6 border border-border-subtle">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 text-center">Request Callback</p>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="Full Name" className="w-full h-12 bg-white rounded-xl border border-border-subtle px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      <div className="flex gap-2">
                         <input type="text" value="+91" readOnly className="w-14 h-12 bg-white rounded-xl border border-border-subtle px-2 text-sm font-black text-center" />
                         <input type="tel" placeholder="Phone Number" className="flex-1 h-12 bg-white rounded-xl border border-border-subtle px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                      <Button variant="primary" className="w-full h-12 rounded-xl text-xs font-black shadow-lg shadow-primary/10 mt-2">Get Quick Details</Button>
                    </form>
                  </div>
                </div>
              )}

              {/* Why Invest Highlights */}
              <div className="bg-section/50 rounded-[40px] p-8 border border-border-subtle">
                <h4 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2 italic">
                  <TrendingUp className="w-5 h-5 text-primary" /> Why Invest Here?
                </h4>
                <div className="space-y-4">
                  {plot.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm font-bold text-text-secondary leading-snug">{highlight}</p>
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
              <h2 className="text-3xl font-black text-text-primary">Recommended Plots</h2>
              <p className="text-text-secondary font-medium italic">Based on your interest in Bangalore South</p>
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
