import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Article,
  ArticleFilters,
  PaginatedResponse,
} from '@/shared/types';
import {
  articleRepository,
  ratingRepository,
  favoriteRepository,
} from '../services';
import type { ArticleFormData } from '../components/ArtcileForm/types';

export const useArticles = (filters: ArticleFilters) => {
  return useQuery<PaginatedResponse<Article>>({
    queryKey: ['articles', filters],
    queryFn: async () => {
      const articlesResponse = await articleRepository.findAll(filters);
      const favorites = await favoriteRepository.getFavorites();

      // Enrich articles with favorite status
      const enrichedArticles = articlesResponse.data.map((article) => ({
        ...article,
        isFavorite: favorites.includes(article.id),
      }));

      return {
        ...articlesResponse,
        data: enrichedArticles,
      };
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      const article = await articleRepository.findById(id);
      if (!article) return null;

      const isFavorite = await favoriteRepository.isFavorite(id);
      return {
        ...article,
        isFavorite,
      };
    },
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleFormData) =>
      articleRepository.create({
        ...data,
        rating: 0,
        ratingCount: 0,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Article> }) =>
      articleRepository.update(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useRateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      rating,
    }: {
      articleId: string;
      rating: number;
    }) => ratingRepository.rateArticle(articleId, rating),
    onSuccess: (_data, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      queryClient.invalidateQueries({
        queryKey: ['article-rating', articleId],
      });
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      isFavorite,
    }: {
      articleId: string;
      isFavorite: boolean;
    }) => {
      if (isFavorite) {
        return favoriteRepository.removeFavorite(articleId);
      }
      return favoriteRepository.addFavorite(articleId);
    },
    // Optimistic updates
    onMutate: async ({ articleId, isFavorite }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      await queryClient.cancelQueries({ queryKey: ['articles'] });
      await queryClient.cancelQueries({ queryKey: ['article', articleId] });

      // Snapshot previous values
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // Optimistically update favorites
      queryClient.setQueryData(['favorites'], (old: string[] | undefined) => {
        const currentFavorites = old || [];
        if (isFavorite) {
          return currentFavorites.filter((id) => id !== articleId);
        } else {
          return [...currentFavorites, articleId];
        }
      });

      return { previousFavorites };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    },
    onSuccess: (_data, { articleId }) => {
      // Invalidate all related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
    },
  });
};

export const useArticleRating = (articleId: string) => {
  return useQuery({
    queryKey: ['article-rating', articleId],
    queryFn: () => ratingRepository.getArticleRating(articleId),
    enabled: !!articleId,
  });
};

export const useFavorites = () => {
  return useQuery<string[]>({
    queryKey: ['favorites'],
    queryFn: () => favoriteRepository.getFavorites(),
  });
};
