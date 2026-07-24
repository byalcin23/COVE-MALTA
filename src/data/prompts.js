export const NATURAL_SEARCH_PROMPTS = [
  {
    fullText: "Looking for a 2-bed in Sliema with private garage & sea view under €2500...",
    prefix: "Looking for a 2-bed in Sliema with ",
    magicHighlight: "private garage & sea view",
    suffix: " under €2500..."
  },
  {
    fullText: "I work in St. Julian's and need a flat with a swimming pool & short walk to office...",
    prefix: "I work in St. Julian's and need a flat with ",
    magicHighlight: "swimming pool & short walk to office",
    suffix: "..."
  },
  {
    fullText: "Want a historic studio in Valletta with a traditional Maltese balcony & high stone ceilings...",
    prefix: "Want a historic studio in Valletta with ",
    magicHighlight: "Maltese balcony & high stone ceilings",
    suffix: "..."
  },
  {
    fullText: "Family searching for a stone villa in Gozo with a private pool, garden & pet friendly...",
    prefix: "Searching for a villa in Gozo with ",
    magicHighlight: "private pool, garden & pet friendly",
    suffix: "..."
  },
  {
    fullText: "Need a cozy 1-bed flat in Gzira near marina with zero commute to work...",
    prefix: "Need a 1-bed flat in Gzira near marina with ",
    magicHighlight: "zero commute & fiber internet",
    suffix: "..."
  }
];

// Essential Building Blocks (The "Salt & Flour" Core Ingredients of Rental Searching)
export const QUICK_FILTERS = [
  { label: "🌊 Sea View", query: "sea" },
  { label: "🚗 Garage / Parking", query: "garage" },
  { label: "🏊 Pool & Terrace", query: "pool" },
  { label: "🚶 Walk to Work", query: "walk" },
  { label: "💶 Under €1,500", query: "1500" },
  { label: "🐾 Pet Friendly", query: "pet" },
  { label: "🏛️ Maltese Balcony", query: "balcony" },
  { label: "✨ Luxury Penthouse", query: "penthouse" }
];
