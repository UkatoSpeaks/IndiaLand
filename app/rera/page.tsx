"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReraHero } from "@/components/rera/ReraHero";
import { StateDirectory } from "@/components/rera/StateDirectory";
import { BuyerChecklist } from "@/components/rera/BuyerChecklist";
import { ReraSidebar } from "@/components/rera/ReraSidebar";
import { InteractiveMapSection } from "@/components/rera/InteractiveMapSection";

export default function ReraGuidePage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main className="pb-24">
        <ReraHero />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            <StateDirectory />
            <BuyerChecklist />
            <InteractiveMapSection />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4">
            <ReraSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
