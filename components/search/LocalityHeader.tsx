"use client";

import { useMemo } from "react";
import { TrendingUp, MapPin, Building2, Info, CheckCircle2 } from "lucide-react";

interface LocalityHeaderProps {
  locality: string;
  count: number;
}

export function LocalityHeader({ locality, count }: LocalityHeaderProps) {
  // Simulated stats based on locality
  const stats = useMemo(() => {
    return {
      growth: "+18.2%",
      avgPrice: "3,450",
      inventory: count,
      status: "High Growth Zone",
      description: "Fast-developing residential & industrial corridor with proximity to major infrastructure projects."
    };
  }, [count, locality]);

  if (!locality) return null;

  return (
    <div className="bg-[#0F172A] rounded-[40px] p-8 md:p-12 mb-10 overflow-hidden relative group">
      {/* Background Illustration / Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Investment Hub
            </div>
            <span className="bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {stats.status}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tight leading-none">
              Exploring: <span className="text-primary">{locality}</span>
            </h1>
            <p className="text-white/60 font-medium italic text-sm md:text-base leading-relaxed">
              {stats.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12 shrink-0">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Avg. Price</p>
            <div className="text-2xl font-black text-white italic flex items-end gap-1">
              ₹{stats.avgPrice}
              <span className="text-[10px] lowercase text-white/40 mb-1 font-bold">/sq.ft</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Growth</p>
            <div className="text-2xl font-black text-verified italic flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {stats.growth}
            </div>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Inventory</p>
            <div className="text-2xl font-black text-white italic flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              {stats.inventory} Plots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
