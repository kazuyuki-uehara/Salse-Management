import React from 'react';
import { Outlet } from 'react-router-dom';
import { Store } from 'lucide-react';
import { mockUser } from '../data/mockData';

export function TenantLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Store className="w-6 h-6 text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">売上管理システム (テナント)</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{mockUser.name}</span>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm">
                  {mockUser.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}