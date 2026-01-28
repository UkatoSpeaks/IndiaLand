"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

const brands = [
  "DLF", "GODREJ PROPERTIES", "PRESTIGE GROUP", "SOBHA", 
  "TATA HOUSING", "BRIGADE", "LODHA", "PURAVANKARA",
  "TATA REALTY", "MAHINDRA LIFESPACES", "OMAXE", "ANSAL API"
];

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="relative rounded-[32px] overflow-hidden bg-white shadow-xl border border-border-subtle group">
        {/* Background with Image and Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/why-choose-us-bg.png" 
            alt="Real estate development"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Multi-layered gradient for text readability and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent hidden md:block" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-8 py-12 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Side: Branding / Headline */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 50,000+ Land Buyers
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
              Secure Your Future with <br />
              <span className="text-primary italic">IndiaLand</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-md font-medium leading-relaxed">
              We bring transparency to plot buying. Every listed property is verified through our 40-point legal checklist.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-2xl group/btn overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Verified Plots
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl border-primary/20 text-primary hover:bg-primary-light">
                Request Legal Audit
              </Button>
            </div>
          </div>

          {/* Right Side: Why Choose Us Box */}
          <div className="flex-1 w-full md:max-w-md">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-2xl space-y-8 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-text-primary">Why choose us?</h3>
                <div className="h-1 w-12 bg-primary rounded-full" />
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-verified/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-verified group-hover/item:text-white text-verified">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-text-primary font-bold text-base mb-1">
                      Compare & choose from <span className="text-primary">500+ Verified Developers</span>
                    </p>
                    <p className="text-sm text-text-muted">Largest collection of verified land inventory in India.</p>
                  </div>
                </div>

                <div className="flex gap-4 group/item">
                  <div className="mt-1 w-6 h-6 rounded-full bg-verified/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-verified group-hover/item:text-white text-verified">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-text-primary font-bold text-base mb-1">
                      <span className="text-primary">Free Legal Consultation</span> & Title Check
                    </p>
                    <p className="text-sm text-text-muted">Our experts verify ownership and RERA compliances for you.</p>
                  </div>
                </div>
              </div>

              {/* Top Brands Marquee Section */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Top Partners</span>
                  <span className="px-2 py-0.5 bg-warning/10 text-warning text-[9px] font-bold rounded uppercase">RERA Compliant</span>
                </div>
                
                <div className="relative overflow-hidden group/marquee py-2">
                  <div className="animate-marquee flex items-center whitespace-nowrap">
                    {/* First set of brands */}
                    {brands.map((brand, i) => (
                      <div key={`brand-1-${i}`} className="mx-6 text-sm font-black text-text-muted/40 hover:text-primary transition-colors cursor-default tracking-tighter">
                        {brand}
                      </div>
                    ))}
                    {/* Duplicate set for seamless scrolling */}
                    {brands.map((brand, i) => (
                      <div key={`brand-2-${i}`} className="mx-6 text-sm font-black text-text-muted/40 hover:text-primary transition-colors cursor-default tracking-tighter">
                        {brand}
                      </div>
                    ))}
                  </div>
                  {/* Fades for smooth edge transition */}
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/80 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/80 to-transparent z-10" />
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-text-muted font-medium">
                  Verified by <span className="text-verified font-bold">IndiaLand Security Protocol</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
