
export type InsuranceType = 'Bike' | 'Car' | 'Term' | 'Health' | 'LIC' | 'Personal Accident' | 'Heavy Vehicle' | 'Other';

export interface Policy {
  id: string;
  type: InsuranceType;
  policyId: string;
  companyName: string;
  startDate: string;
  endDate: string;
}

export interface Customer {
  id: string;
  name: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  pan: string;
  smk: string;
  policies: Policy[];
}

export type AppSection = 'dashboard' | 'directory' | 'add-customer';
