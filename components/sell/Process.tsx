"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    title: "Post Property Details",
    description: "Upload high-res photos, location tags, and dimensions in under 5 minutes.",
  },
  {
    title: "Get Verified Leads",
    description: "Directly chat with interested buyers on WhatsApp or through our secure portal.",
  },
  {
    title: "Close the Deal",
    description: "Finalize paperwork with legal assistance and receive your payment securely.",
  },
];

export function Process() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
                Simple 3-Step Process <br className="hidden md:block" /> to Sell Your Land
              </h2>
              <p className="text-lg text-text-secondary font-medium italic">
                We've simplified real estate. No more running around, manage everything from your dashboard.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold border-4 border-primary/20 shadow-lg group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div className="bg-section/30 p-8 rounded-3xl border border-border-subtle flex-1 hover:border-primary/30 transition-all hover:bg-white hover:shadow-xl group-hover:-translate-x-2 transition-transform duration-500">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{step.title}</h3>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed italic">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Mockup */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[60px] p-4 bg-primary/5 border border-primary/10 shadow-inner">
               <Image 
                src="/phone-mockup.png" 
                alt="App Interface" 
                width={600} 
                height={800} 
                className="w-full h-auto rounded-[50px] shadow-2xl relative z-10"
              />
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
