

export interface UserInputs {
  apiKey?: string; // Kept optional for backward compatibility but unused in UI
  mode: 'individual' | 'compatibility';
  chartStyle: 'north' | 'south';
  language: 'en' | 'hi';
  dob: string;
  gender: 'male' | 'female' | 'other';
  timeOfBirth?: string;
  placeOfBirth?: string;
  primaryLifestyle?: string;
  secondaryLifestyle?: string;
  // Partner details for compatibility
  partnerDob?: string;
  partnerGender?: 'male' | 'female' | 'other';
  partnerTimeOfBirth?: string;
  partnerPlaceOfBirth?: string;
  // Image Generation
  includeImage?: boolean;
}

export interface LuckyElements {
  colors: string;
  numbers: string;
  direction: string;
  deityOrMantra: string;
}

export interface LifeBalanceScores {
  love: number;
  career: number;
  health: number;
  family: number;
  spirituality: number;
}

export interface AnimalPersona {
  animal: string;
  emoji: string;
  description: string;
}

export interface PokemonPersona {
  name: string;
  type: string;
  description: string;
}

export interface WeeklyForecast {
  title: string;
  dos: string[];
  avoids: string[];
}

export interface CompatibilityMilestone {
  event: string;
  period: string;
  description: string;
}

export interface CompatibilityReport {
  overallScore: number;
  loveLevel: string;
  elementalVibe: string;
  relationshipDynamic: string;
  communicationStyle: string;
  communicationTips: string[];
  challengesToAvoid: string[];
  auspiciousMilestones: CompatibilityMilestone[];
  sexualChemistry: string;
  financialCompatibility: string;
}

export interface AnalysisResult {
  language?: 'en' | 'hi';
  rootNumber: number;
  moonSign: string;
  nakshatra: string;
  basicSummary: string;
  animalPersona: AnimalPersona;
  pokemonPersona: PokemonPersona;
  weeklyForecast: WeeklyForecast;
  personality: string[];
  loveMarriage: string[];
  careerMoney: string[];
  health: string[];
  areasToAvoid: string[];
  strengthBoosters: string[];
  luckyElements: LuckyElements;
  practicalTips: string[];
  lifeBalanceScores: LifeBalanceScores;
  luckyDays: string[];
  festivalInsights: string;
  compatibilityReport?: CompatibilityReport;
  generatedImage?: string; // Base64 string for the generated image
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}