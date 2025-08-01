import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};