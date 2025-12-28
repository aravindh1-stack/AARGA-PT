
import { Customer } from '../types';

export const storageService = {
  getCustomers: async (): Promise<Customer[]> => {
    const res = await fetch('http://localhost/AARGA-PT/api/customers.php');
    if (!res.ok) {
      throw new Error(`Failed to load customers (${res.status})`);
    }

    const json = await res.json();
    if (!json?.ok) {
      throw new Error(json?.error || 'Failed to load customers');
    }

    return (json.customers ?? []) as Customer[];
  },

  saveCustomer: async (customer: Customer): Promise<void> => {
    const res = await fetch('http://localhost/AARGA-PT/api/customers.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer }),
    });

    if (!res.ok) {
      throw new Error(`Failed to save customer (${res.status})`);
    }

    const json = await res.json();
    if (!json?.ok) {
      throw new Error(json?.error || 'Failed to save customer');
    }
  },

  deleteCustomer: async (id: string): Promise<void> => {
    const url = new URL('http://localhost/AARGA-PT/api/customers.php');
    url.searchParams.set('id', id);

    const res = await fetch(url.toString(), {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete customer (${res.status})`);
    }

    const json = await res.json();
    if (!json?.ok) {
      throw new Error(json?.error || 'Failed to delete customer');
    }
  },

  seedData: async (): Promise<void> => {
    const res = await fetch('http://localhost/AARGA-PT/api/seed.php');
    if (!res.ok) {
      throw new Error(`Failed to seed data (${res.status})`);
    }

    const json = await res.json();
    if (!json?.ok) {
      throw new Error(json?.error || 'Failed to seed data');
    }
  },
};
