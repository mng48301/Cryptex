import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryProvider } from '../providers/QueryProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryProvider>
  );
}
