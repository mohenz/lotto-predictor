/**
 * Analyze frequency of each number
 */
export const analyzeFrequency = (drawData) => {
    const frequency = {};

    // Initialize frequency map
    for (let i = 1; i <= 45; i++) {
        frequency[i] = 0;
    }

    // Count occurrences
    drawData.forEach(draw => {
        draw.numbers.forEach(num => {
            frequency[num]++;
        });
    });

    return frequency;
};

/**
 * Analyze odd/even ratio
 */
export const analyzeOddEven = (drawData) => {
    let oddCount = 0;
    let evenCount = 0;

    drawData.forEach(draw => {
        draw.numbers.forEach(num => {
            if (num % 2 === 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        });
    });

    const total = oddCount + evenCount;
    return {
        odd: oddCount,
        even: evenCount,
        oddRatio: (oddCount / total * 100).toFixed(1),
        evenRatio: (evenCount / total * 100).toFixed(1)
    };
};

/**
 * Analyze number ranges (sections)
 */
export const analyzeSections = (drawData) => {
    const sections = {
        '1-10': 0,
        '11-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-45': 0
    };

    drawData.forEach(draw => {
        draw.numbers.forEach(num => {
            if (num <= 10) sections['1-10']++;
            else if (num <= 20) sections['11-20']++;
            else if (num <= 30) sections['21-30']++;
            else if (num <= 40) sections['31-40']++;
            else sections['41-45']++;
        });
    });

    return sections;
};

/**
 * Analyze consecutive numbers
 */
export const analyzeConsecutive = (drawData) => {
    let consecutiveCount = 0;
    let totalDraws = drawData.length;

    drawData.forEach(draw => {
        const sorted = [...draw.numbers].sort((a, b) => a - b);
        for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i + 1] - sorted[i] === 1) {
                consecutiveCount++;
                break; // Count once per draw
            }
        }
    });

    return {
        count: consecutiveCount,
        percentage: (consecutiveCount / totalDraws * 100).toFixed(1)
    };
};

/**
 * Get hot and cold numbers
 */
export const getHotColdNumbers = (frequency, topN = 10) => {
    const sorted = Object.entries(frequency)
        .sort(([, a], [, b]) => b - a);

    return {
        hot: sorted.slice(0, topN).map(([num, count]) => ({
            number: parseInt(num),
            count
        })),
        cold: sorted.slice(-topN).reverse().map(([num, count]) => ({
            number: parseInt(num),
            count
        }))
    };
};

/**
 * Analyze recent trends (last N draws)
 */
export const analyzeRecentTrends = (drawData, recentN = 20) => {
    const recentDraws = drawData.slice(-recentN);
    const frequency = analyzeFrequency(recentDraws);

    return {
        frequency,
        hotNumbers: getHotColdNumbers(frequency, 6).hot
    };
};

/**
 * Calculate weighted scores for prediction
 */
export const calculateWeightedScores = (drawData) => {
    const allTimeFreq = analyzeFrequency(drawData);
    const recentTrends = analyzeRecentTrends(drawData, 30);
    const scores = {};

    // Combine all-time frequency and recent trends
    for (let i = 1; i <= 45; i++) {
        const allTimeScore = allTimeFreq[i] || 0;
        const recentScore = (recentTrends.frequency[i] || 0) * 2; // Weight recent more

        scores[i] = allTimeScore + recentScore;
    }

    return scores;
};

/**
 * Get comprehensive statistics
 */
export const getStatistics = (drawData) => {
    const frequency = analyzeFrequency(drawData);
    const oddEven = analyzeOddEven(drawData);
    const sections = analyzeSections(drawData);
    const consecutive = analyzeConsecutive(drawData);
    const { hot, cold } = getHotColdNumbers(frequency);
    const recentTrends = analyzeRecentTrends(drawData);

    return {
        totalDraws: drawData.length,
        frequency,
        oddEven,
        sections,
        consecutive,
        hot,
        cold,
        recentTrends
    };
};
