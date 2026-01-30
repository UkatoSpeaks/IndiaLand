"use client";

import { useState } from "react";
import { ChevronRight, HelpCircle, ArrowRight, Loader2, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReraSidebar() {
  const [reraId, setReraId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedStatus, setVerifiedStatus] = useState<"idle" | "success" | "invalid">("idle");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Is RERA mandatory for plots?", a: "Yes, any plot project over 500 sq meters or 8 units must be RERA registered before sale." },
    { q: "Timeline for project handover?", a: "Developers must mention a specific completion date in the agreement; delays attract penalties." },
    { q: "How to file a complaint?", a: "You can file online through your local State RERA portal with a fee of ₹1,000 - ₹5,000." },
  ];

  const handleVerify = () => {
    if (!reraId) return;
    setIsVerifying(true);
    setVerifiedStatus("idle");
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      // Mock logic: IDs starting with 10 or 20 are "valid"
      if (reraId.length >= 5) {
        setVerifiedStatus("success");
      } else {
        setVerifiedStatus("invalid");
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-700">
      {/* Verify RERA Number Widget */}
      <div className={`rounded-[40px] p-10 text-white shadow-2xl space-y-8 relative overflow-hidden transition-all duration-500 ${
        verifiedStatus === "success" ? "bg-verified" : verifiedStatus === "invalid" ? "bg-red-900" : "bg-[#003B73]"
      }`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-primary-light">
             <ShieldCheck className={`w-5 h-5 ${verifiedStatus === "success" ? "text-white" : ""}`} />
             <h3 className="text-xl font-black italic uppercase tracking-tight">Verify RERA Number</h3>
          </div>
          <p className="text-sm font-bold text-white/70 italic leading-relaxed">
            Instantly check the legitimacy of a project registration number.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Enter Registration No."
              value={reraId}
              onChange={(e) => {
                setReraId(e.target.value);
                setVerifiedStatus("idle");
              }}
              className="w-full h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-6 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-all uppercase"
            />
            {verifiedStatus === "success" && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-black text-[10px] tracking-widest bg-white/20 px-2 py-1 rounded">VALID</span>
            )}
          </div>

          <Button 
            onClick={handleVerify}
            disabled={isVerifying || !reraId}
            className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 ${
              verifiedStatus === "success" ? "bg-white text-verified" : "bg-[#FFC107] text-[#003B73] hover:bg-[#FFD54F]"
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> VERIFYING...
              </>
            ) : verifiedStatus === "success" ? (
              "VERIFIED SECURE"
            ) : (
              "Check Status"
            )}
          </Button>

          {verifiedStatus === "invalid" && (
            <p className="text-[10px] font-black text-red-200 text-center uppercase tracking-widest animate-pulse">
               Verification Failed. Please check the ID.
            </p>
          )}

          <p className="text-[10px] font-bold text-white/40 text-center uppercase tracking-widest italic">
            *Data synced with official RERA portals
          </p>
        </div>
      </div>

      {/* Quick FAQs Accordion */}
      <div className="bg-white rounded-[40px] border border-border-subtle shadow-xl p-8 space-y-6">
        <div className="flex items-center gap-3 text-text-primary">
           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <HelpCircle className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-black italic tracking-tight uppercase">Quick FAQs</h3>
        </div>

        <div className="space-y-2">
           {faqs.map((faq, i) => (
             <div key={i} className="border-b border-border-subtle last:border-0">
               <button 
                 onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                 className="w-full flex items-center justify-between py-4 rounded-2xl text-left hover:text-primary transition-all group"
               >
                  <span className={`text-sm font-bold transition-colors ${activeFaq === i ? 'text-primary' : 'text-text-secondary'}`}>{faq.q}</span>
                  {activeFaq === i ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
               </button>
               {activeFaq === i && (
                 <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                   <p className="text-xs font-medium text-text-muted leading-relaxed italic">{faq.a}</p>
                 </div>
               )}
             </div>
           ))}
        </div>
        
        <button className="w-full pt-4 text-center text-[10px] font-black uppercase tracking-widest text-[#003B73] hover:text-primary transition-colors">
           View All Legal FAQs
        </button>
      </div>

      {/* Ad/Promo Banner */}
      <div className="relative group rounded-[40px] overflow-hidden shadow-2xl h-[450px]">
        <img 
          src="/lush_plot_land.png" 
          alt="Lush Plots" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003B73]/90 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-white/20 text-[8px] font-black tracking-widest uppercase text-white">
              Legal Property Only
           </div>
           <h3 className="text-3xl font-black text-white leading-tight tracking-tight">
             Verified RERA Plots <br /> 
             starting at <span className="text-primary-light">₹25 Lacs</span>
           </h3>
           <Button className="w-full h-14 bg-white text-[#003B73] rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group/btn transition-all hover:scale-[1.02]">
             Browse Listings <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
           </Button>
        </div>
      </div>
    </div>
  );
}
