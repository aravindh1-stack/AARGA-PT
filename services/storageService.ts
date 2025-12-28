
import { Customer } from '../types';

const STORAGE_KEY = 'policytrack_customers_v2';

export const storageService = {
  getCustomers: (): Customer[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCustomer: (customer: Customer): void => {
    const customers = storageService.getCustomers();
    const index = customers.findIndex((c) => c.id === customer.id);
    if (index > -1) {
      customers[index] = customer;
    } else {
      customers.push(customer);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  },

  deleteCustomer: (id: string): void => {
    const customers = storageService.getCustomers();
    const filtered = customers.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  seedData: (): void => {
    const current = storageService.getCustomers();
    if (current.length === 0) {
      const now = new Date();
      const demoData: Customer[] = [
        {
          id: 'CUST-101',
          name: 'Sarah Connor',
          dob: '1984-05-12',
          mobile: '555-0199',
          email: 'sarah.c@sky.net',
          address: '123 Resistance Way, LA',
          pan: 'ABCDE1234F',
          smk: 'Level 5',
          policies: [
            {
              id: 'p1',
              type: 'Health',
              policyId: 'HLTH-990',
              companyName: 'Cyberdyne Care',
              startDate: '2023-01-01',
              endDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              amount: '15000'
            },
            {
              id: 'p2',
              type: 'Car',
              policyId: 'CAR-442',
              companyName: 'Motor-Shield',
              startDate: '2023-05-01',
              endDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              amount: '25000'
            }
          ],
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
    }
  }
};
