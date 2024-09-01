import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  FeedbackContentStep,
  FeedbackContentStepProps,
} from './feedback-content-step';

import { FeedbackType } from '..';

export default {
  title: 'Components/FeedbackContentStep',
  component: FeedbackContentStep,
  argTypes: {
    onFeedbackRestartRequested: { action: 'restart' },
    onFeedbackSent: { action: 'sent' },
  },
} as Meta;

const Template: StoryFn<FeedbackContentStepProps> = (args) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          position: 'relative',
          padding: '20px',
          maxWidth: '400px',
          margin: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <FeedbackContentStep {...args} />
      </div>
    </QueryClientProvider>
  );
};

export const BugFeedback = Template.bind({});
BugFeedback.args = {
  feedbackType: 'BUG' as FeedbackType,
};

export const IdeaFeedback = Template.bind({});
IdeaFeedback.args = {
  feedbackType: 'IDEA' as FeedbackType,
};

export const OtherFeedback = Template.bind({});
OtherFeedback.args = {
  feedbackType: 'OTHER' as FeedbackType,
};
