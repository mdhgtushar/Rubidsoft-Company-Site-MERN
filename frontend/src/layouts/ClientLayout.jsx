import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content with proper spacing for fixed header */}
      <main className="flex-1 pt-20"> {/* pt-20 accounts for fixed header height */}
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(ClientLayout); 