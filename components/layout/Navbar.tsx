"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Menu, X, ArrowRight, LogOut, Circle } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { name: "Buy Plots", href: "/buy" },
    { name: "Sell", href: "/sell" },
    { name: "Land Valuation", href: "/valuation" },
    { name: "RERA Guide", href: "/rera" },
    { name: "Legal Services", href: "/legal" },
    { name: "Stamp Duty Calc", href: "/calculators/stamp-duty" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-sm">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M3 9.5L12 3L21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M9 21V12H15V21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 3V21" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                strokeOpacity="0.2"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">
            IndiaLand
          </span>
        </Link>

        {/* Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "relative text-sm font-bold transition-all duration-300 pb-1 group",
                  isActive 
                    ? "text-primary italic" 
                    : "text-text-secondary hover:text-primary"
                )}
              >
                {link.name}
                {/* Underline Indicator */}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 rounded-full",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Link href="/post-property">
            <Button variant="primary" size="md" className="hidden md:flex">
              Post Property
            </Button>
          </Link>
          
          {user ? (
            <Link href="/profile" className="flex items-center gap-3 bg-section px-4 py-2 rounded-2xl border border-border-subtle hover:border-primary/30 hover:bg-white transition-all group">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-primary/20 group-hover:border-primary/50" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-[10px] font-black text-text-primary uppercase tracking-wider leading-none">{user.displayName || "Plot Buyer"}</p>
                <div className="text-[8px] font-bold text-text-muted group-hover:text-primary uppercase tracking-widest flex items-center gap-1 transition-colors mt-0.5">
                   View Profile
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-section border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/30 transition-all">
                <User className="w-5 h-5" />
              </button>
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-text-primary hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-border-subtle shadow-xl animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col p-6 gap-4">
            {user && (
               <Link href="/profile" onClick={() => setIsMenuOpen(false)} className={cn(
                 "p-4 rounded-2xl flex items-center gap-4 mb-2 border transition-all",
                 pathname === "/profile" ? "bg-primary/5 border-primary/20" : "bg-section border-border-subtle"
               )}>
                 {user.photoURL ? (
                   <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full border border-primary/20" />
                 ) : (
                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <User className="w-6 h-6" />
                   </div>
                 )}
                 <div className="flex-1">
                    <h3 className="font-bold text-text-primary leading-tight">{user.displayName || "Verified User"}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1 italic">View Profile Info</p>
                 </div>
                 <ArrowRight className="w-4 h-4 text-text-muted" />
               </Link>
            )}

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "flex items-center justify-between p-2 rounded-xl transition-all",
                    isActive 
                      ? "text-primary bg-primary/5 pl-4 border-l-4 border-primary font-black" 
                      : "text-text-primary font-bold hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name} 
                  <ArrowRight className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-muted")} />
                </Link>
              );
            })}

            {!user && (
              <Link 
                href="/login" 
                className={cn(
                  "text-lg font-bold p-2",
                  pathname === "/login" ? "text-primary" : "text-text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            )}
            <hr className="border-border-subtle my-2" />
            <Link href="/post-property" onClick={() => setIsMenuOpen(false)} className="w-full">
              <Button 
                className={cn(
                  "w-full h-12 rounded-xl font-black",
                  pathname === "/post-property" && "ring-4 ring-primary/20 shadow-lg shadow-primary/20"
                )}
              >
                Post Property
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
