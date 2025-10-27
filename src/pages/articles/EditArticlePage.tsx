import { ArticleForm } from '@/features/articles/components/ArtcileForm/ArticleForm';
import type { ArticleFormData } from '@/features/articles/components/ArtcileForm/types';
import { useArticle, useUpdateArticle } from '@/features/articles/hooks';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';
import { Button } from '@/shared/components/Button/Button';
import { Skeleton } from '@/shared/components/Loading';
import { MoveLeft } from 'lucide-react';
import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticlePage = () => {
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

        <Suspense
          fallback={
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton height="h-6" width="w-32" className="mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton height="h-10" />
                <Skeleton height="h-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton height="h-10" />
                <Skeleton height="h-10" />
              </div>
              <Skeleton height="h-20" className="mb-4" />
              <Skeleton height="h-32" className="mb-6" />
              <div className="flex justify-end space-x-4">
                <Skeleton height="h-10" width="w-20" />
                <Skeleton height="h-10" width="w-20" />
              </div>
            </div>
          }
        >
          <ArticleForm
            initialData={article}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/articles/${id}`)}
            isLoading={updateArticle.isPending}
          />
        </Suspense>
      </LeftEnterAnimation>
    </div>
  );
};

export default EditArticlePage;
