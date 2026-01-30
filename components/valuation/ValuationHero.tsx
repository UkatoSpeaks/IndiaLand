"use client";

import { useState } from "react";
import { Search, Calculator, TrendingUp, ShieldCheck, RefreshCw, Star, ArrowRight, Check, MapPin, ChevronDown, Ruler, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ValuationData } from "@/app/valuation/page";

interface Props {
  onCalculate: (data: ValuationData) => void;
}

export function ValuationHero({ onCalculate }: Props) {
  const [formData, setFormData] = useState<ValuationData>({
    locality: "",
    area: "",
    facing: "North",
  });

  const localities = [
    "HSR Layout, Bangalore",
    "Sarjapur Road, Bangalore",
    "Sector 45, Gurgaon",
    "Whitefield, Bangalore",
    "Banjara Hills, Hyderabad",
  ];

  const facings = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/valuation-bg.png" alt="Aerial land" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-verified/10 rounded-full blur-[150px] animate-pulse delay-700" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black tracking-[0.2em] uppercase text-primary-light">
               <TrendingUp className="w-3 h-3" /> Real-time Market Intelligence
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              Know the Value of <br /> Your Plot <span className="text-primary italic relative">
                Instantly
                <svg className="absolute -bottom-2 left-0 w-full" width="100%" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C40 3 160 3 198 10" stroke="#16A34A" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium italic max-w-2xl mx-auto leading-relaxed">
              Empowering land owners with AI-driven valuations based on real government registry data.
            </p>
          </div>

          {/* Calculator Card with Floating Effect */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] p-6 md:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] max-w-5xl mx-auto mt-12 border border-white/50 animate-in fade-in zoom-in-95 duration-1000 delay-300 hover:translate-y-[-8px] transition-transform duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3 text-left">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-1">
                   <MapPin className="w-3 h-3" /> City/Locality
                </label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                  <select 
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full h-16 bg-section/40 rounded-2xl border-2 border-transparent pl-11 pr-4 text-sm font-black text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Locality</option>
                    {localities.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <ChevronDown className="w-4 h-4 text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-1">
                   <Ruler className="w-3 h-3" /> Plot Area (Sq. Ft)
                </label>
                <div className="relative group">
                  <input 
                    type="number"
                    placeholder="e.g. 1200"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full h-16 bg-section/40 rounded-2xl border-2 border-transparent px-6 text-sm font-black text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-text-muted">SQFT</span>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-1">
                   <Activity className="w-3 h-3" /> Facing
                </label>
                <div className="relative group">
                  <select 
                    value={formData.facing}
                    onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    className="w-full h-16 bg-section/40 rounded-2xl border-2 border-transparent px-6 text-sm font-black text-text-primary outline-none focus:border-primary/30 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {facings.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <ChevronDown className="w-4 h-4 text-text-muted" />
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={() => onCalculate(formData)}
                  disabled={!formData.locality || !formData.area}
                  className="w-full h-16 rounded-2xl font-black shadow-[0_20px_40px_-10px_rgba(22,163,74,0.3)] flex items-center justify-center gap-3 text-base group"
                >
                  <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Calculate Value
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
          
          {/* Historical Trends Chart - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-text-primary">Historical Price Appreciation</h2>
              <p className="text-sm text-text-secondary font-medium italic">Average land price trends (₹ per sq. ft) in major cities (2019-2024)</p>
            </div>

            <div className="bg-white p-12 rounded-[48px] border border-border-subtle shadow-2xl relative group overflow-hidden">
               {/* Chart Background Grid */}
               <div className="absolute inset-x-12 top-24 bottom-24 flex flex-col justify-between -z-0 opacity-30">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-border-subtle border-dashed border-b" />
                  ))}
               </div>

               <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-text-primary">Bangalore Market Growth</h3>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Average Rate (₹ / Sq.Ft) • 5 Year Trend</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/40" />
                       <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">Premium Plots</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-primary/20" />
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Market Avg</span>
                    </div>
                    <div className="px-4 py-2 bg-verified/10 text-verified text-[10px] font-black rounded-xl border border-verified/20">
                       📈 +142% TOTAL GROWTH
                    </div>
                  </div>
               </div>
              
               <div className="relative h-[350px] flex items-end justify-between px-8 md:px-12 z-10">
                {[
                  { year: "2019", price: "4,200", growth: "Base", height: "35%" },
                  { year: "2020", price: "5,150", growth: "+22%", height: "45%" },
                  { year: "2021", price: "6,800", growth: "+32%", height: "60%" },
                  { year: "2022", price: "8,950", growth: "+31%", height: "80%" },
                  { year: "2024", price: "12,500", growth: "+39%", height: "100%", current: true },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-6 h-full justify-end group/bar w-24">
                    <div className="relative w-full h-full flex items-end justify-center">
                      {/* Growth Indicator Bubble */}
                      {!item.current && (
                        <div className="absolute top-0 left-full -ml-4 -mt-2 opacity-0 group-hover/bar:opacity-100 transition-all z-20">
                           <div className="bg-verified text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
                              <TrendingUp className="w-2 h-2" /> {item.growth}
                           </div>
                        </div>
                      )}

                      {/* Main Bar */}
                      <div className="relative w-12 md:w-16 h-full group cursor-pointer flex items-end">
                        <div 
                          className={`w-full rounded-2xl transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                            item.current 
                            ? 'bg-gradient-to-t from-primary to-verified shadow-2xl shadow-primary/30' 
                            : 'bg-gradient-to-t from-primary/10 to-primary/20 hover:from-primary/30 hover:to-primary/40'
                          }`}
                          style={{ 
                            height: item.height,
                            transitionDelay: `${i * 120}ms`
                          }}
                        >
                           {/* Price Tooltip (Always visible for current, hover for others) */}
                           <div className={`absolute -top-14 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                             item.current ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover/bar:translate-y-0 group-hover/bar:opacity-100'
                           }`}>
                              <div className="bg-text-primary text-white text-[11px] px-3 py-2 rounded-xl font-black shadow-2xl whitespace-nowrap relative border border-white/10">
                                 ₹{item.price}
                                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-primary rotate-45" />
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-1">
                       <p className={`text-sm font-black tracking-tight ${item.current ? 'text-primary' : 'text-text-primary'}`}>{item.year}</p>
                       <p className="text-[9px] font-bold text-text-muted uppercase tracking-tighter">Dec-Jun</p>
                    </div>
                  </div>
                ))}
               </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center gap-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <p className="text-sm font-bold text-text-primary italic">
                Market Insight: <span className="text-text-secondary font-medium">Land values in North Bangalore have appreciated by <span className="text-primary">14.2%</span> over the last 12 months.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-8 bg-white rounded-[40px] border border-border-subtle shadow-xl flex items-center gap-6 group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">RERA Verified Data</h4>
                  <p className="text-xs font-medium text-text-secondary italic">Our estimates are based on registered sale deeds and verified RERA project filings.</p>
                </div>
              </div>
              <div className="p-8 bg-white rounded-[40px] border border-border-subtle shadow-xl flex items-center gap-6 group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-verified/10 flex items-center justify-center text-verified group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">Real-time Updates</h4>
                  <p className="text-xs font-medium text-text-secondary italic">Algorithms updated weekly with latest market registration data and demand indices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-12">
            {/* Premium Expert Card */}
            <div className="bg-primary rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
               <div className="relative z-10 space-y-6">
                 <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase">Premium Service</span>
                 <h2 className="text-3xl font-bold leading-tight">Professional Expert Valuation</h2>
                 <p className="text-sm font-medium text-white/80 italic leading-relaxed">Need a certified report for legal or bank purposes? Get a detailed physical valuation report from our RICS-certified surveyors.</p>
                 
                 <ul className="space-y-4">
                   {["Physical Site Verification", "Detailed Locality Assessment", "Bank-ready Legal Report"].map(item => (
                     <li key={item} className="flex items-center gap-3">
                       <Check className="w-4 h-4 text-primary bg-white rounded-full p-0.5" />
                       <span className="text-sm font-bold">{item}</span>
                     </li>
                   ))}
                 </ul>

                 <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                   <div>
                     <p className="text-[10px] font-bold text-white/60 line-through">₹4,999</p>
                     <p className="text-2xl font-bold">₹2,499</p>
                   </div>
                   <button className="px-8 py-3 bg-white text-primary rounded-xl font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">Book Now</button>
                 </div>
               </div>
            </div>

            {/* Top Localities */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-text-primary">Top Performing Localities</h3>
              <div className="space-y-4">
                {[
                  { name: "New Town, Kolkata", type: "IT Hub Expansion", growth: "+18% YOY" },
                  { name: "Hinjewadi, Pune", type: "Infrastructure Push", growth: "+15% YOY" },
                  { name: "Zirakpur, Chandigarh", type: "Residential Growth", growth: "+12% YOY" },
                ].map((loc, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm flex items-center justify-between group hover:border-primary/30 cursor-default transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-section flex items-center justify-center text-text-muted font-bold text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">0{i+1}</div>
                       <div>
                         <h4 className="text-sm font-black text-text-primary">{loc.name}</h4>
                         <p className="text-[10px] font-bold text-text-muted uppercase italic">{loc.type}</p>
                       </div>
                    </div>
                    <span className="text-xs font-black text-verified">{loc.growth}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-xl border-2 border-border-subtle text-sm font-bold text-text-secondary hover:text-primary hover:border-primary/30 transition-all flex items-center justify-center gap-2">
                View Full Report <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
