// Date formatting utilities
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatDateTime = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return '';
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(date);
    }
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

export const isValidDate = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  } catch (error) {
    return false;
  }
};

export const getDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return formatDate(start);
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return '';
  }
}; 