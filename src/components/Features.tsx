import React from 'react';
import { Box, Container, SimpleGrid, Icon, Text, Stack, Flex, useColorModeValue } from '@chakra-ui/react';
import { FaCode, FaBrain, FaShieldAlt, FaCubes, FaServer, FaUsers } from 'react-icons/fa';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'purple.500'}
        mb={1}
      >
        <Icon as={icon} w={10} h={10} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  );
};

const Features: React.FC = () => {
  return (
    <Box p={4} bg={useColorModeValue('white', 'gray.800')}>
      <Container maxW={'6xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <Feature
            icon={FaCode}
            title={'GenomeScript'}
            text={'AI-powered programming language for bioinformatics'}
          />
          <Feature
            icon={FaBrain}
            title={'AI-Powered Analysis'}
            text={'Deep learning for mutation impact predictions'}
          />
          <Feature
            icon={FaShieldAlt}
            title={'Zero-Knowledge Proofs'}
            text={'Privacy-preserving genomic queries'}
          />
          <Feature
            icon={FaCubes}
            title={'Blockchain Storage'}
            text={'Secure SHA3-512 hashing for DNA data'}
          />
          <Feature
            icon={FaServer}
            title={'Proof-of-Useful-Work'}
            text={'Miners perform real genomic computations'}
          />
          <Feature
            icon={FaUsers}
            title={'Multi-Party Computation'}
            text={'Collaborative analysis without exposing sequences'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features; 