export type VehicleType = "car" | "bike" | "truck" | "boat" | "atv" | "rv";
export type PlanTier = "basic" | "standard" | "premium";

export interface Plan {
  tier: PlanTier;
  name: string;
  price: number;
  features: string[];
  deliveryTime: string;
  description: string;
}

export interface VehicleCategory {
  type: VehicleType;
  title: string;
  singular: string;
  icon: string;
  plans: Plan[];
}

export const vehicleCategories: VehicleCategory[] = [
  {
    type: "car",
    title: "Car Packages",
    singular: "Car",
    icon: "🚗",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 55.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 60.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 65.99,
        deliveryTime: "3 Hours",
        description: "Unlock full transparency with advanced data and priority support.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
  {
    type: "bike",
    title: "Bike Packages",
    singular: "Bike",
    icon: "🏍️",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 55.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 Bike VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 60.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 Bike VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 65.99,
        deliveryTime: "3 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
  {
    type: "truck",
    title: "Truck Packages",
    singular: "Truck",
    icon: "🚛",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 55.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 Truck VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 60.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 Truck VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 65.99,
        deliveryTime: "3 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
  {
    type: "boat",
    title: "Boat Packages",
    singular: "Boat",
    icon: "🚤",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 79.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 Boat VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 89.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 Boat VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 99.99,
        deliveryTime: "3 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
  {
    type: "atv",
    title: "ATV Packages",
    singular: "ATV",
    icon: "🏎️",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 55.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 ATV VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 60.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 ATV VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 65.99,
        deliveryTime: "3 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
  {
    type: "rv",
    title: "RV Packages",
    singular: "RV",
    icon: "🚐",
    plans: [
      {
        tier: "basic",
        name: "Basic",
        price: 55.99,
        deliveryTime: "24 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "1 RV VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvation History",
          "Money Back Guarantee",
          "Within 24 Hours",
        ],
      },
      {
        tier: "standard",
        name: "Standard",
        price: 60.99,
        deliveryTime: "12 Hours",
        description: "Get verified insights and key facts to help you make a confident purchase decision.",
        features: [
          "1 RV VIN Report",
          "Comprehensive PDF",
          "Basic Vehicle Information",
          "Salvage & Accident History",
          "Odometer Reading Verification",
          "Title & Brand Check",
          "Theft & Recovery Records",
          "Money-Back Guarantee",
          "Delivery Within 12 Hours",
        ],
      },
      {
        tier: "premium",
        name: "Premium",
        price: 65.99,
        deliveryTime: "3 Hours",
        description: "Get essential data for informed decisions with a single, detailed report.",
        features: [
          "Everything in Standard Plan",
          "Lien & Loan Check",
          "Auction History & Photos (if available)",
          "Ownership History (Number of Owners)",
          "Vehicle Usage Type (Taxi, Rental, Lease)",
          "Market Value Estimate",
          "Delivery Within 3 Hours",
        ],
      },
    ],
  },
];

export function getCategoryByType(type: VehicleType): VehicleCategory | undefined {
  return vehicleCategories.find((c) => c.type === type);
}

export function getPlan(category: VehicleCategory, tier: PlanTier): Plan | undefined {
  return category.plans.find((p) => p.tier === tier);
}
