"use client";

import { useState } from "react";
import { Search, MapPin, Grid, Wallet, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";

export function Hero() {
  const [searchState, setSearchState] = useState({
    city: "",
    size: "",
    budget: "",
  });

  const handleSearch = () => {
    console.log("Searching for:", searchState);
    alert(`Searching for properties in ${searchState.city || 'all cities'} with size ${searchState.size || 'any'} and budget ${searchState.budget || 'any'}`);
  };

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto relative h-[500px] w-full rounded-2xl md:rounded-3xl overflow-hidden flex flex-col items-center justify-center shadow-md bg-zinc-900">
        {/* Background Image - Rule: Not Flashy, Trust-first */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/Whisk_a25799fa59c9bdca01c452aa2f47a9a0dr.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

        {/* Content - Rule: Hero 48px bold */}
        <div className="relative z-10 text-center px-6 w-full max-w-4xl">
          <h1 className="text-white text-3xl md:text-[48px] font-bold leading-tight mb-4 tracking-tight">
            Your Future Plot Awaits in <br />
            <span className="text-primary italic">New India.</span>
          </h1>
          <p className="text-white/90 text-base md:text-[18px] font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover 100% RERA-verified residential, commercial, and agricultural land in India's fastest growing corridors.
          </p>

          {/* Search Bar - Small and Functional */}
          <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-0 w-full max-w-2xl mx-auto border border-white/20">
            {/* City Select */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full border-r border-gray-100 group relative">
              <MapPin className="text-primary w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col items-start w-full pr-4">
                <select 
                  className="bg-transparent text-sm font-bold text-text-primary focus:outline-none cursor-pointer w-full appearance-none bg-none"
                  value={searchState.city}
                  onChange={(e) => setSearchState({...searchState, city: e.target.value})}
                >
                  <option value="">Select City</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="mumbai">Navi Mumbai</option>
                  <option value="gurgaon">New Gurgaon</option>
                  <option value="pune">Pune</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Size Select */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full border-r border-gray-100 group relative">
              <Grid className="text-primary w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col items-start w-full pr-4">
                <select 
                  className="bg-transparent text-sm font-bold text-text-primary focus:outline-none cursor-pointer w-full appearance-none bg-none"
                  value={searchState.size}
                  onChange={(e) => setSearchState({...searchState, size: e.target.value})}
                >
                  <option value="">Size (sq.ft.)</option>
                  <option value="0-1000">0 - 1000</option>
                  <option value="1000-2000">1000 - 2000</option>
                  <option value="2000+">2000+</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Budget Select */}
            <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full group relative">
              <Wallet className="text-primary w-4 h-4 flex-shrink-0" />
              <div className="flex flex-col items-start w-full pr-4">
                <select 
                  className="bg-transparent text-sm font-bold text-text-primary focus:outline-none cursor-pointer w-full appearance-none bg-none"
                  value={searchState.budget}
                  onChange={(e) => setSearchState({...searchState, budget: e.target.value})}
                >
                  <option value="">Budget (₹)</option>
                  <option value="10l-50l">10L - 50L</option>
                  <option value="50l-1cr">50L - 1Cr</option>
                  <option value="1cr+">1Cr+</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              variant="primary"
              className="w-full md:w-auto px-8 h-12 flex items-center gap-2 rounded-lg transition-all active:scale-95 ml-0 md:ml-2 shadow-sm"
            >
              <Search className="w-4 h-4 stroke-[3px]" />
              <span className="font-bold text-sm">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
