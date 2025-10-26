export class Category {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly subcategories?: Subcategory[];

  constructor(
    id: string,
    name: string,
    description: string,
    subcategories?: Subcategory[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.subcategories = subcategories;

    this.validateName(name);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name cannot be empty');
    }
    if (name.length > 100) {
      throw new Error('Category name cannot exceed 100 characters');
    }
  }

  public addSubcategory(subcategory: Subcategory): Category {
    const existingSubcategories = this.subcategories || [];
    return new Category(this.id, this.name, this.description, [
      ...existingSubcategories,
      subcategory,
    ]);
  }

  public removeSubcategory(subcategoryId: string): Category {
    const existingSubcategories = this.subcategories || [];
    const filteredSubcategories = existingSubcategories.filter(
      (sub) => sub.id !== subcategoryId
    );
    return new Category(
      this.id,
      this.name,
      this.description,
      filteredSubcategories
    );
  }

  public static create(props: {
    id: string;
    name: string;
    description: string;
    subcategories?: Subcategory[];
  }): Category {
    return new Category(
      props.id,
      props.name,
      props.description,
      props.subcategories
    );
  }
}

export class Subcategory {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly categoryId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    categoryId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;

    this.validateName(name);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Subcategory name cannot be empty');
    }
    if (name.length > 100) {
      throw new Error('Subcategory name cannot exceed 100 characters');
    }
  }

  public static create(props: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
  }): Subcategory {
    return new Subcategory(
      props.id,
      props.name,
      props.description,
      props.categoryId
    );
  }
}
