"use client";

import { Edit3, Download, TrendingUp, ShieldCheck, Map, ArrowRight, Table, BadgeCheck, Share2, Info, ChevronRight, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ValuationData } from "@/app/valuation/page";

interface Props {
  data: ValuationData;
  onEdit: () => void;
}

export function ValuationAnalysis({ data, onEdit }: Props) {
  const valuationRange = "₹1.4 Cr - ₹1.65 Cr";
  
  const factors = [
    { title: "High Connectivity", detail: "800m from NH-44 Expressway", impact: "+12% Impact", color: "text-primary bg-primary/10" },
    { title: "RERA Status", detail: "Fully Registered Project", impact: "+8% Impact", color: "text-blue-500 bg-blue-500/10" },
    { title: "Zone Type", detail: "Residential Mixed Use", impact: "Standard", color: "text-orange-500 bg-orange-500/10" },
    { title: "Corner Plot", detail: "South-East Facing Corner", impact: "+5% Premium", color: "text-purple-500 bg-purple-500/10" },
  ];

  const recentSales = [
    { size: "1,200 Sq.Ft.", price: "₹1.32 Cr", rate: "₹11,000", date: "Oct 12, 2023", verified: true },
    { size: "1,500 Sq.Ft.", price: "₹1.75 Cr", rate: "₹11,666", date: "Sep 28, 2023", verified: true },
    { size: "1,000 Sq.Ft.", price: "₹1.15 Cr", rate: "₹11,500", date: "Aug 15, 2023", verified: false },
  ];

  return (
    <div className="pb-32 bg-[#F8FAFC]">
      {/* Header Info */}
      <section className="bg-white border-b border-border-subtle pt-16 pb-12 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20 tracking-widest uppercase">Analysis Complete</div>
                 <div className="w-1 h-1 rounded-full bg-border-subtle" />
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Report #VAL-00429</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-[0.9]">
                Valuation <span className="text-primary">Results</span>
              </h1>
              <p className="text-xl text-text-secondary font-medium italic max-w-2xl leading-relaxed">
                 Expert estimation for your <span className="text-text-primary font-bold">Residential Plot</span> in <span className="text-text-primary font-bold">{data.locality || "Sector 45, Gurgaon"}</span>.
              </p>
            </div>
            <Button onClick={onEdit} variant="outline" className="h-14 rounded-2xl px-8 font-black border-2 flex items-center gap-3 hover:bg-section transition-all shadow-xl shadow-black/5">
              <Edit3 className="w-5 h-5 text-primary" /> Recalculate
            </Button>
          </div>

          {/* Premium Valuation Display */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-verified rounded-[54px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-[#020617] rounded-[48px] p-8 md:p-16 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden border border-white/5">
               {/* Animated background circles */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full -mr-48 -mt-48 animate-pulse" />
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-verified/5 rounded-full -ml-24 -mb-24 animate-pulse delay-700" />
               
               <div className="relative z-10 flex-1 text-center lg:text-left space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                       <span className="w-8 h-[1px] bg-primary" />
                       <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-light">Market Value Estimation</p>
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">{valuationRange}</h2>
                       <div className="flex items-center justify-center lg:justify-start gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 group/conf">
                             <div className="w-2 h-2 rounded-full bg-verified animate-ping" />
                             <p className="text-xs font-black tracking-widest text-white/80">CONFIDENCE: <span className="text-verified">HIGH (92%)</span></p>
                          </div>
                          <p className="text-xs font-bold text-white/40 italic">Based on {recentSales.length * 42} data points</p>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 border-t border-white/10">
                     {[
                       { label: "Price per SQFT", val: "₹12,450" },
                       { label: "Local Demand", val: "High" },
                       { label: "Appreciation", val: "+14%" },
                       { label: "RERA Status", val: "Verified" },
                     ].map(stat => (
                       <div key={stat.label}>
                          <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-lg font-bold text-white tracking-tight">{stat.val}</p>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="relative z-10 flex flex-col gap-4 w-full lg:w-80">
                  <Button className="h-16 px-10 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 transition-all">
                     <Table className="w-6 h-6" /> List Property
                  </Button>
                  <button className="h-16 px-10 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 flex items-center justify-center gap-3 transition-all group">
                     <Download className="w-6 h-6 text-primary-light group-hover:translate-y-1 transition-transform" /> PDF Report
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insight Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           
           {/* Left: Deep Analysis */}
           <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h3 className="text-3xl font-black text-text-primary tracking-tight">Market Momentum</h3>
                    <p className="text-sm font-medium text-text-secondary italic">Quantifying factors that drive your property's value.</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary transition-colors cursor-pointer">
                       <Share2 className="w-5 h-5" />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {factors.map((factor, i) => (
                   <div key={i} className="bg-white p-8 rounded-[40px] border border-border-subtle shadow-xl hover:border-primary/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative z-10 space-y-6">
                         <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${factor.color}`}>
                               {i === 0 ? <TrendingUp className="w-6 h-6" /> : i === 1 ? <ShieldCheck className="w-6 h-6" /> : i === 2 ? <Map className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                            </div>
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full bg-white shadow-sm border border-border-subtle uppercase tracking-widest ${factor.impact.includes('+') ? 'text-verified' : 'text-text-muted'}`}>
                               {factor.impact}
                            </span>
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-xl font-bold text-text-primary italic tracking-tight">{factor.title}</h4>
                            <p className="text-xs font-medium text-text-secondary leading-relaxed">{factor.detail}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Transactions History */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <Table className="w-6 h-6 text-primary" />
                    <h4 className="text-xl font-bold text-text-primary">Recent Verified Registrations</h4>
                 </div>
                 <div className="bg-white rounded-[40px] border border-border-subtle shadow-xl overflow-hidden">
                    <table className="w-full">
                       <thead>
                          <tr className="bg-section/50 border-b border-border-subtle">
                             <th className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-8 py-5 text-left italic">Plot Dimension</th>
                             <th className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-8 py-5 text-left italic">Sale Price</th>
                             <th className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-8 py-5 text-left italic">Date</th>
                             <th className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-8 py-5 text-right italic">Registry</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-border-subtle/50">
                          {recentSales.map((sale, i) => (
                            <tr key={i} className="hover:bg-section/30 transition-colors group">
                               <td className="px-8 py-6">
                                  <p className="text-sm font-bold text-text-primary">{sale.size}</p>
                                  <p className="text-[10px] font-medium text-text-muted">₹{sale.rate}/sqft</p>
                               </td>
                               <td className="px-8 py-6">
                                  <p className="text-sm font-black text-text-primary">{sale.price}</p>
                               </td>
                               <td className="px-8 py-6">
                                  <p className="text-sm font-medium text-text-secondary">{sale.date}</p>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  {sale.verified ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-verified/10 text-verified rounded-lg border border-verified/20">
                                       <BadgeCheck className="w-4 h-4" />
                                       <span className="text-[9px] font-black uppercase tracking-widest leading-none">Verified</span>
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-bold text-text-muted italic">In Progress</span>
                                  )}
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Right: Market Sentiment Card */}
           <div className="space-y-12">
              <div className="bg-[#020617] rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
                 
                 <div className="relative z-10 space-y-10">
                    <div className="space-y-4 text-center">
                       <div className="inline-block w-16 h-16 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-primary mb-2">
                          <Activity className="w-8 h-8" />
                       </div>
                       <h3 className="text-2xl font-black italic tracking-tighter uppercase">Market Sentiment</h3>
                       <p className="text-xs font-black text-primary-light uppercase tracking-[0.3em]">Bullish</p>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/50">
                             <span>Demand Index</span>
                             <span className="text-primary italic">88% Volume</span>
                          </div>
                          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                             <div className="h-full bg-primary rounded-full w-[88%] shadow-[0_0_20px_rgba(22,163,74,0.5)] animate-pulse" />
                          </div>
                       </div>

                       <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center space-y-2 group-hover:bg-white/10 transition-colors">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Inventory Turnaround</p>
                          <p className="text-2xl font-black italic">14 Days</p>
                          <p className="text-[10px] font-bold text-verified uppercase tracking-widest">4.2x Faster than Avg</p>
                       </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-4">
                       <p className="text-xs font-medium text-white/60 italic leading-relaxed text-center">
                          "Based on last 30 days of portal activity and registry data for {data.locality || "Sector 45"}."
                       </p>
                       <button className="w-full h-14 bg-white text-black rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                          Track Micro-market <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>

              {/* Legal Notice */}
              <div className="p-8 bg-verified/5 rounded-[40px] border border-verified/10 space-y-4">
                 <div className="flex items-center gap-3 text-verified">
                    <ShieldCheck className="w-6 h-6" />
                    <h4 className="text-base font-black uppercase tracking-widest">Algorithm Integrity</h4>
                 </div>
                 <p className="text-[11px] font-medium text-text-secondary leading-relaxed italic">
                    Our AI model utilizes Gradient Boosting Machines (GBM) trained on 50,000+ local registry sale deeds. We account for 142 micro-variables including road width, future metro proximity, and soil quality indices.
                 </p>
              </div>
           </div>

        </div>
      </section>

      {/* Sticky Bottom bar for conversion */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-[#020617]/90 backdrop-blur-2xl border border-white/10 h-24 rounded-full z-[100] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 animate-in slide-in-from-bottom-12 duration-1000">
         <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col">
               <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Estimated Value</span>
               <span className="text-2xl font-black text-white italic">{valuationRange}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-verified uppercase tracking-[0.3em]">ROI Potential</span>
               <span className="text-lg font-bold text-white">+14.2% YOY</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="h-12 px-8 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">List Plot</button>
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
               <Share2 className="w-5 h-5" />
            </button>
         </div>
      </div>
    </div>
  );
}
