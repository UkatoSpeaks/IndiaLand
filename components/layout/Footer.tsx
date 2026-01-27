"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Side */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9.5L12 3L21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5Z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-text-primary">IndiaLand</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed pr-4">
              India's leading specialized land marketplace. We simplify plot buying with verified listings and legal transparency across all Indian states.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-section flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-section flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-section flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">Marketplace</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Residential Plots</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Industrial Land</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Farmland & Estates</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">NA Plots (Collector approved)</Link></li>
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">Expertise</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">RERA Guidance</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Land Surveying</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Legal Verification</Link></li>
              <li><Link href="#" className="text-text-secondary text-sm hover:text-primary transition-colors">Plot Loans</Link></li>
            </ul>
          </div>

          {/* Newsletter / Get Updates */}
          <div>
            <h4 className="text-text-primary font-bold mb-6">Get Updates</h4>
            <p className="text-text-secondary text-sm mb-6">Subscribe for the latest land investment deals in your city.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-section border border-border-subtle rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[13px]">
            © 2026 IndiaLand Marketplace. All property listings are subject to local regulations.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-text-muted text-[13px] hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-text-muted text-[13px] hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="#" className="text-text-muted text-[13px] hover:text-primary transition-colors">State RERA Links</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
