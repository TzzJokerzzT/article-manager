import { LoadingSpinner } from './LoadingSpinner';

export const LoaderWithMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[50vh]">
      <LoadingSpinner size="lg" />
      <div className="text-lg text-gray-600">{message}</div>
    </div>
  );
};
