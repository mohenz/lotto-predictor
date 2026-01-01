import axios from 'axios';

const CACHE_KEY = 'lotto_data_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

export const getLottoData = async () => {
  try {
    // 캐시 확인
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ 캐시된 데이터 사용');
        return data;
      }
    }

    // lotto-data.json 파일 로드
    console.log('📥 실제 로또 데이터 로딩 중...');
    const response = await axios.get('/lotto-predictor/lotto-data.json');
    const lottoData = response.data;

    console.log(`✅ ${lottoData.totalDraws}개 회차 데이터 로드 완료`);
    console.log(`📅 최신 회차: ${lottoData.latestDrawNo}회`);
    console.log(`🕒 마지막 업데이트: ${new Date(lottoData.lastUpdate).toLocaleString('ko-KR')}`);

    // 캐시 저장
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: lottoData.draws,
      timestamp: Date.now()
    }));

    return lottoData.draws;
  } catch (error) {
    console.error('❌ 데이터 로드 실패:', error);
    throw error;
  }
};

export const clearCache = () => localStorage.removeItem(CACHE_KEY);
