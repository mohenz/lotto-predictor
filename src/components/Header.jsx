import React from 'react';

const Header = ({ latestDraw, loading }) => {
    return (
        <header className="glass" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'center'
        }}>
            <h1 style={{ marginBottom: '0.5rem' }}>🎱 로또 6/45 당첨 예측</h1>
            <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                AI 기반 통계 분석으로 예측하는 차세대 로또 번호
            </p>
        </header>
    );
};

export default Header;
