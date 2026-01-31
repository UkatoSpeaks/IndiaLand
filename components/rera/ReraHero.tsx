"use client";

import { useState } from "react";
import { ShieldCheck, Download, Search, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReraHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [reraId, setReraId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reraId) return;
    
    setVerificationStatus("loading");
    // Simulate API call
    setTimeout(() => {
      if (reraId.toLowerCase().includes("rera") || reraId.length > 5) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate PDF generation/download
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app, you'd use: window.open('/IndiaLand_RERA_Guide_2024.pdf', '_blank');
      alert("IndiaLand RERA Guide 2024 has been prepared. Your download will start shortly.");
    }, 2000);
  };

  return (
    <>
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background with Generated Blueprint Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/rera_hero_bg.png" 
            alt="Architectural Blueprint" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B73] to-[#0052A3] mix-blend-multiply transition-all" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-verified/20 backdrop-blur-md rounded-full border border-verified/30 text-[10px] font-black tracking-widest uppercase text-white">
            <ShieldCheck className="w-4 h-4" /> RERA Compliance 2024
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Understanding RERA: Your <br /> 
              <span className="text-primary-light italic">Guide to Safe Land Investment</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium italic max-w-3xl mx-auto leading-relaxed">
              Navigate the Indian real estate market with 100% transparency and legal security. We help you verify titles and ensure compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="h-16 px-10 bg-white text-primary rounded-2xl font-black text-lg hover:scale-105 active:scale-95 shadow-2xl transition-all border-none"
            >
              Verify a Project
            </Button>
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline" 
              className="h-16 px-10 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/20 flex items-center gap-3 transition-all min-w-[280px]"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Guide...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  Download Guide PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Verification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => {
              setIsModalOpen(false);
              setVerificationStatus("idle");
              setReraId("");
            }}
          />
          <div className="relative bg-white w-full max-w-xl rounded-[40px] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 overflow-hidden">
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setVerificationStatus("idle");
                setReraId("");
              }}
              className="absolute top-8 right-8 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-text-primary uppercase italic tracking-tight">Project Verification</h3>
                <p className="text-sm text-text-secondary font-medium">Enter the RERA Registration ID to verify project legality and approval status.</p>
              </div>

              {verificationStatus === "idle" || verificationStatus === "loading" ? (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">RERA Registeration No.</label>
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        placeholder="e.g. PRM/KA/RERA/1251/..."
                        value={reraId}
                        onChange={(e) => setReraId(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-section rounded-2xl border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none text-sm font-bold transition-all"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    disabled={verificationStatus === "loading"}
                    className="w-full h-16 rounded-2xl font-black text-base shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    {verificationStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Scanning Databases...
                      </>
                    ) : (
                      <>Verify Now</>
                    )}
                  </Button>
                </form>
              ) : verificationStatus === "success" ? (
                <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 rounded-full bg-verified/10 flex items-center justify-center text-verified mx-auto">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-text-primary uppercase italic">Project Verified</h4>
                    <p className="text-sm font-bold text-verified uppercase tracking-widest">Active • 100% Compliant</p>
                    <p className="text-xs text-text-secondary font-medium max-w-xs mx-auto pt-2">
                      Project ID <span className="text-text-primary font-bold">{reraId}</span> is officially registered and cleared for investment.
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setVerificationStatus("idle")}
                    className="h-12 border-2 rounded-xl font-bold text-xs uppercase tracking-widest px-8"
                  >
                    Verify Another
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center text-error mx-auto">
                    <AlertCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-text-primary uppercase italic">Verification Failed</h4>
                    <p className="text-sm font-bold text-error uppercase tracking-widest">Record Not Found</p>
                    <p className="text-xs text-text-secondary font-medium max-w-xs mx-auto pt-2">
                      We couldn't find any RERA registration for <span className="text-text-primary font-bold">{reraId}</span>. Please check the ID and try again.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={() => setVerificationStatus("idle")}
                      className="h-14 rounded-xl font-black text-xs uppercase tracking-widest bg-error hover:bg-error/90 shadow-xl shadow-error/20"
                    >
                      Try Again
                    </Button>
                    <button className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-colors">
                      Report this Project
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      )}
    </>
  );
}
