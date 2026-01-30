"use client";

import { Check, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const plans = [
  {
    name: "Free Listing",
    price: "0",
    description: "Perfect for individual owners starting out.",
    features: [
      { name: "1 Property Listing", included: true },
      { name: "Standard Visibility", included: true },
      { name: "Dashboard Access", included: true },
      { name: "Relationship Manager", included: false },
      { name: "Social Media Promotion", included: false },
    ],
    cta: "Start for Free",
    variant: "secondary" as const,
  },
  {
    name: "Premium Gold",
    price: "4,999",
    description: "Sell 2x faster with expert support.",
    popular: true,
    features: [
      { name: "Featured 'VIP' Badge", included: true },
      { name: "Priority Search Placement", included: true },
      { name: "Dedicated RM Assistance", included: true },
      { name: "Social Media Ad Campaign", included: true },
      { name: "Legal Draft Template Pack", included: true },
    ],
    cta: "Get Premium",
    variant: "primary" as const,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Listing Plans</h2>
          <p className="text-lg text-text-secondary font-medium italic">
            Choose the plan that fits your selling speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bg-white p-10 md:p-12 rounded-[48px] border-2 transition-all duration-500 flex flex-col ${
                plan.popular 
                ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                : 'border-border-subtle hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-xl">
                  <Zap className="w-4 h-4 fill-white" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p className="text-sm font-medium text-text-secondary italic">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-4xl md:text-5xl font-bold text-text-primary">₹{plan.price}</span>
                {plan.price !== "0" && <span className="text-sm font-bold text-text-muted italic">/listing</span>}
              </div>

              <ul className="space-y-6 mb-12 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      feature.included ? 'bg-primary/20 text-primary' : 'bg-section text-text-muted'
                    }`}>
                      {feature.included ? <Check className="w-4 h-4 stroke-[3px]" /> : <X className="w-3 h-3" />}
                    </div>
                    <span className={`text-base font-medium ${feature.included ? 'text-text-primary' : 'text-text-muted italic'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/post-property" className="w-full">
                <Button 
                  variant={plan.variant} 
                  className={`w-full h-16 rounded-2xl text-lg font-bold ${
                    plan.popular ? 'shadow-xl shadow-primary/20' : 'border-2'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
