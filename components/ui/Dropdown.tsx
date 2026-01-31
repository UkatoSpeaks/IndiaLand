"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: React.ReactNode;
  label?: string;
}

export function Dropdown({ options, value, onChange, placeholder, icon, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-4 py-3 w-full text-left transition-all duration-200 outline-none",
          "hover:bg-gray-50/80 rounded-lg group"
        )}
      >
        <div className="text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          {label && <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-0.5">{label}</span>}
          <div className="flex items-center gap-2 w-full">
            <span className={cn(
              "text-sm font-bold truncate",
              selectedOption ? "text-text-primary" : "text-text-muted"
            )}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className={cn(
              "w-3.5 h-3.5 text-text-muted transition-transform duration-300",
              isOpen && "rotate-180 text-primary"
            )} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[240px] bg-white/90 backdrop-blur-xl rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40 z-50 py-3 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 ease-out overflow-hidden">
          <div className="max-h-[320px] overflow-y-auto px-2 custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-all text-left mb-1 last:mb-0",
                  value === option.value 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-text-secondary hover:bg-primary-light hover:text-primary"
                )}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
