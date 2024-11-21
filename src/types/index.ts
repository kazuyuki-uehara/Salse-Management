export interface User {
  id: string;
  name: string;
  tenantId: string;
  role: 'admin' | 'tenant';
  password: string;
}

export interface SalesData {
  id: string;
  tenantId: string;
  userId: string;
  date: string;
  amount: number;
}

export interface Tenant {
  id: string;
  name: string;
}