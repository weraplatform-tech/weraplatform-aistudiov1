
export interface SkillEntry {
  category: string;
  subCategory: string;
  role: string;
  credential: string;
  platformStatus: 'Active' | 'Beta' | 'Roadmap';
  minRate: number;
  maxRate: number;
  commission: string;
  verificationMethod: string;
  geolocationEnabled: boolean;
  appSection: string;
  tvetPartner: string;
}

export const skillsDatabase: SkillEntry[] = [
  {
    category: 'SKILLED TRADES',
    subCategory: 'Automotive',
    role: 'Mechanic (General)',
    credential: 'Level 4/5 (Artisan/Craft)',
    platformStatus: 'Active',
    minRate: 600,
    maxRate: 2500,
    commission: '15%',
    verificationMethod: 'NTSA/KNTC Record + RPL',
    geolocationEnabled: true,
    appSection: 'Skilled Trades',
    tvetPartner: 'KTTC'
  },
  // ... (Adding more entries as needed - this shows the structure)
];
