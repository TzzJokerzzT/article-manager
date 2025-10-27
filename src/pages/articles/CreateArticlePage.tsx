import { ArticleForm } from '@/features/articles/components/ArtcileForm/ArticleForm';
import type { ArticleFormData } from '@/features/articles/components/ArtcileForm/types';
import { useCreateArticle } from '@/features/articles/hooks';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';
import { Button } from '@/shared/components/Button/Button';
import { Skeleton } from '@/shared/components/Loading';
import { MoveLeft } from 'lucide-react';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const createArticle = useCreateArticle();

  const handleSubmit = async (data: ArticleFormData) => {
    try {
      await createArticle.mutateAsync(data);
      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

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
              <Skeleton height="h-6" width="w-48" className="mb-6" />
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
            onSubmit={handleSubmit}
            onCancel={() => navigate('/articles')}
            isLoading={createArticle.isPending}
          />
        </Suspense>
      </LeftEnterAnimation>
    </div>
  );
};

export default CreateArticlePage;
