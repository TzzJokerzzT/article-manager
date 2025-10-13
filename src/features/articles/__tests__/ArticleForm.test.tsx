import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import uiReducer from '../../../application/store/uiSlice';
import { ArticleForm } from '../components/ArtcileForm/ArticleForm';
import type { ArticleFormData } from '../components/ArtcileForm/types';

// Test utilities
const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  });
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe('ArticleForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/summary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const titleInput = screen.getByLabelText(/title/i);
    const authorInput = screen.getByLabelText(/author/i);
    const categorySelect = screen.getByLabelText(/category/i);
    const summaryTextarea = screen.getByLabelText(/summary/i);
    const contentTextarea = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(titleInput, { target: { value: 'Test Article' } });
    fireEvent.change(authorInput, { target: { value: 'John Doe' } });
    fireEvent.change(categorySelect, { target: { value: 'tech' } });
    fireEvent.change(summaryTextarea, { target: { value: 'Test summary' } });
    fireEvent.change(contentTextarea, { target: { value: 'Test content' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Article',
        author: 'John Doe',
        categoryId: 'tech',
        subcategoryId: '',
        summary: 'Test summary',
        content: 'Test content',
        tags: [],
      });
    });
  });

  test('prevents submission with empty required fields', async () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const submitButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test('adds and removes tags correctly', async () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const tagInput = screen.getByPlaceholderText(/add a tag/i);
    const addTagButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(tagInput, { target: { value: 'react' } });
    fireEvent.click(addTagButton);

    expect(screen.getByText('react')).toBeInTheDocument();

    // Find the tag span and then the CircleX icon inside it
    const tagElement = screen.getByText('react').closest('span');
    const removeIcon = tagElement?.querySelector('svg');
    fireEvent.click(removeIcon!);

    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });

  test('populates form with initial data', () => {
    const initialData: Partial<ArticleFormData> = {
      title: 'Existing Article',
      author: 'Jane Doe',
      categoryId: 'science',
      summary: 'Existing summary',
      content: 'Existing content',
      tags: ['science', 'research'],
    };

    renderWithProviders(
      <ArticleForm
        initialData={initialData}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('Existing Article')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /category/i })).toHaveValue(
      'science'
    );
    expect(screen.getByDisplayValue('Existing summary')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing content')).toBeInTheDocument();
    expect(screen.getByText('science')).toBeInTheDocument();
    expect(screen.getByText('research')).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('shows subcategories when tech category is selected', async () => {
    renderWithProviders(
      <ArticleForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: 'tech' } });

    await waitFor(() => {
      expect(screen.getByLabelText(/subcategory/i)).toBeInTheDocument();
    });
  });
});
