"use client";

import { useState } from "react";
import { useFinancial } from "@/contexts/FinancialContext";
import { InvestmentDataItem } from "./types";

const colorMap: { [key: string]: string } = {
  "Renda Fixa": "#22c55e",
  Ação: "#3b82f6",
  FII: "#8b5cf6",
  Cripto: "#ef4444",
  Internacional: "#f59e0b",
  Outros: "#6b7280",
};

// Componente de gráfico de pizza
const PieChart = ({ data }: { data: InvestmentDataItem[] }) => {
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
};

// Componente de gráfico de barras (evolução do patrimônio)
const BarChart = ({
  centerValue,
  centerLabel,
  currentValue,
}: {
  centerValue: string;
  centerLabel: string;
  currentValue: number;
}) => {
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
};

export default function ApplicationsOverview() {
  const { metrics, loading } = useFinancial();
  const [selectedPeriod, setSelectedPeriod] = useState<"mensal" | "anual">(
    "anual"
  );

  if (loading) {
    return (
      <div className="lg:col-span-2 card-glass-medium p-6 rounded-xl animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-6 w-48"></div>
        <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-6 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Calcular valores baseados no período selecionado
  const getDisplayData = () => {
    if (selectedPeriod === "mensal") {
      return {
        mainValue: metrics.receitaMensal,
        mainLabel: "Receita Mensal",
        showPercentages: false,
      };
    } else {
      return {
        mainValue: metrics.patrimonioTotal,
        mainLabel: "Patrimônio Total",
        showPercentages: true,
      };
    }
  };

  const displayData = getDisplayData();

  // Converter dados da distribuição para o formato do componente
  const investmentData: InvestmentDataItem[] = [];

  if (metrics.distribuicaoPorTipo && displayData.showPercentages) {
    const total = Object.values(metrics.distribuicaoPorTipo).reduce(
      (sum, item) => sum + item.valorTotal,
      0
    );

    Object.entries(metrics.distribuicaoPorTipo).forEach(([tipo, data]) => {
      const percentage =
        total > 0 ? ((data.valorTotal / total) * 100).toFixed(1) : "0.0";
      investmentData.push({
        label: tipo,
        value: `${percentage}%`,
        color: colorMap[tipo] || colorMap["Outros"],
        amount: data.valorTotal,
      });
    });
  } else if (metrics.distribuicaoPorTipo && !displayData.showPercentages) {
    // Para visão mensal, mostrar receita estimada por tipo
    Object.entries(metrics.distribuicaoPorTipo).forEach(([tipo, data]) => {
      // Estimativa de receita mensal por tipo
      const percentualMensal =
        tipo === "FII" ? 0.01 : tipo === "Ação" ? 0.008 : 0.005;
      const receitaTipo = data.valorTotal * percentualMensal;

      investmentData.push({
        label: tipo,
        value: formatCurrency(receitaTipo),
        color: colorMap[tipo] || colorMap["Outros"],
        amount: receitaTipo,
      });
    });
  }

  return (
    <div className="lg:col-span-2 card-glass-medium p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-primary">
          Portfólio de Investimentos
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPeriod("mensal")}
            className={`text-sm transition-colors cursor-pointer px-3 py-1 rounded-md ${
              selectedPeriod === "mensal"
                ? "glass-accent font-medium text-white"
                : "text-muted hover:text-secondary hover:bg-gray-700/20"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setSelectedPeriod("anual")}
            className={`text-sm transition-colors cursor-pointer px-3 py-1 rounded-md ${
              selectedPeriod === "anual"
                ? "glass-accent font-medium text-white"
                : "text-muted hover:text-secondary hover:bg-gray-700/20"
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 mb-4 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted mb-1">
              {displayData.mainLabel}
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(displayData.mainValue)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted mb-1">
              {selectedPeriod === "anual" ? "Rentabilidade" : "Aportes do Mês"}
            </div>
            <div className="text-lg font-semibold text-green-400">
              {selectedPeriod === "anual"
                ? `${
                    metrics.ganhoPercent > 0 ? "+" : ""
                  }${metrics.ganhoPercent.toFixed(2)}%`
                : formatCurrency(metrics.aportesMes)}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 bg-dark-secondary rounded-lg mb-4">
        {selectedPeriod === "anual" ? (
          <PieChart data={investmentData} />
        ) : (
          <BarChart
            centerValue={formatCurrency(displayData.mainValue)}
            centerLabel={displayData.mainLabel}
            currentValue={displayData.mainValue}
          />
        )}
      </div>

      <div className="space-y-3">
        {investmentData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-secondary">{item.label}</span>
            </div>
            <div className="text-right">
              {displayData.showPercentages ? (
                <>
                  <div className="text-sm font-medium text-primary">
                    {item.amount ? formatCurrency(item.amount) : "R$ 0,00"}
                  </div>
                  <div className="text-xs text-muted">{item.value}</div>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium text-primary">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted">receita/mês</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
