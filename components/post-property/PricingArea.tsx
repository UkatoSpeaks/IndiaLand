"use client";

import { Check, ArrowLeft, ChevronRight, LayoutGrid, Ruler, IndianRupee, Sparkles, ShieldCheck, Map, Fence } from "lucide-react";
import { PropertyData } from "@/app/post-property/page";
import { Button } from "@/components/ui/Button";

interface StepProps {
  data: PropertyData;
  updateData: (data: Partial<PropertyData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PricingArea({ data, updateData, onNext, onBack }: StepProps) {
  const units = ["Sq Ft", "Gaj", "Cents", "Acres"];
  const amenities = [
    { id: "Gated Community", icon: ShieldCheck, label: "Gated Community" },
    { id: "Corner Plot", icon: Map, label: "Corner Plot" },
    { id: "Boundary Wall", icon: Fence, label: "Boundary Wall" },
  ];

  const toggleAmenity = (id: string) => {
    const current = [...data.amenities];
    if (current.includes(id)) {
      updateData({ amenities: current.filter((a) => a !== id) });
    } else {
      updateData({ amenities: [...current, id] });
    }
  };

  const calculatePerUnit = () => {
    const p = parseFloat(data.price.replace(/,/g, ""));
    const a = parseFloat(data.area);
    if (!isNaN(p) && !isNaN(a) && a > 0) {
      return Math.round(p / a).toLocaleString();
    }
    return "0";
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">Property Details</h1>
        <p className="text-text-secondary font-medium">Add your plot dimensions and expected price to reach potential buyers.</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-border-subtle shadow-xl space-y-12">
        {/* Plot Area */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <Ruler className="w-5 h-5 text-primary" /> Plot Area
              </label>
              <input 
                type="number"
                value={data.area}
                onChange={(e) => updateData({ area: e.target.value })}
                placeholder="e.g., 1200"
                className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-bold outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-text-primary">Unit of Measurement</label>
              <div className="flex bg-section/50 p-1.5 rounded-2xl border border-border-subtle">
                {units.map((u) => (
                  <button
                    key={u}
                    onClick={() => updateData({ unit: u })}
                    className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                      data.unit === u 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-text-primary">
              <IndianRupee className="w-5 h-5 text-primary" /> Total Expected Price (₹)
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-text-muted text-lg">₹</span>
              <input 
                type="text"
                value={data.price}
                onChange={(e) => updateData({ price: e.target.value })}
                placeholder="50,00,000"
                className="w-full h-16 bg-section/50 rounded-2xl border border-border-subtle pl-12 pr-6 text-xl font-bold outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2 px-2">
               <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-primary" />
               </div>
               <p className="text-xs font-bold text-primary">Price Breakdown: ₹{calculatePerUnit()} per {data.unit}</p>
            </div>
          </div>
        </div>

        {/* Key Amenities */}
        <div className="space-y-8">
          <div className="space-y-1">
             <h3 className="text-lg font-bold text-text-primary">Key Amenities</h3>
             <p className="text-xs font-medium text-text-secondary italic">Select features that add value to your plot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {amenities.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAmenity(a.id)}
                className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-4 group ${
                  data.amenities.includes(a.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border-subtle bg-white hover:border-primary/30'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  data.amenities.includes(a.id) ? 'bg-primary text-white' : 'bg-section text-text-muted group-hover:text-primary'
                }`}>
                   <a.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-base font-bold text-text-primary">{a.label}</p>
                   {data.amenities.includes(a.id) && (
                     <div className="mt-2 text-primary flex items-center justify-center gap-1">
                        <Check className="w-3 h-3 stroke-[3px]" />
                        <span className="text-[10px] font-black uppercase">Selected</span>
                     </div>
                   )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button onClick={onBack} variant="outline" size="lg" className="rounded-2xl px-10 h-16 border-2 font-bold text-text-primary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button 
          disabled={!data.area || !data.price}
          onClick={onNext}
          size="lg" 
          className="rounded-2xl px-12 h-16 font-bold shadow-xl shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Media & Legal <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
