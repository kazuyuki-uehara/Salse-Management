import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { SalesData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  salesData: SalesData;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, salesData }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-lg font-medium">売上データの削除</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 text-gray-600">
          <p className="mb-4">以下の売上データを削除してもよろしいですか？</p>
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <p>
              <span className="font-medium">テナント名：</span>
              {salesData.tenantId === '1' ? 'テナントA' :
               salesData.tenantId === '2' ? 'テナントB' : 'テナントC'}
            </p>
            <p>
              <span className="font-medium">年月：</span>
              {salesData.date.replace('-', '年')}月
            </p>
            <p>
              <span className="font-medium">売上金額：</span>
              {new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
                maximumFractionDigits: 0
              }).format(salesData.amount)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}