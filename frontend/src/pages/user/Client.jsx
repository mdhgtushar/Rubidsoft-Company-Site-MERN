import React from 'react';
import { Outlet } from 'react-router-dom';

const Client = () => {
  return (
    <div className="flex flex-col">
      {/* Main Content Layout */}
      <div className="flex-1 bg-gray-50">
        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Client;
