export const mockUser = {
  id: '1',
  name: '管理者',
  tenantId: '1',
  role: 'admin' as const
};

export const mockTenants = [
  { id: '1', name: 'テナントA' },
  { id: '2', name: 'テナントB' },
  { id: '3', name: 'テナントC' },
];

export const mockSalesData = [
  { id: '1', tenantId: '1', userId: '1', date: '2024-03', amount: 150000 },
  { id: '2', tenantId: '2', userId: '2', date: '2024-03', amount: 200000 },
  { id: '3', tenantId: '3', userId: '3', date: '2024-03', amount: 180000 },
  { id: '4', tenantId: '1', userId: '1', date: '2024-02', amount: 140000 },
  { id: '5', tenantId: '2', userId: '2', date: '2024-02', amount: 190000 },
  { id: '6', tenantId: '3', userId: '3', date: '2024-02', amount: 170000 },
];