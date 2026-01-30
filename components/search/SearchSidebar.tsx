"use client";

import { Filter, RefreshCcw, CheckCircle2, ChevronDown } from "lucide-react";

interface SearchSidebarProps {
  filters: {
    budget: number;
    khataType: string[];
    reraOnly: boolean;
    zoning: string[];
    possession: string[];
  };
  setFilters: (filters: any) => void;
  onReset: () => void;
}

export function SearchSidebar({ filters, setFilters, onReset }: SearchSidebarProps) {
  const toggleArrayFilter = (key: 'khataType' | 'zoning' | 'possession', value: string) => {
    const current = filters[key];
    const updated = current.includes(value) 
      ? current.filter(t => t !== value) 
      : [...current, value];
    setFilters({ ...filters, [key]: updated });
  };

  return (
    <div className="bg-white rounded-[40px] p-8 border border-border-subtle shadow-xl shadow-primary/5 sticky top-28 space-y-10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-text-primary flex items-center gap-2 uppercase italic italic">
          <Filter className="w-5 h-5 text-primary" />
          Filter Engine
        </h3>
        <button 
          onClick={onReset}
          className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2 group"
        >
          <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
          Reset All
        </button>
      </div>

      {/* Budget Slider */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.1em]">Max Budget (₹)</span>
          <span className="text-sm font-black text-primary italic">Up to ₹{filters.budget >= 100 ? `${(filters.budget/100).toFixed(1)}Cr` : `${filters.budget}L`}</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="500" 
          step="10"
          value={filters.budget}
          onChange={(e) => setFilters({ ...filters, budget: parseInt(e.target.value) })}
          className="w-full h-1.5 bg-section rounded-lg appearance-none cursor-pointer accent-primary" 
        />
        <div className="flex justify-between text-[10px] font-bold text-text-muted">
          <span>₹10 Lakh</span>
          <span>₹5 Crore</span>
        </div>
      </div>

      {/* Zoning Filter */}
      <div className="space-y-4">
        <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.1em]">Land Zoning</span>
        <div className="flex flex-wrap gap-2">
          {["Residential", "Commercial", "Industrial", "Agricultural"].map(type => (
            <button
              key={type}
              onClick={() => toggleArrayFilter('zoning', type)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all uppercase tracking-tight
                ${filters.zoning.includes(type) ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "border-border-subtle bg-section/50 text-text-secondary hover:border-primary/30"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Possession Filter */}
      <div className="space-y-4">
        <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.1em]">Possession</span>
        <div className="flex flex-wrap gap-2">
          {["Immediate", "6 Months", "Ready"].map(type => (
            <button
              key={type}
              onClick={() => toggleArrayFilter('possession', type)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all uppercase tracking-tight
                ${filters.possession.includes(type) ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "border-border-subtle bg-section/50 text-text-secondary hover:border-primary/30"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Khata Type Filter */}
      <div className="space-y-4">
        <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.1em]">Legal Classification</span>
        <div className="flex flex-wrap gap-2">
          {["A Khata", "B Khata", "DC Converted"].map(type => (
            <button
              key={type}
              onClick={() => toggleArrayFilter('khataType', type)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all uppercase tracking-tight
                ${filters.khataType.includes(type) ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "border-border-subtle bg-section/50 text-text-secondary hover:border-primary/30"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* RERA Switch */}
      <div className="pt-6 border-t border-border-subtle">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-text-primary uppercase tracking-tight block">RERA Registered</span>
            <span className="text-[10px] font-bold text-text-muted block">Show only verified plots</span>
          </div>
          <div 
            onClick={() => setFilters({ ...filters, reraOnly: !filters.reraOnly })}
            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${filters.reraOnly ? "bg-primary" : "bg-section border border-border-subtle"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${filters.reraOnly ? "left-7" : "left-1"}`} />
          </div>
        </label>
      </div>

      {/* Sorting */}
      <div className="pt-8 border-t border-border-subtle flex items-center justify-between">
        <span className="text-[11px] font-black text-text-muted uppercase tracking-widest">Sort By</span>
        <button className="flex items-center gap-2 text-xs font-black text-text-primary uppercase italic">
          Recommended
          <ChevronDown className="w-4 h-4 text-primary" />
        </button>
      </div>
    </div>
  );
}
