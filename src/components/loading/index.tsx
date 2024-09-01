import { AiOutlineLoading } from 'react-icons/ai';

export function Loading() {
  return (
    <div className="flex h-6 w-6 items-center justify-center overflow-hidden">
      <AiOutlineLoading className="h-4 w-4 animate-spin" />
    </div>
  );
}
