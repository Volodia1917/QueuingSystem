import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BreadcrumbItem {
  title: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  removeBreadcrumb: (index: number) => void;
  clearBreadcrumbs: () => void;
  title: string;
  setTitle: (newTitle: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [title, setTitle] = useState<string>("Dashboard");

  const addBreadcrumb = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  };

  const removeBreadcrumb = (index: number) => {
    setBreadcrumbs(prev => prev.slice(0, index + 1));
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  const value = {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    title,
    setTitle,
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}; 