import {
  LocalStorageArticleRepository,
  LocalStorageRatingRepository,
  LocalStorageFavoriteRepository,
} from '../adapters/outbound/persistence';
import {
  GetArticlesUseCase,
  GetArticleByIdUseCase,
  CreateArticleUseCase,
  UpdateArticleUseCase,
  RateArticleUseCase,
} from '../core/application/use-cases';

export class DependencyContainer {
  private static instance: DependencyContainer;

  public readonly articleRepository: LocalStorageArticleRepository;
  public readonly ratingRepository: LocalStorageRatingRepository;
  public readonly favoriteRepository: LocalStorageFavoriteRepository;

  public readonly getArticlesUseCase: GetArticlesUseCase;
  public readonly getArticleByIdUseCase: GetArticleByIdUseCase;
  public readonly createArticleUseCase: CreateArticleUseCase;
  public readonly updateArticleUseCase: UpdateArticleUseCase;
  public readonly rateArticleUseCase: RateArticleUseCase;

  private constructor() {
    this.articleRepository = new LocalStorageArticleRepository();
    this.ratingRepository = new LocalStorageRatingRepository();
    this.favoriteRepository = new LocalStorageFavoriteRepository();

    this.getArticlesUseCase = new GetArticlesUseCase(this.articleRepository);
    this.getArticleByIdUseCase = new GetArticleByIdUseCase(
      this.articleRepository
    );
    this.createArticleUseCase = new CreateArticleUseCase(
      this.articleRepository
    );
    this.updateArticleUseCase = new UpdateArticleUseCase(
      this.articleRepository
    );
    this.rateArticleUseCase = new RateArticleUseCase(
      this.articleRepository,
      this.ratingRepository
    );
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }
}
