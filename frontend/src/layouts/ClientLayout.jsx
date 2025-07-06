import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header at the top level */}
      <Header />
      
      {/* Main Content Layout */}
      <div className="flex-1 bg-gray-50">
        {/* Main Content with top padding for fixed header */}
        <main className="pt-16">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(ClientLayout); 