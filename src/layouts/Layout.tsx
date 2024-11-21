import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}