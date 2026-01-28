"use client";

import { MapPin, CheckCircle2, Train, Car, Ruler, Compass, HardHat, Phone, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ListingProps {
  id: string;
  image: string;
  title: string;
  location: string;
  subLocation?: string;
  price: string;
  pricePerSqft: string;
  area: string;
  units?: string;
  type: string;
  facing: string;
  status: string;
  isRera?: boolean;
  khataType?: "A Khata" | "B Khata" | "DC Converted";
  connectivity: {
    metro?: string;
    highway?: string;
    airport?: string;
  };
  isNewLaunch?: boolean;
}

export function ListingCard({
  id,
  image,
  title,
  location,
  subLocation,
  price,
  pricePerSqft,
  area,
  units,
  type,
  facing,
  status,
  isRera,
  khataType,
  connectivity,
  isNewLaunch,
}: ListingProps) {
  return (
    <div className="bg-white rounded-3xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {isRera && (
            <div className="bg-verified text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              RERA APPROVED
            </div>
          )}
          {khataType && (
            <div className="bg-info text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
              {khataType}
            </div>
          )}
          {isNewLaunch && (
            <div className="bg-warning text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm">
              NEW LAUNCH
            </div>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-primary px-4 py-2 rounded-xl text-white font-extrabold text-xl shadow-2xl">
            {price}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-extrabold text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span className="text-sm font-medium line-clamp-1">{subLocation || location}</span>
          </div>
        </div>

        {/* Connectivity Tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          {connectivity.metro && (
            <div className="flex items-center gap-1.5 bg-section px-2.5 py-1.5 rounded-xl border border-border-subtle">
              <Train className="w-3.5 h-3.5 text-info" />
              <span className="text-[11px] font-bold text-text-secondary">{connectivity.metro}</span>
            </div>
          )}
          {connectivity.highway && (
            <div className="flex items-center gap-1.5 bg-section px-2.5 py-1.5 rounded-xl border border-border-subtle">
              <Car className="w-3.5 h-3.5 text-warning" />
              <span className="text-[11px] font-bold text-text-secondary">{connectivity.highway}</span>
            </div>
          )}
          {connectivity.airport && (
            <div className="flex items-center gap-1.5 bg-section px-2.5 py-1.5 rounded-xl border border-border-subtle">
              <Car className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold text-text-secondary">{connectivity.airport}</span>
            </div>
          )}
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-px bg-border-subtle/30 rounded-2xl border border-border-subtle/50 overflow-hidden mb-8">
          <div className="bg-section/50 p-4 space-y-1">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Dimension</span>
            <span className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Ruler className="w-3.5 h-3.5 text-primary/40" />
              {area} {units || "sq.ft"}
            </span>
          </div>
          <div className="bg-section/50 p-4 space-y-1">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Price / Sq.ft</span>
            <span className="text-sm font-bold text-text-primary">₹{pricePerSqft}</span>
          </div>
          <div className="bg-section/50 p-4 space-y-1">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Facing</span>
            <span className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-primary/40" />
              {facing.split(' ')[0]}
            </span>
          </div>
          <div className="bg-section/50 p-4 space-y-1">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Status</span>
            <span className="text-sm font-bold text-verified flex items-center gap-2 capitalize">
              <HardHat className="w-3.5 h-3.5" />
              {status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold text-primary border-primary/10 hover:bg-primary-light">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </Button>
          <Link href={`/buy/${id}`} className="flex-1">
            <Button variant="primary" className="w-full rounded-xl h-12 font-bold shadow-lg shadow-primary/20">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
