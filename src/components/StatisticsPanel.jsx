import React from 'react';
import FrequencyChart from './FrequencyChart';
import { getNumberColor } from '../utils/predictor';

const StatisticsPanel = ({ stats }) => {
    if (!stats) return null;

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                📊 통계 분석
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-4 gap-3 mb-4">
                <div className="card text-center">
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>총 분석 회차</div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {stats.totalDraws}
                    </div>
                </div>

                <div className="card text-center">
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>홀수 비율</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                        {stats.oddEven.oddRatio}%
                    </div>
                </div>

                <div className="card text-center">
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>짝수 비율</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>
                        {stats.oddEven.evenRatio}%
                    </div>
                </div>

                <div className="card text-center">
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>연속번호 출현</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-success)' }}>
                        {stats.consecutive.percentage}%
                    </div>
                </div>
            </div>

            {/* Hot and Cold Numbers */}
            <div className="grid grid-2 gap-3 mb-4">
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-danger)' }}>
                        🔥 최다 출현 번호 (HOT)
                    </h3>
                    <div className="flex flex-center gap-2" style={{ flexWrap: 'wrap' }}>
                        {stats.hot.slice(0, 10).map((item, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div className={`lotto-ball ${getNumberColor(item.number)}`}>
                                    {item.number}
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {item.count}회
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                        ❄️ 최소 출현 번호 (COLD)
                    </h3>
                    <div className="flex flex-center gap-2" style={{ flexWrap: 'wrap' }}>
                        {stats.cold.slice(0, 10).map((item, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div className={`lotto-ball ${getNumberColor(item.number)}`}>
                                    {item.number}
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {item.count}회
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section Distribution */}
            <div className="card mb-4">
                <h3 style={{ marginBottom: '1rem' }}>구간별 분포</h3>
                <div className="grid grid-5 gap-2">
                    {Object.entries(stats.sections).map(([range, count]) => (
                        <div key={range} className="text-center" style={{
                            padding: '1rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>{range}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                                {count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Frequency Chart */}
            <div className="card">
                <FrequencyChart frequency={stats.frequency} />
            </div>
        </div>
    );
};

export default StatisticsPanel;
