import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Warm vibrant color palette inspired by the image
        /*'warm-bg': '#1a1a1a',
        'warm-bg-alt': '#2a2a2a',
        'warm-fg': '#f8f8f8',
        'warm-fg-dim': '#e0e0e0',
        'warm-fg-muted': '#a0a0a0',
        'warm-orange': '#ff8c42',
        'warm-orange-light': '#ffa366',
        'warm-orange-dark': '#e67339',
        'warm-amber': '#ffb347',
        'warm-yellow': '#ffd700',
        'warm-teal': '#20b2aa',
        'warm-cyan': '#00ced1',
        'warm-blue': '#4682b4',
        'warm-green': '#32cd32',
        'n64-green': '#00ff00',
        'n64-green-dark': '#00cc00',
        'warm-red': '#ff6347',
        'warm-purple': '#9370db',
        'warm-gray': '#696969',
        'warm-gray-alt': '#808080',
        'warm-border': '#404040',
        'warm-border-alt': '#505050',*/
      },
      fontFamily: {
        n64: [
          'Fredoka',
          'Luckiest Guy',
          'Arial Rounded MT Bold',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        block: '0.75rem',
      },
      boxShadow: {
        n64: '0 4px 0 0 #22223B, 0 8px 24px 0 rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};

export default config; 