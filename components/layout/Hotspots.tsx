"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const hotspots = [
  { name: "North Bangalore", image: "/hotspot-bangalore.jpg" },
  { name: "Navi Mumbai", image: "/hotspot-mumbai.jpg" },
  { name: "New Gurgaon", image: "/hotspot-gurgaon.jpg" },
  { name: "Hinjewadi Pune", image: "/hotspot-pune.jpg" },
  { name: "OMR Chennai", image: "/hotspot-chennai.jpg" },
  { name: "Gachibowli", image: "/hotspot-hyderabad.jpg" },
];

export function Hotspots() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Investment Hotspots</h2>
          <p className="text-sm text-text-secondary">Rapidly developing regions in India</p>
        </div>
        <Link 
          href="/hotspots" 
          className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
        >
          View all regions
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {hotspots.map((city, i) => (
          <Link 
            key={i} 
            href={`/search?city=${city.name}`}
            className="flex flex-col items-center gap-4 group min-w-[120px]"
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-lg">
              <img 
                src={`${city.image}?v=1`} 
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <span className="text-sm font-bold text-text-primary text-center group-hover:text-primary transition-colors">
              {city.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
