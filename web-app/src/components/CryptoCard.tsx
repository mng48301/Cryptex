import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { CryptoAsset } from '../services/api';

const MotionBox = motion(Box);

export function CryptoCard({ crypto }: { crypto: CryptoAsset }) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const gradientFrom = useColorModeValue('gray.50', 'gray.700');
  const gradientTo = useColorModeValue('white', 'gray.600');
  const changePercent = Number(crypto.changePercent24Hr);

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      bg={bgColor}
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      w="100%"
      bgGradient={`linear(to-br, ${gradientFrom}, ${gradientTo})`}
      border="1px solid"
      borderColor={useColorModeValue('gray.100', 'gray.600')}
    >
      <Stat>
        <StatLabel fontSize="lg" fontWeight="medium">{crypto.name}</StatLabel>
        <StatNumber fontSize="2xl">
          {Number(crypto.priceUsd).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </StatNumber>
        <StatHelpText>
          <StatArrow type={changePercent >= 0 ? 'increase' : 'decrease'} />
          {Math.abs(changePercent).toFixed(2)}%
        </StatHelpText>
      </Stat>
      <Text color="gray.500" fontSize="sm" mt={2}>
        Symbol: {crypto.symbol}
      </Text>
    </MotionBox>
  );
}
