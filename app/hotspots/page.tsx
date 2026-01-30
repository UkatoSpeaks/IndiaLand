"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HotspotCard } from "@/components/hotspots/HotspotCard";
import { FilterBar } from "@/components/hotspots/FilterBar";
import { ChevronRight, Search, ChevronLeft, Map } from "lucide-react";

const ALL_HOTSPOTS = [
  { region: "Dholera SIR, Gujarat", state: "Gujarat", subRegion: "Industrial Smart City Corridor", price: "1,200", priceNum: 1200, growth: "15%", growthNum: 15, tag: "High Growth", tagColor: "bg-orange-500", image: "/hotspots/industrial-smart-city.png" },
  { region: "New Gurgaon, Haryana", state: "Haryana", subRegion: "Residential & Commercial Hub", price: "4,500", priceNum: 4500, growth: "12%", growthNum: 12, tag: "Premium Hub", tagColor: "bg-primary", image: "/hotspots/premium-residential.png" },
  { region: "Yamuna Expressway, UP", state: "UP", subRegion: "Jewar Airport Proximity", price: "2,800", priceNum: 2800, growth: "18%", growthNum: 18, tag: "Top Pick", tagColor: "bg-green-500", image: "/hotspots/airport-proximity.png" },
  { region: "Navi Mumbai, MH", state: "Maharashtra", subRegion: "Planned Infrastructure Node", price: "8,500", priceNum: 8500, growth: "10%", growthNum: 10, tag: "Urban Core", tagColor: "bg-blue-500", image: "/hotspots/tech-park.png" },
  { region: "Devanahalli, Bangalore", state: "Bangalore", subRegion: "Tech & Aerospace Park", price: "3,200", priceNum: 3200, growth: "14%", growthNum: 14, tag: "IT Corridor", tagColor: "bg-primary-dark", image: "/hotspots/tech-park.png" },
  { region: "Aerocity, Mohali", state: "Punjab", subRegion: "Airport Road Development", price: "3,800", priceNum: 3800, growth: "11%", growthNum: 11, tag: "Rapid Growth", tagColor: "bg-cyan-500", image: "/hotspots/premium-residential.png" },
  { region: "Sriperumbudur, TN", state: "Tamil Nadu", subRegion: "Auto-Manufacturing Corridor", price: "1,950", priceNum: 1950, growth: "13%", growthNum: 13, tag: "Manufacturing", tagColor: "bg-emerald-500", image: "/hotspots/industrial-smart-city.png" },
  { region: "Shamshabad, Hyderabad", state: "Hyderabad", subRegion: "Airport Expansion Area", price: "2,400", priceNum: 2400, growth: "16%", growthNum: 16, tag: "Logistics Hub", tagColor: "bg-indigo-500", image: "/hotspots/airport-proximity.png" },
  { region: "Zirakpur, Punjab", state: "Punjab", subRegion: "Commercial & Logistics Base", price: "2,100", priceNum: 2100, growth: "14%", growthNum: 14, tag: "Emerging", tagColor: "bg-amber-500", image: "/hotspots/agricultural-farmland.png" },
  { region: "Gift City, Gujarat", state: "Gujarat", subRegion: "Financial Technology Core", price: "12,000", priceNum: 12000, growth: "22%", growthNum: 22, tag: "Global Hub", tagColor: "bg-purple-600", image: "/hotspots/industrial-smart-city.png" },
  { region: "Wagholi, Pune", state: "Maharashtra", subRegion: "IT Overflow & Residential", price: "4,200", priceNum: 4200, growth: "13%", growthNum: 13, tag: "High Demand", tagColor: "bg-red-500", image: "/hotspots/premium-residential.png" },
  { region: "Medchal, Hyderabad", state: "Hyderabad", subRegion: "North Growth Corridor", price: "1,850", priceNum: 1850, growth: "14%", growthNum: 14, tag: "High Growth", tagColor: "bg-orange-500", image: "/hotspots/agricultural-farmland.png" },
];

export default function HotspotsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    state: "All States",
    budget: "Any Budget",
    growth: "Any Growth"
  });
  const [activePage, setActivePage] = useState(1);

  const filteredHotspots = useMemo(() => {
    return ALL_HOTSPOTS.filter(hotspot => {
      // Search check
      const matchesSearch = hotspot.region.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           hotspot.subRegion.toLowerCase().includes(searchQuery.toLowerCase());
      
      // State check
      const matchesState = filters.state === "All States" || hotspot.state === filters.state;

      // Budget check
      let matchesBudget = true;
      if (filters.budget === "₹1,000 - ₹2,500/sq.ft") matchesBudget = hotspot.priceNum >= 1000 && hotspot.priceNum <= 2500;
      else if (filters.budget === "₹2,500 - ₹5,000/sq.ft") matchesBudget = hotspot.priceNum > 2500 && hotspot.priceNum <= 5000;
      else if (filters.budget === "₹5,000+/sq.ft") matchesBudget = hotspot.priceNum > 5000;

      // Growth check
      let matchesGrowth = true;
      if (filters.growth === "8% - 12%") matchesGrowth = hotspot.growthNum >= 8 && hotspot.growthNum <= 12;
      else if (filters.growth === "12% - 15%") matchesGrowth = hotspot.growthNum > 12 && hotspot.growthNum <= 15;
      else if (filters.growth === "15%+") matchesGrowth = hotspot.growthNum > 15;

      return matchesSearch && matchesState && matchesBudget && matchesGrowth;
    });
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({ state: "All States", budget: "Any Budget", growth: "Any Growth" });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
          <div className="space-y-6">
            <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-text-muted">
              <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Investment Hotspots</span>
            </nav>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary uppercase italic tracking-tight leading-none">
                Investment Hotspots: <br/>
                <span className="text-primary italic">Top Regions</span> for Land Growth
              </h1>
              <p className="text-text-secondary font-medium max-w-2xl italic leading-relaxed text-lg">
                Identify high-potential land and plot opportunities across India's fastest-growing industrial corridors and residential hubs.
              </p>
            </div>
          </div>

          <div className="relative group w-full lg:w-96">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, corridor or project..." 
              className="w-full h-16 bg-white rounded-[24px] border border-border-subtle pl-14 pr-6 text-sm font-bold text-text-primary outline-none focus:border-primary focus:shadow-xl focus:shadow-primary/10 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Filters & Results Counter */}
        <div className="space-y-6 mb-12">
          <FilterBar filters={filters} setFilters={setFilters} onClear={clearFilters} />
          <div className="flex items-center justify-between px-4">
            <p className="text-xs font-black text-text-muted uppercase tracking-widest">
              Showing <span className="text-primary">{filteredHotspots.length}</span> regions matching your criteria
            </p>
          </div>
        </div>

        {/* Grid Section */}
        {filteredHotspots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {filteredHotspots.map((hotspot, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${i * 50}ms` }}>
                <HotspotCard {...hotspot} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[48px] py-32 text-center border-2 border-dashed border-border-subtle mb-16">
             <div className="w-20 h-20 bg-section rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-text-muted" />
             </div>
             <h3 className="text-xl font-black text-text-primary uppercase italic">No hotspots found</h3>
             <p className="text-text-muted font-bold mt-2">Try adjusting your filters or search terms.</p>
             <button onClick={clearFilters} className="mt-8 text-primary font-black uppercase text-xs tracking-widest hover:underline">Clear all filters</button>
          </div>
        )}

        {/* Pagination (Visual only for now since we have limited data) */}
        {filteredHotspots.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            <button className="w-12 h-12 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[1, 2, 3].map(p => (
              <button 
                key={p}
                onClick={() => setActivePage(p)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all shadow-sm
                  ${activePage === p ? 'bg-primary text-white shadow-primary/20' : 'bg-white border border-border-subtle text-text-primary hover:border-primary hover:text-primary'}
                `}
              >
                {p}
              </button>
            ))}
            
            <span className="text-text-muted font-bold px-4">...</span>
            
            <button className="w-12 h-12 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-primary font-black text-sm hover:border-primary hover:text-primary transition-all shadow-sm">
              12
            </button>
            
            <button className="w-12 h-12 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
