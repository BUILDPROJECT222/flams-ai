import axios from 'axios';

export class MarketService {
    static async getMarketData() {
        try {
            // Free CoinGecko API endpoint - no API key needed
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_vol=true&include_market_cap=true'
            );
            return {
                solana: {
                    usd: response.data.solana.usd,
                    usd_24h_vol: response.data.solana.usd_24h_vol,
                    market_cap: response.data.solana.usd_market_cap
                }
            };
        } catch (error) {
            console.error('Error fetching market data:', error);
            return {
                solana: {
                    usd: 0,
                    usd_24h_vol: 0,
                    market_cap: 0
                }
            };
        }
    }

    static async getSolanaStats() {
        try {
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=false&community_data=false&developer_data=false'
            );
            return response.data.market_data;
        } catch (error) {
            console.error('Error fetching Solana stats:', error);
            return null;
        }
    }
} 