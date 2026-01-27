"use client";

import Image from "next/image";
import { MapPin, Ruler, Home, CheckCircle } from "lucide-react";
import { Button } from "./Button";

interface PropertyProps {
  image: string;
  title: string;
  location: string;
  price: string;
  pricePerSqft?: string;
  area: string;
  type: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  isRera?: boolean;
}

export function PropertyCard({ 
  image, 
  title, 
  location, 
  price, 
  pricePerSqft, 
  area, 
  type, 
  isVerified, 
  isFeatured,
  isRera 
}: PropertyProps) {
  return (
    <div className="bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isRera && (
            <div className="bg-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" />
              RERA APPROVED
            </div>
          )}
          {isVerified && (
            <div className="bg-[#10B981] text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              VERIFIED OWNER
            </div>
          )}
          {isFeatured && (
            <div className="bg-[#1e293b]/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm uppercase">
              Featured
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-extrabold text-primary">{price}</div>
            {pricePerSqft && <div className="text-[10px] text-text-muted font-bold uppercase">{pricePerSqft}</div>}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-text-secondary mb-6">
          <MapPin className="w-4 h-4 text-primary/60" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-section flex items-center justify-center text-primary">
              <Ruler className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider leading-none mb-1">Area</span>
              <span className="text-sm font-bold text-text-primary leading-none">{area}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-section flex items-center justify-center text-primary">
              <Home className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider leading-none mb-1">Type</span>
              <span className="text-sm font-bold text-text-primary leading-none">{type}</span>
            </div>
          </div>
        </div>

        {/* Action */}
        <Button variant="outline" className="w-full mt-auto font-bold text-primary border-primary/20 hover:border-primary hover:bg-primary-light h-12 rounded-xl">
          View Detailed Plan
        </Button>
      </div>
    </div>
  );
}
