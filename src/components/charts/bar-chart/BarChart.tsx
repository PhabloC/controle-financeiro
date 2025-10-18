"use client";

import { BarChartProps } from "./types";

export default function BarChart({
  centerValue,
  centerLabel,
  currentValue,
}: BarChartProps) {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  // Simular evolução baseada no valor atual
  const generateEvolution = (current: number) => {
    const values = [];
    let base = current * 0.4; // Começar com 40% do valor atual

    for (let i = 0; i < 6; i++) {
      if (i === 5) {
        values.push(current); // Último mês é o valor atual
      } else {
        base = base * (1 + Math.random() * 0.15 + 0.05); // Crescimento entre 5% e 20%
        values.push(base);
      }
    }
    return values;
  };

  const values = generateEvolution(currentValue);
  const maxValue = Math.max(...values);

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mb-4">
        <div className="text-xl font-bold text-primary">{centerValue}</div>
        <div className="text-sm text-muted">{centerLabel}</div>
        <div className="text-xs text-muted mt-1">Últimos 6 meses</div>
      </div>

      <div className="flex items-end justify-center space-x-3 h-32">
        {values.map((value, index) => {
          const height = (value / maxValue) * 80 + 10; // Mínimo de 10px
          const isCurrentMonth = index === values.length - 1;

          return (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative">
                <div
                  className={`w-6 rounded-t transition-all duration-300 hover:opacity-80 ${
                    isCurrentMonth
                      ? "bg-gradient-to-t from-green-600 to-green-400"
                      : "bg-gradient-to-t from-blue-600 to-blue-400"
                  }`}
                  style={{ height: `${height}px` }}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  R$ {formatValue(value)}
                </div>
              </div>
              <span className="text-xs text-muted mt-2">{months[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
