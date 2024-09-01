import Image from 'next/image';
import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { FeedbackTypeStepProps, ScreenshotButton } from './print-button';

export default {
  title: 'Components/Helper/ScreenshotButton',
  component: ScreenshotButton,
} as Meta;

const Template: StoryFn<FeedbackTypeStepProps> = (args) => {
  const [screenshot, setScreenshot] = useState<string | null>(args.screenshot);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1 style={{ color: '#333' }}>Texto Centralizado</h1>

        {screenshot && (
          <Image
            src={screenshot}
            alt="Imagem Centralizada"
            width={400}
            height={400}
          />
        )}
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <ScreenshotButton
          {...args}
          screenshot={screenshot}
          onScreenshotTaken={(newScreenshot) => setScreenshot(newScreenshot)}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  screenshot: null,
};

export const WithScreenshot = Template.bind({});
WithScreenshot.args = {
  screenshot: 'https://via.placeholder.com/150',
};

export const TakingScreenshot = Template.bind({});
TakingScreenshot.args = {
  screenshot: null,
};
TakingScreenshot.play = async ({ canvasElement }) => {
  const button = canvasElement.querySelector('button');
  button?.click();
};
