import React from 'react';
import { Download } from 'lucide-react';
import { SalesData } from '../types';
import { mockTenants } from '../data/mockData';

interface Props {
  salesData: SalesData[];
}

export function ExportButton({ salesData }: Props) {
  const handleExport = () => {
    // Format data for CSV
    const headers = ['年月', 'テナント名', '売上金額'];
    const rows = salesData.map(sale => [
      `${sale.date.replace('-', '年')}月`,
      mockTenants.find(t => t.id === sale.tenantId)?.name || '',
      sale.amount.toString()
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `売上データ_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Download className="w-4 h-4 mr-2" />
      CSV出力
    </button>
  );
}