"use client";

import { useState } from "react";
import { Upload, X, ShieldCheck, FileText, Info, ArrowLeft, CheckCircle2, ChevronRight, Image as ImageIcon } from "lucide-react";
import { PropertyData } from "@/app/post-property/page";
import { Button } from "@/components/ui/Button";
import { uploadImage } from "@/lib/upload-action";

interface StepProps {
  data: PropertyData;
  updateData: (data: Partial<PropertyData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MediaDocs({ data, updateData, onNext, onBack }: StepProps) {
  const [certify, setCertify] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<number[]>([]);
  const [uploadingDocs, setUploadingDocs] = useState<number[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const currentFileCount = data.fileUrls.length;
      
      updateData({ files: [...data.files, ...newFiles] });
      
      // Track which indices are uploading
      const newUploadingIndices = newFiles.map((_, i) => currentFileCount + i);
      setUploadingFiles(prev => [...prev, ...newUploadingIndices]);

      try {
        const uploadPromises = newFiles.map(file => uploadImage(file));
        const urls = await Promise.all(uploadPromises) as string[];
        
        updateData({ fileUrls: [...data.fileUrls, ...urls] });
      } catch (error) {
        console.error("Media upload failed", error);
      } finally {
        setUploadingFiles(prev => prev.filter(i => !newUploadingIndices.includes(i)));
      }
    }
  };

  const removeFile = (index: number) => {
    updateData({ 
      files: data.files.filter((_, i) => i !== index),
      fileUrls: data.fileUrls.filter((_, i) => i !== index)
    });
  };

  const handleDocChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newDocs = Array.from(e.target.files);
      const currentDocCount = data.docUrls.length;

      updateData({ docs: [...data.docs, ...newDocs] });
      
      const newUploadingIndices = newDocs.map((_, i) => currentDocCount + i);
      setUploadingDocs(prev => [...prev, ...newUploadingIndices]);

      try {
        const uploadPromises = newDocs.map(doc => uploadImage(doc));
        const urls = await Promise.all(uploadPromises) as string[];
        
        updateData({ docUrls: [...data.docUrls, ...urls] });
      } catch (error) {
        console.error("Doc upload failed", error);
      } finally {
        setUploadingDocs(prev => prev.filter(i => !newUploadingIndices.includes(i)));
      }
    }
  };

  const removeDoc = (index: number) => {
    updateData({ 
      docs: data.docs.filter((_, i) => i !== index),
      docUrls: data.docUrls.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">Property Media & Legal Documents</h1>
        <p className="text-text-secondary font-medium italic">Almost there! Complete this step to publish your listing.</p>
      </div>

      {/* Media Gallery */}
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-border-subtle shadow-xl space-y-10">
        <div className="space-y-2">
           <h3 className="text-xl font-bold text-text-primary">Media Gallery</h3>
           <p className="text-xs font-medium text-text-secondary">Upload high-resolution photos, site plans, and drone videos of your plot.</p>
        </div>

        <div className="border-4 border-dashed border-border-subtle rounded-[32px] p-12 text-center hover:border-primary/50 transition-all bg-section/30 group cursor-pointer relative">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="relative z-0 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div>
               <h4 className="text-lg font-bold text-text-primary">Drag & Drop files here</h4>
               <p className="text-xs font-medium text-text-secondary mt-1 max-w-sm mx-auto">
                 Supports JPG, PNG, MP4 up to 50MB. We recommend at least 5 photos of the plot and surroundings.
               </p>
            </div>
            <Button size="sm" className="rounded-xl px-8 py-4 font-bold">Select Files</Button>
          </div>
        </div>

        {/* Preview Grid */}
        {data.fileUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.fileUrls.map((url, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-subtle group">
                <img 
                   src={url} 
                   alt="Preview" 
                   className="w-full h-full object-cover" 
                />
                {i === 0 && (
                  <div className="absolute bottom-2 left-2 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Cover Photo
                  </div>
                )}
                <button 
                  onClick={() => removeFile(i)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 text-error rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button className="aspect-[4/3] rounded-2xl border-2 border-dashed border-border-subtle flex flex-col items-center justify-center gap-2 text-text-muted hover:text-primary hover:border-primary/30 transition-all bg-section/30">
               <ImageIcon className="w-6 h-6" />
               <span className="text-[10px] font-bold uppercase tracking-widest">+ Add More</span>
            </button>
          </div>
        )}
      </div>

      {/* Legal Verification */}
      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-border-subtle shadow-xl space-y-12">
        <div className="flex items-center gap-4">
           <h3 className="text-xl font-bold text-text-primary">Legal Verification</h3>
           <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Mandatory</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
               <label className="text-sm font-bold text-text-primary">RERA Registration Number</label>
               <input 
                 type="text"
                 value={data.reraNumber}
                 onChange={(e) => updateData({ reraNumber: e.target.value })}
                 placeholder="e.g., PRM/KA/RERA/1251/446/PR/123456"
                 className="w-full h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 text-base font-bold outline-none focus:border-primary transition-all"
               />
               <p className="text-[10px] font-bold text-text-muted uppercase italic">Enter the number as printed on your certificate.</p>
            </div>

            <div className="space-y-4">
               <label className="text-sm font-bold text-text-primary">Upload RERA Certificate / Title Deed</label>
               <div className="flex items-center gap-4">
                 <div className="relative flex-1">
                    <input 
                      type="file" 
                      onChange={handleDocChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="h-14 bg-section/50 rounded-2xl border border-border-subtle px-6 flex items-center gap-4 transition-all hover:bg-white group">
                       <FileText className="w-5 h-5 text-text-muted group-hover:text-primary" />
                       <span className="text-sm font-bold text-text-muted group-hover:text-text-primary">Upload PDF/JPG</span>
                    </div>
                 </div>
                 {data.docUrls.length > 0 && (
                    <div className="w-10 h-10 rounded-full bg-verified/10 text-verified flex items-center justify-center">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                 )}
               </div>
               {data.docUrls.length > 0 && (
                 <div className="space-y-2">
                   {data.docUrls.map((url, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-verified/5 rounded-xl border border-verified/10">
                        <div className="flex items-center gap-3">
                           <FileText className="w-4 h-4 text-verified" />
                           <span className="text-[10px] font-bold text-verified uppercase tracking-tight">Document {i+1} Uploaded</span>
                        </div>
                        <button onClick={() => removeDoc(i)} className="text-error hover:scale-110 transition-transform">
                           <X className="w-4 h-4" />
                        </button>
                     </div>
                   ))}
                 </div>
               )}
               {uploadingDocs.length > 0 && (
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Uploading...</span>
                  </div>
               )}
            </div>
          </div>

          <div className="lg:col-span-2">
             <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden">
                <div className="flex items-start gap-4 mb-4">
                   <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Info className="w-4 h-4" />
                   </div>
                   <h4 className="text-sm font-bold text-text-primary">Why is this required?</h4>
                </div>
                <p className="text-xs font-medium text-text-secondary leading-relaxed mb-6">
                  Under the RERA Act 2016, all commercial and residential real estate projects where the land is over 500 square meters or eight apartments must be registered with RERA.
                </p>
                <div className="p-4 bg-white rounded-xl border border-primary/10 italic text-[10px] text-text-muted">
                  "By uploading these documents, you confirm that the property information is accurate and complies with Indian real estate regulations."
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
             </div>
          </div>
        </div>

        <label className="flex items-center gap-4 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={certify}
            onChange={(e) => setCertify(e.target.checked)}
            className="w-6 h-6 rounded-lg border-2 border-border-subtle checked:bg-primary checked:border-primary transition-all focus:ring-4 focus:ring-primary/10"
          />
          <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">I certify that these documents are authentic.</span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button onClick={onBack} variant="outline" size="lg" className="rounded-2xl px-10 h-16 border-2 font-bold text-text-primary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <div className="flex items-center gap-4">
           <button className="text-sm font-bold text-text-muted hover:text-primary transition-colors">Save Draft</button>
           <Button 
            disabled={!certify || data.fileUrls.length === 0 || !data.reraNumber}
            onClick={onNext}
            size="lg" 
            className="rounded-2xl px-12 h-16 font-bold shadow-xl shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Save & Continue <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
