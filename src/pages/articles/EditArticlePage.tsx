import { useParams, useNavigate } from 'react-router-dom';
import { useArticle, useUpdateArticle } from '@/features/articles/hooks';
import { ArticleForm } from '@/features/articles/components/ArtcileForm/ArticleForm';
import type { ArticleFormData } from '@/features/articles/components/ArtcileForm/types';
import { Button } from '@/shared/components/Button/Button';
import { MoveLeft } from 'lucide-react';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';

export const EditArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading } = useArticle(id!);
  const updateArticle = useUpdateArticle();

  const handleSubmit = async (data: ArticleFormData) => {
    if (!id) return;

    try {
      await updateArticle.mutateAsync({ id, data });
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading article...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Article not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <LeftEnterAnimation>
        <Button onClick={() => navigate(-1)} color="secondary" size="sm">
          {/* Is not the best way but at least it works for now */}
          <div className="flex items-center">
            <MoveLeft className="mr-2" /> Back
          </div>
        </Button>

        <div className="my-2" />

        <ArticleForm
          initialData={article}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/articles/${id}`)}
          isLoading={updateArticle.isPending}
        />
      </LeftEnterAnimation>
    </div>
  );
};
