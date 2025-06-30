import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, fetchUserProfile, clearError } from '../store/userSlice';
import { USER_ROLES } from '../constants/apiConstants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, role, loading, error, token } = useSelector(
    (state) => state.user
  );

  const login = async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      navigate('/');
    }
  };

  const getProfile = async () => {
    try {
      await dispatch(fetchUserProfile()).unwrap();
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const isAdmin = role === USER_ROLES.ADMIN;
  const isUser = role === USER_ROLES.USER;

  const hasRole = (requiredRoles) => {
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }
    return requiredRoles.includes(role);
  };

  const requireAuth = (requiredRoles = null) => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
      navigate('/unauthorized');
      return false;
    }

    return true;
  };

  return {
    // State
    user,
    isAuthenticated,
    role,
    loading,
    error,
    token,
    
    // Computed
    isAdmin,
    isUser,
    
    // Actions
    login,
    logout,
    getProfile,
    clearAuthError,
    
    // Utilities
    hasRole,
    requireAuth,
  };
};

export default useAuth; 