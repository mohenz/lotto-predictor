import { calculateWeightedScores, analyzeOddEven, analyzeSections } from './analyzer';

/**
 * Generate random numbers (baseline method)
 */
const generateRandomSet = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Generate numbers based on weighted frequency
 */
const generateWeightedSet = (scores) => {
    const numbers = new Set();
    const entries = Object.entries(scores);
    const totalScore = entries.reduce((sum, [, score]) => sum + score, 0);

    while (numbers.size < 6) {
        let random = Math.random() * totalScore;

        for (const [num, score] of entries) {
            random -= score;
            if (random <= 0) {
                numbers.add(parseInt(num));
                break;
            }
        }
    }

    return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Generate balanced set (considering odd/even and sections)
 */
const generateBalancedSet = (scores, stats) => {
    const numbers = new Set();
    const { oddRatio } = stats.oddEven;
    const targetOdd = Math.round(6 * (oddRatio / 100));

    // Separate odd and even numbers with scores
    const oddNumbers = Object.entries(scores)
        .filter(([num]) => parseInt(num) % 2 === 1)
        .sort(([, a], [, b]) => b - a);

    const evenNumbers = Object.entries(scores)
        .filter(([num]) => parseInt(num) % 2 === 0)
        .sort(([, a], [, b]) => b - a);

    // Add odd numbers
    let oddAdded = 0;
    for (const [num] of oddNumbers) {
        if (oddAdded >= targetOdd) break;
        if (Math.random() > 0.3) { // Add some randomness
            numbers.add(parseInt(num));
            oddAdded++;
        }
    }

    // Add even numbers
    let evenAdded = 0;
    const targetEven = 6 - targetOdd;
    for (const [num] of evenNumbers) {
        if (evenAdded >= targetEven) break;
        if (Math.random() > 0.3) {
            numbers.add(parseInt(num));
            evenAdded++;
        }
    }

    // Fill remaining with weighted selection
    const allSorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    for (const [num] of allSorted) {
        if (numbers.size >= 6) break;
        numbers.add(parseInt(num));
    }

    return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Generate hot numbers based set
 */
const generateHotSet = (stats) => {
    const numbers = new Set();
    const hotNumbers = stats.hot.map(h => h.number);

    // Take top 4-5 hot numbers
    const hotCount = 4 + Math.floor(Math.random() * 2);
    for (let i = 0; i < hotCount && i < hotNumbers.length; i++) {
        if (Math.random() > 0.2) {
            numbers.add(hotNumbers[i]);
        }
    }

    // Fill remaining randomly
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Generate mixed strategy set
 */
const generateMixedSet = (scores, stats) => {
    const numbers = new Set();

    // Add 2-3 hot numbers
    const hotCount = 2 + Math.floor(Math.random() * 2);
    const hotNumbers = stats.hot.slice(0, 10).map(h => h.number);
    for (let i = 0; i < hotCount; i++) {
        const randomHot = hotNumbers[Math.floor(Math.random() * hotNumbers.length)];
        numbers.add(randomHot);
    }

    // Add 1-2 cold numbers (contrarian approach)
    const coldCount = 1 + Math.floor(Math.random() * 2);
    const coldNumbers = stats.cold.slice(0, 10).map(c => c.number);
    for (let i = 0; i < coldCount; i++) {
        const randomCold = coldNumbers[Math.floor(Math.random() * coldNumbers.length)];
        numbers.add(randomCold);
    }

    // Fill remaining with weighted selection
    while (numbers.size < 6) {
        const weighted = generateWeightedSet(scores);
        weighted.forEach(num => numbers.add(num));
    }

    return Array.from(numbers).sort((a, b) => a - b).slice(0, 6);
};

/**
 * Main prediction function - generates multiple sets
 */
export const generatePredictions = (drawData, stats, count = 5) => {
    const scores = calculateWeightedScores(drawData);
    const predictions = [];

    // Strategy 1: Weighted frequency
    predictions.push({
        numbers: generateWeightedSet(scores),
        strategy: '가중 빈도 기반',
        description: '과거 출현 빈도를 가중치로 적용'
    });

    // Strategy 2: Balanced approach
    predictions.push({
        numbers: generateBalancedSet(scores, stats),
        strategy: '균형 분석 기반',
        description: '홀/짝 비율과 구간 분포 고려'
    });

    // Strategy 3: Hot numbers
    predictions.push({
        numbers: generateHotSet(stats),
        strategy: '최다 출현 번호',
        description: '최근 자주 나온 번호 중심'
    });

    // Strategy 4: Mixed strategy
    predictions.push({
        numbers: generateMixedSet(scores, stats),
        strategy: '복합 전략',
        description: '다양한 분석 기법 조합'
    });

    // Strategy 5: AI-weighted (enhanced weighted)
    predictions.push({
        numbers: generateWeightedSet(scores),
        strategy: 'AI 추천',
        description: '최신 트렌드 반영 가중치'
    });

    return predictions.slice(0, count);
};

/**
 * Get number color class based on range
 */
export const getNumberColor = (num) => {
    if (num <= 10) return 'ball-yellow';
    if (num <= 20) return 'ball-blue';
    if (num <= 30) return 'ball-red';
    if (num <= 40) return 'ball-gray';
    return 'ball-green';
};
