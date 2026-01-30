"use client";

import { useState } from "react";
import { CheckCircle2, LayoutDashboard, Share2, ArrowRight, Eye, ShieldCheck, MapPin, IndianRupee, Ruler, Image as ImageIcon } from "lucide-react";
import { PropertyData } from "@/app/post-property/page";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface StepProps {
  data: PropertyData;
}

export function ReviewSuccess({ data }: StepProps) {
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!user) {
      alert("You must be logged in to publish a listing.");
      return;
    }

    setIsPublishing(true);
    
    const listingData = {
      title: data.title,
      type: data.type,
      city: data.city,
      locality: data.locality,
      area: parseFloat(data.area) || 0,
      unit: data.unit,
      price: data.price,
      amenities: data.amenities,
      reraNumber: data.reraNumber,
      fileUrls: data.fileUrls,
      docUrls: data.docUrls,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      createdAt: serverTimestamp(),
      status: "pending", // Pending legal check
      trustScore: 85, // Default pre-verification score
    };

    try {
      await addDoc(collection(db, "listings"), listingData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Publishing error:", error);
      alert("Failed to publish listing. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-12 py-12 animate-in zoom-in-95 duration-700">
        <div className="relative mx-auto w-32 h-32">
           <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
           <div className="relative z-10 w-32 h-32 rounded-[40px] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
              <CheckCircle2 className="w-16 h-16 stroke-[3px]" />
           </div>
        </div>

        <div className="space-y-4">
           <h1 className="text-4xl md:text-5xl font-bold text-text-primary uppercase tracking-tight">Property Published!</h1>
           <p className="text-lg text-text-secondary font-medium italic max-w-xl mx-auto">
             Your listing is now live! Our experts will perform a quick legal sanity check in the next 24 hours.
           </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[40px] border border-border-subtle shadow-xl max-w-xl mx-auto space-y-8">
           <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/10 text-left">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                 <p className="text-xs font-bold text-primary uppercase tracking-widest">Trust Status</p>
                 <p className="text-sm font-bold text-text-primary">Legal Vetting in Progress</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => window.location.href = '/dashboard'} variant="outline" className="h-16 rounded-2xl border-2 font-bold flex items-center gap-2">
                 <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Button>
              <Button className="h-16 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20">
                 <Share2 className="w-5 h-5" /> Share Listing
              </Button>
           </div>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
           Return to Homepage <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">Review Your Listing</h1>
        <p className="text-text-secondary font-medium">Please review all the details before making your property live.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-border-subtle shadow-xl overflow-hidden">
        {/* Cover Preview */}
        <div className="h-64 bg-section relative">
           {data.files.length > 0 ? (
             <img src={URL.createObjectURL(data.files[0])} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-text-muted">
                <ImageIcon className="w-12 h-12" />
             </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <div className="absolute bottom-6 left-8 right-8 text-white">
              <h2 className="text-2xl font-bold">{data.title || "Untitled Property"}</h2>
              <p className="flex items-center gap-2 text-sm font-medium opacity-90">
                 <MapPin className="w-4 h-4" /> {data.locality}, {data.city}
              </p>
           </div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
           {/* Quick Stats */}
           <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> Area
                 </p>
                 <p className="text-lg font-bold text-text-primary">{data.area} {data.unit}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" /> Expected Price
                 </p>
                 <p className="text-lg font-bold text-text-primary">₹{data.price || "0"}</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Status
                 </p>
                 <p className="text-lg font-bold text-primary">Pre-Verified</p>
              </div>
           </div>

           <hr className="border-border-subtle" />

           {/* Amenities */}
           <div className="space-y-4">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-4">Amenities Provided</p>
              <div className="flex flex-wrap gap-3">
                 {data.amenities.length > 0 ? data.amenities.map(a => (
                   <span key={a} className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/10">
                      {a}
                   </span>
                 )) : (
                   <p className="text-xs font-medium text-text-muted italic">No specific amenities selected.</p>
                 )}
              </div>
           </div>

           {/* Legal */}
           <div className="space-y-4">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-4">Legal Details</p>
              <div className="p-6 bg-section/50 rounded-2xl border border-border-subtle flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-text-primary">RERA ID</p>
                    <p className="text-sm font-medium text-text-secondary">{data.reraNumber || "Not Provided"}</p>
                 </div>
                 {data.docs.length > 0 && (
                    <div className="flex items-center gap-2 text-verified">
                       <CheckCircle2 className="w-5 h-5" />
                       <span className="text-xs font-bold uppercase tracking-widest">Document Uploaded</span>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
         <Button 
          onClick={handlePublish} 
          disabled={isPublishing}
          size="lg" 
          className="w-full sm:w-auto px-20 h-16 rounded-2xl font-bold shadow-2xl shadow-primary/30 text-lg flex items-center gap-3"
         >
            {isPublishing ? "Publishing..." : "Publish Listing"} <Eye className="w-6 h-6" />
         </Button>
      </div>
    </div>
  );
}
