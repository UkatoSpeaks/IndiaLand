"use client";

import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 mb-24">
      <div className="relative bg-primary rounded-[60px] p-12 md:p-24 overflow-hidden text-center text-white shadow-2xl shadow-primary/20">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full -ml-48 -mb-48 blur-2xl" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Ready to find your <span className="italic">buyer?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 font-medium italic leading-relaxed">
            Join thousands of successful sellers on India's #1 plot selling platform. 
            It only takes 5 minutes to get started.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Button className="w-full sm:w-auto px-12 h-16 bg-white text-primary hover:bg-white/90 rounded-2xl text-lg font-bold shadow-2xl">
              Post Your Plot Now
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto px-12 h-16 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl text-lg font-bold">
              <MessageCircle className="w-5 h-5 mr-3" /> Speak to Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
