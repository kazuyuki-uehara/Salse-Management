import React, { useState } from 'react';
import { CreditCard, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSales } from '../contexts/SalesContext';
import { SalesData } from '../types';

interface FormData {
  month: string;
  amount: string;
}

interface FormErrors {
  month?: string;
  amount?: string;
}

export function SalesInput() {
  const { user } = useAuth();
  const { salesData, setSalesData } = useSales();
  const [formData, setFormData] = useState<FormData>({
    month: new Date().toISOString().slice(0, 7),
    amount: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const formatAmount = (value: string) => {
    // Remove non-digit characters
    const numbers = value.replace(/[^\d]/g, '');
    // Format with commas
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.month) {
      newErrors.month = '年月を選択してください';
    } else {
      const existingEntry = salesData.find(
        sale => sale.tenantId === user?.tenantId && sale.date === formData.month
      );
      if (existingEntry) {
        newErrors.month = 'この月の売上データは既に登録されています';
      }
    }
    
    if (!formData.amount) {
      newErrors.amount = '売上金額を入力してください';
    } else if (isNaN(Number(formData.amount.replace(/,/g, ''))) || Number(formData.amount.replace(/,/g, '')) < 0) {
      newErrors.amount = '有効な金額を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && user) {
      const newSalesData: SalesData = {
        id: Date.now().toString(),
        tenantId: user.tenantId,
        userId: user.id,
        date: formData.month,
        amount: Number(formData.amount.replace(/,/g, ''))
      };

      setSalesData(prev => [...prev, newSalesData]);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData(prev => ({ ...prev, amount: '' }));
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value;
    setFormData(prev => ({ ...prev, month: newMonth }));
    
    setErrors(prev => ({ ...prev, month: undefined }));
    
    const existingEntry = salesData.find(
      sale => sale.tenantId === user?.tenantId && sale.date === newMonth
    );
    if (existingEntry) {
      setErrors(prev => ({
        ...prev,
        month: 'この月の売上データは既に登録されています'
      }));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    setFormData(prev => ({ ...prev, amount: formatted }));
    setErrors(prev => ({ ...prev, amount: undefined }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">売上入力</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="ヘルプを表示"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {showHelp && (
        <div className="mb-6 p-4 bg-blue-50 rounded-md text-sm leading-relaxed">
          <h3 className="font-semibold mb-2 text-blue-900">入力方法</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-900">
            <li>年月を選択してください（自動で今月が選択されています）</li>
            <li>売上金額を入力してください（数字のみ入力可能です）</li>
            <li>内容を確認して「保存」ボタンを押してください</li>
          </ol>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
            年月
          </label>
          <input
            type="month"
            id="month"
            value={formData.month}
            onChange={handleMonthChange}
            className={`block w-full rounded-md border text-base py-2.5 px-3 ${
              errors.month 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-indigo-500'
            } focus:ring-2 focus:ring-offset-2 bg-white shadow-sm`}
          />
          {errors.month && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.month}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            売上金額
          </label>
          <div className="relative">
            <input
              type="text"
              id="amount"
              value={formData.amount}
              onChange={handleAmountChange}
              placeholder="0"
              className={`block w-full rounded-md border text-base py-2.5 px-3 ${
                errors.amount 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-indigo-500'
              } focus:ring-2 focus:ring-offset-2 bg-white shadow-sm`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-base">円</span>
            </div>
          </div>
          {errors.amount && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.amount}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
            success
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            success ? 'focus:ring-green-500' : 'focus:ring-indigo-500'
          } transition-colors duration-200`}
        >
          {success ? (
            <>
              <Check className="w-5 h-5" />
              保存しました
            </>
          ) : (
            '保存'
          )}
        </button>
      </form>
    </div>
  );
}