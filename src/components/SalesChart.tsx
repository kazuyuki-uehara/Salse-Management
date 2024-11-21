import React from 'react';
import { LineChart, BarChart as BarChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { SalesData } from '../types';
import { mockTenants } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  data: SalesData[];
  type: 'line' | 'stacked';
  title: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(value);
}

export function SalesChart({ data, type, title }: Props) {
  const { user } = useAuth();

  const processedData = React.useMemo(() => {
    const filteredData = user?.role === 'tenant'
      ? data.filter(sale => sale.tenantId === user.tenantId)
      : data;

    const monthlyData = filteredData.reduce((acc, curr) => {
      const month = curr.date;
      if (!acc[month]) {
        acc[month] = {
          month,
          total: 0
        };
        if (user?.role === 'admin') {
          mockTenants.forEach(tenant => {
            acc[month][tenant.id] = 0;
          });
        }
      }
      
      if (user?.role === 'admin') {
        acc[month][curr.tenantId] = (acc[month][curr.tenantId] || 0) + curr.amount;
      }
      acc[month].total += curr.amount;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }, [data, user]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
        {type === 'line' ? (
          <LineChart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
        ) : (
          <BarChartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
        )}
      </div>
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <RechartsLineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => value.replace(/^\d{4}-/, '')}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `¥${value / 10000}万`}
                tick={{ fontSize: 12 }}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), '売上']}
                labelFormatter={(label) => `${label.replace(/^\d{4}-/, '')}月`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="売上"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                key="total-line"
              />
            </RechartsLineChart>
          ) : (
            <RechartsBarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => value.replace(/^\d{4}-/, '')}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={(value) => `¥${value / 10000}万`}
                tick={{ fontSize: 12 }}
                width={60}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  mockTenants.find(t => t.id === name)?.name || '売上'
                ]}
                labelFormatter={(label) => `${label.replace(/^\d{4}-/, '')}月`}
              />
              <Legend
                formatter={(value) => 
                  mockTenants.find(t => t.id === value)?.name || value
                }
              />
              {mockTenants.map((tenant, index) => (
                <Bar
                  key={`bar-${tenant.id}`}
                  dataKey={tenant.id}
                  name={tenant.name}
                  stackId="sales"
                  fill={`hsl(${index * 120}, 70%, 50%)`}
                />
              ))}
            </RechartsBarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}