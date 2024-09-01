import { useState } from 'react';
import { AiFillAlert, AiFillCamera } from 'react-icons/ai';

import html2canvas from 'html2canvas';

import { Loading } from '../../loading';

export interface FeedbackTypeStepProps {
  onScreenshotTaken: (screenshot: string | null) => void;
  screenshot: string | null;
}

export function ScreenshotButton({
  onScreenshotTaken,
  screenshot,
}: FeedbackTypeStepProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTaken(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="flex h-10 w-10 items-end justify-end rounded-md border-transparent p-1 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
        onClick={() => onScreenshotTaken(null)}
      >
        <AiFillAlert />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="focus:ring-brand-500 rounded-md border-transparent bg-zinc-800 p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900"
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <AiFillCamera className="h-6 w-6 text-zinc-100" />
      )}
    </button>
  );
}
