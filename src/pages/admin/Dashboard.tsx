import React from 'react';
import { SalesChart } from '../../components/SalesChart';
import { TenantList } from '../../components/TenantList';
import { UserManagement } from '../../components/UserManagement';
import { TenantManagement } from '../../components/TenantManagement';
import { mockTenants } from '../../data/mockData';
import { useSales } from '../../contexts/SalesContext';

export function AdminDashboard() {
  const { salesData } = useSales();

  return (
    <div className="space-y-6 sm:space-y-8">
      <TenantList tenants={mockTenants} salesData={salesData} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <SalesChart
          data={salesData}
          type="stacked"
          title="テナント別売上"
        />
        <SalesChart
          data={salesData}
          type="line"
          title="総売上推移"
        />
      </div>
      <UserManagement />
      <TenantManagement />
    </div>
  );
}