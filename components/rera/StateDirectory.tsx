import { useState } from "react";
import { Search, Map as MapIcon, ChevronRight, Info } from "lucide-react";

export function StateDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allStates = [
    { id: "MH", name: "MahaRERA", region: "Maharashtra", url: "https://maharera.mahaonline.gov.in/" },
    { id: "KA", name: "K-RERA", region: "Karnataka", url: "https://rera.karnataka.gov.in/" },
    { id: "GJ", name: "GujRERA", region: "Gujarat", url: "https://gujrera.gujarat.gov.in/" },
    { id: "UP", name: "UP-RERA", region: "Uttar Pradesh", url: "https://www.up-rera.in/" },
    { id: "TN", name: "TNRERA", region: "Tamil Nadu", url: "https://www.rera.tn.gov.in/" },
    { id: "HR", name: "HRERA", region: "Haryana", url: "https://haryanarera.gov.in/" },
    { id: "RJ", name: "RajRERA", region: "Rajasthan", url: "https://rera.rajasthan.gov.in/" },
    { id: "MP", name: "MPRERA", region: "Madhya Pradesh", url: "https://rera.mp.gov.in/" },
    { id: "TS", name: "TS RERA", region: "Telangana", url: "https://rera.telangana.gov.in/" },
  ];

  const filteredStates = allStates.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    state.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-text-primary tracking-tight">State-wise RERA Directory</h2>
          <p className="text-sm font-medium text-text-secondary italic">Access official state portals directly for legal verification.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-primary/10 transition-all">
          View Interactive Map <MapIcon className="w-3 h-3" />
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search your state (e.g. Maharashtra, Karnataka...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-16 bg-white rounded-2xl border border-border-subtle pl-16 pr-6 text-base font-bold outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 shadow-sm transition-all"
        />
      </div>

      {filteredStates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStates.map((state) => (
            <a 
              key={state.id}
              href={state.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-white rounded-3xl border border-border-subtle hover:border-primary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-section flex items-center justify-center text-text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all">
                {state.id}
              </div>
              <div className="space-y-0.5 flex-1">
                <h4 className="text-base font-black text-text-primary tracking-tight group-hover:text-primary transition-colors">{state.name}</h4>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{state.region}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-all group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-[40px] border border-dashed border-border-subtle">
           <div className="w-16 h-16 bg-section rounded-full flex items-center justify-center text-text-muted">
              <Info className="w-8 h-8" />
           </div>
           <div className="space-y-1">
              <p className="text-lg font-bold text-text-primary">No directory found</p>
              <p className="text-sm text-text-muted">We couldn't find a RERA portal matching "{searchQuery}"</p>
           </div>
           <button onClick={() => setSearchQuery("")} className="text-sm font-black text-primary underline underline-offset-4">Clear Search</button>
        </div>
      )}
    </div>
  );
}
