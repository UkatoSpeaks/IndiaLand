"use client";

import Link from "next/link";
import { TrendingUp, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HotspotCardProps {
  region: string;
  subRegion: string;
  price: string;
  growth: string;
  tag: string;
  tagColor: string;
  image: string;
}

export function HotspotCard({ 
  region, 
  subRegion, 
  price, 
  growth, 
  tag, 
  tagColor, 
  image 
}: HotspotCardProps) {
  return (
    <div className="bg-white rounded-[40px] border border-border-subtle overflow-hidden shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
      {/* Image Section */}
      <div className="relative h-[240px] overflow-hidden">
        <img 
          src={image} 
          alt={region}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${tagColor}`}>
          {tag}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-black text-text-primary uppercase italic tracking-tight group-hover:text-primary transition-colors">
            {region}
          </h3>
          <p className="text-sm font-bold text-text-muted italic flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> {subRegion}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle/50">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Avg. Price</p>
            <p className="text-sm font-black text-text-primary">₹{price}<span className="text-[10px] lowercase font-bold tracking-normal opacity-60">/Sq Ft</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Annual Growth</p>
            <p className="text-sm font-black text-verified italic flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> {growth} <span className="text-[10px] uppercase opacity-60 ml-0.5">YoY</span>
            </p>
          </div>
        </div>

        <Link href={`/hotspots/${region.toLowerCase().replace(/ /g, '-').replace(/,/g, '')}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full h-14 rounded-2xl border-2 font-black uppercase tracking-widest text-[11px] group-hover:bg-primary group-hover:text-white group-hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Trends <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
