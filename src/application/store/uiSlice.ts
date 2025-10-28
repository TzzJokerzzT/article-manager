import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@/shared/constants';

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

/**
 * Gets the saved theme from localStorage or detects system preference
 * @returns The saved theme or system preference ('light' or 'dark')
 */
const getInitialTheme = (): 'light' | 'dark' => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return 'light';

  // Try to get saved theme from localStorage
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as
      | 'light'
      | 'dark'
      | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
  } catch {
    // localStorage might not be available in some environments (e.g., tests)
  }

  // Fall back to system preference (with safety check for test environments)
  try {
    if (window.matchMedia) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      return prefersDark ? 'dark' : 'light';
    }
  } catch {
    // matchMedia might not be available in test environments
  }

  // Final fallback to light theme
  return 'light';
};

/**
 * Saves theme to localStorage
 * @param theme - Theme to save
 */
const saveThemeToStorage = (theme: 'light' | 'dark'): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // localStorage might not be available in some environments (e.g., tests)
      console.warn('Failed to save theme to localStorage');
    }
  }
};

/** Initial state for the UI slice */
const initialState: UIState = {
  theme: getInitialTheme(),
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
      // Save theme to localStorage for persistence
      saveThemeToStorage(action.payload);
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
