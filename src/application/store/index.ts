import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';

/**
 * Redux store configuration with UI state management
 * Contains reducers for managing application UI state
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer, // UI state reducer for theme, loading, errors, etc.
  },
});

/** Type definition for the root state of the Redux store */
export type RootState = ReturnType<typeof store.getState>;

/** Type definition for the dispatch function with correct typing */
export type AppDispatch = typeof store.dispatch;
