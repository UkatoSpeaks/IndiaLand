"use client";

import { PropertyCard } from "../ui/PropertyCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  },
  {
    image: "/property-delhi.jpg",
    title: "Yamuna Expressway Plots",
    location: "Greater Noida, Delhi NCR",
    price: "₹45.0 L",
    pricePerSqft: "Starting Price",
    area: "150 sq.yd",
    type: "Residential",
    isRera: true,
    isVerified: true
  },
  {
    image: "/property-goa.jpg",
    title: "Beachside Palms",
    location: "Anjuna, North Goa",
    price: "₹2.8 Cr",
    pricePerSqft: "Total Price",
    area: "4,500 sq.ft",
    type: "Villa Plot",
    isFeatured: true
  },
  {
    image: "/property-ahmedabad.jpg",
    title: "GIFT City Smart Plots",
    location: "Gandhinagar, Ahmedabad",
    price: "₹1.5 Cr",
    pricePerSqft: "Starting Price",
    area: "300 sq.yd",
    type: "Commercial/Res",
    isRera: true,
    isVerified: true
  }
];

export function FeaturedPlots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= properties.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 3 : prev - 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-[28px] font-bold text-text-primary mb-1">Premium Featured Plots</h2>
          <p className="text-sm text-text-secondary font-medium">Directly from top Indian developers</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-border-subtle bg-white text-text-primary hover:border-primary hover:text-primary transition-all shadow-sm"
              aria-label="Previous plots"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-border-subtle bg-white text-text-primary hover:border-primary hover:text-primary transition-all shadow-sm"
              aria-label="Next plots"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Link 
            href="#" 
            className="hidden md:flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors ml-4"
          >
            View all plots
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-700 ease-in-out gap-8"
          style={{ transform: `translateX(-${currentIndex * (100 / (properties.length / 2))}% )` }}
        >
          {properties.map((prop, i) => (
            <div key={i} className="min-w-full md:min-w-[calc(33.333%-22px)] flex-shrink-0">
              <PropertyCard {...prop} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: properties.length - 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === i ? "w-8 bg-primary" : "w-1.5 bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
