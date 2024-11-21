import React, { createContext, useContext } from 'react';
import { SalesData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SalesContextType {
  salesData: SalesData[];
  setSalesData: (data: SalesData[] | ((prev: SalesData[]) => SalesData[])) => void;
}

const SalesContext = createContext<SalesContextType | null>(null);

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [salesData, setSalesData] = useLocalStorage('salesData', []);

  return (
    <SalesContext.Provider value={{ salesData, setSalesData }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
}