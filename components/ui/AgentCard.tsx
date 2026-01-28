"use client";

import { CheckCircle, Star, Phone, MessageSquare } from "lucide-react";
import { Button } from "./Button";

interface AgentProps {
  name: string;
  image: string;
  role: string;
  city: string;
  experience: string;
  rating: number;
  propertiesHandled: number;
  isVerified?: boolean;
  specialization: string[];
  languages: string[];
}

export function AgentCard({
  name,
  image,
  role,
  city,
  experience,
  rating,
  propertiesHandled,
  isVerified = true,
  specialization,
  languages,
}: AgentProps) {
  return (
    <div className="bg-white rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 group flex flex-col h-full relative">
      <div className="p-6 flex flex-col items-center text-center">
        {/* Profile Image with Verified Badge */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-light shadow-inner group-hover:border-primary/20 transition-colors">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
              <CheckCircle className="w-6 h-6 text-[#10B981] fill-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-lg font-bold text-text-primary mb-0.5 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-primary font-semibold mb-3 tracking-wide">{role}</p>
        
        <div className="flex items-center gap-1.5 mb-5 bg-section px-3 py-1 rounded-full border border-border-subtle group-hover:border-primary/20 transition-colors">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-sm font-bold text-text-primary">{rating}</span>
          <span className="text-xs text-text-secondary font-medium">• {propertiesHandled} Listings</span>
        </div>

        {/* Specialization & Languages */}
        <div className="w-full mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap justify-center gap-1.5">
            {specialization.map((spec) => (
              <span key={spec} className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-md font-bold uppercase tracking-tight">
                {spec}
              </span>
            ))}
          </div>
          <div className="text-[11px] text-text-secondary">
            <span className="font-bold text-text-muted mr-1">Languages:</span>
            {languages.join(", ")}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full py-4 border-t border-gray-50 mb-6">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-0.5">Experience</span>
            <span className="text-sm font-bold text-text-primary">{experience}</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-0.5">Location</span>
            <span className="text-sm font-bold text-text-primary">{city}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full mt-auto">
          <Button variant="primary" className="flex-1 h-11 rounded-xl text-xs sm:text-sm group-hover:bg-primary-dark transition-colors">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" className="flex-1 h-11 rounded-xl text-xs sm:text-sm border-primary/20 text-primary hover:bg-primary-light">
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
      
      {/* Decorative hover line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
