"use client";

import { useState, useMemo, Suspense, useEffect, use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ListingMap } from "@/components/ui/ListingMap";
import { ListingCard } from "@/components/ui/ListingCard";
import { LocalityHeader } from "@/components/search/LocalityHeader";
import { SearchSidebar } from "@/components/search/SearchSidebar";
import { Search, Map as MapIcon, Grid, RefreshCcw, ArrowRight, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { MOCK_LISTINGS } from "@/lib/data";

function BuyPlotsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("city") || "");
  const [localityContext] = useState(searchParams.get("locality") || "");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  
  const [filters, setFilters] = useState({
    budget: 500,
    khataType: [] as string[],
    reraOnly: false,
    zoning: [] as string[],
    possession: [] as string[]
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings");
        const rawData = await response.json();
        
        // Normalize API data to match UI expectations
        const normalizedData = rawData.map((item: any) => ({
          ...item,
          image: item.fileUrls?.[0] || "/placeholder-property.jpg",
          location: `${item.locality || ""}, ${item.city || ""}`,
          subLocation: item.locality,
          lat: parseFloat(item.latitude) || 12.9716,
          lng: parseFloat(item.longitude) || 77.5946,
          pricePerSqft: item.area > 0 ? (parseFloat(item.price.replace(/[^\d.]/g, '')) / item.area).toFixed(0) : "0",
          units: item.unit,
          facing: "East Facing", // Default for now
          connectivity: { metro: "2km away", highway: "500m away" }, // Default for now
          isRera: !!item.reraNumber,
        }));
        
        setListings(normalizedData);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    const source = listings.length > 0 ? listings : MOCK_LISTINGS;
    return source.filter(item => {
      // Search check
      const matchesSearch = searchQuery === "" || 
                           item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Locality context check (from hotspots)
      const matchesLocality = !localityContext || item.location.includes(localityContext) || item.title.includes(localityContext);

      // Khata check
      const matchesKhata = filters.khataType.length === 0 || (item.khataType && filters.khataType.includes(item.khataType));
      
      // RERA check
      const matchesRera = !filters.reraOnly || item.isRera;
      
      // Budget check
      const priceStr = String(item.price);
      const numericPrice = parseFloat(priceStr.replace(/[^\d.]/g, ''));
      let priceInLakhs = 0;
      if (priceStr.toLowerCase().includes("crore")) priceInLakhs = numericPrice * 100;
      else if (priceStr.toLowerCase().includes("lakh")) priceInLakhs = numericPrice;
      else priceInLakhs = numericPrice;
      
      const matchesBudget = priceInLakhs <= filters.budget;

      // Note: Zoning and Possession are simulated filters for mock data unless added to MOCK_LISTINGS
      return matchesSearch && matchesLocality && matchesKhata && matchesRera && matchesBudget;
    });
  }, [searchQuery, localityContext, filters, listings]);

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

  const resetFilters = () => {
    setFilters({
      budget: 500,
      khataType: [],
      reraOnly: false,
      zoning: [],
      possession: []
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Breadcrumbs & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-text-muted">
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Search Market</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">{localityContext || "All Plots"}</span>
          </nav>

          <div className="flex bg-white/50 backdrop-blur-sm border border-border-subtle rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-[#0F172A] text-white shadow-xl shadow-black/10" : "text-text-secondary hover:bg-section"}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Grid View
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === "map" ? "bg-[#0F172A] text-white shadow-xl shadow-black/10" : "text-text-secondary hover:bg-section"}`}
            >
              <MapIcon className="w-4 h-4" />
              Map Radar
            </button>
          </div>
        </div>

        {/* Locality Detailed Header (Contextual) */}
        {localityContext && <LocalityHeader locality={localityContext} count={filteredListings.length} />}

        {/* Unified Results Bar (Always Visible) */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10 bg-white p-6 rounded-[32px] border border-border-subtle shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <RefreshCcw className={`w-5 h-5 text-primary ${isLoading ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h1 className="text-xl font-black text-text-primary uppercase italic leading-none">
                {isLoading ? "Syncing inventory..." : `${filteredListings.length} Verified Plots Found`}
              </h1>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">
                Available in {localityContext || searchQuery || "India Market"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..."
                className="w-full pl-12 pr-6 py-4 bg-section/50 border border-border-subtle rounded-2xl focus:ring-4 focus:ring-primary/5 outline-none text-[12px] font-bold transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex bg-section/50 border border-border-subtle rounded-2xl p-1 shrink-0">
              <button 
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-[#0F172A] text-white shadow-lg" : "text-text-secondary hover:bg-white"}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                List
              </button>
              <button 
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "map" ? "bg-[#0F172A] text-white shadow-lg" : "text-text-secondary hover:bg-white"}`}
              >
                <MapIcon className="w-4 h-4" />
                Map
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filtering Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <SearchSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} />
          </aside>

          {/* Listings Hub */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredListings.length > 0 ? (
                  filteredListings.map((item, i) => (
                    <div key={item.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: `${i * 50}ms` }}>
                      <ListingCard {...item} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center bg-white rounded-[48px] border-2 border-dashed border-border-subtle">
                    <RefreshCcw className="w-16 h-16 text-primary/10 mx-auto mb-6 animate-spin-slow" />
                    <h3 className="text-2xl font-black text-text-primary italic uppercase tracking-tight">No match found</h3>
                    <p className="text-text-secondary font-medium italic mt-2">Simplify your filters to see more results.</p>
                    <Button 
                      variant="outline" 
                      className="mt-8 rounded-2xl border-2 font-black uppercase text-xs tracking-widest px-8 h-14"
                      onClick={resetFilters}
                    >
                      Reset All Filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[800px] w-full bg-white rounded-[48px] border border-border-subtle overflow-hidden shadow-2xl relative">
                <ListingMap listings={mapListings} />
              </div>
            )}

            {/* Pagination Engineering */}
            {filteredListings.length > 0 && (
              <div className="mt-20 flex items-center justify-center gap-3">
                <button className="w-12 h-12 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary transition-all shadow-sm">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                {[1, 2, 3, "...", 12].map((page, i) => (
                  <button 
                    key={i}
                    className={`h-12 px-6 rounded-2xl border text-xs font-black transition-all shadow-sm
                      ${page === 1 ? "bg-primary border-primary text-white shadow-primary/20" : "bg-white border-border-subtle text-text-muted hover:border-primary hover:text-primary"}
                      ${page === "..." ? "border-none shadow-none pointer-events-none" : ""}
                    `}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-12 h-12 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-primary transition-all shadow-sm">
                  <ArrowRight className="w-5 h-5" />
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
      <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-black text-text-primary uppercase tracking-widest italic animate-pulse">
          IndiaLand Marketplace
        </h2>
        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2">
          Syncing the latest inventory...
        </p>
      </div>
    }>
      <BuyPlotsContent />
    </Suspense>
  );
}
