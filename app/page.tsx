import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Hotspots } from "@/components/layout/Hotspots";
import { FeaturedPlots } from "@/components/layout/FeaturedPlots";
import { SellerBanner } from "@/components/layout/SellerBanner";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Stats Section - Rule: py-16 or py-20, p-6 or p-8 */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Verified Plots", value: "25k+" },
            { label: "Smart Cities", value: "500+" },
            { label: "Assets Managed", value: "₹500Cr+" },
            { label: "RERA Compliant", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-border-subtle text-center shadow-sm hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="text-3xl font-bold text-primary mb-1 tracking-tight group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-[13px] text-text-secondary font-bold uppercase tracking-wider group-hover:text-primary transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Hotspots />
      <FeaturedPlots />
      <SellerBanner />
      <Footer />
    </main>
  );
}
