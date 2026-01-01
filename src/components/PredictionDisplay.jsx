import React from 'react';
import { getNumberColor } from '../utils/predictor';

const PredictionDisplay = ({ predictions }) => {
    if (!predictions || predictions.length === 0) {
        return null;
    }

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                🎯 AI 예측 번호
            </h2>

            <div className="grid grid-3 gap-3">
                {predictions.map((prediction, index) => (
                    <div
                        key={index}
                        className="card fade-in"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            background: 'var(--bg-secondary)'
                        }}
                    >
                        <div style={{ marginBottom: '1rem' }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                marginBottom: '0.25rem',
                                color: 'var(--accent-primary)'
                            }}>
                                {prediction.strategy}
                            </h3>
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                                {prediction.description}
                            </p>
                        </div>

                        <div className="flex flex-center gap-2" style={{
                            padding: '1rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            {prediction.numbers.map((num, i) => (
                                <div
                                    key={i}
                                    className={`lotto-ball ${getNumberColor(num)} fade-in`}
                                    style={{
                                        animationDelay: `${(index * 0.1) + (i * 0.05)}s`
                                    }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PredictionDisplay;
