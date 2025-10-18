"use client";

import { useState } from "react";
import { PieChartProps } from "./types";

export default function PieChart({ data }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + (item.amount || 0), 0);

  if (total === 0 || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full border-4 border-gray-600 border-dashed flex items-center justify-center">
            <span className="text-sm text-muted">Sem dados</span>
          </div>
        </div>
      </div>
    );
  }

  const size = 180;
  const center = size / 2;
  const radius = 65;
  const innerRadius = 25;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value.toFixed(0)}`;
  };

  let cumulativeAngle = 0;

  return (
    <div className="relative flex items-center justify-center h-full">
      <svg width={size} height={size} className="drop-shadow-sm">
        {/* Círculo de fundo */}
        <circle
          cx={center}
          cy={center}
          r={radius + 2}
          fill="none"
          stroke="#374151"
          strokeWidth="1"
          className="opacity-20"
        />

        {/* Círculo interno para criar efeito donut */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="#111827"
          className="drop-shadow-lg"
        />

        {data.map((item, index) => {
          const percentage = ((item.amount || 0) / total) * 100;
          if (percentage < 0.1) return null; // Não mostrar fatias muito pequenas

          const angle = (percentage / 100) * 360;
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;

          cumulativeAngle += angle;

          const isHovered = hoveredIndex === index;
          const currentRadius = isHovered ? radius + 8 : radius;

          const startAngleRad = (startAngle - 90) * (Math.PI / 180);
          const endAngleRad = (endAngle - 90) * (Math.PI / 180);

          const x1 = center + currentRadius * Math.cos(startAngleRad);
          const y1 = center + currentRadius * Math.sin(startAngleRad);
          const x2 = center + currentRadius * Math.cos(endAngleRad);
          const y2 = center + currentRadius * Math.sin(endAngleRad);

          const x1Inner = center + innerRadius * Math.cos(startAngleRad);
          const y1Inner = center + innerRadius * Math.sin(startAngleRad);
          const x2Inner = center + innerRadius * Math.cos(endAngleRad);
          const y2Inner = center + innerRadius * Math.sin(endAngleRad);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const pathData = [
            `M ${x1Inner} ${y1Inner}`,
            `L ${x1} ${y1}`,
            `A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x2Inner} ${y2Inner}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`,
            "Z",
          ].join(" ");

          return (
            <g key={index}>
              <path
                d={pathData}
                fill={item.color}
                stroke="#111827"
                strokeWidth="1"
                className="transition-all duration-300 cursor-pointer"
                style={{
                  filter: isHovered ? "brightness(1.2)" : "brightness(1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {isHovered && (
                <g className="pointer-events-none">
                  <foreignObject
                    x={center - 50}
                    y={center - 30}
                    width="100"
                    height="60"
                  >
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-700">
                      <div className="text-xs font-medium text-white mb-1">
                        {item.label}
                      </div>
                      <div className="text-xs text-blue-300">
                        {formatCurrency(item.amount || 0)}
                      </div>
                      <div className="text-xs text-gray-300">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  </foreignObject>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
