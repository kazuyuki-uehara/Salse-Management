import React, { useState, useEffect } from 'react';
import { Building2, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Tenant } from '../types';
import { mockTenants } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface TenantFormData {
  id: string;
  name: string;
}

export function TenantManagement() {
  const { users } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const stored = localStorage.getItem('tenants');
    return stored ? JSON.parse(stored) : mockTenants;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<TenantFormData>({
    id: '',
    name: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('tenants', JSON.stringify(tenants));
  }, [tenants]);

  const handleOpenModal = (tenant?: Tenant) => {
    if (tenant) {
      setEditingTenant(tenant);
      setFormData({
        id: tenant.id,
        name: tenant.name,
      });
    } else {
      setEditingTenant(null);
      setFormData({
        id: (tenants.length + 1).toString(),
        name: '',
      });
    }
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTenant(null);
    setError('');
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('テナント名を入力してください');
      return false;
    }
    if (!editingTenant && tenants.some(t => t.id === formData.id)) {
      setError('このテナントIDは既に使用されています');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingTenant) {
      setTenants(prev => prev.map(t => 
        t.id === editingTenant.id ? formData : t
      ));
    } else {
      setTenants(prev => [...prev, formData]);
    }
    handleCloseModal();
  };

  const handleDelete = (tenant: Tenant) => {
    if (users.some(user => user.tenantId === tenant.id)) {
      alert('このテナントは使用中のため削除できません');
      return;
    }
    
    if (window.confirm('このテナントを削除してもよろしいですか？')) {
      setTenants(prev => prev.filter(t => t.id !== tenant.id));
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">テナント管理</h2>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規登録
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  テナントID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  テナント名
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {tenant.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(tenant)}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        修正
                      </button>
                      <button
                        onClick={() => handleDelete(tenant)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingTenant ? 'テナント情報の修正' : 'テナントの新規登録'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <Building2 className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  テナント名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  {editingTenant ? '保存' : '登録'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}