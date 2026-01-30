"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  BarChart3, 
  MapPin, 
  Share2, 
  Download, 
  ChevronDown, 
  ArrowUpRight, 
  Star, 
  Activity, 
  ChevronRight, 
  Users,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const LOCALITY_POOL = [
  { id: "whitefield", name: "Whitefield, Bangalore", city: "Bangalore", currentAvg: 8500, pastAvg: 7600, growth: "+12.4%", tag: "High Growth Zone", connectivity: 8.5, infra: "Stable Supply", projects: ["Metro Phase 2 Expansion", "Peripheral Ring Road"] },
  { id: "gurgaon", name: "Gurgaon Sector 56", city: "Gurgaon", currentAvg: 12200, pastAvg: 11200, growth: "+8.5%", tag: "Premium Residential", connectivity: 7.2, infra: "Moderate Issues", projects: ["Dwarka Expressway Ext.", "Global City Project"] },
  { id: "magarpatta", name: "Magarpatta, Pune", city: "Pune", currentAvg: 9800, pastAvg: 8900, growth: "+10.2%", tag: "Established IT Hub", connectivity: 9.0, infra: "High Reliability", projects: ["Cyber City Expansion", "Ring Road Connect 3"] },
  { id: "sarjapur", name: "Sarjapur Road, Bangalore", city: "Bangalore", currentAvg: 10416, pastAvg: 9200, growth: "+13.2%", tag: "IT Corridor", connectivity: 8.0, infra: "Stable Supply", projects: ["Upcoming Metro Line", "PRR Connectivity"] },
  { id: "thane", name: "Thane West, Mumbai", city: "Mumbai", currentAvg: 18500, pastAvg: 17200, growth: "+7.5%", tag: "Established Suburb", connectivity: 9.2, infra: "High Reliability", projects: ["Metro Line 4", "Thane-Borivali Tunnel"] },
  { id: "gachibowli", name: "Gachibowli, Hyderabad", city: "Hyderabad", currentAvg: 11000, pastAvg: 9800, growth: "+12.2%", tag: "Commercial Hub", connectivity: 8.8, infra: "High Reliability", projects: ["Airport Metro Express", "Strategic Road Plan"] },
];

const HISTORICAL_DATA = [
  { quarter: "Q3 2023 (Current)", rate: 9450, growth: "+4.2%", volume: "142 Plots", status: "High Activity" },
  { quarter: "Q2 2023", rate: 9070, growth: "+3.8%", volume: "128 Plots", status: "Stable" },
  { quarter: "Q1 2023", rate: 8740, growth: "+2.1%", volume: "110 Plots", status: "Stable" },
];

export default function MarketRatesPage() {
  const { user } = useAuth();
  const [selectedIDs, setSelectedIDs] = useState(["whitefield", "gurgaon", "magarpatta"]);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedLocalities = selectedIDs.map(id => LOCALITY_POOL.find(l => l.id === id) || LOCALITY_POOL[0]);

  const handleLocalityChange = (index: number, newID: string) => {
    const newSelected = [...selectedIDs];
    newSelected[index] = newID;
    setSelectedIDs(newSelected);
  };

  const handleExpertRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addDoc(collection(db, "expert_consultations"), {
        userId: user?.uid || "guest",
        userName: formData.get("name"),
        userPhone: formData.get("phone"),
        interestArea: selectedLocalities[0].name,
        timestamp: serverTimestamp(),
        status: "New"
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsExpertModalOpen(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting expert request:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      {/* Expert Advice Modal */}
      {isExpertModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[48px] overflow-hidden shadow-2xl relative animate-in zoom-in-95">
              <button 
                onClick={() => setIsExpertModalOpen(false)}
                className="absolute top-8 right-8 text-text-muted hover:text-primary transition-colors"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              <div className="p-10 space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-text-primary uppercase italic">Consult an Expert</h3>
                  <p className="text-sm font-bold text-text-muted">Get data-backed investment strategy.</p>
                </div>

                {success ? (
                  <div className="bg-green-50 p-8 rounded-[32px] text-center space-y-4 border border-green-100">
                     <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                     <p className="font-black text-green-700 uppercase italic">Request Sent!</p>
                     <p className="text-xs font-bold text-green-600">Our advisor will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleExpertRequest} className="space-y-4">
                    <input 
                      name="name"
                      required
                      defaultValue={user?.displayName || ""}
                      placeholder="Your Full Name" 
                      className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold outline-none focus:border-primary transition-all" 
                    />
                    <input 
                      name="phone"
                      required
                      defaultValue={user?.phoneNumber || ""}
                      placeholder="Phone Number" 
                      className="w-full h-14 bg-section rounded-2xl border border-border-subtle px-6 text-sm font-bold outline-none focus:border-primary transition-all" 
                    />
                    <Button 
                      type="submit"
                      disabled={submitting}
                      className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20"
                    >
                      {submitting ? "Processing..." : "Schedule Call"}
                    </Button>
                  </form>
                )}
              </div>
           </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Breadcrumb & Header */}
        <div className="mb-10 space-y-6">
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-text-muted">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Market Analysis</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Locality Comparison</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-text-primary uppercase italic tracking-tight">
                Locality Price <span className="text-primary italic">Comparison</span>
              </h1>
              <p className="text-text-secondary font-medium max-w-2xl italic leading-relaxed">
                Expert-grade side-by-side analysis of land rates and infrastructure potential across India's emerging hubs.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-border-subtle px-5 py-3 rounded-2xl text-[13px] font-black text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm">
                <Share2 className="w-4 h-4" /> Share Report
              </button>
              <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-2xl text-[13px] font-black hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Locality Selector Section */}
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-border-subtle shadow-xl shadow-primary/5 mb-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center gap-4 text-text-primary px-4">
              <Activity className="w-6 h-6 text-primary" />
              <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">Select Localities</span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <select 
                    value={selectedIDs[index]}
                    onChange={(e) => handleLocalityChange(index, e.target.value)}
                    className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle pl-14 pr-12 text-sm font-bold text-text-primary outline-none focus:border-primary appearance-none cursor-pointer transition-all"
                  >
                    {LOCALITY_POOL.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts & Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Visualizer */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[48px] border border-border-subtle shadow-xl space-y-10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-text-primary uppercase italic">Price Value Visualization <span className="text-text-muted text-sm font-bold lowercase auto-case not-italic tracking-normal">(₹ / Sq Ft)</span></h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[11px] font-black text-text-muted uppercase italic">Current Avg</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/20" />
                  <span className="text-[11px] font-black text-text-muted uppercase italic">2023 Avg</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-around h-[300px] pt-10 border-b border-border-subtle pb-8">
              {selectedLocalities.map((stat, i) => {
                const currentHeight = (stat.currentAvg / 20000) * 100;
                const pastHeight = (stat.pastAvg / 20000) * 100;
                return (
                  <div key={i} className="flex flex-col items-center gap-6 w-full max-w-[120px]">
                    <div className="flex items-end gap-2 w-full h-[220px] relative group/bar">
                      <div 
                         className="flex-1 bg-primary/20 rounded-t-xl transition-all duration-700 ease-out hover:bg-primary/30"
                         style={{ height: `${pastHeight}%` }}
                      />
                      <div 
                         className="flex-1 bg-primary rounded-t-xl transition-all duration-700 ease-out hover:scale-x-110 shadow-lg shadow-primary/20"
                         style={{ height: `${currentHeight}%` }}
                      />
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border border-border-subtle px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-bar-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        <span className="text-[10px] font-black text-primary">₹{stat.currentAvg.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-wider mb-1 truncate w-24">{stat.name.split(',')[0]}</p>
                      <p className="text-sm font-black text-primary tracking-tighter italic">₹{stat.currentAvg.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Info / Insight */}
          <div className="bg-primary rounded-[48px] p-8 md:p-10 text-white shadow-2xl shadow-primary/20 flex flex-col justify-between relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000" />
             <div className="relative space-y-6">
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">Pro Insights</span>
                <h4 className="text-2xl font-black leading-tight uppercase italic">{selectedLocalities[0].city} Market <br/> is Surging</h4>
                <p className="text-sm font-medium text-white/80 leading-relaxed italic">
                  Infrastructure projects and upcoming Metro lines are driving 2x growth in {selectedLocalities[0].city}. Our AI predicts an additional 15% appreciation by Q4 2024.
                </p>
             </div>
             <button className="relative w-full h-14 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all mt-10">
                Read Full Analysis
             </button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-[48px] border border-border-subtle shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 border-b border-border-subtle bg-section/30">
             <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-black text-text-primary uppercase italic">Feature Analysis Matrix</h3>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="p-8 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] w-[20%]">Criteria</th>
                  {selectedLocalities.map((stat, i) => (
                    <th key={i} className="p-8 w-[26.6%]">
                      <p className="text-base font-black text-text-primary px-4 py-1.5 rounded-xl transition-all border border-transparent">
                        {stat.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowUpRight className="w-4 h-4 text-verified" />
                        <span className="text-[10px] font-black text-verified uppercase tracking-widest">{stat.tag}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                <tr>
                   <td className="p-8 text-sm font-black text-text-secondary uppercase italic">Avg. Price / Sq Ft</td>
                   {selectedLocalities.map((stat, i) => (
                     <td key={i} className="p-8">
                       <span className="text-2xl font-black text-text-primary italic">₹{stat.currentAvg.toLocaleString()}</span>
                     </td>
                   ))}
                </tr>
                <tr>
                   <td className="p-8 text-sm font-black text-text-secondary uppercase italic">Annual Growth Rate</td>
                   {selectedLocalities.map((stat, i) => (
                     <td key={i} className="p-8">
                       <span className="bg-verified/10 text-verified px-3 py-1.5 rounded-lg text-sm font-black italic">{stat.growth} <span className="text-[10px] uppercase opacity-60">YoY</span></span>
                     </td>
                   ))}
                </tr>
                <tr>
                   <td className="p-8 text-sm font-black text-text-secondary uppercase italic">
                      <div>Connectivity Score</div>
                      <div className="text-[10px] font-bold text-text-muted mt-1 lowercase auto-case not-italic tracking-normal">Metro & Highway Access</div>
                   </td>
                   {selectedLocalities.map((stat, i) => (
                     <td key={i} className="p-8">
                       <div className="flex items-center gap-1.5 mb-2">
                         {[1,2,3,4,5].map(s => (
                           <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(stat.connectivity/2) ? 'text-orange-400 fill-orange-400' : 'text-border-subtle fill-border-subtle'}`} />
                         ))}
                       </div>
                       <span className="text-lg font-black text-text-primary">{stat.connectivity}/10</span>
                     </td>
                   ))}
                </tr>
                <tr>
                   <td className="p-8 text-sm font-black text-text-secondary uppercase italic">Infrastructure Status</td>
                   {selectedLocalities.map((stat, i) => (
                     <td key={i} className="p-8">
                       <div className="space-y-2">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          stat.infra === "Stable Supply" || stat.infra === "High Reliability" ? 'bg-verified/10 text-verified' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {stat.infra}
                        </span>
                       </div>
                     </td>
                   ))}
                </tr>
                <tr>
                   <td className="p-8 text-sm font-black text-text-secondary uppercase italic whitespace-nowrap">Upcoming Projects</td>
                   {selectedLocalities.map((stat, i) => (
                     <td key={i} className="p-8">
                       <ul className="space-y-3">
                         {stat.projects.map((p, j) => (
                           <li key={j} className="flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                             <span className="text-[11px] font-bold text-text-primary italic">{p}</span>
                           </li>
                         ))}
                       </ul>
                     </td>
                   ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Advice Banner */}
        <div className="bg-primary/5 rounded-[56px] p-8 md:p-14 border border-primary/10 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-primary/20 ring-4 ring-white shadow-2xl">
                 <img src="https://i.pravatar.cc/150?u=expert" alt="expert" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left space-y-3">
                 <h3 className="text-3xl font-black text-text-primary uppercase italic tracking-tight">Need personalized investment advice?</h3>
                 <p className="text-lg text-text-secondary font-medium italic">Our senior consultants can help you identify the best plot based on your <br className="hidden lg:block"/> budget and growth goals.</p>
              </div>
           </div>
           <button 
            onClick={() => setIsExpertModalOpen(true)}
            className="shrink-0 h-20 px-12 bg-primary text-white rounded-[32px] font-black text-base uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-4 relative z-10"
           >
              <Users className="w-6 h-6" /> Get Expert Advice
           </button>
        </div>

        {/* Historical Breakdown */}
        <div className="space-y-8">
           <h3 className="text-2xl font-black text-text-primary uppercase italic">Historical Data Breakdown (General Market)</h3>
           <div className="bg-white rounded-[40px] border border-border-subtle shadow-xl overflow-hidden">
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-section/30 border-b border-border-subtle">
                    <th className="p-6 text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Quarter</th>
                    <th className="p-6 text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Avg Rate (₹)</th>
                    <th className="p-6 text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Growth</th>
                    <th className="p-6 text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Transaction Volume</th>
                    <th className="p-6 text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/50">
                  {HISTORICAL_DATA.map((row, i) => (
                    <tr key={i} className="hover:bg-section/20 transition-colors">
                      <td className="p-6 text-sm font-black text-text-primary italic">{row.quarter}</td>
                      <td className="p-6 text-base font-black text-text-primary">{row.rate.toLocaleString()}</td>
                      <td className="p-6">
                        <span className="text-verified font-black text-sm italic">{row.growth}</span>
                      </td>
                      <td className="p-6 text-sm font-bold text-text-secondary italic">{row.volume}</td>
                      <td className="p-6">
                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                           row.status === "High Activity" ? 'bg-verified/10 text-verified' : 'bg-info/10 text-info'
                         }`}>
                           {row.status}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
           <div className="text-center pt-4">
              <button className="text-[11px] font-black text-primary uppercase tracking-widest hover:underline underline-offset-8">
                 Download Historical Excel Sheet
              </button>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
