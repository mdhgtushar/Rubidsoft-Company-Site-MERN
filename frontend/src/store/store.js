import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store; 