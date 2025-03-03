import { Box, Flex, useColorMode, IconButton, Container } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function Layout({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minH="100vh" bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}>
      <MotionBox
        as="nav"
        w="64px"
        bg={colorMode === 'dark' ? 'gray.900' : 'white'}
        p={4}
        boxShadow="sm"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          mb={4}
        />
      </MotionBox>
      <Container maxW="container.xl" py={8} px={4}>
        {children}
      </Container>
    </Flex>
  );
}
