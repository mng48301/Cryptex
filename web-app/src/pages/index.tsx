import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Container,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue
} from '@chakra-ui/react';
import { getCryptoPrices, type CryptoAsset } from '../services/api';

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

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
    <Container maxW="container.lg" py={8} bg={bgColor} color={textColor}>
      <VStack spacing={6}>
        <Text fontSize="2xl">Cryptex - intuitive price tracking</Text>
        
        <Box width="100%">
          <Input
            placeholder="Search cryptocurrency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <Button 
            onClick={handleRefresh} 
            mb={4} 
            isLoading={isRefreshing}
            loadingText="Refreshing..."
          >
            Refresh Prices
          </Button>
          <Text fontSize="sm" color="gray.500">
            Auto-refreshes every 30 seconds
          </Text>
        </Box>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Text color="red.500">
            Error loading prices. Please try again later.
            {error instanceof Error ? `: ${error.message}` : ''}
          </Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th>Price (USD)</Th>
                <Th>24h Change</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCryptos.map(crypto => (
                <Tr key={crypto.id}>
                  <Td>{crypto.name}</Td>
                  <Td>{crypto.symbol}</Td>
                  <Td>{Number(crypto.priceUsd).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}</Td>
                  <Td color={Number(crypto.changePercent24Hr) >= 0 ? 'green.500' : 'red.500'}>
                    {Number(crypto.changePercent24Hr).toFixed(2)}%
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
}
