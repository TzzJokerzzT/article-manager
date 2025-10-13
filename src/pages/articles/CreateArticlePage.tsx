import { useNavigate } from 'react-router-dom';
import { useCreateArticle } from '@/features/articles/hooks';
import { ArticleForm } from '@/features/articles/components/ArtcileForm/ArticleForm';
import type { ArticleFormData } from '@/features/articles/components/ArtcileForm/types';
import { Button } from '@/shared/components/Button/Button';
import { MoveLeft } from 'lucide-react';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';

export const CreateArticlePage = () => {
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

        <ArticleForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/articles')}
          isLoading={createArticle.isPending}
        />
      </LeftEnterAnimation>
    </div>
  );
};
