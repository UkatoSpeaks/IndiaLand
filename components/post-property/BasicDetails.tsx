"use client";

import { Home, Building2, Tractor, MapPin, Search, Navigation, ChevronRight } from "lucide-react";
import { PropertyData } from "@/app/post-property/page";
import { Button } from "@/components/ui/Button";

interface StepProps {
  data: PropertyData;
  updateData: (data: Partial<PropertyData>) => void;
  onNext: () => void;
}

export function BasicDetails({ data, updateData, onNext }: StepProps) {
  const types = [
    { id: "Residential", icon: Home, label: "Residential", subtitle: "Housing, Villas, Apartments" },
    { id: "Commercial", icon: Building2, label: "Commercial", subtitle: "Offices, Retail, Warehouses" },
    { id: "Agricultural", icon: Tractor, label: "Agricultural", subtitle: "Farmland, Plantations" },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-text-primary">Post Your Property</h1>
        <p className="text-text-secondary font-medium">
          Let's start with the basics. Reach thousands of potential buyers by providing accurate details about your land.
        </p>
      </div>

      {/* Property Title */}
      <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold">T</div>
          <h3 className="text-xl font-bold text-text-primary">Property Title</h3>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Give your property a catchy and descriptive title</p>
          <input 
            type="text"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="e.g., 2000 sq.ft Residential Plot in Whitefield, Bangalore"
            className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <p className="text-[10px] text-text-muted font-bold italic">Suggested: {`{Size} {Type} in {Locality}, {City}`}</p>
        </div>
      </div>

      {/* Type of Land */}
      <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
               <div className="w-2 h-2 rounded-sm bg-current" />
               <div className="w-2 h-2 rounded-sm bg-current opacity-40" />
               <div className="w-2 h-2 rounded-sm bg-current opacity-40" />
               <div className="w-2 h-2 rounded-sm bg-current" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-primary">Type of Land</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => updateData({ type: type.id })}
              className={`p-6 rounded-2xl border-2 text-center transition-all group ${
                data.type === type.id 
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
                : 'border-border-subtle hover:border-primary/30 bg-white'
              }`}
            >
              <type.icon className={`w-10 h-10 mx-auto mb-4 transition-colors ${
                data.type === type.id ? 'text-primary' : 'text-text-muted group-hover:text-primary'
              }`} />
              <p className="text-base font-bold text-text-primary">{type.label}</p>
              <p className="text-[10px] font-bold text-text-muted uppercase mt-1">{type.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Property Location */}
      <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm space-y-8">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">Property Location</h3>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search City, Locality or Landmark in India"
              className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle pl-14 pr-44 text-base font-bold outline-none focus:border-primary transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary/20 transition-all">
              <Navigation className="w-4 h-4" /> Use Current
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase">City</label>
              <input 
                type="text"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                placeholder="e.g., Bangalore"
                className="w-full h-12 bg-section/50 rounded-xl border border-border-subtle px-5 text-sm font-bold outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase">Locality</label>
              <input 
                type="text"
                value={data.locality}
                onChange={(e) => updateData({ locality: e.target.value })}
                placeholder="e.g., Whitefield"
                className="w-full h-12 bg-section/50 rounded-xl border border-border-subtle px-5 text-sm font-bold outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative rounded-3xl overflow-hidden h-[300px] bg-section/50 border border-border-subtle">
            <img src="/map-placeholder.png" alt="Map" className="w-full h-full object-cover grayscale opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white/40 backdrop-blur-[2px]">
               <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl animate-bounce mb-4">
                  <MapPin className="w-6 h-6" />
               </div>
               <p className="text-sm font-bold text-text-primary">Drag marker to the property site</p>
               <p className="text-[10px] font-bold text-text-muted uppercase mt-1">Lat: 12.9716° N, Long: 77.5946° E</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button variant="outline" size="lg" className="rounded-2xl px-10 h-16 border-2 font-bold text-text-primary">
          Save Draft
        </Button>
        <Button 
          onClick={onNext}
          size="lg" 
          className="rounded-2xl px-12 h-16 font-bold shadow-xl shadow-primary/20 flex items-center gap-2"
        >
          Next: Property Info <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
