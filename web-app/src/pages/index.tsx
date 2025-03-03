import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Input,
  Button,
  SimpleGrid,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  Skeleton,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon, RepeatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { CryptoCard } from '../components/CryptoCard';
import { getCryptoPrices, type CryptoAsset } from '../services/api';

const MotionBox = motion(Box);

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const { data, isLoading, error, refetch } = useQuery<CryptoAsset[]>({
    queryKey: ['cryptoPrices'],
    queryFn: () => getCryptoPrices(10),
    refetchInterval: AUTO_REFRESH_INTERVAL,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const filteredCryptos = data?.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Layout>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex 
          direction="column" 
          align="center" 
          mb={12}
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            textAlign="center"
            mb={4}
          >
            Cryptex
          </Heading>
          <Text 
            color={textColor} 
            fontSize="lg" 
            textAlign="center"
          >
            ~ Intuitive Cryptocurrency Price Tracking ~
          </Text>
        </Flex>

        <Box mb={8} maxW="600px" mx="auto">
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleRefresh}
                isLoading={isRefreshing}
                variant="ghost"
                colorScheme="blue"
              >
                <RepeatIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
            Auto-refreshes every 30 seconds
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height="200px" borderRadius="lg" />
            ))
          ) : error ? (
            <Text color="red.500">Error loading prices</Text>
          ) : (
            filteredCryptos.map(crypto => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          )}
        </SimpleGrid>
      </MotionBox>
    </Layout>
  );
}
