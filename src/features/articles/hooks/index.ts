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
import {
  articleToDTO,
  articlesToDTOs,
  formDataToCreateData,
  formDataToUpdateData,
} from '@/adapters/mappers/articleMapper';

/**
 * Hook to fetch articles with filtering and pagination
 * Automatically enriches articles with favorite status
 * @param filters - Filter and pagination parameters
 * @returns React Query result with paginated articles
 */
export const useArticles = (filters: ArticleFilters) => {
  return useQuery<PaginatedResponse<Article>>({
    queryKey: ['articles', filters],
    queryFn: async () => {
      const articlesResponse = await articleRepository.findAll(filters);
      const favorites = await favoriteRepository.getFavorites();

      // Convert domain entities to DTOs and enrich with favorite status
      const enrichedArticles = articlesToDTOs(articlesResponse.data).map(
        (article) => ({
          ...article,
          isFavorite: favorites.includes(article.id),
        })
      );

      return {
        ...articlesResponse,
        data: enrichedArticles,
      };
    },
  });
};

/**
 * Hook to fetch a single article by ID with favorite status
 * @param id - Article ID to fetch
 * @returns React Query result with article data or null
 */
export const useArticle = (id: string) => {
  return useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      const article = await articleRepository.findById(id);
      if (!article) return null;

      const isFavorite = await favoriteRepository.isFavorite(id);
      const articleDTO = articleToDTO(article);
      return {
        ...articleDTO,
        isFavorite,
      };
    },
    enabled: !!id,
  });
};

/**
 * Hook to create a new article
 * Automatically invalidates articles cache on success
 * @returns React Query mutation for creating articles
 */
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArticleFormData) =>
      articleRepository.create(formDataToCreateData(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

/**
 * Hook to update an existing article
 * Invalidates both articles list and individual article cache
 * @returns React Query mutation for updating articles
 */
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ArticleFormData>;
    }) => articleRepository.update(id, formDataToUpdateData(data)),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
    },
  });
};

/**
 * Hook to delete an article
 * Invalidates articles cache on success
 * @returns React Query mutation for deleting articles
 */
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

/**
 * Hook to rate an article
 * Invalidates all related caches (articles, individual article, and rating)
 * @returns React Query mutation for rating articles
 */
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
      // Invalidate all caches that depend on rating data
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      queryClient.invalidateQueries({
        queryKey: ['article-rating', articleId],
      });
    },
  });
};

/**
 * Hook to toggle article favorite status with optimistic updates
 * Provides immediate UI feedback while persisting changes
 * @returns React Query mutation for toggling favorites
 */
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
    // Optimistic updates for immediate UI feedback
    onMutate: async ({ articleId, isFavorite }) => {
      // Cancel outgoing refetches to prevent race conditions
      await queryClient.cancelQueries({ queryKey: ['favorites'] });
      await queryClient.cancelQueries({ queryKey: ['articles'] });
      await queryClient.cancelQueries({ queryKey: ['article', articleId] });

      // Snapshot previous values for rollback
      const previousFavorites = queryClient.getQueryData(['favorites']);

      // Optimistically update favorites cache
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
      // Rollback optimistic update on error
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

/**
 * Hook to fetch rating statistics for a specific article
 * @param articleId - ID of the article to get rating for
 * @returns React Query result with rating data (average and count)
 */
export const useArticleRating = (articleId: string) => {
  return useQuery({
    queryKey: ['article-rating', articleId],
    queryFn: () => ratingRepository.getArticleRating(articleId),
    enabled: !!articleId,
  });
};

/**
 * Hook to fetch all favorite article IDs for the current user
 * @returns React Query result with array of favorite article IDs
 */
export const useFavorites = () => {
  return useQuery<string[]>({
    queryKey: ['favorites'],
    queryFn: () => favoriteRepository.getFavorites(),
  });
};
