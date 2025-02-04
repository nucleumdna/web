import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
          opacity: 0.5,
        },
        '50%': {
          transform: 'scale(1.1)',
          opacity: 0.3,
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 0.5,
        },
      },
    },
  },
  colors: {
    brand: {
      // Ethereum-inspired colors
      primary: '#1c1cff',
      secondary: '#8c8dfc',
      accent: '#c8c9ff',
      dark: '#1a1a1a',
      darker: '#141414',
      lighter: '#2d2d2d',
    },
    gradient: {
      primary: 'linear(to-r, #1c1cff, #8c8dfc)',
      secondary: 'linear(to-r, #8c8dfc, #c8c9ff)',
    },
  },
  components: {
    Box: {
      variants: {
        'glass': {
          bg: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 'xl',
          borderWidth: '1px',
          borderColor: 'whiteAlpha.200',
        },
      },
    },
  },
});

export default theme; 