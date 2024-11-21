import React from 'react';
import { Table } from 'lucide-react';
import { SalesData } from '../types';

interface Props {
  data: SalesData[];
}

export function SalesTable({ data }: Props) {
  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Table className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">売上履歴</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                年月
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                売上金額
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                  {sale.date.replace('-', '年')}月
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'JPY',
                    maximumFractionDigits: 0
                  }).format(sale.amount)}
                </td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-sm text-gray-500 text-center border-r border-gray-200">
                  売上データがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}