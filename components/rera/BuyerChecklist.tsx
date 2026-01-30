"use client";

import { UserCheck, FileText, Landmark } from "lucide-react";

export function BuyerChecklist() {
  const items = [
    {
      title: "RERA Registration Number",
      desc: "Ensure the 15-digit registration number is clearly mentioned on all advertisements and marketing material.",
      icon: UserCheck,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Standard Allotment Letter",
      desc: "The allotment letter must be in the model format prescribed by the State RERA authority to avoid hidden clauses.",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Escrow Account Details",
      desc: "Check if 70% of buyer funds are deposited into a dedicated RERA-compliant escrow account for project development.",
      icon: Landmark,
      color: "bg-verified/10 text-verified",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500">
      <h2 className="text-3xl font-black text-text-primary tracking-tight">Checklist for Buyers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="p-8 bg-white rounded-[40px] border border-border-subtle shadow-xl space-y-8 group hover:border-primary/30 transition-all">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-text-primary italic leading-tight">{item.title}</h4>
              <p className="text-sm font-medium text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
