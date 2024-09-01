import type { Meta, StoryObj } from '@storybook/react';

import Heading from '.';

const meta: Meta<typeof Heading> = {
  title: 'Components/Common/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Título Principal',
    subtitle: 'Este é o subtítulo',
    center: false,
  },
};

export const Centered: Story = {
  args: {
    title: 'Título Centralizado',
    subtitle: 'Este subtítulo está centralizado',
    center: true,
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: 'Título Sem Subtítulo',
    subtitle: undefined,
    center: false,
  },
};
