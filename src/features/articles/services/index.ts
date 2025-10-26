import { DependencyContainer } from '@/configuration';

const container = DependencyContainer.getInstance();

export const articleRepository = container.articleRepository;
export const ratingRepository = container.ratingRepository;
export const favoriteRepository = container.favoriteRepository;

export const getArticlesUseCase = container.getArticlesUseCase;
export const getArticleByIdUseCase = container.getArticleByIdUseCase;
export const createArticleUseCase = container.createArticleUseCase;
export const updateArticleUseCase = container.updateArticleUseCase;
export const rateArticleUseCase = container.rateArticleUseCase;
