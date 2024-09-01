'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

import { expect } from '@storybook/jest';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { ThemeToggle } from './theme-button';

export default {
  title: 'Components/UI/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof ThemeToggle>;

const Template: StoryFn = (args) => <ThemeToggle {...args} />;

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  await userEvent.click(button);

  await expect(button).toBeInTheDocument();
};
