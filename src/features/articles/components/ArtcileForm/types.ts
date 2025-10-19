/**
 * Datos del formulario para crear o editar un artículo.
 * Contiene toda la información necesaria para la gestión de artículos.
 */
export interface ArticleFormData {
  /** Título del artículo */
  title: string;
  /** Contenido completo del artículo */
  content: string;
  /** Resumen corto del artículo */
  summary: string;
  /** Nombre del autor del artículo */
  author: string;
  /** ID de la categoría principal del artículo */
  categoryId: string;
  /** ID de la subcategoría (opcional) del artículo */
  subcategoryId?: string;
  /** Array de etiquetas asociadas al artículo */
  tags: string[];
}

/**
 * Props para el componente ArticleForm.
 * Permite configurar el formulario para crear o editar artículos.
 */
export interface ArticleFormProps {
  /** Datos iniciales para prellenar el formulario (usado en modo edición) */
  initialData?: Partial<ArticleFormData>;
  /** Callback ejecutado al enviar el formulario con los datos válidos */
  onSubmit: (data: ArticleFormData) => void;
  /** Callback ejecutado al cancelar la operación */
  onCancel: () => void;
  /** Indica si el formulario está en estado de carga durante el envío */
  isLoading?: boolean;
}
