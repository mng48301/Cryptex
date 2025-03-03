import { useState, useEffect } from 'react';
import type { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryDevToolsWrapper() {
  const [DevTools, setDevTools] = useState<typeof ReactQueryDevtools | null>(null);

  useEffect(() => {
    // Only load DevTools in development and on client-side
    if (process.env.NODE_ENV === 'development') {
      import('@tanstack/react-query-devtools').then((module) => {
        setDevTools(() => module.ReactQueryDevtools);
      });
    }
  }, []);

  if (!DevTools) {
    return null;
  }

  return (
    <div suppressHydrationWarning>
      {process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && (
        <DevTools position="bottom-right" />
      )}
    </div>
  );
}
