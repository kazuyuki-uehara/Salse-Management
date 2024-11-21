import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { mockTenants } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface UserFormData {
  id: string;
  name: string;
  password: string;
  tenantId: string;
  role: 'admin' | 'tenant';
}

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    id: '',
    name: '',
    password: '',
    tenantId: '',
    role: 'tenant'
  });
  const [error, setError] = useState('');

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        id: user.id,
        name: user.name,
        password: user.password,
        tenantId: user.tenantId,
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        id: '',
        name: '',
        password: '',
        tenantId: '',
        role: 'tenant'
      });
    }
    setIsModalOpen(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  const validateForm = () => {
    if (!formData.id || !formData.name || !formData.password) {
      setError('すべての項目を入力してください');
      return false;
    }
    if (!editingUser && users.some(u => u.id === formData.id)) {
      setError('このユーザーIDは既に使用されています');
      return false;
    }
    if (formData.role === 'tenant' && !formData.tenantId) {
      setError('テナントを選択してください');
      return false;
    }
    if (formData.role === 'tenant' && users.some(u => 
      u.id !== formData.id && u.tenantId === formData.tenantId
    )) {
      setError('このテナントは既に他のユーザーに割り当てられています');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingUser) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (user: User) => {
    if (window.confirm('このユーザーを削除してもよろしいですか？')) {
      deleteUser(user.id);
    }
  };

  const availableTenants = mockTenants.filter(tenant => 
    !users.some(user => user.tenantId === tenant.id && user.id !== formData.id)
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">ユーザー管理</h2>
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
                  ユーザーID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  名前
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  権限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200">
                  テナント
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {user.role === 'admin' ? '管理者' : 'テナント'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {user.role === 'tenant' ? mockTenants.find(t => t.id === user.tenantId)?.name : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        修正
                      </button>
                      {user.id !== 'admin' && (
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          削除
                        </button>
                      )}
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
                {editingUser ? 'ユーザー情報の修正' : 'ユーザーの新規登録'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <Users className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ユーザーID
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  disabled={!!editingUser}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  名前
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  権限
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    const newRole = e.target.value as 'admin' | 'tenant';
                    setFormData({ 
                      ...formData, 
                      role: newRole,
                      tenantId: newRole === 'admin' ? '' : formData.tenantId 
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={editingUser?.id === 'admin'}
                >
                  <option value="tenant">テナント</option>
                  <option value="admin">管理者</option>
                </select>
              </div>

              {formData.role === 'tenant' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    テナント
                  </label>
                  <select
                    value={formData.tenantId}
                    onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">選択してください</option>
                    {availableTenants.map(tenant => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
                  {editingUser ? '保存' : '登録'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}