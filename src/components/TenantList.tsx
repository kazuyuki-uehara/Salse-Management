import React, { useState } from 'react';
import { Building2, TrendingUp, TrendingDown, Edit2, Trash2 } from 'lucide-react';
import { SalesData, Tenant } from '../types';
import { EditSalesModal } from './EditSalesModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ExportButton } from './ExportButton';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  tenants: Tenant[];
  salesData: SalesData[];
}

function calculateMonthlyData(salesData: SalesData[], tenantId: string) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`;

  const currentMonthSales = salesData
    .filter(sale => sale.tenantId === tenantId && sale.date === currentMonth)
    .reduce((sum, sale) => sum + sale.amount, 0);

  const lastMonthSales = salesData
    .filter(sale => sale.tenantId === tenantId && sale.date === lastMonth)
    .reduce((sum, sale) => sum + sale.amount, 0);

  const percentageChange = lastMonthSales === 0 
    ? 100 
    : ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;

  return {
    currentMonth: currentMonthSales,
    percentageChange,
    currentMonthSale: salesData.find(sale => sale.tenantId === tenantId && sale.date === currentMonth)
  };
}

export function TenantList({ tenants, salesData: initialSalesData }: Props) {
  const [salesData, setSalesData] = useLocalStorage('salesData', initialSalesData);
  const [editingSale, setEditingSale] = useState<SalesData | null>(null);
  const [deletingSale, setDeletingSale] = useState<SalesData | null>(null);

  const handleSave = (newAmount: number) => {
    if (!editingSale) return;

    setSalesData(prev => prev.map(sale => 
      sale.id === editingSale.id
        ? { ...sale, amount: newAmount }
        : sale
    ));
    setEditingSale(null);
  };

  const handleDelete = () => {
    if (!deletingSale) return;

    setSalesData(prev => prev.filter(sale => sale.id !== deletingSale.id));
    setDeletingSale(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">テナント一覧</h2>
          </div>
          <ExportButton salesData={salesData} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  テナント名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  今月の売上
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  前月比
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenants.map((tenant) => {
                const { currentMonth, percentageChange, currentMonthSale } = calculateMonthlyData(salesData, tenant.id);
                const isPositive = percentageChange >= 0;

                return (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      {tenant.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
                      {new Intl.NumberFormat('ja-JP', {
                        style: 'currency',
                        currency: 'JPY',
                        maximumFractionDigits: 0
                      }).format(currentMonth)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm flex items-center gap-1 border-r border-gray-200
                      ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {percentageChange.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {currentMonthSale && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingSale(currentMonthSale)}
                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            修正
                          </button>
                          <button
                            onClick={() => setDeletingSale(currentMonthSale)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            削除
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingSale && (
        <EditSalesModal
          isOpen={!!editingSale}
          onClose={() => setEditingSale(null)}
          onSave={handleSave}
          salesData={editingSale}
        />
      )}

      {deletingSale && (
        <DeleteConfirmModal
          isOpen={!!deletingSale}
          onClose={() => setDeletingSale(null)}
          onConfirm={handleDelete}
          salesData={deletingSale}
        />
      )}
    </>
  );
}