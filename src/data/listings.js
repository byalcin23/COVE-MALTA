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
    rating: 4.95,
    reviewsCount: 38,
    isPopular: true,
    isVerified: true,
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
      availableFrom: "August 1st",
      minimumLease: "12 Months",
      energyRating: "A+"
    }
  },
  {
    id: "mlt-003",
    title: "Heritage Balcony Studio Valletta",
    location: "Valletta",
    address: "St. Paul Street, Valletta, VLT 1214",
    price: 1300,
    currency: "€",
    period: "month",
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    type: "Historic Studio",
    image: "/images/valletta.png",
    rating: 4.98,
    reviewsCount: 52,
    isPopular: false,
    isVerified: true,
    description: "Immersed in the heart of UNESCO World Heritage Valletta. Meticulously restored 18th-century limestone architectural gem showcasing an authentic wooden Maltese balcony ('Gallarija'), high ceilings, custom lighting, and bespoke minimalist furnishings.",
    features: ["Maltese Balcony", "Historic Stone", "High Ceilings", "City Center", "Bespoke Design"],
    agent: {
      name: "Kurt Borg",
      company: "Valletta Heritage Homes",
      phone: "+356 9933 2211",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "2nd Floor",
      deposit: "€1,300",
      availableFrom: "Immediate",
      minimumLease: "3 Months",
      energyRating: "B"
    }
  },
  {
    id: "mlt-004",
    title: "Gozo Sanctuary Villa & Pool",
    location: "Gozo",
    address: "Xagħra Valley, Gozo, XRA 2100",
    price: 3200,
    currency: "€",
    period: "month",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "Villa / Farmhouse",
    image: "/images/gozo.png",
    rating: 5.0,
    reviewsCount: 16,
    isPopular: true,
    isVerified: true,
    description: "Tucked away in the serene countryside of Gozo island. A secluded stone villa featuring a turquoise infinity pool, sun deck, olive grove gardens, outdoor dining pergola, and panoramic countryside vistas. The ultimate Mediterranean retreat.",
    features: ["Infinity Pool", "Private Garden", "BBQ Area", "Driveway", "Fireplace", "Valley Views"],
    agent: {
      name: "Samantha Vella",
      company: "Gozo Island Living",
      phone: "+356 9944 5566",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "Detached 2-Story",
      deposit: "€3,200",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A"
    }
  },
  {
    id: "mlt-005",
    title: "The Strand Waterfront Residence",
    location: "Gzira",
    address: "The Strand, Gzira, GZR 1022",
    price: 1600,
    currency: "€",
    period: "month",
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    type: "Modern Apartment",
    image: "/images/sliema.png",
    rating: 4.79,
    reviewsCount: 22,
    isPopular: false,
    isVerified: true,
    description: "Directly facing Manoel Island marina and the Valletta skyline across the creek. Features floor-to-ceiling glass doors, minimalist interior design, brand-new appliances, and steps from waterfront dining.",
    features: ["Marina View", "Brand New Interior", "AC Throughout", "Balcony", "Fiber Internet"],
    agent: {
      name: "Julian Pace",
      company: "Malta Haven Luxury Estates",
      phone: "+356 9912 3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "5th Floor",
      deposit: "€1,600",
      availableFrom: "August 15th",
      minimumLease: "6 Months",
      energyRating: "A"
    }
  },
  {
    id: "mlt-006",
    title: "Mellieħa Heights Coastal Villa",
    location: "Mellieħa",
    address: "Heights Road, Mellieħa, MLH 1044",
    price: 2100,
    currency: "€",
    period: "month",
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    type: "Coastal Apartment",
    image: "/images/st_julians.png",
    rating: 4.92,
    reviewsCount: 31,
    isPopular: true,
    isVerified: true,
    description: "Perched high above Mellieħa Bay beach with breathtaking sea vistas towards Comino and Gozo. Offers a wide entertainer's terrace, master ensuite, and lock-up garage.",
    features: ["Panoramic Sea", "Expansive Terrace", "Ensuite Master", "Garage", "Walk to Beach"],
    agent: {
      name: "Samantha Vella",
      company: "Gozo Island Living",
      phone: "+356 9944 5566",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    specs: {
      floor: "3rd Floor",
      deposit: "€2,100",
      availableFrom: "Immediate",
      minimumLease: "12 Months",
      energyRating: "A+"
    }
  }
];

export const LOCATIONS = [
  "All Malta",
  "Sliema",
  "St. Julian's",
  "Valletta",
  "Gzira",
  "Gozo",
  "Mellieħa"
];
