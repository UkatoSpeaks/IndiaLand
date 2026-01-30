"use client";

import { ShieldCheck, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReraHero() {
  return (
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-verified/20 backdrop-blur-md rounded-full border border-verified/30 text-[10px] font-black tracking-widest uppercase text-verified-light text-white">
          <ShieldCheck className="w-4 h-4" /> RERA Compliance 2024
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Understanding RERA: Your <br /> 
            <span className="text-primary-light">Guide to Safe Land Investment</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium italic max-w-3xl mx-auto leading-relaxed">
            Navigate the Indian real estate market with 100% transparency and legal security. We help you verify titles and ensure compliance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button className="h-16 px-10 bg-white text-primary rounded-2xl font-black text-lg hover:scale-105 active:scale-95 shadow-2xl transition-all">
            Verify a Project
          </Button>
          <Button variant="outline" className="h-16 px-10 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/20 flex items-center gap-3 transition-all">
            <Download className="w-6 h-6" /> Download Guide PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
