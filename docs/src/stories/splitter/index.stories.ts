import type { Meta, StoryObj } from '@storybook/react'
import Splitter from './index'

const meta = {
  title: 'react-component/Splitter',
  component: Splitter,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HorizontalSplitter: Story = {
  name: 'Horizontal Splitter',
  args: {
    direction: 'horizontal',
  },
}
