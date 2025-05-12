import type { Meta, StoryObj } from '@storybook/react-vite'
import Splitter from './index'

const meta = {
  title: 'react-component/Splitter',
  component: Splitter,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalSplitter: Story = {
  name: 'Horizontal Splitter',
  args: {
    direction: 'horizontal',
  },
}
