import { MapPin, Activity, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function InteractiveMapSection() {
  return (
    <div className="relative h-[500px] rounded-[54px] overflow-hidden shadow-2xl group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 border-8 border-white">
      {/* India Map Background */}
      <img 
        src="/india_map_illustration.png" 
        alt="India Map" 
        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
      />
      
      {/* Overlay with Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-12 text-center">
        <div className="space-y-6 max-w-xl">
           <div className="flex justify-center gap-4">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center gap-2 animate-bounce">
                 <Activity className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-[#003B73]">Live Data: ON</span>
              </div>
           </div>
           
           <h3 className="text-4xl font-black text-[#003B73] tracking-tighter leading-tight drop-shadow-sm">
             Explore RERA Stats <br /> <span className="text-primary italic">Across Every State</span>
           </h3>
           
           <Button className="h-16 px-10 bg-[#003B73] text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,59,115,0.4)] flex items-center gap-3 transition-all mx-auto">
             <MapPin className="w-6 h-6" /> Open Interactive Dashboard
           </Button>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
           <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-xl space-y-1 text-left">
              <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Compliance Rate</p>
              <p className="text-xl font-black text-[#003B73]">94.2%</p>
           </div>
           <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-xl space-y-1 text-right">
              <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Active Projects</p>
              <p className="text-xl font-black text-primary">12,480+</p>
           </div>
        </div>
      </div>

      {/* State Pulsing Markers */}
      <div className="absolute top-[35%] left-[30%] group/pin cursor-pointer">
         <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75" />
         <div className="w-4 h-4 bg-primary rounded-full relative shadow-lg border-2 border-white" />
         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-2xl border border-border-subtle whitespace-nowrap">
               <p className="text-[10px] font-black text-[#003B73]">MAHARASHTRA: <span className="text-verified">HIGH</span></p>
            </div>
         </div>
      </div>

      <div className="absolute top-[55%] left-[45%] group/pin cursor-pointer delay-150">
         <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75" />
         <div className="w-4 h-4 bg-primary rounded-full relative shadow-lg border-2 border-white" />
         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-2xl border border-border-subtle whitespace-nowrap">
               <p className="text-[10px] font-black text-[#003B73]">KARNATAKA: <span className="text-verified">HIGH</span></p>
            </div>
         </div>
      </div>
    </div>
  );
}
