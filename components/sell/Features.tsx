"use client";

import { ShieldCheck, Headset, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Verified Buyers",
    description: "We filter out the noise and only connect you with genuine, KYC verified buyers through our internal screening process.",
    icon: ShieldCheck,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Dedicated Manager",
    description: "Get expert guidance from a dedicated professional who helps you with valuation, paperwork and closing the deal faster.",
    icon: Headset,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "High Visibility",
    description: "Our smart algorithms ensure your plot stays at the top of search results, reaching targeted buyers in your specific location.",
    icon: TrendingUp,
    color: "bg-orange-500/10 text-orange-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-section/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Why Sell with Us?</h2>
          <p className="text-lg text-text-secondary font-medium italic">
            Experience a hassle-free selling journey with India's most advanced land marketing tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-[40px] border border-border-subtle shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">{feature.title}</h3>
              <p className="text-base text-text-secondary leading-relaxed font-medium italic">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
