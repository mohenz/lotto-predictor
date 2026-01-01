import { generateMockData } from './mockData';

// CORS 문제로 인해 브라우저에서 직접 API 호출이 불가능합니다.
// 실제 운영 환경에서는 백엔드 서버를 통해 프록시 방식으로 API를 호출해야 합니다.
// 현재는 데모 목적으로 Mock 데이터를 사용합니다.

const CACHE_KEY = 'lotto_data_cache';
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Get the latest draw number
 * Calculates based on the first draw date (2002-12-07)
 */
export const getLatestDrawNumber = () => {
    const firstDrawDate = new Date('2002-12-07');
    const today = new Date();
    const diffTime = Math.abs(today - firstDrawDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks + 1;
};

/**
 * Simulate fetching data with progress updates
 */
const simulateFetchWithProgress = async (totalItems, onProgress) => {
    const data = generateMockData(totalItems);

    // Simulate progressive loading
    for (let i = 0; i < totalItems; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 50));
        if (onProgress) {
            onProgress({
                current: Math.min(i + 10, totalItems),
                total: totalItems,
                percentage: Math.round((Math.min(i + 10, totalItems) / totalItems) * 100)
            });
        }
    }

    return data;
};

/**
 * Get cached data or fetch fresh data
 */
export const getLottoData = async (yearsBack = 10, onProgress) => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('Using cached lotto data');
            if (onProgress) {
                onProgress({ current: data.length, total: data.length, percentage: 100 });
            }
            return data;
        }
    }

    // Generate mock data
    const drawsPerYear = 52; // approximately
    const totalDraws = yearsBack * drawsPerYear;

    console.log(`Generating ${totalDraws} mock draws for demonstration`);
    console.log('⚠️ Note: Using mock data due to CORS restrictions.');
    console.log('For production, implement a backend proxy to fetch real data.');

    const data = await simulateFetchWithProgress(totalDraws, onProgress);

    // Cache the data
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
    }));

    return data;
};

/**
 * Clear cached data
 */
export const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
};
