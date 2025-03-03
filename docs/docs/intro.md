# Cryptex Documentation

## Project Overview

A modern cryptocurrency price tracker built with Next.js, React Query, and Chakra UI.

## Technical Stack

- **Frontend Framework**: Next.js 13 with TypeScript
- **State Management**: React Query 4
- **UI Framework**: Chakra UI 2.8
- **API**: CoinCap API
- **Documentation**: Docusaurus 2

## Implementation Details

### State Management with React Query

```typescript
const { data, isLoading, error, refetch } = useQuery<CryptoAsset[]>({
  queryKey: ['cryptoPrices'],
  queryFn: () => getCryptoPrices(10),
  refetchInterval: 30000,
});
```

Key features:
- Automatic data fetching and caching
- Real-time price updates every 30 seconds
- Manual refresh capability
- Built-in loading and error states

### API Integration

We use the CoinCap API for real-time cryptocurrency data:

```typescript
const getCryptoPrices = async (limit: number = 5): Promise<CryptoAsset[]> => {
  const response = await axios.get(`${COINCAP_API}/assets`, {
    params: { limit }
  });
  return response.data.data;
};
```

### UI Components

Built with Chakra UI for:
- Responsive design
- Accessible components
- Dark/light mode support
- Loading states
- Error handling

### Search Implementation

Client-side filtering with TypeScript:

```typescript
const filteredCryptos = data?.filter(crypto => 
  crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
) || [];
```

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
cd web-app
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run the documentation site:
```bash
cd ../docs
npm install
npm run start
```
