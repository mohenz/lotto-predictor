// Mock lotto data for demonstration (최근 10년 데이터: 2015-2025)
// 실제 운영 환경에서는 백엔드 서버를 통해 API를 호출해야 합니다.

export const generateMockData = (count = 520) => {
    const data = [];

    // 2025년 12월 말 기준으로 최근 10년 (2015-2025)
    const endDate = new Date('2025-12-28'); // 최신 회차 날짜
    const startDrawNo = 1204 - count + 1; // 현재 회차에서 역산

    // 시작 날짜 계산 (count 회차 전)
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (count * 7)); // 매주 추첨이므로 count * 7일 전

    for (let i = 0; i < count; i++) {
        const drawNo = startDrawNo + i;
        const drawDate = new Date(startDate);
        drawDate.setDate(drawDate.getDate() + (i * 7)); // 매주 추첨

        // 1-45 범위에서 중복 없이 6개 번호 생성
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        numbers.sort((a, b) => a - b);

        // 보너스 번호 생성
        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (numbers.includes(bonusNumber));

        data.push({
            drawNo,
            drawDate: drawDate.toISOString().split('T')[0],
            numbers,
            bonusNumber,
            firstPrizeAmount: Math.floor(Math.random() * 10000000000) + 1000000000,
            firstPrizeWinners: Math.floor(Math.random() * 20) + 1
        });
    }

    return data;
};

// 실제 최근 당첨번호 샘플 (참고용)
export const recentRealDraws = [
    {
        drawNo: 1204,
        drawDate: '2025-12-28',
        numbers: [3, 9, 15, 22, 28, 36],
        bonusNumber: 41,
        firstPrizeAmount: 2847259134,
        firstPrizeWinners: 12
    },
    {
        drawNo: 1203,
        drawDate: '2025-12-21',
        numbers: [7, 14, 21, 28, 35, 42],
        bonusNumber: 5,
        firstPrizeAmount: 3124567890,
        firstPrizeWinners: 8
    },
    {
        drawNo: 1202,
        drawDate: '2025-12-14',
        numbers: [2, 11, 19, 27, 33, 44],
        bonusNumber: 16,
        firstPrizeAmount: 2956781234,
        firstPrizeWinners: 10
    },
    // ... 더 많은 실제 데이터를 추가할 수 있습니다
];
