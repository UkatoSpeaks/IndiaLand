"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sell/Hero";
import { Features } from "@/components/sell/Features";
import { Process } from "@/components/sell/Process";
import { Testimonials } from "@/components/sell/Testimonials";
import { Pricing } from "@/components/sell/Pricing";
import { CTABanner } from "@/components/sell/CTABanner";

export default function SellPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Process />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
