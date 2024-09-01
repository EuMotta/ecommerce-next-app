import type { Meta, StoryObj } from '@storybook/react';

import Container from '.';

const meta = {
  title: 'Components/Common/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Conteúdo do Container',
    className: '',
  },
};

export const CustomClass: Story = {
  args: {
    className: 'text-3xl',
    children: 'Container',
  },
};
