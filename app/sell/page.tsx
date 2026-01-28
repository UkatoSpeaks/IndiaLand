"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  MapPin, 
  Camera, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Landmark,
  BadgeCheck,
  Upload,
  X,
  Info
} from "lucide-react";

type FormStep = 'basic' | 'location' | 'media' | 'legal' | 'success';

export default function SellPage() {
  const [step, setStep] = useState<FormStep>('basic');
  const [valuationExpanded, setValuationExpanded] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  // Mock form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    area: "",
    units: "sq.ft",
    location: "",
    category: "Residential",
    khataType: "A Khata",
    isRera: false,
    description: ""
  });

  const nextStep = () => {
    if (step === 'basic') setStep('location');
    else if (step === 'location') setStep('media');
    else if (step === 'media') setStep('legal');
    else if (step === 'legal') setStep('success');
  };

  const prevStep = () => {
    if (step === 'location') setStep('basic');
    else if (step === 'media') setStep('location');
    else if (step === 'legal') setStep('media');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-16">
          
          {/* Left Column: Sales Copy & Valuation Tool */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                <BadgeCheck className="w-4 h-4" /> Trusted by 5000+ Sellers
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-text-primary mb-6 leading-[1.1]">
                Sell Your Land <span className="text-primary italic">Faster</span> & At Better Prices.
              </h1>
              <p className="text-lg text-text-secondary font-medium italic leading-relaxed">
                Connect with verified high-intent buyers in Bangalore. We handle the paperwork, you handle the profit.
              </p>
            </div>

            {/* Interactive Valuation Card */}
            <div className={`bg-white rounded-[40px] p-8 border border-border-subtle shadow-xl transition-all duration-500 ${valuationExpanded ? 'ring-4 ring-primary/10 scale-105' : ''}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-[18px] bg-primary-light flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Live Valuation Beta</span>
              </div>
              <h3 className="text-xl font-black text-text-primary mb-2">Get Land Valuation</h3>
              <p className="text-xs font-bold text-text-muted mb-8 italic">Based on real transaction data in your area.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-wider ml-1">Area Location</label>
                  <select className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-4 text-sm font-black outline-none focus:border-primary transition-all">
                    <option>HSR Layout, Bangalore</option>
                    <option>Sarjapur Road, Bangalore</option>
                    <option>Whitefield, Bangalore</option>
                    <option>Electronic City, Bangalore</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-wider ml-1">Plot Size (sq.ft)</label>
                  <input type="number" placeholder="e.g. 1200" className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-4 text-sm font-black outline-none focus:border-primary transition-all" />
                </div>
                
                <Button 
                  onClick={() => setValuationExpanded(true)}
                  variant="primary" 
                  className="w-full h-14 rounded-2xl font-black shadow-lg shadow-primary/20"
                >
                  Estimate Value
                </Button>

                {valuationExpanded && (
                  <div className="mt-6 pt-6 border-t border-border-subtle animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Estimated Range</p>
                        <p className="text-2xl font-black text-verified">₹1.2Cr – 1.45Cr</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Confidence</p>
                        <p className="text-sm font-black text-text-primary">94% High</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Why Sellers Trust Us */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-verified/10 flex items-center justify-center text-verified">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-sm font-black text-text-primary">Legal Vetting</p>
                <p className="text-[11px] font-medium text-text-secondary leading-snug italic">We verify documents to attract high-intent buyers.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Landmark className="w-5 h-5" />
                </div>
                <p className="text-sm font-black text-text-primary">Bank Ties</p>
                <p className="text-[11px] font-medium text-text-secondary leading-snug italic">Preferred partnerships with SBI, HDFC & ICICI Bank.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-step Listing Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[40px] border border-border-subtle shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
              
              {/* Form Progress Header */}
              {step !== 'success' && (
                <div className="bg-section/30 px-10 py-8 border-b border-border-subtle">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-text-primary">List Your Plot</h2>
                    <span className="text-[10px] font-black text-primary px-3 py-1.5 bg-primary/10 rounded-full uppercase tracking-widest">Step {step === 'basic' ? '1' : step === 'location' ? '2' : step === 'media' ? '3' : '4'} of 4</span>
                  </div>
                  
                  <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border-subtle z-0" />
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-500`} style={{ width: step === 'basic' ? '0%' : step === 'location' ? '33%' : step === 'media' ? '66%' : '100%' }} />
                    
                    {['basic', 'location', 'media', 'legal'].map((s, i) => (
                      <div key={s} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                          step === s ? 'bg-white border-primary text-primary scale-110 shadow-lg' : 
                          (['location', 'media', 'legal'].indexOf(step) > i ? 'bg-primary border-primary text-white' : 'bg-white border-border-subtle text-text-muted')
                        }`}>
                          {(['location', 'media', 'legal'].indexOf(step) > i) ? <CheckCircle2 className="w-5 h-5" /> : (i + 1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Steps Content */}
              <div className="flex-1 p-10 md:p-12 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                  
                  {step === 'basic' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Listing Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1200 sq.ft A-Khata Plot near Outer Ring Road" 
                          className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-black outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Price (₹)</label>
                          <input type="text" placeholder="e.g. 1.25 Cr" className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-black outline-none focus:border-primary transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Area (sq.ft)</label>
                          <input type="number" placeholder="e.g. 1500" className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-black outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Description</label>
                        <textarea 
                          rows={4} 
                          placeholder="Share key highlights of your plot..." 
                          className="w-full bg-section/50 rounded-2xl border border-border-subtle p-6 text-sm font-bold outline-none focus:border-primary transition-all resize-none italic"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {step === 'location' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Full Location Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                          <input type="text" placeholder="Detailed address or Landmark" className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle pl-14 pr-6 text-base font-black outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <div className="bg-section/50 rounded-3xl border border-border-subtle h-[300px] relative overflow-hidden group">
                        <img src="/map-placeholder.png" alt="Map" className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-primary text-white p-4 rounded-2xl shadow-2xl animate-bounce">
                            <MapPin className="w-8 h-8" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black text-primary border border-primary/20">DRAG PIN TO ADJUST</div>
                      </div>
                    </div>
                  )}

                  {step === 'media' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="space-y-4">
                        <div className="border-4 border-dashed border-border-subtle rounded-[32px] p-12 text-center hover:border-primary/50 transition-all bg-section/30 group cursor-pointer relative overflow-hidden">
                          <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="relative z-0">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                              <Upload className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-black text-text-primary mb-2">Upload Plot Gallery</h4>
                            <p className="text-xs font-bold text-text-muted italic">Drop clear 12PM sunlight photos for best visibility.</p>
                          </div>
                        </div>

                        {files.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            {files.map((file, i) => (
                              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-border-subtle group">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover" 
                                />
                                <button 
                                  onClick={() => removeFile(i)}
                                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 'legal' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Khata Type</label>
                          <select className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-black outline-none focus:border-primary transition-all">
                            <option>A Khata</option>
                            <option>B Khata</option>
                            <option>E Khata</option>
                            <option>DC Converted</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">RERA Status</label>
                          <div className="flex h-14 bg-section/50 rounded-2xl border border-border-subtle overflow-hidden">
                            <button className="flex-1 font-black text-sm bg-primary text-white">APPROVED</button>
                            <button className="flex-1 font-black text-sm text-text-muted">PENDING</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/20 flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-text-primary mb-1">Pre-Verification Advantage</h4>
                          <p className="text-[11px] font-medium text-text-secondary leading-relaxed italic">Verified listings get 4x more clicks and are prioritized in buyer search results. We'll help you with the legal vetting.</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Legal Clearance ID (Optional)</label>
                        <input type="text" placeholder="RERA ID / Survey Number" className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-black outline-none focus:border-primary transition-all" />
                      </div>
                    </div>
                  )}

                  {step === 'success' && (
                    <div className="text-center space-y-8 animate-in zoom-in fade-in duration-700 py-10">
                      <div className="w-24 h-24 rounded-[32px] bg-verified/10 text-verified flex items-center justify-center mx-auto shadow-xl shadow-verified/10">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-text-primary mb-2">Listing Submitted!</h2>
                        <p className="text-text-secondary font-medium italic">Our agents will review the details and reach out within 24 hours.</p>
                      </div>
                      <div className="bg-section/50 rounded-[32px] p-8 border border-border-subtle text-left max-w-md mx-auto">
                        <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-4">What's Next?</h4>
                        <ul className="space-y-4">
                          {[
                            { icon: Info, text: "Legal document sanity check" },
                            { icon: Camera, text: "Optional drone video shoot scheduling" },
                            { icon: BadgeCheck, text: "Priority display on 'Featured Plots'" }
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <item.icon className="w-4 h-4 text-primary" />
                              <span className="text-sm font-black text-text-primary">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" className="h-14 rounded-2xl px-12 font-black shadow-xl shadow-primary/20">Go to Dashboard</Button>
                        <Button variant="secondary" className="h-14 rounded-2xl px-12 font-black border-2" onClick={() => window.location.href = '/'}>Home</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Footer Actions */}
              {step !== 'success' && (
                <div className="p-10 bg-section/10 border-t border-border-subtle flex items-center justify-between">
                  <button 
                    disabled={step === 'basic'}
                    onClick={prevStep}
                    className={`flex items-center gap-2 text-sm font-black transition-all ${step === 'basic' ? 'opacity-0' : 'text-text-muted hover:text-primary cursor-pointer'}`}
                  >
                    <ArrowLeft className="w-5 h-5" /> Back
                  </button>
                  <Button 
                    onClick={nextStep}
                    variant="primary" 
                    className="h-14 rounded-2xl px-12 font-black shadow-xl shadow-primary/20 flex items-center gap-3"
                  >
                    {step === 'legal' ? 'Submit Listing' : 'Next Step'} <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
