import React, { useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
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

const WhitepaperSection: React.FC<{
  title: string;
  id: string;
  content: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
}> = ({ title, id, content, bgColor, textColor, borderColor }) => {
  return (
    <MotionBox
      p={8}
      bg={bgColor}
      rounded="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
      boxShadow="xl"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '2xl',
        borderColor: 'purple.200',
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Heading
        size="lg"
        mb={6}
        color={textColor}
        letterSpacing="wide"
      >
        {title}
      </Heading>
      {content}
    </MotionBox>
  );
};

const WhitePaper: React.FC = () => {
  const overlayBg = useColorModeValue(
    'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5))',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))'
  );

  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.85)',
    'rgba(0, 0, 0, 0.3)'
  );

  const textColorPrimary = useColorModeValue('gray.800', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.100');
  const tabBgSelected = useColorModeValue('purple.100', 'purple.900');
  const sectionBorderColor = useColorModeValue('gray.200', 'whiteAlpha.300');

  const sections = [
    {
      title: "Abstract",
      id: "abstract",
      content: (
        <Text 
          color={textColorPrimary} 
          fontSize="lg" 
          lineHeight="tall"
          aria-label="Abstract content"
        >
          Nuucleum is an innovative, decentralized AI-powered blockchain designed to revolutionize genomic research, privacy, and AI-driven analysis. 
          At its core, Nuucleum combines blockchain technology, AI-based genomic analysis, and Zero-Knowledge Proofs (ZKP) to enable secure, private, and efficient genomic computations.
        </Text>
      )
    },
    {
      title: "System Architecture",
      id: "system-architecture",
      content: (
        <VStack spacing={4} align="stretch">
          <Text color={textColorPrimary} fontSize="lg">
            The Nuucleum system consists of three main layers:
          </Text>
          <UnorderedList spacing={4} styleType="none" ml={0}>
            {[
              "GenomeScript: A new AI-powered programming language optimized for bioinformatics",
              "Blockchain Layer: Secure, encrypted, and decentralized storage",
              "AI Layer: Deep learning for mutation impact predictions"
            ].map((item, index) => (
              <ListItem
                key={index}
                display="flex"
                alignItems="center"
                color={textColorSecondary}
                _hover={{ color: textColorPrimary }}
                transition="color 0.2s"
              >
                <Icon as={MdCheckCircle} color="purple.500" mr={3} w={5} h={5} />
                <Text fontSize="md">{item}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      )
    },
    // Add more sections as needed
  ];

  return (
    <Box 
      as="main"
      py={{ base: 12, md: 20 }} 
      position="relative"
      overflow="hidden"
      role="region"
      aria-label="Whitepaper content"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL + images.whitepaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 1,
        filter: 'brightness(1.1)',
        transform: 'scale(1.1)',
        '@media (max-width: 768px)': {
          backgroundAttachment: 'scroll', // Better mobile performance
        }
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
      <Container 
        maxW="container.xl" 
        px={{ base: 4, md: 6, lg: 8 }} 
        position="relative" 
        zIndex={1}
      >
        <VStack 
          spacing={{ base: 12, md: 16 }} 
          align="stretch"
          role="region"
          aria-label="Whitepaper sections"
        >
          <ParallaxBox offset={100}>
            <VStack spacing={8} align="center">
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
                textAlign="center"
                letterSpacing="tight"
                mb={4}
              >
                Whitepaper
              </Heading>
            </VStack>
          </ParallaxBox>

          <Tabs 
            variant="soft-rounded" 
            colorScheme="purple"
            isLazy
            role="tablist"
            aria-label="Whitepaper sections"
          >
            <TabList 
              mb={8} 
              overflowX="auto" 
              py={2}
              css={{
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '3px',
                },
              }}
            >
              {sections.map((section, index) => (
                <Tab 
                  key={section.id}
                  color={textColorPrimary}
                  _selected={{ 
                    bg: tabBgSelected,
                    color: textColorPrimary 
                  }}
                  _focus={{
                    boxShadow: 'outline',
                  }}
                  role="tab"
                  aria-controls={`panel-${section.id}`}
                >
                  {section.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {sections.map((section) => (
                <TabPanel 
                  key={section.id} 
                  p={0}
                  role="tabpanel"
                  id={`panel-${section.id}`}
                >
                  <WhitepaperSection 
                    {...section}
                    bgColor={cardBg}
                    textColor={textColorPrimary}
                    borderColor={sectionBorderColor}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default WhitePaper; 