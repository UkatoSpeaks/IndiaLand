export interface Plot {
  id: string;
  image: string;
  images: string[];
  title: string;
  location: string;
  subLocation: string;
  price: string;
  pricePerSqft: string;
  area: string;
  units: string;
  type: string;
  facing: string;
  status: string;
  isRera?: boolean;
  khataType?: "A Khata" | "B Khata" | "DC Converted";
  ownership: string;
  connectivity: {
    metro?: string;
    highway?: string;
    airport?: string;
  };
  isNewLaunch?: boolean;
  lat: number;
  lng: number;
  description: string;
  infrastructure: {
    icon: string;
    label: string;
    value: string;
  }[];
  highlights: string[];
  agent: {
    name: string;
    role: string;
    image: string;
    phone: string;
  };
}

export const MOCK_LISTINGS: Plot[] = [
  {
    id: "1",
    image: "/plots/plot1.png",
    images: ["/plots/plot1.png", "/plots/plot2.png", "/plots/plot3.png"],
    title: "Urban Retreat - Gated Community Plot",
    location: "Sarjapur Road, Bangalore",
    subLocation: "Chambenahalli, Near Wipro Office",
    price: "₹1.25 Crore",
    pricePerSqft: "10,416",
    area: "1,200",
    units: "sq.ft",
    type: "Residential",
    facing: "East Facing",
    status: "Ready to Build",
    ownership: "Freehold",
    isRera: true,
    khataType: "A Khata",
    connectivity: {
      metro: "1.5km to Metro",
      highway: "Near Outer Ring Road",
    },
    isNewLaunch: false,
    lat: 12.9226,
    lng: 77.7274,
    description: "Premium 30x40 corner plot available for sale in a highly developed gated community on Sarjapur Road. This A-Khata property comes with clear titles and is ready for immediate construction. The plot is East facing, which is considered highly auspicious according to Vaastu Shastra.\n\nThe community features 40ft wide internal tar roads, underground electricity cabling, and a dedicated Cauvery water connection point for each plot. Located just 10 minutes from the upcoming Sarjapur Metro station and surrounded by prestigious international schools and IT parks.",
    infrastructure: [
      { icon: "Droplets", label: "Water", value: "Cauvery Water" },
      { icon: "Zap", label: "Power", value: "Underground Cabling" },
      { icon: "Shield", label: "Security", value: "CCTV Surveillance" },
      { icon: "Truck", label: "Roads", value: "Black Top Roads" },
      { icon: "Trees", label: "Parks", value: "Landscaped Park" },
      { icon: "CloudRain", label: "Green", value: "Rainwater Harvesting" },
    ],
    highlights: [
      "High appreciation potential in Sarjapur corridor",
      "Clear Titles - E-Khata Transfer ready",
      "Prime corner location with dual side access"
    ],
    agent: {
      name: "Srinivas Reddy",
      role: "Lead Relationship Manager",
      image: "/agents/agent1.png",
      phone: "+91 98XXX XXX01"
    }
  },
  {
    id: "2",
    image: "/plots/plot2.png",
    images: ["/plots/plot2.png", "/plots/plot1.png", "/plots/plot3.png"],
    title: "Premier Township Plot near Airport",
    location: "Devanahalli, Bangalore",
    subLocation: "Near IVC Road",
    price: "₹48 Lakh",
    pricePerSqft: "3,200",
    area: "1,500",
    units: "sq.ft",
    type: "Residential",
    facing: "North Facing",
    status: "Plot Ready",
    ownership: "Freehold",
    isRera: true,
    khataType: "DC Converted",
    connectivity: {
      airport: "15 mins to KIAL",
      highway: "On NH 44",
    },
    isNewLaunch: true,
    lat: 13.2483,
    lng: 77.7126,
    description: "Investment opportunity in a strategic location near Kempegowda International Airport. This 1500 sq.ft DC Converted plot is part of a 50-acre integrated township. Excellent connectivity to NH 44 and IVC Road makes it a prime candidate for high ROI.",
    infrastructure: [
      { icon: "Zap", label: "Power", value: "Overhead Lines" },
      { icon: "Shield", label: "Security", value: "Gated Community" },
      { icon: "Truck", label: "Roads", value: "Cement Roads" },
    ],
    highlights: [
      "Strategic location near Bangalore Airport",
      "Upcoming Aero-IT Park nearby",
      "Township with 30+ luxury amenities"
    ],
    agent: {
      name: "Anjali Sharma",
      role: "Senior Consultant",
      image: "/agents/agent2.png",
      phone: "+91 98XXX XXX02"
    }
  },
  {
    id: "3",
    image: "/plots/plot3.png",
    images: ["/plots/plot3.png", "/plots/plot1.png", "/plots/plot2.png"],
    title: "Large Commercial Plot - Hosur Main Road",
    location: "Electronic City Phase II, Bangalore",
    subLocation: "Near Huskur Gate",
    price: "₹3.4 Crore",
    pricePerSqft: "5,666",
    area: "6,000",
    units: "sq.ft",
    type: "Commercial",
    facing: "East Facing",
    status: "Industrial Ready",
    ownership: "Leasehold",
    isRera: false,
    khataType: "A Khata",
    connectivity: {
      metro: "Prime Retail Loc",
      highway: "Highway Access",
    },
    isNewLaunch: false,
    lat: 12.8391,
    lng: 77.6766,
    description: "6000 sq.ft commercial plot ideal for showrooms, offices, or boutique warehouses. Located right on the Hosur Main Road with massive frontage and high visibility. A-Khata property with permission for G+4 construction.",
    infrastructure: [
      { icon: "Droplets", label: "Water", value: "Borewell & Tanker" },
      { icon: "Zap", label: "Power", value: "Industrial Connection" },
      { icon: "Shield", label: "Security", value: "Perimeter Wall" },
    ],
    highlights: [
      "Excellent frontage on Hosur Main Road",
      "High visibility for commercial branding",
      "Easy access to Nice Road & Elevated Tollway"
    ],
    agent: {
      name: "Vikram Malhotra",
      role: "Commercial Expert",
      image: "/agents/agent3.png",
      phone: "+91 98XXX XXX03"
    }
  }
];
