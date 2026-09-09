export interface Activity {
  id: string;
  name: string;
  category: 'motor' | 'outdoor' | 'culture' | 'chill';
  costPerPerson: number;
  duration: string;
  ageRequirement: string;
  highlight: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  officialWebsite?: string;
  sourceLabel?: string;
}

export interface CompetitorDeal {
  platform: 'Booking.com' | 'Airbnb' | 'FeWo-direkt' | 'Agoda' | 'Trivago';
  pricePerNight: number;
  serviceFee: number;
  totalForStay: number;
  pricePp: number;
  isLowestPrice: boolean;
  badge?: string;
  notes: string;
  directUrl: string;
}

export interface LodgingVilla {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  location: string;
  exactAddress: string;
  distanceToRing: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNightTotal: number;
  pricePp2Nights: number; // for 3 boys
  pricePp3Nights?: number;
  cleaningFee: number;
  touristTaxPpNight: number;
  isLuxuryPoolOption?: boolean;
  hasPrivatePool?: boolean;
  hasWhirlpool?: boolean;
  hasSauna?: boolean;
  selfCheckInMethod: string;
  rating: number;
  reviewCount: number;
  reviewQuote: string;
  platform: string;
  bookingDirectUrl: string;
  bookingSearchUrl: string;
  airbnbSearchUrl: string;
  fewoSearchUrl: string;
  agodaUrl: string;
  trivagoUrl: string;
  bookingUrl: string; // fallback legacy
  competitorDeals: CompetitorDeal[];
  facilities: string[];
  whyPerfectFor17: string;
  bookingStepByStep: string;
}

export interface RestaurantGuide {
  id: string;
  name: string;
  category: string;
  location: string;
  distanceToRing: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  avgCostPp: number;
  officialWebsite: string;
  vibeDescription: string;
  menuHighlights: { item: string; price: string; note: string }[];
  legal16Check: string;
  reviewHighlight: string;
}

export interface DayScheduleItem {
  time: string;
  activity: string;
  location: string;
  costPp: number;
  costTotal: number;
  category: 'travel' | 'food' | 'action' | 'chill' | 'nightlife';
  details: string;
  legalCheck17: string;
  verifiedSource?: string;
}

export interface DayPlan {
  dayNumber: number;
  dayTitle: string;
  dateSuggestion: string;
  summary: string;
  items: DayScheduleItem[];
  dayTotalPp: number;
  dayTotalGroup: number;
}

export interface NurburgringTripMaster {
  groupSize: number;
  nights: number;
  days: number;
  totalBudgetPp: number;
  totalBudgetGroup: number;
  transitDetails: {
    route: string;
    duration: string;
    costPp: number;
    tickets: string;
    steps: { step: string; info: string }[];
  };
  lodgingOptions: LodgingVilla[];
  restaurantsAndNightlife: RestaurantGuide[];
  activities: Activity[];
  parentSecurityChecklist: string[];
}
