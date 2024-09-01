import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { Button, ButtonProps } from './button';

export default {
  title: 'Components/UI/Button',
  component: Button,
  argTypes: {
    color: { control: 'color' },
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => {
  const { asChild, ...rest } = args;
  return <Button {...rest} {...(asChild ? { asChild } : {})} />;
};

export const FetchTest = Template.bind({});
FetchTest.args = {
  children: 'Fetch Data',
  variant: 'default',
  size: 'default',
};

FetchTest.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', { name: /fetch data/i });

  await userEvent.click(button);

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  if (args.onClick) {
    args.onClick(data);
  }

  console.log('Fetched data:', data);
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive Button',
  variant: 'destructive',
  size: 'default',
};

Destructive.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
  size: 'default',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  variant: 'default',
  size: 'lg',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  variant: 'default',
  size: 'sm',
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: '🔍',
  variant: 'default',
  size: 'icon',
};
