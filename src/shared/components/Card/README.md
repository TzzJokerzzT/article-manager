# Card Component Documentation

A fully reusable Card component system inspired by HeroUI, designed for maximum flexibility and consistent styling across your application.

## Features

- 🎨 **Multiple Variants**: `elevated`, `bordered`, `shadow`, `flat`
- 🌈 **Color Themes**: `default`, `primary`, `secondary`, `success`, `warning`, `danger`
- 📏 **Size Options**: `sm`, `md`, `lg`, `xl`
- 🔄 **Border Radius**: `none`, `sm`, `md`, `lg`, `xl`, `full`
- 🖱️ **Interactive States**: Clickable, hoverable, disabled
- 🧩 **Composable**: Header, Body, Footer subcomponents
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎯 **TypeScript**: Full type safety and IntelliSense support

## Basic Usage

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/shared/components/Card';

// Simple card
<Card>
  <h3>Simple Card</h3>
  <p>This is a basic card with default settings.</p>
</Card>

// Card with subcomponents
<Card variant="elevated" color="primary" size="lg">
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
    <button>×</button>
  </CardHeader>
  <CardBody>
    <p>This is the main content of the card.</p>
  </CardBody>
  <CardFooter>
    <button>Cancel</button>
    <button>Save</button>
  </CardFooter>
</Card>
```

## API Reference

### Card Props

| Prop          | Type                                                                          | Default      | Description                            |
| ------------- | ----------------------------------------------------------------------------- | ------------ | -------------------------------------- |
| `children`    | `ReactNode`                                                                   | -            | Content to render inside the card      |
| `className`   | `string`                                                                      | `''`         | Additional CSS classes                 |
| `size`        | `'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`       | Size variant                           |
| `variant`     | `'elevated' \| 'bordered' \| 'shadow' \| 'flat'`                              | `'elevated'` | Visual style variant                   |
| `color`       | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'`  | Color theme                            |
| `radius`      | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                            | `'lg'`       | Border radius                          |
| `isClickable` | `boolean`                                                                     | `false`      | Makes the card clickable               |
| `isHoverable` | `boolean`                                                                     | `false`      | Adds hover effects                     |
| `isDisabled`  | `boolean`                                                                     | `false`      | Disables the card                      |
| `onClick`     | `() => void`                                                                  | -            | Click handler (requires `isClickable`) |
| `data-testid` | `string`                                                                      | -            | Test identifier                        |

### CardHeader, CardBody, CardFooter Props

| Prop          | Type        | Default | Description            |
| ------------- | ----------- | ------- | ---------------------- |
| `children`    | `ReactNode` | -       | Content to render      |
| `className`   | `string`    | `''`    | Additional CSS classes |
| `data-testid` | `string`    | -       | Test identifier        |

## Examples

### Variants

```tsx
// Elevated (default)
<Card variant="elevated">
  <p>Elevated card with shadow</p>
</Card>

// Bordered
<Card variant="bordered">
  <p>Card with border</p>
</Card>

// Shadow
<Card variant="shadow">
  <p>Card with custom shadow</p>
</Card>

// Flat
<Card variant="flat">
  <p>Flat card with background color</p>
</Card>
```

### Colors

```tsx
// Primary theme
<Card color="primary" variant="elevated">
  <p>Primary colored card</p>
</Card>

// Success theme
<Card color="success" variant="bordered">
  <p>Success colored card</p>
</Card>

// Danger theme
<Card color="danger" variant="shadow">
  <p>Danger colored card</p>
</Card>
```

### Sizes

```tsx
// Small card
<Card size="sm">
  <p>Small card</p>
</Card>

// Large card
<Card size="lg">
  <h2>Large Card</h2>
  <p>More content space</p>
</Card>

// Extra large card
<Card size="xl">
  <h1>Extra Large Card</h1>
  <p>Maximum content space</p>
</Card>
```

### Interactive Cards

```tsx
// Clickable card
<Card
  isClickable
  onClick={() => console.log('Card clicked!')}
  variant="bordered"
>
  <p>Click me!</p>
</Card>

// Hoverable card
<Card
  isHoverable
  variant="elevated"
>
  <p>Hover over me!</p>
</Card>

// Disabled card
<Card
  isClickable
  isDisabled
  onClick={() => console.log('This won\'t fire')}
>
  <p>Disabled card</p>
</Card>
```

### Complex Example

```tsx
const UserProfileCard = () => {
  return (
    <Card
      variant="elevated"
      color="primary"
      size="lg"
      radius="xl"
      isHoverable
      className="max-w-md"
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⚙️</button>
      </CardHeader>

      <CardBody>
        <p className="text-gray-700 mb-4">
          Passionate developer with 5+ years of experience in React and
          TypeScript.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            React
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            Node.js
          </span>
        </div>
      </CardBody>

      <CardFooter>
        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          Message
        </button>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Connect
        </button>
      </CardFooter>
    </Card>
  );
};
```

### Article Card Example (Real-world usage)

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

const ArticleCard = ({ article }) => {
  return (
    <Card
      variant="elevated"
      isHoverable
      className="h-full"
      data-testid="article-card"
    >
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
        <span className="text-xs text-gray-500">{article.category}</span>
      </CardHeader>

      <CardBody>
        <p className="text-gray-600 line-clamp-3 mb-4">{article.description}</p>
        <div className="flex items-center gap-2">
          <span>Rating: {article.rating}/5</span>
          <button onClick={() => toggleFavorite(article.id)}>
            {article.isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </CardBody>

      <CardFooter>
        <Button variant="outlined" size="sm">
          Edit
        </Button>
        <Button color="primary" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
```

## Styling

The Card component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. **Adding custom classes**: Use the `className` prop
2. **Modifying helpers**: Edit the `helpers.ts` file to change default styles
3. **Creating new variants**: Extend the types and helpers for custom variants

## Accessibility

The Card component includes built-in accessibility features:

- **Keyboard Navigation**: Clickable cards support Tab navigation and Enter/Space activation
- **Focus Management**: Visual focus indicators for keyboard users
- **Screen Reader Support**: Proper semantic structure with headers and content areas
- **Disabled State**: Proper handling of disabled interactive elements

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/shared/components/Card';

test('renders card with content', () => {
  render(
    <Card data-testid="test-card">
      <p>Test content</p>
    </Card>
  );

  expect(screen.getByTestId('test-card')).toBeInTheDocument();
  expect(screen.getByText('Test content')).toBeInTheDocument();
});

test('handles click events', () => {
  const handleClick = jest.fn();

  render(
    <Card isClickable onClick={handleClick} data-testid="clickable-card">
      <p>Clickable content</p>
    </Card>
  );

  fireEvent.click(screen.getByTestId('clickable-card'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

This Card component system provides a flexible, accessible, and type-safe foundation for building consistent UI components across your application.
