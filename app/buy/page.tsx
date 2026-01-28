"use client";

import { useState, useMemo, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ListingMap } from "@/components/ui/ListingMap";
import { ListingCard } from "@/components/ui/ListingCard";
import { Search, Filter, SlidersHorizontal, Map as MapIcon, Grid, ChevronDown, RefreshCcw, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { MOCK_LISTINGS } from "@/lib/data";


function BuyPlotsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("city") || "");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [budget, setBudget] = useState(() => {
    const b = searchParams.get("budget");
    if (b === "10l-50l") return 50;
    if (b === "50l-1cr") return 100;
    if (b === "1cr+") return 500;
    return 500;
  });
  const [khataType, setKhataType] = useState<string[]>([]);
  const [reraOnly, setReraOnly] = useState(false);

  const toggleKhata = (type: string) => {
    setKhataType(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(item => {
      const matchesSearch = searchQuery === "" || 
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKhata = khataType.length === 0 || (item.khataType && khataType.includes(item.khataType));
      const matchesRera = !reraOnly || item.isRera;
      
      const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      let priceInLakhs = 0;
      if (item.price.toLowerCase().includes("crore")) {
        priceInLakhs = numericPrice * 100;
      } else if (item.price.toLowerCase().includes("lakh")) {
        priceInLakhs = numericPrice;
      }
      const matchesBudget = priceInLakhs <= budget;

      return matchesSearch && matchesKhata && matchesRera && matchesBudget;
    });
  }, [searchQuery, khataType, reraOnly, budget]);

  const mapListings = useMemo(() => {
    return filteredListings.map(item => ({
      id: item.id,
      title: item.title,
      location: item.location,
      price: item.price,
      lat: item.lat,
      lng: item.lng,
      image: item.image,
    }));
  }, [filteredListings]);

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-text-muted font-bold uppercase tracking-wider mb-2">
              <span>Home</span>
              <span>/</span>
              <span>Residential Plots</span>
              <span>/</span>
              <span className="text-primary">Bengaluru, KA</span>
            </div>
            <h1 className="text-2xl font-extrabold text-text-primary">
              {filteredListings.length} Plots found in <span className="text-primary">Bengaluru South</span>
            </h1>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search Locality, Projects..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-border-subtle rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-white border border-border-subtle rounded-2xl p-1 shadow-sm">
              <button 
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-section"}`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button 
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === "map" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-secondary hover:bg-section"}`}
              >
                <MapIcon className="w-4 h-4" />
                Map View
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-[32px] p-8 border border-border-subtle shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-extrabold text-text-primary flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </h3>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setKhataType([]);
                    setReraOnly(false);
                    setBudget(500);
                  }}
                  className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Budget (₹)</span>
                  <span className="text-sm font-extrabold text-primary">Up to ₹{budget >= 100 ? `${(budget/100).toFixed(1)}Cr` : `${budget}L`}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-section rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-[10px] font-bold text-text-muted">
                  <span>₹10 Lakh</span>
                  <span>₹5 Crore</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">Khata Type</span>
                <div className="flex flex-wrap gap-2">
                  {["A Khata", "B Khata", "DC Converted"].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleKhata(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${khataType.includes(type) ? "bg-primary/10 border-primary text-primary" : "border-border-subtle bg-section/50 text-text-secondary hover:border-primary/30"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">RERA Status</span>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${reraOnly ? "bg-primary border-primary text-white" : "border-border-subtle group-hover:border-primary/50"}`}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={reraOnly}
                      onChange={() => setReraOnly(!reraOnly)}
                    />
                    {reraOnly && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-bold text-text-secondary">RERA Registered Only</span>
                </label>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Sort By</span>
                <button className="flex items-center gap-2 text-sm font-bold text-text-primary">
                  Recommended
                  <ChevronDown className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredListings.length > 0 ? (
                  filteredListings.map(item => (
                    <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <ListingCard {...item} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-border-subtle">
                    <RefreshCcw className="w-12 h-12 text-primary/20 mx-auto mb-4 animate-spin-slow" />
                    <h3 className="text-xl font-bold text-text-primary mb-2">No plots match your criteria</h3>
                    <p className="text-text-secondary">Try adjusting your filters or searching another area</p>
                    <Button 
                      variant="outline" 
                      className="mt-6 rounded-xl"
                      onClick={() => {
                        setSearchQuery("");
                        setKhataType([]);
                        setReraOnly(false);
                        setBudget(500);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                <div 
                  onClick={() => setViewMode("map")}
                  className="md:col-span-1 bg-section rounded-[32px] border-2 border-dashed border-border-subtle p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapIcon className="w-8 h-8 transition-colors" />
                  </div>
                  <h3 className="text-xl font-extrabold text-text-primary mb-2">Explore Locally</h3>
                  <p className="text-sm text-text-secondary mb-8 max-w-[200px]">
                    See all plots near Metro Stations, Landmarks and Industrial Zones.
                  </p>
                  <Button variant="primary" className="rounded-2xl group-hover:scale-105 transition-transform">
                    Launch Interactive Map
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-[700px] w-full bg-white rounded-[32px] border border-border-subtle overflow-hidden shadow-inner">
                <ListingMap listings={mapListings} />
              </div>
            )}

            {filteredListings.length > 0 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-white hover:text-primary transition-all">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                {[1, 2, 3, "...", 45].map((page, i) => (
                  <button 
                    key={i}
                    className={`h-10 px-4 rounded-xl border font-bold text-sm transition-all ${page === 1 ? "bg-primary border-primary text-white" : "bg-white border-border-subtle text-text-secondary hover:text-primary"}`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-xl border border-border-subtle flex items-center justify-center text-text-secondary hover:bg-white hover:text-primary transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BuyPlots() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BuyPlotsContent />
    </Suspense>
  );
}
