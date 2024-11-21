import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { SalesData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
  salesData: SalesData;
}

export function EditSalesModal({ isOpen, onClose, onSave, salesData }: Props) {
  const [amount, setAmount] = useState(salesData.amount.toString());
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAmount = Number(amount);
    
    if (isNaN(newAmount) || newAmount < 0) {
      setError('有効な金額を入力してください');
      return;
    }

    onSave(newAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">売上額の修正</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              テナント名
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {salesData.tenantId === '1' ? 'テナントA' :
               salesData.tenantId === '2' ? 'テナントB' : 'テナントC'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              年月
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {salesData.date.replace('-', '年')}月
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              売上金額
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">¥</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError('');
                }}
                className="block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">円</span>
              </div>
            </div>
            {error && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}