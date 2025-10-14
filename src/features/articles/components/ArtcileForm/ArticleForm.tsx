import { Button } from '@/shared/components/Button/Button';
import { Form } from '@/shared/components/Form/Form';
import { Select } from '@/shared/components/Select/Select';
import { Textarea } from '@/shared/components/Textarea/Textarea';
import { CATEGORIES } from '@/shared/constants';
import { CircleX } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { ArticleFormData, ArticleFormProps } from './types';

export const ArticleForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ArticleFormProps) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    summary: initialData?.summary || '',
    author: initialData?.author || '',
    categoryId: initialData?.categoryId || '',
    subcategoryId: initialData?.subcategoryId || '',
    tags: initialData?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const selectedCategory = CATEGORIES.find(
    (cat) => cat.id === formData.categoryId
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? 'Edit Article' : 'Create New Article'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Form
          id="title"
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required={true}
        />

        <Form
          id="author"
          label="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          id="category"
          label="Category"
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoryId: e.target.value,
              subcategoryId: '',
            })
          }
          title="Select Category"
          categories={CATEGORIES}
          required={true}
        />

        {selectedCategory?.subcategories &&
          selectedCategory.subcategories.length > 0 && (
            <Select
              id="subcategory"
              label="Subcategory"
              value={formData.subcategoryId || ''}
              onChange={(e) =>
                setFormData({ ...formData, subcategoryId: e.target.value })
              }
              categories={selectedCategory.subcategories}
              title="Select Subcategory"
              required={false}
            />
          )}
      </div>

      <Textarea
        label="Summary"
        htmlFor="summary"
        id="summary"
        value={formData.summary}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        required
      />

      <Textarea
        label="Content"
        htmlFor="content"
        id="content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      />

      <div className="mb-6">
        <Form
          id="tags"
          label="Tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          placeholder="Add a tag"
          buttonComponent={<Button onClick={addTag}>Add</Button>}
          className="flex gap-2 mb-2"
          required={false}
        />

        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
              <CircleX
                size={16}
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={() => removeTag(tag)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};
