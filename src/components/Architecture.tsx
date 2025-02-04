import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { images } from '../utils/imageUtils';

const MotionBox = motion(Box);

const ParallaxBox: React.FC<{
  children: React.ReactNode;
  offset?: number;
}> = ({ children, offset = 50 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });

  return (
    <MotionBox
      ref={ref}
      style={{
        y: springY,
        opacity,
        scale,
      }}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
    >
      {children}
    </MotionBox>
  );
};

const Architecture: React.FC = () => {
  const boxBg = useColorModeValue('rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)');
  const overlayBg = useColorModeValue(
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
  );

  const architectureComponents = [
    {
      title: "GenomeScript Core",
      description: "Domain-specific language optimized for genomic computations with built-in privacy features and AI assistance.",
      delay: 0.2
    },
    {
      title: "AI Engine",
      description: "Deep learning models for mutation impact prediction and automated optimization of genomic queries.",
      delay: 0.4
    },
    {
      title: "Privacy Layer",
      description: "Zero-Knowledge Proofs and Multi-Party Computation for secure genomic data processing.",
      delay: 0.6
    },
    {
      title: "Blockchain Layer",
      description: "Decentralized storage and computation network with Proof-of-Useful-Work consensus.",
      delay: 0.8
    },
    {
      title: "Data Processing Pipeline",
      description: "Automated workflow for handling various genomic file formats and preprocessing sequencing data.",
      delay: 1.0
    },
    {
      title: "Smart Contract Layer",
      description: "Automated execution of research agreements and reward distribution for computational contributions.",
      delay: 1.2
    },
    {
      title: "API & Integration Layer",
      description: "RESTful and GraphQL endpoints for seamless integration with existing bioinformatics tools.",
      delay: 1.4
    },
    {
      title: "Security Framework",
      description: "Comprehensive security measures including encryption, access control, and audit logging.",
      delay: 1.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  return (
    <Box 
      py={{ base: 12, md: 20 }} 
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL + images.architecture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.8,
        transform: 'scale(1.1)', // Slight zoom for parallax effect
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: overlayBg,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }} position="relative" zIndex={1}>
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <ParallaxBox offset={100}>
            <Heading
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              bgGradient="linear(to-r, white, purple.200)"
              bgClip="text"
              fontWeight="extrabold"
              mb={6}
              textAlign="center"
              textShadow="0 0 20px rgba(0,0,0,0.3)"
            >
              System Architecture
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              maxW="3xl"
              mx="auto"
              textAlign="center"
              textShadow="0 0 10px rgba(0,0,0,0.3)"
            >
              A comprehensive breakdown of Nuucleum's core components and their interactions
            </Text>
          </ParallaxBox>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {architectureComponents.map((component, index) => (
                <MotionBox
                  key={component.title}
                  variants={itemVariants}
                  p={8}
                  bg={boxBg}
                  rounded="xl"
                  shadow="lg"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  backdropFilter="blur(10px)"
                  style={{
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  }}
                  _hover={{
                    transform: 'translateY(-4px) scale(1.02)',
                    shadow: '2xl',
                    borderColor: 'purple.200',
                    bg: 'rgba(0, 0, 0, 0.5)',
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Heading
                    size="lg"
                    mb={4}
                    bgGradient="linear(to-r, white, purple.200)"
                    bgClip="text"
                    textShadow="0 0 10px rgba(0,0,0,0.3)"
                  >
                    {component.title}
                  </Heading>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="gray.100"
                    textShadow="0 0 8px rgba(0,0,0,0.3)"
                  >
                    {component.description}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Architecture; 