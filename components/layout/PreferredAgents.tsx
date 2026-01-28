"use client";

import { useState, useEffect, useRef } from "react";
import { AgentCard } from "../ui/AgentCard";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad"];

const agentsData = {
  Bangalore: [
    {
      name: "Rajesh Kumar",
      image: "/agents/agent1.png",
      role: "Senior Land Consultant",
      city: "Bangalore",
      experience: "12+ Years",
      rating: 4.9,
      propertiesHandled: 154,
      specialization: ["Open Plots", "Industrial", "Agriculture"],
      languages: ["English", "Hindi", "Kannada"],
    },
    {
      name: "Priya Sharma",
      image: "/agents/agent2.png",
      role: "Residential Specialist",
      city: "Bangalore",
      experience: "8+ Years",
      rating: 4.8,
      propertiesHandled: 89,
      specialization: ["Villas", "Gated Community", "Apartments"],
      languages: ["English", "Hindi", "Telugu"],
    },
    {
      name: "Amit Patel",
      image: "/agents/agent3.png",
      role: "Commercial Property Expert",
      city: "Bangalore",
      experience: "15+ Years",
      rating: 5.0,
      propertiesHandled: 210,
      specialization: ["Showrooms", "Warehouse", "Tech Parks"],
      languages: ["English", "Hindi", "Gujarati"],
    },
    {
      name: "Kavita Reddy",
      image: "/agents/agent4.png",
      role: "Luxury Real Estate Advisor",
      city: "Bangalore",
      experience: "14+ Years",
      rating: 4.9,
      propertiesHandled: 120,
      specialization: ["Penthouse", "Gated Villas", "Indiranagar"],
      languages: ["English", "Kannada", "Hindi"],
    },
    {
      name: "Suresh Menon",
      image: "/agents/agent5.png",
      role: "Plot Acquisition Lead",
      city: "Bangalore",
      experience: "6+ Years",
      rating: 4.7,
      propertiesHandled: 75,
      specialization: ["North Bangalore", "Devanahalli", "BMRDA"],
      languages: ["English", "Malayalam", "Kannada"],
    },
    {
      name: "Dr. Arvind Hegde",
      image: "/agents/agent6.png",
      role: "Strategic Investment Consultant",
      city: "Bangalore",
      experience: "25+ Years",
      rating: 4.9,
      propertiesHandled: 450,
      specialization: ["Institutional Sales", "Legal Verif.", "High ROI"],
      languages: ["English", "Kannada", "Sanskrit"],
    },
  ],
  Mumbai: [
    {
      name: "Sanjay Mehta",
      image: "/agents/agent3.png",
      role: "Luxury Estate Agent",
      city: "Mumbai",
      experience: "20+ Years",
      rating: 4.9,
      propertiesHandled: 320,
      specialization: ["Penthouses", "Sea-facing", "Bungalows"],
      languages: ["English", "Hindi", "Marathi"],
    },
    {
      name: "Neha Gupta",
      image: "/agents/agent2.png",
      role: "High-rise Specialist",
      city: "Mumbai",
      experience: "6+ Years",
      rating: 4.7,
      propertiesHandled: 45,
      specialization: ["Studio Flats", "Smart Homes", "Rentals"],
      languages: ["English", "Hindi", "Punjabi"],
    },
    {
      name: "Vikram Singh",
      image: "/agents/agent1.png",
      role: "Investment Advisor",
      city: "Mumbai",
      experience: "10+ Years",
      rating: 4.8,
      propertiesHandled: 112,
      specialization: ["ROI Focused", "Commercial Land", "Redevelopment"],
      languages: ["English", "Hindi", "Bengali"],
    },
    {
      name: "Anjali Deshmukh",
      image: "/agents/agent4.png",
      role: "Corporate Lease Expert",
      city: "Mumbai",
      experience: "11+ Years",
      rating: 4.8,
      propertiesHandled: 130,
      specialization: ["BKC", "Powai", "Offices"],
      languages: ["English", "Marathi", "Hindi"],
    },
    {
      name: "Rahul Kothari",
      image: "/agents/agent5.png",
      role: "Resale Specialist",
      city: "Mumbai",
      experience: "5+ Years",
      rating: 4.6,
      propertiesHandled: 55,
      specialization: ["Andheri", "Borivali", "Interiors"],
      languages: ["English", "Gujarati", "Hindi"],
    },
    {
      name: "Pratap Salve",
      image: "/agents/agent6.png",
      role: "Redevelopment Consultant",
      city: "Mumbai",
      experience: "22+ Years",
      rating: 4.9,
      propertiesHandled: 180,
      specialization: ["SRA Projects", "Chawl Redev.", "Society Law"],
      languages: ["English", "Marathi", "Hindi"],
    },
  ],
  "Delhi NCR": [
    {
      name: "Anil Verma",
      image: "/agents/agent1.png",
      role: "Plot & Land Specialist",
      city: "Delhi NCR",
      experience: "14+ Years",
      rating: 4.9,
      propertiesHandled: 178,
      specialization: ["HUDA Plots", "Farmhouses", "Commercial Plots"],
      languages: ["English", "Hindi", "Haryanvi"],
    },
    {
      name: "Meenakshi Iyer",
      image: "/agents/agent2.png",
      role: "Residential Advisor",
      city: "Delhi NCR",
      experience: "9+ Years",
      rating: 4.8,
      propertiesHandled: 92,
      specialization: ["Builder Floors", "Kothis", "Resale"],
      languages: ["English", "Hindi", "Tamil"],
    },
    {
      name: "Rohan Khanna",
      image: "/agents/agent3.png",
      role: "Commercial Consultant",
      city: "Delhi NCR",
      experience: "11+ Years",
      rating: 4.7,
      propertiesHandled: 105,
      specialization: ["Office Space", "Retail Outlets", "Malls"],
      languages: ["English", "Hindi", "Urdu"],
    },
    {
      name: "Poonam Tyagi",
      image: "/agents/agent4.png",
      role: "Gaur City Expert",
      city: "Noida",
      experience: "12+ Years",
      rating: 4.8,
      propertiesHandled: 140,
      specialization: ["Noida Extension", "Ready-to-move", "Greenery"],
      languages: ["English", "Hindi", "Pahadi"],
    },
    {
      name: "Aditya Bansal",
      image: "/agents/agent5.png",
      role: "Gurgaon High-street Lead",
      city: "Gurgaon",
      experience: "7+ Years",
      rating: 4.7,
      propertiesHandled: 82,
      specialization: ["Golf Course Road", "Cyber Hub", "Startups"],
      languages: ["English", "Hindi", "Marwari"],
    },
    {
      name: "Jagdish Chawla",
      image: "/agents/agent6.png",
      role: "Lutyens Delhi Consultant",
      city: "New Delhi",
      experience: "30+ Years",
      rating: 5.0,
      propertiesHandled: 60,
      specialization: ["Legacy Assets", "Heritage Kothis", "Diplomatic Area"],
      languages: ["English", "Hindi", "Punjabi"],
    },
  ],
  Hyderabad: [
    {
      name: "Kiran Reddy",
      image: "/agents/agent3.png",
      role: "Smart City Expert",
      city: "Hyderabad",
      experience: "13+ Years",
      rating: 5.0,
      propertiesHandled: 198,
      specialization: ["HITEC City", "Gachibowli", "Plots"],
      languages: ["English", "Hindi", "Telugu"],
    },
    {
      name: "Saritha Rao",
      image: "/agents/agent2.png",
      role: "Villa Specialist",
      city: "Hyderabad",
      experience: "7+ Years",
      rating: 4.8,
      propertiesHandled: 67,
      specialization: ["Luxury Villas", "Community Living", "Kokapet"],
      languages: ["English", "Hindi", "Telugu", "Kannada"],
    },
    {
      name: "Venkat Prabhu",
      image: "/agents/agent1.png",
      role: "Industrial Land Agent",
      city: "Hyderabad",
      experience: "16+ Years",
      rating: 4.9,
      propertiesHandled: 245,
      specialization: ["Factories", "Warehouses", "Zoned Land"],
      languages: ["English", "Hindi", "Tamil"],
    },
    {
      name: "Madhavi Latha",
      image: "/agents/agent4.png",
      role: "Kukatpally Area Lead",
      city: "Hyderabad",
      experience: "10+ Years",
      rating: 4.8,
      propertiesHandled: 110,
      specialization: ["Apartments", "Retail", "Residential Plots"],
      languages: ["English", "Telugu", "Hindi"],
    },
    {
      name: "Arjun Yadav",
      image: "/agents/agent5.png",
      role: "Farmhouse Consultant",
      city: "Hyderabad",
      experience: "8+ Years",
      rating: 4.7,
      propertiesHandled: 95,
      specialization: ["Moinabad", "Chevella", "Avenue Plantation"],
      languages: ["English", "Telugu", "Hindi"],
    },
    {
      name: "Gopal Krishna Murthy",
      image: "/agents/agent6.png",
      role: "Title Research Expert",
      city: "Hyderabad",
      experience: "28+ Years",
      rating: 5.0,
      propertiesHandled: 500,
      specialization: ["Legal Audits", "Gram Panchayat", "HMDA"],
      languages: ["English", "Telugu", "Hindi", "Sanskrit"],
    },
  ],
};

export function PreferredAgents() {
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentAgents = agentsData[selectedCity as keyof typeof agentsData];
  const totalSlides = currentAgents.length - 2; // Showing 3 at a time

  // Reset index when city changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCity]);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, selectedCity]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              IndiaLand <span className="text-primary">Preferred Agents</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Connect with the most trusted real estate experts in your city. Verified professionals with deep local market knowledge.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full border border-border-subtle bg-white text-text-primary hover:border-primary hover:text-primary transition-all shadow-sm"
                aria-label="Previous agents"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full border border-border-subtle bg-white text-text-primary hover:border-primary hover:text-primary transition-all shadow-sm"
                aria-label="Next agents"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link
              href="#"
              className="hidden md:flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors group ml-4"
            >
              Become a Preferred Agent
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* City Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border-subtle pb-4">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedCity === city
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-section text-text-secondary hover:bg-primary-light hover:text-primary"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Agents Carousel */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex transition-transform duration-700 ease-in-out gap-8"
            style={{ transform: `translateX(-${currentIndex * (100 / 3.03)}%)` }}
          >
            {currentAgents.map((agent, index) => (
              <div 
                key={`${selectedCity}-${agent.name}`} 
                className="min-w-full md:min-w-[calc(33.333%-22px)] flex-shrink-0"
              >
                <AgentCard {...agent} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
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

        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6 italic">
            "Searching for the right plot becomes effortless when you have the right expert by your side."
          </p>
          <button className="bg-primary-light text-primary font-bold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
            View All {selectedCity} Agents
          </button>
        </div>
      </div>
    </section>
  );
}
