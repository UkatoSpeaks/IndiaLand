"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Users, 
  Gavel,
  Check,
  Star,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LegalServicesPage() {
  const router = useRouter();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationStep, setConsultationStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: "General Legal Consultation",
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setConsultationStep("success");
      }
    } catch (error) {
      console.error("Consultation submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectPlan = (plan: string) => {
    router.push(`/legal/checkout?plan=${plan}`);
  };

  return (
    <main className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-[#003B73]/60 backdrop-blur-md" onClick={() => setIsConsultationOpen(false)} />
           <div className="relative bg-white w-full max-w-lg rounded-[48px] p-10 shadow-3xl animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setIsConsultationOpen(false)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-section flex items-center justify-center text-text-muted hover:text-primary transition-colors"
              >
                <Check className="rotate-45" />
              </button>

              {consultationStep === "form" ? (
                <form onSubmit={handleConsultationSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-text-primary italic tracking-tight uppercase">Book Consultation</h2>
                    <p className="text-xs font-bold text-text-muted italic uppercase">Get a callback from a senior property advocate within 15 minutes.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-2">Full Name</label>
                       <input 
                        name="name"
                        type="text" 
                        required
                        placeholder="Rahul Sharma" 
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle px-8 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-2">Phone Number</label>
                       <input 
                        name="phone"
                        type="tel" 
                        required
                        placeholder="+91 98765 43210" 
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle px-8 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner"
                       />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 rounded-[30px] font-black text-lg uppercase tracking-widest bg-primary text-white shadow-3xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Callback"}
                  </Button>

                  <p className="text-center text-[9px] font-bold text-text-muted uppercase tracking-widest">
                    Available Mon-Sat | 9:00 AM - 8:00 PM
                  </p>
                </form>
              ) : (
                <div className="py-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-verified/10 text-verified rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-text-primary">Request Received!</h3>
                    <p className="text-sm font-medium text-text-muted italic leading-relaxed">Our specialist will call you back within 15 minutes.</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsConsultationOpen(false)} className="px-8 rounded-xl h-12">Close</Button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <ShieldCheck className="w-3 h-3" /> Trusted Legal Expertise
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-[0.9]">
                Secure Your Investment <br />
                With <span className="text-primary italic">Expert Legal Services</span>
              </h1>
              <p className="text-xl text-text-secondary font-medium italic max-w-xl leading-relaxed">
                Professional document verification, sale deed drafting, and legal opinion services for land and plot transactions in India. Avoid legal pitfalls with our certified property lawyers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => {
                  setConsultationStep("form");
                  setIsConsultationOpen(true);
                }}
                className="h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Book Consultation
              </Button>
              <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-border-subtle font-black text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                View Pricing
              </Button>
            </div>

            <div className="flex items-center gap-12 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-black text-[#003B73]">10k+</div>
                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Properties Verified</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-[#003B73]">500+</div>
                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Expert Lawyers</div>
              </div>
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
            <div className="relative rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Legal Hub" 
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003B73]/40 via-transparent to-transparent" />
            </div>
            
            {/* Status Badge Overlay */}
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-verified/10 flex items-center justify-center text-verified">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-tight">100% Secure</h4>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Legal Document Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter uppercase italic">Our Legal Services</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Document Verification */}
            <div className="group bg-zinc-50 rounded-[40px] p-10 border border-border-subtle hover:border-primary/20 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="h-48 rounded-3xl overflow-hidden mb-8">
                 <img src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070&auto=format&fit=crop" alt="Verification" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Document Verification</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed mb-8 italic">
                Complete due diligence: Title Search, EC (Encumbrance Certificate), Mother Deed check, and revenue record verification.
              </p>
              <Button 
                onClick={() => handleSelectPlan('basic')}
                variant="outline" 
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary"
              >
                Book Now
              </Button>
            </div>

            {/* Drafting & Registration */}
            <div className="group bg-[#003B73] rounded-[40px] p-10 border border-[#003B73] hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
              <div className="h-48 rounded-3xl overflow-hidden mb-8 relative z-10">
                 <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop" alt="Drafting" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-white tracking-tight">Drafting & Registration</h3>
                  <span className="px-2 py-1 bg-white/10 rounded text-[8px] font-black text-white uppercase tracking-widest">Popular</span>
                </div>
                <p className="text-sm font-medium text-white/70 leading-relaxed mb-8 italic">
                  Custom drafting of Sale Deeds, Gift Deeds, and Power of Attorney with full registration assistance at the Sub-Registrar office.
                </p>
                <Button 
                  onClick={() => handleSelectPlan('premium')}
                  className="w-full h-14 bg-white text-[#003B73] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/90"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {/* Legal Opinion for Loans */}
            <div className="group bg-zinc-50 rounded-[40px] p-10 border border-border-subtle hover:border-primary/20 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="h-48 rounded-3xl overflow-hidden mb-8">
                 <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" alt="Legal Opinion" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Legal Opinion for Loans</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed mb-8 italic">
                Detailed legal scrutiny reports (LSR) and opinions specifically formatted for fast-track approvals from major Indian banks.
              </p>
              <Button 
                onClick={() => handleSelectPlan('enterprise')}
                variant="outline" 
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Streamlined Process */}
      <section className="py-24 bg-section">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter uppercase italic">Our Streamlined Process</h2>
            <p className="text-sm font-medium text-text-muted italic">How we ensure your property transaction is legally sound in 4 easy steps</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-subtle -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {[
                { step: "1", title: "Consult", desc: "Initial consultation to understand your legal requirements.", icon: MessageSquare },
                { step: "2", title: "Upload", desc: "Securely upload your property documents to our portal.", icon: FileText },
                { step: "3", title: "Lawyer Review", desc: "Expert lawyers perform thorough verification and drafting.", icon: Gavel },
                { step: "4", title: "Final Delivery", desc: "Receive your legally certified documents and reports.", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl border border-border-subtle flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all duration-500">
                    <item.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-text-primary uppercase tracking-tight">{item.step}. {item.title}</h4>
                    <p className="text-sm font-medium text-text-muted italic leading-relaxed px-4">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verified Lawyers */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter uppercase italic">Verified Property Lawyers</h2>
               <p className="text-sm font-medium text-text-muted italic">Work with the best legal minds specializing in Indian real estate laws.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:translate-x-1 transition-transform">
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Adv. Rajesh Kumar", exp: "14+ Years", exp_short: "Verified Specialist", rating: "4/9", cases: "800+", avatar: "https://i.pravatar.cc/150?u=1" },
              { name: "Adv. Priya Sharma", exp: "10+ Years", exp_short: "Title Scrutiny", rating: "4/8", cases: "325+", avatar: "https://i.pravatar.cc/150?u=2" },
              { name: "Adv. Vikram Singh", exp: "22+ Years", exp_short: "Corporate Law", rating: "5/0", cases: "1.2k+", avatar: "https://i.pravatar.cc/150?u=3" },
              { name: "Adv. Amit Patel", exp: "8+ Years", exp_short: "Drafting Specialist", rating: "4.7", cases: "400+", avatar: "https://i.pravatar.cc/150?u=4" }
            ].map((lawyer, i) => (
              <div key={i} className="group bg-zinc-50 rounded-[40px] p-8 border border-border-subtle text-center hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <h4 className="text-lg font-black tracking-tight">{lawyer.name}</h4>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">{lawyer.exp_short}</p>
                <div className="grid grid-cols-2 divide-x divide-border-subtle pt-4 border-t border-border-subtle/50">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-text-primary mb-0.5">
                      <Star className="w-3 h-3 fill-warning text-warning" /> {lawyer.rating}
                    </div>
                    <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Rating</div>
                  </div>
                  <div>
                    <div className="text-xs font-black text-text-primary mb-0.5">{lawyer.cases}</div>
                    <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Cases</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-24 bg-[#F4F4F5]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter uppercase italic">Compare Pricing</h2>
            <p className="text-sm font-medium text-text-muted italic">Transparent fixed fees. No hidden charges or commissions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x lg:divide-border-subtle bg-white rounded-[48px] overflow-hidden border border-border-subtle shadow-2xl">
            {/* Basic Plan */}
            <div className="p-12 space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Standard</span>
                <div className="flex items-end gap-1">
                  <h3 className="text-4xl font-black text-text-primary">₹4,999</h3>
                  <span className="text-sm font-bold text-text-muted mb-1 italic">/ service</span>
                </div>
                <p className="text-sm font-medium text-text-muted italic">Essential verification for individual plot buyers.</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Title Verification", active: true },
                  { label: "EC Check (15 Years)", active: true },
                  { label: "Sale Deed Drafting", active: false },
                  { label: "In-person Registration Support", active: false },
                  { label: "Bank Loan Scrutiny (LSR)", active: false }
                ].map((feature, i) => (
                  <div key={i} className={`flex items-center justify-between ${feature.active ? 'text-text-primary' : 'text-text-muted opacity-40'}`}>
                    <span className="text-sm font-bold tracking-tight italic">{feature.label}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.active ? 'bg-verified/10 text-verified' : 'bg-border-subtle/30'}`}>
                      {feature.active ? <Check className="w-3 h-3 stroke-[3px]" /> : <Check className="w-3 h-3 opacity-0" />}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => handleSelectPlan('basic')}
                variant="outline" 
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-2"
              >
                Select Plan
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="p-12 space-y-12 bg-zinc-50 relative">
              <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-bl-2xl">Most Popular</div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Bundle</span>
                <div className="flex items-end gap-1">
                  <h3 className="text-4xl font-black text-text-primary">₹12,499</h3>
                  <span className="text-sm font-bold text-text-muted mb-1 italic">/ package</span>
                </div>
                <p className="text-sm font-medium text-text-muted italic">End-to-end legal coverage from search to registration.</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Title Verification", active: true },
                  { label: "EC Check (30 Years)", active: true },
                  { label: "Sale Deed Drafting", active: true },
                  { label: "In-person Registration Support", active: true },
                  { label: "Bank Loan Scrutiny (LSR)", active: false }
                ].map((feature, i) => (
                  <div key={i} className={`flex items-center justify-between ${feature.active ? 'text-text-primary' : 'text-text-muted'}`}>
                    <span className="text-sm font-bold tracking-tight italic">{feature.label}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.active ? 'bg-primary text-white' : 'bg-border-subtle/30 opacity-40'}`}>
                      {feature.active ? <Check className="w-3 h-3 stroke-[3px]" /> : <Check className="w-3 h-3 opacity-0" />}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => handleSelectPlan('premium')}
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
              >
                Get Started
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-12 space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Institutional</span>
                <div className="flex items-end gap-1">
                  <h3 className="text-4xl font-black text-text-primary italic">Custom</h3>
                </div>
                <p className="text-sm font-medium text-text-muted italic">Bulk verification and escrow services for developers.</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Title Verification", active: true },
                  { label: "EC Check (Full History)", active: true },
                  { label: "Sale Deed Drafting", active: true },
                  { label: "In-person Registration Support", active: true },
                  { label: "Bank Loan Scrutiny (LSR)", active: true }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center justify-between text-text-primary">
                    <span className="text-sm font-bold tracking-tight italic">{feature.label}</span>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-verified/10 text-verified">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => handleSelectPlan('enterprise')}
                variant="outline" 
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-2"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 mb-20">
        <div className="relative rounded-[54px] bg-[#003B73] p-12 md:p-24 overflow-hidden border border-white/10 shadow-3xl text-center group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -ml-24 -mb-24 animate-pulse delay-700 pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                 Ready to secure <br /> your property?
               </h2>
               <p className="text-xl text-white/60 font-medium italic max-w-2xl mx-auto leading-relaxed pt-2">
                 Don't risk your life savings. Get an expert legal review today and transact with complete peace of mind.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/legal/checkout">
                <Button className="h-20 px-12 rounded-3xl font-black text-lg bg-white text-[#003B73] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Get Started Now
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  setConsultationStep("form");
                  setIsConsultationOpen(true);
                }}
                variant="outline" 
                className="h-20 px-12 rounded-3xl font-black text-lg border-2 border-white/20 text-white hover:bg-white/5 transition-all"
              >
                Talk to a Lawyer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
