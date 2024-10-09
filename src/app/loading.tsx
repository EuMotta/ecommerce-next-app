import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src={'/stickers/loading.gif'}
        width={200}
        height={200}
        alt="loading"
      />
    </div>
  );
}
