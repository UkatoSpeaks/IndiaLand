"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ValuationHero } from "@/components/valuation/ValuationHero";
import { ValuationAnalysis } from "@/components/valuation/ValuationAnalysis";

export type ValuationData = {
  locality: string;
  area: string;
  facing: string;
};

export default function ValuationPage() {
  const [isCalculated, setIsCalculated] = useState(false);
  const [data, setData] = useState<ValuationData>({
    locality: "",
    area: "",
    facing: "North",
  });

  const handleCalculate = (formData: ValuationData) => {
    setData(formData);
    setIsCalculated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = () => {
    setIsCalculated(false);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main>
        {!isCalculated ? (
          <ValuationHero onCalculate={handleCalculate} />
        ) : (
          <ValuationAnalysis data={data} onEdit={handleEdit} />
        )}
      </main>

      <Footer />
    </div>
  );
}
