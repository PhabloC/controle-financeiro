"use client";

import { useFinancial } from "@/contexts/FinancialContext";

export default function CardsMetrics() {
  const { metrics, loading } = useFinancial();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="card-glass-light p-6 rounded-xl animate-pulse"
          >
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const metricsData = [
    {
      title: "Patrimônio Total",
      value: formatCurrency(metrics.patrimonioTotal),
      subtitle: `${metrics.ganhoPercent >= 0 ? "+" : ""}${formatPercent(
        metrics.ganhoPercent
      )} vs investido`,
      type: "revenue",
    },
    {
      title: "Receita Mensal",
      value: formatCurrency(metrics.receitaMensal),
      subtitle: "Estimativa baseada em rendimentos",
      type: "arr",
    },
    {
      title: "Rentabilidade",
      value: formatPercent(metrics.rentabilidadeAnual),
      subtitle: `Ganho: ${formatCurrency(metrics.ganhoTotal)}`,
      type: "percentage",
    },
    {
      title: "Aportes do Mês",
      value: formatCurrency(metrics.aportesMes),
      subtitle: `Total investido: ${formatCurrency(metrics.totalInvestido)}`,
      type: "orders",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <div key={index} className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">
            {metric.title}
          </h3>
          <div className="text-2xl font-bold text-primary mb-1">
            {metric.value}
          </div>
          {metric.subtitle && (
            <p className="text-sm text-muted">{metric.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
