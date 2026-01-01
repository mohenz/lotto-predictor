import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PredictionDisplay from './components/PredictionDisplay';
import StatisticsPanel from './components/StatisticsPanel';
import HistoryTable from './components/HistoryTable';
import { getLottoData, clearCache } from './services/lottoService';
import { getStatistics } from './utils/analyzer';
import { generatePredictions } from './utils/predictor';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [drawData, setDrawData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getLottoData();

      if (data && data.length > 0) {
        setDrawData(data);

        // Calculate statistics
        const stats = getStatistics(data);
        setStatistics(stats);

        // Generate predictions
        const preds = generatePredictions(data, stats, 5);
        setPredictions(preds);
      } else {
        setError('데이터를 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('데이터 로딩 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    clearCache();
    loadData();
  };

  const handleGenerateNew = () => {
    if (statistics && drawData.length > 0) {
      const newPredictions = generatePredictions(drawData, statistics, 5);
      setPredictions(newPredictions);
    }
  };

  return (
    <div className="container">
      <Header
        latestDraw={drawData.length > 0 ? drawData[drawData.length - 1] : null}
        loading={loading}
      />

      {loading && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <div className="flex-center flex-col gap-3">
            <div className="loading"></div>
            <h3>데이터 분석 중...</h3>
            <p className="text-secondary">
              최근 10년간의 로또 당첨번호를 수집하고 있습니다.
            </p>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              height: '8px',
              background: 'var(--bg-tertiary)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--gradient-primary)',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <p className="text-muted">{progress}%</p>
          </div>
        </div>
      )}

      {error && (
        <div className="card" style={{
          padding: '2rem',
          textAlign: 'center',
          borderColor: 'var(--accent-danger)'
        }}>
          <h3 style={{ color: 'var(--accent-danger)' }}>오류</h3>
          <p className="text-secondary">{error}</p>
          <button className="btn btn-primary mt-3" onClick={handleRefresh}>
            다시 시도
          </button>
        </div>
      )}

      {!loading && !error && drawData.length > 0 && (
        <>
          {/* Action Buttons */}
          <div className="flex flex-center gap-2 mb-4">
            <button className="btn btn-primary" onClick={handleGenerateNew}>
              🎲 새로운 번호 생성
            </button>
            <button className="btn btn-secondary" onClick={handleRefresh}>
              🔄 데이터 새로고침
            </button>
          </div>

          {/* Predictions */}
          <PredictionDisplay predictions={predictions} />

          {/* Statistics */}
          <StatisticsPanel stats={statistics} />

          {/* History */}
          <HistoryTable drawData={drawData} />

          {/* Disclaimer */}
          <div className="card text-center" style={{
            background: 'var(--bg-tertiary)',
            borderColor: 'var(--accent-warning)'
          }}>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              ⚠️ 본 프로그램은 통계적 분석을 기반으로 하며, 실제 당첨을 보장하지 않습니다.<br />
              로또는 완전한 무작위 추첨이므로 과거 데이터가 미래 결과에 영향을 주지 않습니다.<br />
              건전한 여가생활로 즐겨주세요.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
