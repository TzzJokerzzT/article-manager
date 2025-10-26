import { Article as DomainArticle } from '../../core/domain';
import type { Article as ArticleDTO } from '../../shared/types';
import type { ArticleFormData } from '../../features/articles/components/ArtcileForm/types';

/**
 * Maps a domain Article entity to a DTO for UI consumption
 */
export const articleToDTO = (article: DomainArticle): ArticleDTO => {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    summary: article.summary,
    author: article.author,
    categoryId: article.categoryId,
    subcategoryId: article.subcategoryId,
    tags: article.tags,
    rating: article.rating,
    ratingCount: article.ratingCount,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    isFavorite: article.isFavorite,
  };
};

/**
 * Maps a DTO back to a domain Article entity
 */
export const dtoToArticle = (dto: ArticleDTO): DomainArticle => {
  return new DomainArticle(
    dto.id,
    dto.title,
    dto.content,
    dto.summary,
    dto.author,
    dto.categoryId,
    dto.tags,
    dto.rating,
    dto.ratingCount,
    new Date(dto.createdAt),
    new Date(dto.updatedAt),
    dto.subcategoryId,
    dto.isFavorite
  );
};

/**
 * Maps form data to the data structure expected by repository create method
 */
export const formDataToCreateData = (formData: ArticleFormData) => {
  return {
    title: formData.title,
    content: formData.content,
    summary: formData.summary,
    author: formData.author,
    categoryId: formData.categoryId,
    subcategoryId: formData.subcategoryId,
    tags: formData.tags,
    rating: 0,
    ratingCount: 0,
    isFavorite: false,
  };
};

/**
 * Maps form data to partial data for repository update method
 */
export const formDataToUpdateData = (formData: Partial<ArticleFormData>) => {
  const updateData: Record<string, unknown> = {};

  if (formData.title !== undefined) updateData.title = formData.title;
  if (formData.content !== undefined) updateData.content = formData.content;
  if (formData.summary !== undefined) updateData.summary = formData.summary;
  if (formData.author !== undefined) updateData.author = formData.author;
  if (formData.categoryId !== undefined)
    updateData.categoryId = formData.categoryId;
  if (formData.subcategoryId !== undefined)
    updateData.subcategoryId = formData.subcategoryId;
  if (formData.tags !== undefined) updateData.tags = formData.tags;

  return updateData;
};

/**
 * Maps an array of domain Articles to DTOs
 */
export const articlesToDTOs = (articles: DomainArticle[]): ArticleDTO[] => {
  return articles.map(articleToDTO);
};

/**
 * Maps an array of DTOs to domain Articles
 */
export const dtosToArticles = (dtos: ArticleDTO[]): DomainArticle[] => {
  return dtos.map(dtoToArticle);
};
