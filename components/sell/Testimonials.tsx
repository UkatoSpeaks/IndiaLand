"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh K.",
    location: "Pune, Maharashtra",
    text: "I had been trying to sell my plot for over 8 months. After listing here, I got 3 serious buyers in a week and closed the deal in 15 days at my asking price!",
    avatar: "https://i.pravatar.cc/150?u=a",
    stars: 5,
  },
  {
    name: "Priya V.",
    location: "Hyderabad, Telangana",
    text: "The Relationship Manager was a lifesaver. Being an NRI, I was worried about the paperwork. They handled everything professionally. Highly recommend for serious sellers.",
    avatar: "https://i.pravatar.cc/150?u=b",
    stars: 5,
  },
  {
    name: "Amit Sharma",
    location: "Noida, UP",
    text: "Simple interface and very high quality leads. The verification process ensures you don't waste time with window shoppers. Sold my plot in Noida faster than expected.",
    avatar: "https://i.pravatar.cc/150?u=c",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-section/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-16">Happy Sellers Across India</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-[40px] border border-border-subtle shadow-xl text-left flex flex-col relative group"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              
              <p className="text-lg text-text-primary font-medium italic leading-relaxed mb-8 flex-1">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/20 bg-section/50">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-lg">{t.name}</h4>
                  <p className="text-xs font-bold text-text-muted italic">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
