"use client";

import { CheckCircle2, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function SellerBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="relative w-full rounded-[32px] overflow-hidden bg-[#0a1a12] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Content Side */}
        <div className="relative z-10 flex-1">
          <h2 className="text-white text-3xl md:text-[40px] font-bold leading-tight mb-6 tracking-tight">
            Own Land in India? <br />
            <span className="text-primary italic">Sell it faster with us.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
            List your plot on India's most trusted land marketplace. Reach thousands of verified buyers and local investors directly. Zero brokerage for your first 3 listings.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 md:mb-0">
            <Button variant="primary" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl font-bold flex items-center gap-2">
              List Your Plot Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl font-bold bg-transparent text-white border-white/20 hover:bg-white/5">
              Legal Assistance
            </Button>
          </div>
        </div>

        {/* Features Card Group */}
        <div className="relative z-10 w-full md:w-auto grid grid-cols-1 gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors w-full md:w-80">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">KYC Verified Buyers</h4>
              <p className="text-gray-400 text-sm">Secure transactions and verified leads only.</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors w-full md:w-80">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">Documentation Support</h4>
              <p className="text-gray-400 text-sm">Patta & Sale Deed experts at your service.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
