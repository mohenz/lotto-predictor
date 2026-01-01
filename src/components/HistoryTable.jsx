import React from 'react';
import { getNumberColor } from '../utils/predictor';

const HistoryTable = ({ drawData }) => {
    if (!drawData || drawData.length === 0) return null;

    // Show last 20 draws
    const recentDraws = drawData.slice(-20).reverse();

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>📜 최근 당첨 번호</h3>

            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.9rem'
                }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                회차
                            </th>
                            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                추첨일
                            </th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                당첨번호
                            </th>
                            <th style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                보너스
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentDraws.map((draw, index) => (
                            <tr
                                key={draw.drawNo}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    transition: 'background var(--transition-fast)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                                    {draw.drawNo}
                                </td>
                                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                                    {draw.drawDate}
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                    <div className="flex flex-center gap-1">
                                        {draw.numbers.map((num, i) => (
                                            <div
                                                key={i}
                                                className={`lotto-ball ${getNumberColor(num)}`}
                                                style={{
                                                    width: '35px',
                                                    height: '35px',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                {num}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                    <div className="flex flex-center">
                                        <div
                                            className={`lotto-ball ${getNumberColor(draw.bonusNumber)}`}
                                            style={{
                                                width: '35px',
                                                height: '35px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {draw.bonusNumber}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryTable;
