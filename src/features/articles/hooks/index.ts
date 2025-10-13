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
    queryFn: () => articleRepository.findAll(filters),
  });
};

export const useArticle = (id: string) => {
  return useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: () => articleRepository.findById(id),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
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
