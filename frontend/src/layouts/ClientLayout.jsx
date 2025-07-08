import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RightSidebar from '../components/RightSidebar';

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content Layout with Fixed Right Sidebar */}
      <div className="flex-1 flex pt-16 pb-12"> {/* pt-16 for fixed header, pb-12 for footer */}
        {/* Main Content Area - Left Side */}
        <main className="flex-1 bg-white shadow-sm mx-6 my-6 rounded-xl overflow-hidden mr-8">
          <div className="p-8 h-full overflow-y-auto">
            {children}
          </div>
        </main>

        {/* Spacer for fixed sidebar */}
        <div className="w-80 flex-shrink-0"></div>
      </div>

      {/* Fixed Right Sidebar */}
      <div className="fixed right-6 top-20 bottom-16 w-80 z-30">
        <div className="bg-white shadow-sm rounded-xl overflow-hidden h-full">
          <RightSidebar />
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(ClientLayout); 