import type {
  Article,
  ArticleFilters,
  PaginatedResponse,
} from '@/domain/types';
import type { ArticleRepository } from '@/domain/repositories';
import { generateId } from '@/shared/utils';
import { CATEGORIES, STORAGE_KEYS } from '@/shared/constants';

const generateMockArticles = (): Article[] => {
  const articles: Article[] = [];
  const sampleTitles = [
    'Introduction to React Hooks',
    'Building Scalable APIs with Node.js',
    'Machine Learning Fundamentals',
    'Mobile App Development Best Practices',
    'The Future of Web Development',
    'Understanding TypeScript',
    'Database Design Patterns',
    'Cloud Computing Overview',
    'Cybersecurity Best Practices',
    'Artificial Intelligence Ethics',
  ];

  const sampleAuthors = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Wilson',
    'Alex Brown',
  ];

  for (let i = 0; i < 50; i++) {
    const categoryIndex = i % CATEGORIES.length;
    const category = CATEGORIES[categoryIndex];
    const subcategory =
      category.subcategories?.[i % (category.subcategories?.length || 1)];

    articles.push({
      id: generateId(),
      title: sampleTitles[i % sampleTitles.length] + ` ${i + 1}`,
      content: `This is the full content for article ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      summary: `Summary for article ${i + 1}`,
      author: sampleAuthors[i % sampleAuthors.length],
      categoryId: category.id,
      subcategoryId: subcategory?.id,
      tags: ['tech', 'programming', 'development'].slice(0, (i % 3) + 1),
      rating: 3 + (i % 3),
      ratingCount: 10 + (i % 20),
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return articles;
};

export class MockArticleRepository implements ArticleRepository {
  private articles: Article[] = [];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (stored) {
      this.articles = JSON.parse(stored);
    } else {
      this.articles = generateMockArticles();
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(this.articles));
  }

  async findAll(filters: ArticleFilters): Promise<PaginatedResponse<Article>> {
    let filteredArticles = [...this.articles];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.content.toLowerCase().includes(search) ||
          article.author.toLowerCase().includes(search)
      );
    }

    if (filters.categoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.categoryId === filters.categoryId
      );
    }

    if (filters.subcategoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.subcategoryId === filters.subcategoryId
      );
    }

    if (filters.minRating) {
      filteredArticles = filteredArticles.filter(
        (article) => article.rating >= filters.minRating!
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.tags!.some((tag: string) => article.tags.includes(tag))
      );
    }

    const total = filteredArticles.length;
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      data: paginatedArticles,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    };
  }

  async findById(id: string): Promise<Article | null> {
    const article = this.articles.find((a) => a.id === id);
    return article || null;
  }

  async create(
    articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Article> {
    const now = new Date().toISOString();
    const article: Article = {
      ...articleData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    this.articles.unshift(article);
    this.saveToStorage();
    return article;
  }

  async update(id: string, updateData: Partial<Article>): Promise<Article> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articles[index] = {
      ...this.articles[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    this.saveToStorage();
    return this.articles[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }

    this.articles.splice(index, 1);
    this.saveToStorage();
  }
}
