import type { Preview } from '@storybook/react';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0C0C0E' },
        { name: 'surface', value: '#1C1C21' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
