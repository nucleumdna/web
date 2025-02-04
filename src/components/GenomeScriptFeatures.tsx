import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { 
  FaDna, 
  FaBrain, 
  FaShieldAlt, 
  FaUsers, 
  FaCubes, 
  FaMagic 
} from 'react-icons/fa';
import { images } from '../utils/imageUtils';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
}

const features: FeatureProps[] = [
  {
    category: "Genomic Data Handling",
    title: "Advanced File Format Support",
    description: "Extended support for SFF, CSFASTA, BAM, SAM, and CRAM formats enabling seamless integration with all major sequencing platforms.",
    icon: FaDna,
  },
  {
    category: "Variant Calling & AI",
    title: "Intelligent Sequence Analysis",
    description: "AI-powered analysis of flowgrams, ionograms, and chromatograms from Sanger, Ion Torrent, and 454 sequencing for accurate mutation prediction.",
    icon: FaBrain,
  },
  {
    category: "Zero-Knowledge Proofs",
    title: "Proof Aggregation System",
    description: "Advanced ZKP implementation allowing multiple genetic proofs to be verified in a single step, improving blockchain query efficiency.",
    icon: FaShieldAlt,
  },
  {
    category: "Multi-Party Computation",
    title: "Secure Distributed Analysis",
    description: "Encrypted genome sequence computation across multiple nodes, ensuring privacy in decentralized processing.",
    icon: FaUsers,
  },
  {
    category: "PoUW & Blockchain",
    title: "Genetic Fingerprinting",
    description: "Token rewards linked to genetic fingerprinting validation, making Proof-of-Useful-Work more fair and efficient.",
    icon: FaCubes,
  },
  {
    category: "AI Data Cleaning",
    title: "Automated Error Correction",
    description: "AI models trained to detect and correct sequencing errors using Phred quality scores, improving data reliability.",
    icon: FaMagic,
  },
];

const Feature: React.FC<FeatureProps> = ({ title, description, icon, category }) => {
  return (
    <VStack
      align="start"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      spacing={3}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'lg',
      }}
    >
      <Text color="purple.500" fontWeight="bold" fontSize="sm">
        {category}
      </Text>
      <Icon as={icon} w={6} h={6} color="purple.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
    </VStack>
  );
};

const GenomeScriptFeatures: React.FC = () => {
  const overlayBg = useColorModeValue(
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))',
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))'
  );

  return (
    <Box 
      py={{ base: 12, md: 20 }} 
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL + images.genomescript})`,
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
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} mb={12}>
          <Heading
            textAlign="center"
            bgGradient="gradient.primary"
            bgClip="text"
            fontSize={{ base: "2xl", md: "4xl" }}
          >
            GenomeScript Programming Language
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.300"
            textAlign="center"
            maxW="3xl"
          >
            A next-generation domain-specific language designed for genomic research,
            combining AI-powered analysis with blockchain security and privacy features.
          </Text>
        </VStack>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 6, md: 8 }}
        >
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default GenomeScriptFeatures; 