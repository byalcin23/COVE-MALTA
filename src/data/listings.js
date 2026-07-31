export const LISTINGS = [
  {
    id: "mlt-001",
    title: "The Tigné Seafront Penthouse",
    location: "Sliema",
    address: "Tigné Seafront, Sliema, SLM 3012",
    price: 2400,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    type: "Penthouse",
    image: "/images/sliema.png",
    images: [
      "/images/sliema.png",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.95,
    reviewsCount: 38,
    isPopular: true,
    isVerified: true,
    advantageTag: "⚡ 12% Below Sliema Avg. Price",
    advantageScore: 88,
    description: "An extraordinary top-floor penthouse situated along the prime Sliema promenade. Features unhindered panoramic views of the Mediterranean Sea and Valletta bastions, an expansive private terrace with hot tub, smart home automation, and secure underground garage parking.",
    features: ["Sea View", "Private Terrace", "Jacuzzi", "Smart Home", "Garage Parking", "Climate Control", "Pet Friendly"],
    agent: {
      name: "Julian Pace",
      company: "Malta Haven Luxury Estates",
      phone: "+356 9912 3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "8th Floor (Top Floor)",
      deposit: "€2,400",
      availableFrom: "Immediate",
      minimumLease: "6 Months",
      energyRating: "A++"
    }
  },
  {
    id: "mlt-002",
    title: "Spinola Bay Minimalist Suite",
    location: "St. Julian's",
    address: "Spinola Road, St. Julian's, STJ 1010",
    price: 1850,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 110,
    type: "Modern Apartment",
    image: "/images/st_julians.png",
    images: [
      "/images/st_julians.png",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.88,
    reviewsCount: 29,
    isPopular: true,
    isVerified: true,
    description: "Located in the vibrant coastal enclave of St. Julian's. This refined residence overlooks Spinola Bay, offering an open-concept living space, Italian designer kitchen, floor-to-ceiling windows, and access to a shared swimming pool.",
    features: ["Swimming Pool", "Bay View", "Designer Kitchen", "Balcony", "Elevator", "Fitness Center"],
    agent: {
      name: "Elena Cassar",
      company: "Spinola Real Estate",
      phone: "+356 9988 7766",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "4th Floor",
      deposit: "€1,850",
      availableFrom: "Next Month",
      minimumLease: "12 Months",
      energyRating: "A+"
    }
  },
  {
    id: "mlt-003",
    title: "Valletta Historic Palazzo Flat",
    location: "Valletta",
    address: "Republic Street, Valletta, VLT 1115",
    price: 3100,
    currency: "€",
    period: "month",
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    type: "Historic Villa",
    image: "/images/valletta.png",
    images: [
      "/images/valletta.png",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.98,
    reviewsCount: 42,
    isPopular: true,
    isVerified: true,
    advantageTag: "🌟 Rare Heritage Listing",
    advantageScore: 92,
    description: "A museum-grade 17th-century palazzo restoration situated inside UNESCO-protected Valletta. Features restored stone arches, timber balcony over Republic Street, high ceilings, custom brass finishes, and wine cellar.",
    features: ["Historic Character", "High Ceilings", "Wine Cellar", "Maltese Balcony", "Air Conditioning", "Concierge Service"],
    agent: {
      name: "Marcus Vella",
      company: "Valletta Heritage Properties",
      phone: "+356 9944 3322",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Piano Nobile",
      deposit: "€3,100",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "B+"
    }
  },
  {
    id: "mlt-004",
    title: "Gozo Cliffside Sanctuary Villa",
    location: "Gozo",
    address: "Triq il-Kantra, Xlendi, Gozo, XLN 1020",
    price: 1600,
    currency: "€",
    period: "month",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "Rustic Villa",
    image: "/images/gozo.png",
    images: [
      "/images/gozo.png",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.91,
    reviewsCount: 31,
    isPopular: false,
    isVerified: true,
    description: "Nestled on a peaceful cliffside overlooking Xlendi Bay in Gozo. Features traditional Maltese Globigerina limestone architecture, private infinity pool, olive grove garden, and total privacy for peaceful living.",
    features: ["Infinity Pool", "Cliffside View", "Private Garden", "Quiet Area", "BBQ Area", "Solar Panels"],
    agent: {
      name: "Maria Camilleri",
      company: "Gozo Tranquil Homes",
      phone: "+356 9955 1144",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Detached Villa",
      deposit: "€1,600",
      availableFrom: "Immediate",
      minimumLease: "6 Months",
      energyRating: "A++"
    }
  },
  {
    id: "mlt-005",
    title: "Ta' Xbiex Marina Penthouse",
    location: "Ta' Xbiex",
    address: "Marina Promenade, Ta' Xbiex, XBX 1011",
    price: 2750,
    currency: "€",
    period: "month",
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.96,
    reviewsCount: 22,
    isPopular: true,
    isVerified: true,
    advantageTag: "⚓ Direct Marina Berth Access",
    advantageScore: 90,
    description: "Sleek waterfront penthouse directly facing Msida Yacht Marina. Features floor-to-ceiling glass, teak wood deck terrace, private elevator entry, and underground double garage.",
    features: ["Marina View", "Teak Deck", "Private Elevator", "Double Garage", "Smart Security", "Wine Cooler"],
    agent: {
      name: "Julian Pace",
      company: "Malta Haven Luxury Estates",
      phone: "+356 9912 3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "7th Floor (Top Floor)",
      deposit: "€2,750",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A++"
    }
  },
  {
    id: "mlt-006",
    title: "Mdina Citadel Palazzo Suite",
    location: "Mdina",
    address: "Villegaignon Street, Mdina, MDN 1050",
    price: 3400,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 175,
    type: "Historic Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.99,
    reviewsCount: 19,
    isPopular: true,
    isVerified: true,
    advantageTag: "👑 Inside Mdina Silent City Wall",
    advantageScore: 95,
    description: "An extraordinary opportunity to reside within the ancient Silent City citadel of Mdina. Impeccably preserved limestone vaulting, private internal courtyard, underfloor heating, and antique furnishings.",
    features: ["Mdina Citadel Location", "Private Courtyard", "Underfloor Heating", "Vaulted Ceilings", "Antique Furnishings"],
    agent: {
      name: "Marcus Vella",
      company: "Valletta Heritage Properties",
      phone: "+356 9944 3322",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Ground & Mezzanine",
      deposit: "€3,400",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "B+"
    }
  },
  {
    id: "mlt-007",
    title: "St. Paul's Bay Promenade Flat",
    location: "St. Paul's Bay",
    address: "Dawret il-Gzejjer, St. Paul's Bay, SPB 2500",
    price: 1350,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 98,
    type: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.82,
    reviewsCount: 15,
    isPopular: false,
    isVerified: true,
    description: "Bright seafront apartment offering unhindered views over St. Paul's Islands. Features south-facing balcony, modern kitchen, air conditioning throughout, and close proximity to swimming coves.",
    features: ["Island Sea View", "South Balcony", "Air Conditioning", "Walk to Swimming Coves", "Elevator"],
    agent: {
      name: "Elena Cassar",
      company: "Spinola Real Estate",
      phone: "+356 9988 7766",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "5th Floor",
      deposit: "€1,350",
      availableFrom: "Immediate",
      minimumLease: "6 Months",
      energyRating: "A"
    }
  },
  {
    id: "mlt-008",
    title: "Marsaxlokk Harbour Suite",
    location: "Marsaxlokk",
    address: "Xatt il-Sajjieda, Marsaxlokk, MXK 1010",
    price: 1450,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 1,
    area: 105,
    type: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.87,
    reviewsCount: 17,
    isPopular: false,
    isVerified: true,
    description: "Charming seafront suite overlooking the traditional colourful Luzzu fishing boats in Marsaxlokk. Quiet fishing village setting with fresh seafood restaurants at your doorstep.",
    features: ["Harbour View", "Quiet Fishing Village", "Traditional Maltese Balcony", "Walk to Seafood Market"],
    agent: {
      name: "Maria Camilleri",
      company: "Gozo Tranquil Homes",
      phone: "+356 9955 1144",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "2nd Floor",
      deposit: "€1,450",
      availableFrom: "Immediate",
      minimumLease: "6 Months",
      energyRating: "A+"
    }
  },
  {
    id: "mlt-009",
    title: "Valletta Bastion Sky Penthouse",
    location: "Valletta",
    address: "St. Ursula Street, Valletta, VLT 1234",
    price: 3900,
    currency: "€",
    period: "month",
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.99,
    reviewsCount: 35,
    isPopular: true,
    isVerified: true,
    advantageTag: "🏰 Grand Harbour Unhindered View",
    advantageScore: 96,
    description: "Ultra-exclusive sky penthouse directly above St. Barbara Bastion in Valletta. Offering 360-degree vistas of Grand Harbour and Fort St. Angelo, infinity edge dip pool, and private glass elevator.",
    features: ["Grand Harbour View", "Infinity Dip Pool", "Glass Elevator", "Private Roof Deck", "Wine Cellar"],
    agent: {
      name: "Marcus Vella",
      company: "Valletta Heritage Properties",
      phone: "+356 9944 3322",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Penthouse Level 6",
      deposit: "€3,900",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A++"
    }
  },
  {
    id: "mlt-010",
    title: "Gozo Victoria Citadel Residence",
    location: "Gozo",
    address: "Triq Castle, Victoria, Gozo, VCT 1015",
    price: 1700,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    type: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.89,
    reviewsCount: 14,
    isPopular: false,
    isVerified: true,
    description: "Elegantly restored town residence located at the foot of Victoria Citadel in Gozo. High vaulted ceilings, sunny central courtyard, and walk-to-market convenience.",
    features: ["Citadel View", "Sunny Courtyard", "Vaulted Ceilings", "Quiet Central Location"],
    agent: {
      name: "Maria Camilleri",
      company: "Gozo Tranquil Homes",
      phone: "+356 9955 1144",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Townhouse Residence",
      deposit: "€1,700",
      availableFrom: "Immediate",
      minimumLease: "6 Months",
      energyRating: "A+"
    }
  },
  {
    id: "mlt-011",
    title: "Sliema Tower Road Luxury Flat",
    location: "Sliema",
    address: "Tower Road, Sliema, SLM 1600",
    price: 2100,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: 125,
    type: "Modern Apartment",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.91,
    reviewsCount: 27,
    isPopular: true,
    isVerified: true,
    description: "Modern high-floor apartment along Sliema's iconic Tower Road. Direct open sea views, private balcony, marble flooring, and concierge service.",
    features: ["Tower Road Promenade", "Open Sea View", "Marble Flooring", "Balcony", "Concierge"],
    agent: {
      name: "Julian Pace",
      company: "Malta Haven Luxury Estates",
      phone: "+356 9912 3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "6th Floor",
      deposit: "€2,100",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A+"
    }
  },
  {
    id: "mlt-012",
    title: "Mellieha Ridge Panoramic Villa",
    location: "Mellieha",
    address: "Triq il-Qortin, Mellieha, MLH 2030",
    price: 3200,
    currency: "€",
    period: "month",
    bedrooms: 4,
    bathrooms: 4,
    area: 280,
    type: "Rustic Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.97,
    reviewsCount: 30,
    isPopular: true,
    isVerified: true,
    advantageTag: "🏊‍♂️ Heated Pool & Panoramic Ridge View",
    advantageScore: 94,
    description: "Commanding luxury villa perched on Mellieha Ridge with sweeping views over Ghadira Bay and Comino Island. Private heated pool, landscaped gardens, 3-car garage, and independent guest annex.",
    features: ["Mellieha Ridge View", "Heated Pool", "Guest Annex", "3-Car Garage", "Landscaped Garden"],
    agent: {
      name: "Julian Pace",
      company: "Malta Haven Luxury Estates",
      phone: "+356 9912 3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Detached Villa",
      deposit: "€3,200",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A++"
    }
  }
];

export const LOCATIONS = [
  "All Locations",
  "Sliema",
  "St. Julian's",
  "Valletta",
  "Gozo",
  "Ta' Xbiex",
  "Mdina",
  "St. Paul's Bay",
  "Marsaxlokk",
  "Mellieha"
];

export const CATEGORIES = [
  "All Types",
  "Penthouse",
  "Modern Apartment",
  "Historic Villa",
  "Rustic Villa"
];
