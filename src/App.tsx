import React, { Suspense } from 'react';
import { 
  ChakraProvider, 
  CSSReset, 
  Box, 
  Spinner,
  Center,
  useColorModeValue,
  Text,
  Button
} from '@chakra-ui/react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import theme from './theme';
import { Helmet } from 'react-helmet';

// Lazy load components for better performance
const Hero = React.lazy(() => import('./components/Hero'));
const Features = React.lazy(() => import('./components/Features'));
const Architecture = React.lazy(() => import('./components/Architecture'));
const GenomeScriptFeatures = React.lazy(() => import('./components/GenomeScriptFeatures'));
const WhitePaper = React.lazy(() => import('./components/WhitePaper'));
const Roadmap = React.lazy(() => import('./components/Roadmap'));

// Loading fallback component
const LoadingFallback = () => (
  <Center h="100vh">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="purple.500"
      size="xl"
    />
  </Center>
);

// Fixed TypeScript types for ErrorFallback
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Center h="100vh" p={4} textAlign="center">
    <Box>
      <Text color="red.500" fontSize="xl" mb={4}>
        Something went wrong:
      </Text>
      <Text color="gray.600" mb={4}>
        {error.message}
      </Text>
      <Button onClick={resetErrorBoundary} colorScheme="purple">
        Try again
      </Button>
    </Box>
  </Center>
);

// Section wrapper with proper types
const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary 
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // Reset the state of your app here
      window.location.reload();
    }}
  >
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

function App() {
  const bgColor = useColorModeValue('white', 'brand.dark');

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Nuucleum - AI-Powered Genomic Blockchain Platform</title>
        <meta name="title" content="Nuucleum - AI-Powered Genomic Blockchain Platform" />
        <meta name="description" content="Revolutionary decentralized platform combining AI-powered genomic analysis with blockchain security and privacy features. Empowering genomic research with cutting-edge technology." />
        <meta name="keywords" content="genomics, blockchain, AI, bioinformatics, privacy, research, GenomeScript" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nuucleum.com/" />
        <meta property="og:title" content="Nuucleum - AI-Powered Genomic Blockchain Platform" />
        <meta property="og:description" content="Revolutionary decentralized platform combining AI-powered genomic analysis with blockchain security." />
        <meta property="og:image" content="https://nuucleum.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nuucleum.com/" />
        <meta property="twitter:title" content="Nuucleum - AI-Powered Genomic Blockchain" />
        <meta property="twitter:description" content="Revolutionary decentralized genomic research platform" />
        <meta property="twitter:image" content="https://nuucleum.com/twitter-image.jpg" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6B46C1" />
        <link rel="canonical" href="https://nuucleum.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Helmet>
      <CSSReset />
      <Box 
        bg={bgColor} 
        minH="100vh"
        transition="background-color 0.2s"
        sx={{
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: useColorModeValue('gray.100', 'gray.900'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('gray.300', 'gray.700'),
            borderRadius: '5px',
          },
        }}
      >
        <Section>
          <Hero />
        </Section>
        
        <Section>
          <Features />
        </Section>
        
        <Section>
          <Architecture />
        </Section>
        
        <Section>
          <GenomeScriptFeatures />
        </Section>
        
        <Section>
          <WhitePaper />
        </Section>
        
        <Section>
          <Roadmap />
        </Section>
      </Box>
    </ChakraProvider>
  );
}

export default App; 