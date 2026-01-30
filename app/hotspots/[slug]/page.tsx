"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { 
  ChevronDown, 
  Search, 
  MapPin, 
  TrendingUp, 
  Plane, 
  Building2, 
  Car, 
  ArrowRight, 
  ChevronRight, 
  X,
  Navigation,
  Layers,
  LocateFixed,
  Waypoints
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const ALL_DATA = [
  { slug: "yamuna-expressway-up", name: "Jewar Airport Hub", sub: "Yamuna Expressway, District Gautam Budh Nagar", rate: "3,450", growth: "+24%", tag: "TOP PICK", drivers: [
    { icon: Plane, label: "Noida International Airport (Phase 1 completion 2024)" },
    { icon: Building2, label: "Upcoming International Film City (Sector 21)" },
    { icon: Car, label: "Yamuna Expressway connectivity to Agra/Delhi" }
  ], image: "/hotspots/airport-proximity.png" },
  { slug: "new-gurgaon-haryana", name: "Gurgaon Ext. South", sub: "Sohni Road Corridor, Haryana", rate: "5,200", growth: "+15%", tag: "HIGH DEMAND", drivers: [
    { icon: Building2, label: "Expansion of Global City & Tech Parks" },
    { icon: Car, label: "Direct access to Delhi-Mumbai Expressway" },
    { icon: Waypoints, label: "New Rapid Rail Connectivity Corridor" }
  ], image: "/hotspots/premium-residential.png" },
  { slug: "devanahalli-bangalore", name: "Devanahalli IT Hub", sub: "North Bangalore Corridor", rate: "3,800", growth: "+18%", tag: "IT CORRIDOR", drivers: [
    { icon: Plane, label: "Kempegowda Int. Airport (Terminal 2 Expansion)" },
    { icon: Building2, label: "New Tech Parks & Aerospace SEZ" },
    { icon: Car, label: "STRR & Satellite Ring Road connectivity" }
  ], image: "/hotspots/tech-park.png" },
  { slug: "dholera-sir-gujarat", name: "Dholera Smart City", sub: "Industrial Corridor, Gujarat", rate: "1,200", growth: "+28%", tag: "HIGH GROWTH", drivers: [
    { icon: Building2, label: "India's First Operational Smart City" },
    { icon: Car, label: "Ahmedabad-Dholera Expressway" },
    { icon: Waypoints, label: "New Dholera International Airport" }
  ], image: "/hotspots/industrial-smart-city.png" }
];

const REGION_GROUPS = [
  {
    name: "North India",
    open: true,
    items: ALL_DATA.slice(0, 2)
  },
  {
    name: "South India",
    open: true,
    items: ALL_DATA.slice(2, 3)
  },
  { name: "West India", open: false, items: [] },
  { name: "East India", open: false, items: [] }
];

export default function RegionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>(["North India", "South India"]);
  
  const currentHub = ALL_DATA.find(d => d.slug === slug) || ALL_DATA[0];

  const toggleGroup = (name: string) => {
    setOpenGroups(prev => 
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    );
  };

  const filteredGroups = REGION_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0 || searchQuery === "");

  return (
    <div className="h-screen flex flex-col bg-[#F4F4F5]">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Investment Regions */}
        <aside className="w-80 bg-[#0F172A] text-white flex flex-col border-r border-white/10 shrink-0">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-xl font-black italic tracking-tight uppercase">Investment Regions</h2>
            <div className="mt-4 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 group-focus-within:text-primary transition-colors" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search index..."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-[11px] font-bold text-white placeholder:text-white/20 outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredGroups.map((group, i) => (
              <div key={i} className="border-b border-white/5">
                <button 
                  onClick={() => toggleGroup(group.name)}
                  className="w-full px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="w-4 h-4 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest">{group.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/20 group-hover:text-primary transition-transform ${openGroups.includes(group.name) ? '' : '-rotate-90'}`} />
                </button>
                
                {openGroups.includes(group.name) && (
                  <div className="space-y-px bg-black/20">
                    {group.items.map((item: any, j: number) => (
                      <Link 
                        key={j} 
                        href={`/hotspots/${item.slug}`}
                        className={`w-full px-8 py-6 text-left hover:bg-white/5 transition-all relative block
                          ${slug === item.slug ? 'bg-primary/10 border-l-4 border-primary' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-black italic uppercase leading-none">{item.name}</span>
                          {item.growth && <span className="text-[9px] font-black text-verified bg-verified/10 px-2 py-0.5 rounded">{item.growth}</span>}
                          {item.tag && <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">{item.tag}</span>}
                        </div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-tight">{item.sub}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Score Guide */}
          <div className="p-8 bg-black/40 space-y-4">
             <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Investment Score Guide</h4>
             <div className="space-y-3">
               {[
                 { color: "bg-green-500", label: "High Growth (>15% YoY)" },
                 { color: "bg-blue-500", label: "Emerging Hotspot" },
                 { color: "bg-orange-500", label: "Infrastructure Pipeline" },
               ].map((guide, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className={`w-2.5 h-2.5 rounded-full ${guide.color}`} />
                   <span className="text-[10px] font-bold text-white/70">{guide.label}</span>
                 </div>
               ))}
             </div>
          </div>
        </aside>

        {/* Main Center: Interactive Map */}
        <div className="flex-1 relative bg-[#E2E8F0] overflow-hidden group">
          {/* Map Simulation (Using an image for aesthetic accuracy) */}
          <img 
            src="/india_map_illustration.png" 
            alt="map" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          
          {/* Search Overlay */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
            <div className="relative group/search">
               <div className="absolute inset-0 bg-black/20 blur-xl rounded-2xl opacity-0 group-hover-search:opacity-100 transition-opacity" />
               <div className="relative flex items-center bg-[#0F172A] rounded-2xl p-2 shadow-2xl border border-white/10">
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <input 
                    placeholder="Jump to region, state or project..." 
                    className="flex-1 bg-transparent border-none outline-none text-white px-4 text-[13px] font-bold placeholder:text-white/30"
                  />
                  <button className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all">
                    <Search className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-3">
             <button className="w-12 h-12 bg-[#0F172A] text-white rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <LocateFixed className="w-5 h-5" />
             </button>
             <div className="flex flex-col bg-[#0F172A] rounded-2xl border border-white/10 overflow-hidden">
                <button className="w-12 h-12 text-white flex items-center justify-center hover:bg-white/10 border-b border-white/5 font-black text-xl leading-none">+</button>
                <button className="w-12 h-12 text-white flex items-center justify-center hover:bg-white/10 font-black text-xl leading-none">-</button>
             </div>
             <button className="w-12 h-12 bg-[#0F172A] text-white rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center hover:bg-primary transition-all">
                <Layers className="w-5 h-5" />
             </button>
          </div>

          {/* Right Floating: Detail Panel */}
          <div className="absolute top-1/2 -translate-y-1/2 right-12 w-full max-w-md animate-in slide-in-from-right-10 duration-700">
             <div className="bg-[#0F172A]/95 backdrop-blur-xl rounded-[48px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden">
                   <img src="/hotspots/airport-proximity.png" className="w-full h-full object-cover" alt="Hub thumbnail" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
                   <button className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
                     <X className="w-4 h-4" />
                   </button>
                   <div className="absolute bottom-6 left-8">
                      <span className="bg-primary text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full italic">Active Focus</span>
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mt-2">{currentHub.name}</h3>
                   </div>
                </div>

                {/* Metrics */}
                <div className="p-8 space-y-8">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Market Rate</p>
                        <div className="flex items-end gap-2 text-white">
                           <span className="text-2xl font-black italic leading-none">₹{currentHub.rate}</span>
                           <span className="text-[10px] font-bold text-white/40 mb-1">/ sq.ft</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Growth Forecast</p>
                        <div className="flex items-center gap-2 text-verified">
                           <TrendingUp className="w-5 h-5" />
                           <span className="text-2xl font-black italic">{currentHub.growth}</span>
                        </div>
                      </div>
                   </div>

                   {/* Drivers */}
                   <div className="space-y-5 px-1">
                      <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Key Infrastructure Drivers</h4>
                      <div className="space-y-6">
                        {currentHub.drivers.map((driver, i) => (
                          <div key={i} className="flex items-start gap-4 group/item">
                             <div className="mt-1 w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover-item:bg-primary transition-colors">
                                <driver.icon className="w-4 h-4 text-primary group-hover-item:text-white transition-colors" />
                             </div>
                             <p className="text-[13px] font-bold text-white/70 leading-relaxed italic">{driver.label}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Main Action */}
                   <Link href={`/buy?locality=${currentHub.name}`} className="block">
                     <Button className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[13px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        Explore Available Plots <ArrowRight className="w-5 h-5" />
                     </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
