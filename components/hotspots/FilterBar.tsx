"use client";

import { ChevronDown, Filter, X } from "lucide-react";

interface FilterBarProps {
  filters: {
    state: string;
    budget: string;
    growth: string;
  };
  setFilters: (filters: any) => void;
  onClear: () => void;
}

export function FilterBar({ filters, setFilters, onClear }: FilterBarProps) {
  const options = {
    state: ["All States", "Bangalore", "Haryana", "UP", "Maharashtra", "Gujarat", "Hyderabad", "Tamil Nadu", "Punjab"],
    budget: ["Any Budget", "₹1,000 - ₹2,500/sq.ft", "₹2,500 - ₹5,000/sq.ft", "₹5,000+/sq.ft"],
    growth: ["Any Growth", "8% - 12%", "12% - 15%", "15%+"],
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] border border-border-subtle shadow-xl shadow-primary/5 flex flex-col md:flex-row items-center gap-6">
      <div className="flex items-center gap-4 text-text-primary px-4 border-r border-border-subtle h-10 hidden md:flex">
        <Filter className="w-5 h-5 text-primary" />
        <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">Filter by:</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* State Filter */}
        <div className="relative group">
          <select 
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-[13px] font-black text-text-primary outline-none focus:border-primary appearance-none cursor-pointer transition-all hover:bg-white uppercase tracking-tight"
          >
            {options.state.map((opt, j) => (
              <option key={j} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-primary transition-colors pointer-events-none" />
        </div>

        {/* Budget Filter */}
        <div className="relative group">
          <select 
            value={filters.budget}
            onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
            className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-[13px] font-black text-text-primary outline-none focus:border-primary appearance-none cursor-pointer transition-all hover:bg-white uppercase tracking-tight"
          >
            {options.budget.map((opt, j) => (
              <option key={j} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-primary transition-colors pointer-events-none" />
        </div>

        {/* Growth Filter */}
        <div className="relative group">
          <select 
            value={filters.growth}
            onChange={(e) => setFilters({ ...filters, growth: e.target.value })}
            className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-[13px] font-black text-text-primary outline-none focus:border-primary appearance-none cursor-pointer transition-all hover:bg-white uppercase tracking-tight"
          >
            {options.growth.map((opt, j) => (
              <option key={j} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-primary transition-colors pointer-events-none" />
        </div>
      </div>

      <button 
        onClick={onClear}
        className="flex items-center gap-2 text-[11px] font-black text-text-muted hover:text-primary uppercase tracking-widest transition-all px-4 group"
      >
        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        Clear All Filters
      </button>
    </div>
  );
}
