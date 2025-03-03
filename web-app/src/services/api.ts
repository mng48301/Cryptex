import axios from 'axios';

const COINCAP_API = 'https://api.coincap.io/v2';

export interface CryptoAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
}

export const getCryptoPrices = async (limit: number = 5): Promise<CryptoAsset[]> => {
  try {
    const response = await axios.get(`${COINCAP_API}/assets`, {
      params: { limit }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw new Error('Failed to fetch cryptocurrency prices');
  }
};
