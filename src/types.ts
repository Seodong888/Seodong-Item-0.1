export type SafetyGrade = 'S' | 'A' | 'B';

export interface Game {
  id: string;
  name: string;
  icon: string;
}

export interface ItemListing {
  id: string;
  gameId: string;
  server: string;
  title: string;
  price: number;
  thumbnail: string;
  safetyGrade: SafetyGrade;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerTrades: number;
  isVerified: boolean;
  description: string;
  level: number;
  class: string;
  equipment: string[];
  skills: string[];
  currency: string;
  images: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  mileage: number;
  profileImage?: string;
}

export interface Transaction {
  id: string;
  itemId: string;
  buyerId: string;
  sellerId: string;
  status: 'payment' | 'contract' | 'handover' | 'completed';
  amount: number;
  createdAt: string;
}
