import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuButton = ({ 
  active = false, 
  btn = 1, 
  goLink = "#", 
  title = "Menu Item",
  icon = "📋",
  badge = null,
  collapsed = false,
  onClick = null
}) => {
  const location = useLocation();
  const isActive = location.pathname === goLink || location.pathname.startsWith(goLink);

  const baseClasses = `
    flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group
    ${collapsed ? 'justify-center' : 'justify-between'}
  `;

  const activeClasses = isActive || active
    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';

  const content = (
    <div className={`${baseClasses} ${activeClasses}`}>
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        {!collapsed && (
          <span className="font-medium">{title}</span>
        )}
      </div>
      {badge && !collapsed && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      {badge && collapsed && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full relative">
        {content}
      </button>
    );
  }

  return (
    <Link to={goLink} className="w-full relative block">
      {content}
    </Link>
  );
};

export default MenuButton; 