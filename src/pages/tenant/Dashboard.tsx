import React from 'react';
import { SalesInput } from '../../components/SalesInput';
import { SalesChart } from '../../components/SalesChart';
import { SalesTable } from '../../components/SalesTable';
import { useAuth } from '../../contexts/AuthContext';
import { useSales } from '../../contexts/SalesContext';

export function TenantDashboard() {
  const { user } = useAuth();
  const { salesData } = useSales();
  const tenantSalesData = salesData.filter(
    sale => sale.tenantId === user?.tenantId
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <SalesInput />
        <SalesChart
          data={tenantSalesData}
          type="line"
          title="月次売上推移"
        />
      </div>
      <SalesTable data={tenantSalesData} />
    </div>
  );
}