import React from 'react';
import { Box, Container, Heading, Text, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { FaGithub, FaBook } from 'react-icons/fa';
import { images } from '../utils/imageUtils';

const Hero: React.FC = () => {
  console.log('Hero image path:', process.env.PUBLIC_URL + images.hero);

  const overlayBg = useColorModeValue(
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
  );

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL + images.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.8,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: overlayBg,
      }}
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Heading
            as="h1"
            size="4xl"
            bgGradient="linear(to-r, white, purple.200)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Nuucleum
          </Heading>
          <Text 
            fontSize="2xl" 
            color="white"
            textShadow="0 0 10px rgba(0,0,0,0.3)"
          >
            Decentralized AI-Powered Genomic Blockchain
          </Text>
          <Text 
            fontSize="lg" 
            maxW="2xl" 
            color="gray.100"
            textShadow="0 0 8px rgba(0,0,0,0.3)"
          >
            Revolutionizing genomic research by combining AI, blockchain, and cryptographic privacy techniques
          </Text>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FaGithub />}
              colorScheme="purple"
              size="lg"
              onClick={() => window.open('https://github.com/nucleumdna/GenomeScript', '_blank')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
            >
              GitHub
            </Button>
            <Button
              leftIcon={<FaBook />}
              colorScheme="whiteAlpha"
              size="lg"
              variant="solid"
              onClick={() => window.open('/docs', '_blank')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
            >
              Documentation
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero; 