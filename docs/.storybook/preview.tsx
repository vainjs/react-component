import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            #storybook-root {
              height: 100%;
            }
            .sb-story > div {
              height: 300px;
            }
          `}
        </style>
        <Story />
      </>
    ),
  ],
}

export default preview
