"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BasicDetails } from "@/components/post-property/BasicDetails";
import { PricingArea } from "@/components/post-property/PricingArea";
import { MediaDocs } from "@/components/post-property/MediaDocs";
import { ReviewSuccess } from "@/components/post-property/ReviewSuccess";
import { Check, ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export type PropertyData = {
  title: string;
  type: string;
  city: string;
  locality: string;
  latitude: string;
  longitude: string;
  area: string;
  unit: string;
  price: string;
  amenities: string[];
  reraNumber: string;
  files: File[];
  docs: File[];
  fileUrls: string[];
  docUrls: string[];
};

const INITIAL_DATA: PropertyData = {
  title: "",
  type: "Residential",
  city: "",
  locality: "",
  latitude: "",
  longitude: "",
  area: "",
  unit: "Sq Ft",
  price: "",
  amenities: [],
  reraNumber: "",
  files: [],
  docs: [],
  fileUrls: [],
  docUrls: [],
};

export default function PostPropertyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PropertyData>(INITIAL_DATA);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateFormData = (data: Partial<PropertyData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = [
    { id: 1, title: "Basic Details", label: "Property Type & Location" },
    { id: 2, title: "Step 2: Pricing & Area", label: "Plot Area & Pricing" },
    { id: 3, title: "Step 3: Media & Docs", label: "Photos & Legal Papers" },
    { id: 4, title: "Step 4: Published", label: "Success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                {steps[step - 1].title}
              </h2>
              <p className="text-text-muted text-xs font-medium">
                Step {step} of 4: {steps[step - 1].label}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-primary">
                {step === 4 ? "100%" : `${(step - 1) * 33}%`} Complete
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-border-subtle rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: step === 4 ? "100%" : `${(step - 1) * 33}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {step === 1 && (
            <BasicDetails data={formData} updateData={updateFormData} onNext={nextStep} />
          )}
          {step === 2 && (
            <PricingArea data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 3 && (
            <MediaDocs data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />
          )}
          {step === 4 && (
            <ReviewSuccess data={formData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
