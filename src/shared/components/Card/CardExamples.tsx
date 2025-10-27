import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/shared/components/Card';

/**
 * Example component demonstrating various Card usage patterns
 * This serves as both documentation and testing for the Card component
 */
export const CardExamples = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Card Component Examples
      </h1>

      {/* Basic Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="elevated">
            <h3 className="font-semibold mb-2">Elevated Card</h3>
            <p className="text-gray-600">Default elevated style with shadow</p>
          </Card>

          <Card variant="bordered">
            <h3 className="font-semibold mb-2">Bordered Card</h3>
            <p className="text-gray-600">Clean bordered style</p>
          </Card>

          <Card variant="shadow">
            <h3 className="font-semibold mb-2">Shadow Card</h3>
            <p className="text-gray-600">Custom shadow styling</p>
          </Card>

          <Card variant="flat">
            <h3 className="font-semibold mb-2">Flat Card</h3>
            <p className="text-gray-600">Flat background style</p>
          </Card>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card color="primary" variant="elevated">
            <h3 className="font-semibold mb-2 text-blue-800">Primary Card</h3>
            <p className="text-blue-600">Blue themed card</p>
          </Card>

          <Card color="success" variant="bordered">
            <h3 className="font-semibold mb-2 text-green-800">Success Card</h3>
            <p className="text-green-600">Green themed card</p>
          </Card>

          <Card color="danger" variant="shadow">
            <h3 className="font-semibold mb-2 text-red-800">Danger Card</h3>
            <p className="text-red-600">Red themed card</p>
          </Card>
        </div>
      </section>

      {/* Size Variants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Size Variants</h2>
        <div className="space-y-4">
          <Card size="sm" variant="bordered" className="max-w-xs">
            <p className="text-sm">Small card - compact spacing</p>
          </Card>

          <Card size="md" variant="bordered" className="max-w-md">
            <p>Medium card - default spacing</p>
          </Card>

          <Card size="lg" variant="bordered" className="max-w-lg">
            <h3 className="font-semibold mb-2">Large card</h3>
            <p>More generous spacing for content</p>
          </Card>

          <Card size="xl" variant="bordered" className="max-w-xl">
            <h2 className="text-xl font-bold mb-3">Extra Large card</h2>
            <p className="mb-4">Maximum spacing for rich content layouts</p>
            <p className="text-gray-600">
              Perfect for detailed information displays
            </p>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            isClickable
            onClick={() => alert('Clickable card clicked!')}
            variant="elevated"
          >
            <h3 className="font-semibold mb-2">Clickable Card</h3>
            <p className="text-gray-600">Click me to see the action!</p>
          </Card>

          <Card isHoverable variant="bordered">
            <h3 className="font-semibold mb-2">Hoverable Card</h3>
            <p className="text-gray-600">Hover for smooth effects</p>
          </Card>

          <Card
            isClickable
            isDisabled
            onClick={() => alert('This should not fire')}
            variant="shadow"
          >
            <h3 className="font-semibold mb-2">Disabled Card</h3>
            <p className="text-gray-600">This card is disabled</p>
          </Card>
        </div>
      </section>

      {/* Composed Cards with Header, Body, Footer */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Composed Cards</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <Card
            variant="elevated"
            color="primary"
            size="lg"
            radius="xl"
            isHoverable
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">John Doe</h3>
                  <p className="text-sm text-blue-600">Software Engineer</p>
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-600 text-xl">
                ⚙️
              </button>
            </CardHeader>

            <CardBody>
              <p className="text-blue-700 mb-4">
                Passionate developer with 5+ years of experience in React and
                TypeScript.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  React
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Node.js
                </span>
              </div>
            </CardBody>

            <CardFooter>
              <button className="px-4 py-2 text-sm border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50">
                Message
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Connect
              </button>
            </CardFooter>
          </Card>

          {/* Article Preview Card */}
          <Card variant="bordered" color="default" isHoverable>
            <CardHeader>
              <h3 className="text-lg font-semibold line-clamp-2">
                Building Reusable Components with TypeScript
              </h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Technology
              </span>
            </CardHeader>

            <CardBody>
              <p className="text-gray-600 mb-4">
                Learn how to create flexible, type-safe components that can be
                reused across your entire application...
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">⭐ 4.8/5</span>
                <span className="text-gray-500">5 min read</span>
              </div>
            </CardBody>

            <CardFooter>
              <button className="text-gray-600 hover:text-gray-800">
                🤍 Save
              </button>
              <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Read More
              </button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Real-world Article Card Example */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Real-world Example</h2>
        <div className="max-w-md">
          <Card
            variant="elevated"
            isHoverable
            className="h-full"
            data-testid="example-article-card"
          >
            <CardHeader>
              <h3 className="text-lg font-semibold line-clamp-2">
                Advanced React Patterns for 2024
              </h3>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                React
              </span>
            </CardHeader>

            <CardBody>
              <p className="text-gray-600 line-clamp-3 mb-4">
                Explore the latest React patterns including compound components,
                render props, and the new use() hook for better component
                composition.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm">4.9/5</span>
                </div>
                <button className="text-red-500 hover:text-red-700 text-lg">
                  ❤️
                </button>
              </div>
            </CardBody>

            <CardFooter>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};
