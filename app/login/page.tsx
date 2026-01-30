"use client";

import { useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { 
  Mail, 
  Lock, 
  Phone, 
  Chrome, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") as "login" | "signup" | "phone" || "login";
  
  const [mode, setMode] = useState<"login" | "signup" | "phone">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Phone Auth
  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await confirmationResult.confirm(otp);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-3xl border border-border-subtle overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative space-y-10">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-black text-text-primary italic tracking-tight uppercase">
                  {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Phone Login"}
                </h1>
                <p className="text-sm font-bold text-text-secondary italic">
                  {mode === "login" ? "Sign in to manage your interest and legal services." : mode === "signup" ? "Join the most verified land marketplace in India." : "Sign in using OTP sent to your mobile."}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold italic">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Social Login */}
              <div className="space-y-4">
                <Button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-16 rounded-[24px] border-2 border-border-subtle font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:border-primary/30 bg-white transition-all shadow-sm"
                >
                  <Chrome className="w-5 h-5 text-primary" />
                  Continue with Google
                </Button>
                
                <div className="flex items-center gap-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                  <div className="h-px flex-1 bg-border-subtle" />
                  OR
                  <div className="h-px flex-1 bg-border-subtle" />
                </div>
              </div>

              {/* Form Area */}
              {mode !== "phone" ? (
                <form onSubmit={handleEmailAuth} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative group/field">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-primary transition-colors" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle pl-16 pr-6 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner transition-all"
                      />
                    </div>
                    <div className="relative group/field">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-primary transition-colors" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full h-16 bg-section rounded-[24px] border border-border-subtle pl-16 pr-6 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner transition-all"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-18 rounded-[24px] font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  {!confirmationResult ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                      <div className="relative group/field">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-primary transition-colors" />
                        <input 
                          type="tel" 
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full h-16 bg-section rounded-[24px] border border-border-subtle pl-16 pr-6 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner transition-all"
                        />
                      </div>
                      <div id="recaptcha-container"></div>
                      <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full h-18 rounded-[24px] font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                      <div className="relative group/field">
                        <CheckCircle2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-primary transition-colors" />
                        <input 
                          type="text" 
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6 Digit OTP"
                          className="w-full h-16 bg-section rounded-[24px] border border-border-subtle pl-16 pr-6 text-sm font-black text-text-primary outline-none focus:border-primary shadow-inner transition-all"
                        />
                      </div>
                      <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full h-18 rounded-[24px] font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {loading ? "Verifying..." : "Verify & Sign In"}
                      </Button>
                      <button 
                        onClick={() => setConfirmationResult(null)}
                        className="w-full text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-colors"
                      >
                        Change Phone Number
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Mode Toggle */}
              <div className="pt-6 border-t border-border-subtle flex flex-col gap-4 text-center">
                <div className="text-[11px] font-bold text-text-secondary italic">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button 
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-primary font-black uppercase tracking-widest ml-1 hover:underline"
                  >
                    {mode === "login" ? "Sign Up" : "Sign In"}
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    setMode(mode === "phone" ? "login" : "phone");
                    setError("");
                    setConfirmationResult(null);
                  }}
                  className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center justify-center gap-2 hover:text-primary transition-all"
                >
                  {mode === "phone" ? <Mail className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                  {mode === "phone" ? "Continue with Email" : "Continue with Phone"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-bold text-text-muted italic">
              By continuing, you agree to IndiaLand's{" "}
              <Link href="#" className="underline">Terms of Service</Link> and{" "}
              <Link href="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center font-black uppercase tracking-widest text-primary animate-pulse">Loading IndiaLand Auth...</div>}>
      <LoginContent />
    </Suspense>
  );
}
