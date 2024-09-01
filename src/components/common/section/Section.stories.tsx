import type { Meta, StoryObj } from '@storybook/react';

import Section from '.';

const meta = {
  title: 'Components/Common/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Conteúdo da Section',
    className: 'py-4 my-4 md:py-8 md:my-12',
  },
};

export const WithTailwindClass: Story = {
  args: {
    className: 'bg-red-100 p-4',
    children: 'Conteúdo da Section',
  },
};
export const WithWrapperDiv: Story = {
  render: (args) => (
    <div className="w-full bg-red-100 p-4">
      <Section {...args} />
    </div>
  ),
  args: {
    children: 'Conteúdo da Section',
    className: 'py-4 my-4  md:py-8 md:my-12 bg-blue-200',
  },
};
