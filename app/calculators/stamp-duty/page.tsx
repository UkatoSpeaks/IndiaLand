"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ChevronRight, 
  Info, 
  FileText, 
  Download, 
  Gavel, 
  Lightbulb, 
  Headphones,
  MapPin,
  Edit2,
  Check,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function StampDutyBreakdown() {
  const [view, setView] = useState<"form" | "result">("form");
  const [agreementValue, setAgreementValue] = useState(15000000);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [gender, setGender] = useState<"Male" | "Female" | "Joint">("Male");

  // Consultation State
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationStep, setConsultationStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic rates (Simplified logic)
  const stampDutyRate = gender === "Female" && selectedState === "Maharashtra" ? 0.04 : 0.05;
  const metroCessRate = selectedState === "Maharashtra" ? 0.01 : 0.005;
  const registrationFee = agreementValue > 3000000 ? 30000 : agreementValue * 0.01;

  const stampDutyAmount = agreementValue * stampDutyRate;
  const metroCessAmount = agreementValue * metroCessRate;
  const totalStampDuty = stampDutyAmount + metroCessAmount;
  const totalPayable = agreementValue + totalStampDuty + registrationFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val).replace("INR", "₹");
  };

  const formatShortCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return formatCurrency(val);
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: `Stamp Duty Consultation - ${selectedState}`,
      metadata: { agreementValue, gender }
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setConsultationStep("success");
      }
    } catch (error) {
      console.error("Consultation submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (view === "form") {
    return (
      <div className="min-h-screen bg-[#F4F4F5]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-top-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
              Financial Tools
            </div>
            <h1 className="text-5xl font-black text-text-primary tracking-tighter italic uppercase">Stamp Duty Calculator</h1>
            <p className="text-lg text-text-secondary font-medium italic">Accurate estimates for property registration costs across India.</p>
          </div>

          <div className="bg-white rounded-[40px] p-10 md:p-16 border border-border-subtle shadow-2xl space-y-12 transition-all">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                   <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-2">Property State</label>
                   <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full h-16 bg-section rounded-[24px] border border-border-subtle px-8 text-sm font-black text-text-primary outline-none focus:border-primary transition-all cursor-pointer"
                   >
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Delhi</option>
                      <option>Uttar Pradesh</option>
                   </select>
                </div>
                <div className="space-y-3">
                   <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-2">Buyer Gender</label>
                   <div className="flex bg-section rounded-[24px] p-1.5 border border-border-subtle">
                      {["Male", "Female", "Joint"].map(g => (
                        <button
                          key={g}
                          onClick={() => setGender(g as any)}
                          className={`flex-1 h-12 rounded-[18px] text-[11px] font-black uppercase tracking-wider transition-all ${gender === g ? "bg-white text-primary shadow-sm border border-border-subtle" : "text-text-muted hover:text-text-primary"}`}
                        >
                          {g}
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">Agreement Value</label>
                   <span className="text-2xl font-black text-primary italic tracking-tight">{formatCurrency(agreementValue)}</span>
                </div>
                <input 
                  type="range"
                  min="500000"
                  max="100000000"
                  step="100000"
                  value={agreementValue}
                  onChange={(e) => setAgreementValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-section rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">
                   <span>₹5 Lakh</span>
                   <span>₹10 Crore</span>
                </div>
             </div>

             <Button 
              onClick={() => setView("result")}
              className="w-full h-20 rounded-[30px] font-black text-lg uppercase tracking-[0.2em] bg-primary text-white shadow-3xl shadow-primary/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
             >
                Calculate Breakdown
             </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: <Gavel />, title: "Legally Compliant", desc: "Rates updated for FY 2024-25" },
               { icon: <FileText />, title: "Instant Summary", desc: "Get a detailed PDF breakdown" },
               { icon: <Headphones />, title: "Expert Support", desc: "Consult our legal panellists" }
             ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 space-y-3 opacity-60">
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm hover:translate-y-[-2px] transition-transform">
                      {feature.icon}
                   </div>
                   <h4 className="text-[11px] font-black text-text-primary uppercase tracking-widest">{feature.title}</h4>
                   <p className="text-[10px] font-medium text-text-secondary italic">{feature.desc}</p>
                </div>
             ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-[#003B73]/60 backdrop-blur-md" onClick={() => setIsConsultationOpen(false)} />
           <div className="relative bg-white w-full max-w-lg rounded-[48px] p-10 shadow-3xl animate-in zoom-in-95 duration-300 overflow-hidden">
              <button 
                onClick={() => setIsConsultationOpen(false)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-section flex items-center justify-center text-text-muted hover:text-primary transition-colors hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>

              {consultationStep === "form" ? (
                <form onSubmit={handleConsultationSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-text-primary italic tracking-tight uppercase">Legal Assistance</h2>
                    <p className="text-[10px] font-bold text-text-muted italic uppercase tracking-wider">Get a fast-track consultation for your registration at {selectedState}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-2">Full Name</label>
                       <input 
                        name="name" type="text" required placeholder="Full Name" 
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle px-8 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-2">Phone Number</label>
                       <input 
                        name="phone" type="tel" required placeholder="+91 XXXX XXXX" 
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle px-8 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner"
                       />
                    </div>
                  </div>

                  <Button 
                    type="submit" disabled={isSubmitting}
                    className="w-full h-20 rounded-[30px] font-black text-lg uppercase tracking-widest bg-primary text-white shadow-3xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Callback"}
                  </Button>
                </form>
              ) : (
                <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-50">
                  <div className="w-20 h-20 bg-verified/10 text-verified rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tighter">Request Confirmed!</h3>
                    <p className="text-sm font-medium text-text-muted italic leading-relaxed">Our registration specialist will call you shortly.</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsConsultationOpen(false)} className="px-10 rounded-2xl h-12 font-black uppercase tracking-widest text-[10px]">Close</Button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Main Breakdown Page */}
      <main className="max-w-7xl mx-auto px-6 py-10 print:p-0">
        {/* Breadcrumbs - Hidden for print */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-text-muted uppercase tracking-widest mb-8 print:hidden">
          <span>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span>Calculators</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">Stamp Duty Breakdown</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="print:text-center print:w-full">
            <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-2 uppercase italic print:text-2xl">Stamp Duty Cost Breakdown</h1>
            <p className="text-sm font-medium text-text-secondary">
              Calculated for <span className="font-bold text-text-primary">{selectedState}</span> | Value: <span className="font-bold text-text-primary">{formatCurrency(agreementValue)}</span>
            </p>
          </div>
          <Button 
            onClick={() => setView("form")}
            variant="outline" 
            className="rounded-2xl border-border-subtle hover:border-primary text-text-primary font-bold flex items-center gap-2 px-6 h-12 shadow-sm bg-white print:hidden"
          >
            <Edit2 className="w-4 h-4" /> Edit Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 print:col-span-3">
            
            {/* Visual Analysis Card */}
            <div className="bg-white rounded-[40px] p-10 border border-border-subtle shadow-sm flex flex-col md:flex-row items-center gap-12 print:shadow-none print:border-none">
               {/* Donut Chart - Visible in print */}
               <div className="relative w-56 h-56 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="112" cy="112" r="90" fill="transparent" stroke="#E5E7EB" strokeWidth="20" />
                    <circle
                      cx="112" cy="112" r="90" fill="transparent" stroke="#2563EB" strokeWidth="20"
                      strokeDasharray={`${(agreementValue / totalPayable) * 565} 565`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="112" cy="112" r="90" fill="transparent" stroke="#60A5FA" strokeWidth="20"
                      strokeDasharray={`${(totalStampDuty / totalPayable) * 565} 565`}
                      strokeDashoffset={`-${(agreementValue / totalPayable) * 565}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Total Payable</span>
                    <span className="text-2xl font-black text-text-primary tracking-tight">{formatShortCurrency(totalPayable)}</span>
                  </div>
               </div>

               <div className="flex-1 space-y-6 w-full">
                  <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-6 print:mb-2">Cost Components</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Agreement Value", color: "bg-primary", val: formatCurrency(agreementValue) },
                      { label: `Stamp Duty (${(stampDutyRate*100 + metroCessRate*100).toFixed(1)}%)`, color: "bg-[#60A5FA]", val: formatCurrency(totalStampDuty) },
                      { label: "Registration Fees", color: "bg-[#D1D5DB]", val: formatCurrency(registrationFee) }
                    ].map((comp, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${comp.color}`} />
                          <span className="text-sm font-bold text-text-secondary">{comp.label}</span>
                        </div>
                        <span className="text-sm font-black text-text-primary">{comp.val}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-[40px] border border-border-subtle shadow-sm overflow-hidden print:border-t-2 print:rounded-none">
               <div className="p-10 border-b border-gray-50 print:p-4">
                  <h3 className="text-lg font-black text-text-primary uppercase tracking-tight italic">Detailed Calculation Table</h3>
               </div>
               <div className="p-10 space-y-6 print:p-4 print:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">Agreement Value <Info className="w-3.5 h-3.5 text-text-muted print:hidden" /></div>
                    <span className="text-base font-bold text-text-primary tracking-tight">{formatCurrency(agreementValue)}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-text-secondary text-sm">
                    <span>Stamp Duty ({(stampDutyRate*100).toFixed(1)}% Base)</span>
                    <span className="text-text-primary">{formatCurrency(stampDutyAmount)}</span>
                  </div>
                  {metroCessAmount > 0 && (
                    <div className="flex items-center justify-between text-sm font-bold text-text-secondary">
                      <div className="flex items-center gap-2">Local Body Tax / Cess ({(metroCessRate*100).toFixed(1)}%) <Info className="w-3.5 h-3.5 text-text-muted print:hidden" /></div>
                      <span className="text-text-primary">{formatCurrency(metroCessAmount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm font-bold text-text-secondary">
                    <span>Registration Charges</span>
                    <span className="text-text-primary">{formatCurrency(registrationFee)}</span>
                  </div>
                  <hr className="border-border-subtle" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-black text-primary uppercase italic tracking-tight">Total Cost to Buyer</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(totalPayable)}</span>
                  </div>
               </div>
            </div>
            
            {/* Disclaimer for print */}
            <p className="hidden print:block text-[8px] italic text-text-muted text-center pt-8">
              Document generated via IndiaLand Stamp Duty Calculator. All rates are subject to change as per government notification.
            </p>
          </div>

          {/* Sidebar - Hidden for print */}
          <div className="space-y-8 print:hidden">
            <div className="bg-[#EEF2FF] rounded-[40px] p-8 border border-primary/10 shadow-sm space-y-8">
               <div className="flex items-center gap-3 text-primary font-black uppercase tracking-tight">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm"><Lightbulb className="w-5 h-5" /></div>
                  State-Specific Insights
               </div>
               <div className="space-y-4">
                  {[
                    { title: `${selectedState} Surcharges`, desc: `Property transactions in key urban areas attract additional cess to fund infrastructure development.` },
                    { title: "Women Property Ownership", desc: "Special concessions are often available for female owners to promote financial inclusion in real estate." },
                    { title: "Direct Registration", desc: "Digital submission is supported for all major urban residential projects, expediting the cycle by 15 days." }
                  ].map((insight, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-primary/5 shadow-sm space-y-2 hover:border-primary/20 transition-all">
                      <h4 className="text-[13px] font-black text-primary uppercase tracking-wide">{insight.title}</h4>
                      <p className="text-[11px] font-medium text-text-secondary leading-relaxed italic">{insight.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <Button 
                onClick={() => { setConsultationStep("form"); setIsConsultationOpen(true); }}
                className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 bg-primary text-white"
               >
                  <Gavel className="w-5 h-5" /> Get Legal Help for Registration
               </Button>
               <Button 
                onClick={handleDownloadPDF}
                variant="outline" className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest border-2 flex items-center justify-center gap-3 bg-white text-text-primary"
               >
                  <Download className="w-5 h-5" /> Download Cost Summary (PDF)
               </Button>
               <p className="text-[10px] font-bold text-text-muted italic px-4 text-center">*Disclaimer: This estimate is based on prevailing government rates as of FY 2024-25.</p>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-sm flex items-center gap-6 group hover:border-primary/30 transition-all">
               <div className="w-16 h-16 rounded-full bg-section flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all"><Headphones className="w-8 h-8" /></div>
               <div className="space-y-1">
                  <h4 className="text-sm font-black text-text-primary tracking-tight">Need clarity on these costs?</h4>
                  <p className="text-[11px] font-medium text-text-secondary italic leading-relaxed">Talk to our plot experts for a free consultation.</p>
                  <button 
                    onClick={() => { setConsultationStep("form"); setIsConsultationOpen(true); }}
                    className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-1 mt-2 hover:gap-2 transition-all"
                  >
                    Request a callback <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner - Hidden for print */}
        <div className="mt-16 relative h-64 rounded-[40px] overflow-hidden group print:hidden">
           <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-10 filter grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
           <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent" />
           <div className="absolute inset-0 flex items-center justify-between px-12 md:px-20">
              <div className="space-y-4 max-w-xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-[0.2em]"><MapPin className="w-3 h-3" /> Location Context</div>
                 <h2 className="text-3xl font-black text-text-primary tracking-tight italic uppercase leading-none">Ready to secure your plot in {selectedState}?</h2>
                 <p className="text-sm font-bold text-text-secondary leading-relaxed">Join 500+ buyers who registered their property through IndiaLand last month.</p>
              </div>
              <div className="hidden md:flex items-center gap-4 text-primary font-black uppercase tracking-tighter text-6xl opacity-10 pointer-events-none italic">{selectedState}</div>
           </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
          }
          .Navbar, header, footer, .Footer {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          button, .Button {
            display: none !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
