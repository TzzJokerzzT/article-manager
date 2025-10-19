import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface defining the UI state structure
 */
interface UIState {
  /** Current application theme */
  theme: 'light' | 'dark';
  /** Global loading state indicator */
  isLoading: boolean;
  /** Current error message, null if no error */
  error: string | null;
  /** Current page/route path */
  currentPage: string;
}

/** Initial state for the UI slice */
const initialState: UIState = {
  theme: 'light',
  isLoading: false,
  error: null,
  currentPage: '/',
};

/**
 * Redux slice for managing UI state
 * Handles theme, loading states, errors, and current page tracking
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Sets the application theme
     * @param state - Current UI state
     * @param action - Action containing theme value ('light' or 'dark')
     */
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    /**
     * Sets the global loading state
     * @param state - Current UI state
     * @param action - Action containing boolean loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    /**
     * Sets an error message
     * @param state - Current UI state
     * @param action - Action containing error message or null
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    /**
     * Clears the current error message
     * @param state - Current UI state
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Sets the current page/route
     * @param state - Current UI state
     * @param action - Action containing page path string
     */
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setTheme, setLoading, setError, clearError, setCurrentPage } =
  uiSlice.actions;
export default uiSlice.reducer;
