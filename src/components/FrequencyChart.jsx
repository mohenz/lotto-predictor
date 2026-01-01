import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FrequencyChart = ({ frequency }) => {
    const numbers = Object.keys(frequency).map(Number).sort((a, b) => a - b);
    const counts = numbers.map(num => frequency[num]);

    const data = {
        labels: numbers,
        datasets: [
            {
                label: '출현 횟수',
                data: counts,
                backgroundColor: numbers.map(num => {
                    if (num <= 10) return 'rgba(251, 191, 36, 0.8)';
                    if (num <= 20) return 'rgba(96, 165, 250, 0.8)';
                    if (num <= 30) return 'rgba(248, 113, 113, 0.8)';
                    if (num <= 40) return 'rgba(156, 163, 175, 0.8)';
                    return 'rgba(52, 211, 153, 0.8)';
                }),
                borderColor: numbers.map(num => {
                    if (num <= 10) return 'rgb(245, 158, 11)';
                    if (num <= 20) return 'rgb(59, 130, 246)';
                    if (num <= 30) return 'rgb(239, 68, 68)';
                    if (num <= 40) return 'rgb(107, 114, 128)';
                    return 'rgb(16, 185, 129)';
                }),
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '번호별 출현 빈도',
                color: '#ffffff',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 39, 64, 0.9)',
                titleColor: '#ffffff',
                bodyColor: '#a8b3cf',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `출현: ${context.parsed.y}회`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#a8b3cf',
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#a8b3cf'
                }
            }
        }
    };

    return (
        <div style={{ height: '400px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default FrequencyChart;
