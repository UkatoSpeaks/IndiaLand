"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { Button } from "../ui/Button";

export function Navbar() {
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

        {/* Links - Rule: middle of layout */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/buy" className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            Buy Plots
          </Link>
          <Link href="/sell" className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            Sell Land
          </Link>
          <Link href="/valuation" className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            Land Valuation
          </Link>
          <Link href="/rera" className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            RERA Guide
          </Link>
        </nav>

        {/* CTAs - Rule: Post Property CTA | Profile */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md">
            Post Property
          </Button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-section border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/30 transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
