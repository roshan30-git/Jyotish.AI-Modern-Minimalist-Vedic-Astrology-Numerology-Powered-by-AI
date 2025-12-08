

export interface UserInputs {
  apiKey: string;
  mode: 'individual' | 'compatibility';
  chartStyle: 'north' | 'south';
  language: 'en' | 'hi'; // Added language support
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
  language?: 'en' | 'hi'; // Added to track result language
  rootNumber: number;
  moonSign: string;
  nakshatra: string;
  basicSummary: string;
  animalPersona: AnimalPersona;
  weeklyForecast: WeeklyForecast;
  personality: string[];
  loveMarriage: string[];
  careerMoney: string[];
  health: string[];
  areasToAvoid: string[];
  strengthBoosters: string[];
  luckyElements: LuckyElements;
  practicalTips: string[];
  // New features
  lifeBalanceScores: LifeBalanceScores;
  luckyDays: string[];
  festivalInsights: string;
  // Detailed Compatibility Report (Optional - only for match mode)
  compatibilityReport?: CompatibilityReport;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}