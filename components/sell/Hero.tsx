"use client";

import { Button } from "@/components/ui/Button";
import { BadgeCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" /> Trusted by 10,000+ Sellers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-[1.1]">
              Sell your Plot <span className="text-primary italic">2x Faster</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              List your property on India's most trusted land platform and reach verified buyers today. No middlemen, no hidden charges, just results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Link href="/post-property" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-10 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                  Post Property for FREE
                </Button>
              </Link>
              <Link href="/market-rates" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 h-16 rounded-2xl text-lg font-bold border-2">
                  View Market Rates
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-section/50 relative overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-text-muted">
                Join <span className="text-text-primary">10,000+ owners</span> selling this month
              </p>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
              <Image 
                src="/hero-plot.png" 
                alt="Aerial view of a plot" 
                width={800} 
                height={600} 
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Property Card Overlay */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white rounded-3xl p-6 shadow-2xl border border-border-subtle max-w-[280px] animate-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Recently Sold</p>
                  <p className="text-sm font-bold text-text-primary">1200 Sq.Ft Plot in Bangalore</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-text-secondary">Sold for ₹1.45 Cr</p>
                <div className="w-6 h-6 rounded-full bg-verified text-white flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
