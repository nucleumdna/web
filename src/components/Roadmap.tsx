import React from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Circle,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { images } from '../utils/imageUtils';

// Define motion component
const MotionDiv = motion.div;

interface RoadmapItemProps {
  phase: string;
  title: string;
  description: string;
  duration: string;
  isActive?: boolean;
  index: number;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({
  phase,
  title,
  description,
  duration,
  isActive = false,
  index,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as unknown as React.RefObject<Element>, {
    once: true,
    margin: "-20% 0px -20% 0px",
    amount: 0.3
  });

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Responsive values
  const circleSize = useBreakpointValue({ base: "32px", md: "40px" });
  const spacing = useBreakpointValue({ base: 2, md: 4 });
  const padding = useBreakpointValue({ base: 4, md: 6 });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const headingSize = useBreakpointValue({ base: "sm", md: "md" });

  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5
  } as const;

  return (
    <div ref={containerRef}>
      <MotionDiv
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ ...springTransition, delay: index * 0.2 }}
        style={{ display: "block" }}
      >
        <HStack spacing={spacing} align="flex-start">
          <VStack spacing={0} align="center" minW={{ base: "40px", md: "60px" }}>
            <MotionDiv
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ ...springTransition, delay: index * 0.2 + 0.3 }}
              style={{ display: "block" }}
            >
              <Circle
                size={circleSize}
                bg={isActive ? "purple.500" : "gray.200"}
                color={isActive ? "white" : "gray.500"}
                fontWeight="bold"
                position="relative"
                _after={isActive ? {
                  content: '""',
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  bottom: '-4px',
                  left: '-4px',
                  border: '2px solid',
                  borderColor: 'purple.500',
                  borderRadius: 'full',
                  animation: 'pulse 2s infinite'
                } : {}}
              >
                {phase}
              </Circle>
            </MotionDiv>
            <MotionDiv
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ ...springTransition, delay: index * 0.2 + 0.4 }}
              style={{ display: "block" }}
            >
              <Box 
                w="2px" 
                h="100%" 
                bg={isActive ? "purple.500" : "gray.200"} 
                minH={{ base: "80px", md: "100px" }}
              />
            </MotionDiv>
          </VStack>
          <Box
            p={padding}
            bg={bgColor}
            rounded="lg"
            shadow="md"
            borderWidth="1px"
            borderColor={borderColor}
            flex={1}
            position="relative"
            _before={isActive ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'lg',
              border: '2px solid',
              borderColor: 'purple.500',
              opacity: 0.5
            } : {}}
          >
            <Text fontSize={fontSize} color="purple.500" fontWeight="bold" mb={1}>
              {duration}
            </Text>
            <Heading size={headingSize} mb={2}>
              {title}
            </Heading>
            <Text fontSize={fontSize} color={useColorModeValue('gray.600', 'gray.300')}>
              {description}
            </Text>
          </Box>
        </HStack>
      </MotionDiv>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const overlayBg = useColorModeValue(
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))'
  );

  return (
    <Box 
      py={{ base: 10, md: 20 }} 
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL + images.roadmap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 1,
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
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <Heading
          textAlign="center"
          mb={{ base: 8, md: 16 }}
          fontSize={{ base: "2xl", md: "4xl" }}
          bgGradient="gradient.primary"
          bgClip="text"
        >
          Development Roadmap
        </Heading>
        <VStack spacing={{ base: 4, md: 8 }} align="stretch">
          {[
            {
              phase: "1",
              title: "Core System Development",
              description: "Implementation of file format support for FASTA, BAM, CSFASTA, SFF and development of AI-powered variant calling from flowgrams & chromatograms.",
              duration: "Q1 2025 (0-4 Weeks)",
              isActive: true
            },
            {
              phase: "2",
              title: "Blockchain & Privacy",
              description: "Optimization of ZKP validation with Proof Aggregation and implementation of Multi-Party Computation for secure genomic analysis.",
              duration: "Q1 2025 (4-8 Weeks)"
            },
            {
              phase: "3",
              title: "PoUW & AI Enhancements",
              description: "Implementation of genetic fingerprinting for PoUW rewards and training of AI models for automated sequencing error correction.",
              duration: "Q2 2025 (8-12 Weeks)"
            },
            {
              phase: "4",
              title: "Web App & Community",
              description: "Creation of web-based UI & API for GenomeScript queries and expansion of blockchain-based smart contract-driven genomic research.",
              duration: "Q2 2025 (12+ Weeks)"
            }
          ].map((item, index) => (
            <RoadmapItem
              key={item.phase}
              {...item}
              index={index}
            />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Roadmap; 