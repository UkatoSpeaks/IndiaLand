"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Grid, Wallet } from "lucide-react";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/Dropdown";

const cityOptions = [
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Dehradun", value: "dehradun" },
  { label: "Navi Mumbai", value: "mumbai" },
  { label: "New Gurgaon", value: "gurgaon" },
  { label: "Pune", value: "pune" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Chandigarh", value: "chandigarh" },
  { label: "Lucknow", value: "lucknow" },
];

const sizeOptions = [
  { label: "0 - 1000", value: "0-1000" },
  { label: "1000 - 2000", value: "1000-2000" },
  { label: "2000+", value: "2000+" },
];

const budgetOptions = [
  { label: "10L - 50L", value: "10l-50l" },
  { label: "50L - 1Cr", value: "50l-1cr" },
  { label: "1Cr+", value: "1cr+" },
];

export function Hero() {
  const router = useRouter();
  const [searchState, setSearchState] = useState({
    city: "",
    size: "",
    budget: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchState.city) params.append("city", searchState.city);
    if (searchState.budget) params.append("budget", searchState.budget);
    router.push(`/buy?${params.toString()}`);
  };

  return (
    <section className="px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto relative h-[500px] w-full flex flex-col items-center justify-center">
        {/* Isolated Background Wrapper to prevent clipping Dropdowns */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-zinc-900 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: "url('/Whisk_a25799fa59c9bdca01c452aa2f47a9a0dr.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        </div>

        <div className="relative z-10 text-center px-6 w-full max-w-4xl">
          <h1 className="text-white text-3xl md:text-[48px] font-bold leading-tight mb-4 tracking-tight">
            Your Future Plot Awaits in <br />
            <span className="text-primary italic">New India.</span>
          </h1>
          <p className="text-white/90 text-base md:text-[18px] font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover 100% RERA-verified residential, commercial, and agricultural land in India's fastest growing corridors.
          </p>

          <div className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-0 w-full max-w-3xl mx-auto border border-white/20">
            <Dropdown 
              label="Location"
              placeholder="Select City"
              options={cityOptions}
              value={searchState.city}
              onChange={(val) => setSearchState(prev => ({ ...prev, city: val }))}
              icon={<MapPin className="w-4 h-4" />}
            />
            
            <div className="hidden md:block w-px h-10 bg-gray-100" />
            
            <Dropdown 
              label="Area"
              placeholder="Size (sq.ft.)"
              options={sizeOptions}
              value={searchState.size}
              onChange={(val) => setSearchState(prev => ({ ...prev, size: val }))}
              icon={<Grid className="w-4 h-4" />}
            />

            <div className="hidden md:block w-px h-10 bg-gray-100" />

            <Dropdown 
              label="Price"
              placeholder="Budget (₹)"
              options={budgetOptions}
              value={searchState.budget}
              onChange={(val) => setSearchState(prev => ({ ...prev, budget: val }))}
              icon={<Wallet className="w-4 h-4" />}
            />

            <Button 
              onClick={handleSearch}
              variant="primary"
              className="w-full md:w-auto px-8 h-[52px] flex items-center gap-2 rounded-lg transition-all active:scale-95 ml-0 md:ml-2 shadow-sm"
            >
              <Search className="w-4 h-4 stroke-[3px]" />
              <span className="font-bold text-sm uppercase tracking-wider">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
