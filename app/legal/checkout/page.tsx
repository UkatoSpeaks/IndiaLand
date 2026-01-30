"use client";

import { useState, Suspense } from "react";
import { 
  ShieldCheck, 
  FileUp, 
  CreditCard, 
  Lock, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Info,
  ArrowLeft,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { uploadImage } from "@/lib/upload-action";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planType = searchParams.get("plan") || "basic";
  
  const [isUploading, setIsUploading] = useState<{[key: string]: boolean}>({});
  const [isUploaded, setIsUploaded] = useState<{[key: string]: boolean}>({});
  const [uploadedUrls, setUploadedUrls] = useState<{[key: string]: string}>({});
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");

  const planDetails = {
    basic: {
      name: "Standard Verification",
      price: 4999,
      gst: 900,
      total: 5899,
      features: ["15-Year Trace Search", "Encumbrance Check (EC)", "Legal Scrub Report"]
    },
    premium: {
      name: "Premium Bundle",
      price: 12499,
      gst: 2250,
      total: 14749,
      features: ["30-Year Trace Search", "Drafting & Registration", "Sale Deed Review"]
    },
    enterprise: {
      name: "Institutional Audit",
      price: 24999,
      gst: 4500,
      total: 29499,
      features: ["Full Title History", "Escrow Assistance", "Bulk Verification"]
    }
  };

  const currentPlan = planDetails[planType as keyof typeof planDetails] || planDetails.basic;

  const handleUploadClick = (field: string) => {
    document.getElementById(`file-input-${field}`)?.click();
  };

  const handleFileChange = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(prev => ({...prev, [field]: true}));
    try {
      const url = await uploadImage(file) as string;
      setUploadedUrls(prev => ({...prev, [field]: url}));
      setIsUploaded(prev => ({...prev, [field]: true}));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(prev => ({...prev, [field]: false}));
    }
  };

  const handlePayment = async () => {
    setPaymentStatus("processing");
    
    const orderData = {
      planId: planType,
      planName: currentPlan.name,
      amount: currentPlan.total,
      documentUrls: uploadedUrls,
      // In a real app, user details would also be here
    };

    try {
      const response = await fetch("/api/legal/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setPaymentStatus("success");
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment failed. Please try again.");
      setPaymentStatus("idle");
    }
  };

  if (paymentStatus === "success") {
    return (
      <main className="min-h-screen bg-[#F4F4F5]">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center space-y-10">
           <div className="w-24 h-24 bg-[#059669] text-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <div className="space-y-4">
              <h1 className="text-5xl font-black text-[#0A0A0A] tracking-tighter italic">Payment Successful!</h1>
              <p className="text-xl text-[#52525B] font-medium italic max-w-xl mx-auto">Your legal review has been initiated. Our property specialist will review your documents and contact you within 24 hours.</p>
           </div>
           <div className="bg-white p-8 rounded-[40px] border border-[#E4E4E7] shadow-xl max-w-md mx-auto space-y-4">
              <div className="flex justify-between text-sm font-bold">
                 <span className="text-[#71717A] uppercase tracking-widest text-[10px]">Order ID</span>
                 <span className="text-[#0A0A0A]">#ILD-LEGAL-77291</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                 <span className="text-[#71717A] uppercase tracking-widest text-[10px]">Plan</span>
                 <span className="text-[#0066FF] uppercase tracking-widest text-[10px]">{currentPlan.name}</span>
              </div>
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
             <Link href="/">
               <Button className="h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest">Back to Home</Button>
             </Link>
             <Button variant="outline" className="h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest">Download Receipt</Button>
           </div>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20">
      <Link href="/legal" className="inline-flex items-center gap-2 text-[#71717A] hover:text-[#0066FF] mb-8 font-black text-[10px] uppercase tracking-widest transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Legal Services
      </Link>
      
      <div className="space-y-4 mb-12">
         <h1 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tighter italic">Finalize Your Legal Review</h1>
         <p className="text-sm font-medium text-[#71717A] italic max-w-2xl leading-relaxed">Secure your investment with our certified legal documentation process. Every document is reviewed manually by experienced property advocates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar: Order Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] overflow-hidden border border-[#E4E4E7] shadow-2xl sticky top-32">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070&auto=format&fit=crop" 
                alt="Legal Review" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10 space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight italic leading-tight">{currentPlan.name}</h3>
                <p className="text-xs font-medium text-[#71717A] leading-relaxed italic">A comprehensive legal check of the land's history to ensure a clear, marketable title.</p>
              </div>

              <div className="space-y-4">
                {currentPlan.features.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#059669]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#E4E4E7]/50 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium italic text-[#71717A]">
                    <span>Service Fee</span>
                    <span>₹{currentPlan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium italic text-[#71717A]">
                    <span>GST (18%)</span>
                    <span>₹{currentPlan.gst.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-[#F4F4F5] p-5 rounded-2xl border border-[#E4E4E7]">
                  <span className="text-base font-black text-[#003B73] uppercase tracking-widest text-[10px]">Total Amount</span>
                  <span className="text-2xl font-black text-[#003B73]">₹{currentPlan.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-[#71717A] justify-center py-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Est. Delivery: 3-5 Business Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-[#E4E4E7] flex flex-col items-center text-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#003B73]">Secured Data</span>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-[#E4E4E7] flex flex-col items-center text-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-2xl bg-[#059669]/10 flex items-center justify-center text-[#059669]">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#003B73]">Legal Experts</span>
             </div>
          </div>
        </div>

        {/* Main Content: Docs & Payment */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Required Documents */}
          <div className="bg-white rounded-[48px] p-10 md:p-14 border border-[#E4E4E7] shadow-2xl space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                 <FileUp className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-black text-[#0A0A0A] italic tracking-tight uppercase">Required Documents</h2>
            </div>

            <div className="space-y-4">
              {[
                { id: "deed", label: "Parent Deed (Last 30 Years)", sub: "Clear scanned PDF or JPG (Max 20MB)" },
                { id: "ec", label: "Encumbrance Certificate (EC)", sub: "Form 15 or 16 for current year" },
                { id: "tax", label: "Latest Tax Receipts", sub: "Property tax paid receipt for current FY" }
              ].map((doc, i) => (
                <div key={doc.id} className={`group p-6 rounded-3xl border border-dashed transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${isUploaded[doc.id] ? 'bg-[#ECFDF5] border-[#059669]/50' : 'border-[#E4E4E7] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5'}`}>
                  <div className="flex items-center gap-5 text-left w-full md:w-auto">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isUploaded[doc.id] ? 'bg-[#059669] text-white' : 'bg-[#F4F4F5] text-[#71717A] group-hover:bg-[#0066FF]/10 group-hover:text-[#0066FF]'}`}>
                      {isUploaded[doc.id] ? <Check className="w-5 h-5 stroke-[4px]" /> : <FileUp className="w-5 h-5" />}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-black text-[#0A0A0A] tracking-tight">{doc.label}</h4>
                      <p className="text-[10px] font-bold text-[#71717A] italic uppercase leading-none">{doc.sub}</p>
                    </div>
                  </div>
                    <Button 
                      onClick={() => handleUploadClick(doc.id)}
                      variant="outline" 
                      className={`w-full md:w-auto h-12 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${isUploaded[doc.id] ? 'border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white' : 'hover:bg-[#0066FF] hover:text-white'}`}
                    >
                      <input 
                        type="file" 
                        id={`file-input-${doc.id}`}
                        className="hidden" 
                        onChange={(e) => handleFileChange(doc.id, e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {isUploading[doc.id] ? "Uploading..." : isUploaded[doc.id] ? "File Ready" : "Select File"}
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#003B73]/5 rounded-[48px] p-10 md:p-14 border border-[#003B73]/10 shadow-3xl space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#003B73] flex items-center justify-center text-white">
                   <CreditCard className="w-6 h-6" />
                 </div>
                 <div className="space-y-0.5">
                   <h2 className="text-2xl font-black text-[#0A0A0A] italic tracking-tight uppercase leading-tight">Payment Method</h2>
                   <p className="text-[10px] font-bold text-[#71717A] italic uppercase tracking-widest">Transaction encrypted with 256-bit SSL protocol</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <div className="w-10 h-7 bg-white rounded border border-[#E4E4E7] flex items-center justify-center text-[8px] font-black text-[#71717A]">VISA</div>
                 <div className="w-10 h-7 bg-white rounded border border-[#E4E4E7] flex items-center justify-center text-[8px] font-black text-[#71717A]">MC</div>
                 <div className="w-10 h-7 bg-white rounded border border-[#E4E4E7] flex items-center justify-center text-[8px] font-black text-[#71717A]">RUPAY</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-[#71717A] uppercase tracking-[0.2em] ml-2">Cardholder Name</label>
                 <input 
                  type="text" 
                  placeholder="Rahul Sharma" 
                  className="w-full h-16 bg-white rounded-[24px] border border-[#E4E4E7] px-8 text-sm font-black text-[#0A0A0A] outline-none focus:border-[#0066FF] shadow-sm tracking-tight"
                 />
              </div>
              
              <div className="space-y-2 relative">
                 <label className="text-[10px] font-black text-[#71717A] uppercase tracking-[0.2em] ml-2">Card Number</label>
                 <div className="relative">
                   <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full h-16 bg-white rounded-[24px] border border-[#E4E4E7] px-8 text-sm font-black text-[#0A0A0A] outline-none focus:border-[#0066FF] shadow-sm tracking-[0.2em]"
                   />
                   <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-[#71717A] uppercase tracking-[0.2em] ml-2">Expiry Date</label>
                   <input 
                    type="text" 
                    placeholder="MM / YY" 
                    className="w-full h-16 bg-white rounded-[24px] border border-[#E4E4E7] px-8 text-sm font-black text-[#0A0A0A] outline-none focus:border-[#0066FF] shadow-sm uppercase"
                   />
                </div>
                <div className="space-y-2 relative">
                   <label className="text-[10px] font-black text-[#71717A] uppercase tracking-[0.2em] ml-2">CVV</label>
                   <div className="relative">
                     <input 
                      type="password" 
                      placeholder="***" 
                      className="w-full h-16 bg-white rounded-[24px] border border-[#E4E4E7] px-8 text-sm font-black text-[#0A0A0A] outline-none focus:border-[#0066FF] shadow-sm"
                     />
                     <Info className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A] cursor-help" />
                   </div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  onClick={handlePayment}
                  disabled={paymentStatus === "processing"}
                  className="w-full h-20 rounded-[30px] font-black text-lg uppercase tracking-widest bg-[#0066FF] text-white shadow-3xl shadow-[#0066FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {paymentStatus === "processing" ? (
                     <>
                       <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                       Processing...
                     </>
                  ) : (
                    `Confirm & Pay ₹${currentPlan.total.toLocaleString()}`
                  )}
                </Button>
                <div className="flex items-center justify-center gap-6 mt-8">
                  <div className="flex items-center gap-2 text-[8px] font-black text-[#71717A] uppercase tracking-widest">
                     <ShieldCheck className="w-3 h-3 text-[#059669]" /> PCI DSS Compliant
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black text-[#71717A] uppercase tracking-widest">
                     <CheckCircle2 className="w-3 h-3 text-[#059669]" /> Verified by Visa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalCheckoutPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F5]">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F4F4F5]">
          <div className="w-12 h-12 border-4 border-[#0066FF]/30 border-t-[#0066FF] rounded-full animate-spin" />
        </div>
      }>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </main>
  );
}
