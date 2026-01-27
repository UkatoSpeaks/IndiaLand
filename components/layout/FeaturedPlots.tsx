"use client";

import { PropertyCard } from "../ui/PropertyCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const properties = [
  {
    image: "/property-bangalore.jpg",
    title: "Green Meadows Phase II",
    location: "Devanahalli, Bangalore",
    price: "₹85.5 L",
    pricePerSqft: "Starting Price",
    area: "1,200 sq.ft",
    type: "Residential",
    isRera: true,
    isVerified: true
  },
  {
    image: "/property-pune.jpg",
    title: "Sahyadri Hills Estate",
    location: "Mulshi, Pune",
    price: "₹1.2 Cr",
    pricePerSqft: "Total Price",
    area: "200 Guj",
    type: "Farmhouse",
    isRera: true,
    isFeatured: true
  },
  {
    image: "/property-hyderabad.jpg",
    title: "Cyber Corridor Plots",
    location: "Gachibowli, Hyderabad",
    price: "₹3.5 Cr",
    pricePerSqft: "Total Price",
    area: "500 sq.ft",
    type: "Commercial",
    isRera: true
  }
];

export function FeaturedPlots() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-[28px] font-bold text-text-primary mb-1">Premium Featured Plots</h2>
          <p className="text-sm text-text-secondary font-medium">Directly from top Indian developers</p>
        </div>
        <Link 
          href="#" 
          className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
        >
          View all plots
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop, i) => (
          <PropertyCard key={i} {...prop} />
        ))}
      </div>
    </section>
  );
}
