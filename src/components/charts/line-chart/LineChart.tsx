"use client";

import { LineChartProps } from "./types";

export default function LineChart({
  data,
  color = "#3B82F6",
  showGrid = true,
}: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-16 bg-dark-secondary rounded-lg flex items-center justify-center">
        <span className="text-sm text-muted">Sem dados disponíveis</span>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const range = maxValue - minValue || 1;

  // Gerar pontos da linha
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="h-16 bg-dark-secondary rounded-lg relative overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grade de fundo (opcional) */}
        {showGrid && (
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        )}

        {showGrid && <rect width="100" height="100" fill="url(#grid)" />}

        {/* Área preenchida abaixo da linha */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <polygon points={`0,100 ${points} 100,100`} fill="url(#areaGradient)" />

        {/* Linha principal */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pontos da linha */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((item.value - minValue) / range) * 100;

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="1.5"
                fill={color}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              {/* Tooltip invisível para hover */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="transparent"
                className="hover:fill-white hover:fill-opacity-10"
              >
                <title>{`${item.label}: R$ ${formatValue(item.value)}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Labels dos valores mín/máx */}
      <div className="absolute top-1 right-2 text-xs text-muted opacity-60">
        {formatValue(maxValue)}
      </div>
      <div className="absolute bottom-1 right-2 text-xs text-muted opacity-60">
        {formatValue(minValue)}
      </div>
    </div>
  );
}
