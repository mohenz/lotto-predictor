import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 최신 회차 추정 (2002년 12월 7일 1회차 시작, 매주 토요일)
function estimateLatestDrawNo() {
    const firstDrawDate = new Date('2002-12-07');
    const today = new Date();
    const diffTime = Math.abs(today - firstDrawDate);
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks + 1;
}

// API 호출 함수
function fetchDrawData(drawNo) {
    return new Promise((resolve, reject) => {
        const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNo}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.returnValue === 'success') {
                        resolve({
                            drawNo: json.drwNo,
                            drawDate: json.drwNoDate,
                            numbers: [
                                json.drwtNo1,
                                json.drwtNo2,
                                json.drwtNo3,
                                json.drwtNo4,
                                json.drwtNo5,
                                json.drwtNo6
                            ],
                            bonusNumber: json.bnusNo,
                            firstPrizeAmount: json.firstWinamnt,
                            firstPrizeWinners: json.firstPrzwnerCo
                        });
                    } else {
                        reject(new Error(`Invalid draw number: ${drawNo}`));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// 딜레이 함수
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 메인 함수
async function fetchLottoData() {
    console.log('🎱 로또 당첨번호 데이터 수집 시작...\n');

    // 최신 회차 추정
    const estimatedLatest = estimateLatestDrawNo();
    console.log(`📊 추정 최신 회차: ${estimatedLatest}회`);

    // 최신 회차 확인 (최근 5회차 중 유효한 회차 찾기)
    let latestDrawNo = null;
    for (let i = 0; i < 5; i++) {
        try {
            const testDrawNo = estimatedLatest - i;
            await fetchDrawData(testDrawNo);
            latestDrawNo = testDrawNo;
            console.log(`✅ 최신 회차 확인: ${latestDrawNo}회\n`);
            break;
        } catch (error) {
            continue;
        }
    }

    if (!latestDrawNo) {
        throw new Error('최신 회차를 찾을 수 없습니다.');
    }

    // 최근 520회차 데이터 수집
    const totalDraws = 520;
    const startDrawNo = latestDrawNo - totalDraws + 1;
    const draws = [];

    console.log(`📥 ${startDrawNo}회 ~ ${latestDrawNo}회 데이터 수집 중...\n`);

    for (let drawNo = startDrawNo; drawNo <= latestDrawNo; drawNo++) {
        try {
            const data = await fetchDrawData(drawNo);
            draws.push(data);

            // 진행 상황 표시 (매 50회차마다)
            if ((drawNo - startDrawNo + 1) % 50 === 0) {
                console.log(`  ✓ ${drawNo}회 완료 (${draws.length}/${totalDraws})`);
            }

            // API 부하 방지를 위한 딜레이 (1초)
            await delay(1000);
        } catch (error) {
            console.error(`  ✗ ${drawNo}회 실패: ${error.message}`);
            // 실패한 회차는 건너뛰고 계속 진행
        }
    }

    console.log(`\n✅ 총 ${draws.length}개 회차 데이터 수집 완료\n`);

    // 데이터 구조 생성
    const lottoData = {
        lastUpdate: new Date().toISOString(),
        latestDrawNo: latestDrawNo,
        totalDraws: draws.length,
        draws: draws
    };

    // public 폴더에 저장
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'lotto-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(lottoData, null, 2), 'utf-8');

    console.log(`💾 데이터 저장 완료: ${outputPath}`);
    console.log(`📊 최신 회차: ${latestDrawNo}회 (${draws[draws.length - 1].drawDate})`);
    console.log(`🎯 최신 당첨번호: ${draws[draws.length - 1].numbers.join(', ')} (보너스: ${draws[draws.length - 1].bonusNumber})`);
    console.log('\n🎉 데이터 수집 완료!\n');
}

// 스크립트 실행
fetchLottoData().catch((error) => {
    console.error('❌ 에러 발생:', error.message);
    process.exit(1);
});
