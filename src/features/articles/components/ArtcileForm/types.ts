export interface ArticleFormData {
  title: string;
  content: string;
  summary: string;
  author: string;
  categoryId: string;
  subcategoryId?: string;
  tags: string[];
}

export interface ArticleFormProps {
  initialData?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
