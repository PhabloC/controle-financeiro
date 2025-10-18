import { Investment } from "../../../app/pages/revenue/types";
import { PortfolioDistributionProps } from "./types";

export default function PortfolioDistribution({
  summary,
}: PortfolioDistributionProps) {
  const getTypeColor = (type: Investment["type"]) => {
    const colors = {
      Ação: "bg-blue-500/20 text-blue-400",
      FII: "bg-orange-500/20 text-orange-400",
      "Renda Fixa": "bg-green-500/20 text-green-400",
      Cripto: "bg-yellow-500/20 text-yellow-400",
      Internacional: "bg-purple-500/20 text-purple-400",
    };
    return colors[type];
  };

  return (
    <div className="card-glass-light p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Distribuição do Portfólio
      </h3>
      <div className="space-y-3">
        {Object.entries(summary.byType).map(([type, data]) => {
          const percentage = (data.currentValue / summary.currentValue) * 100;
          return (
            <div key={type} className="flex justify-between items-center">
              <span
                className={`text-xs px-2 py-1 rounded ${getTypeColor(
                  type as Investment["type"]
                )}`}
              >
                {type}
              </span>
              <span className="text-sm font-medium text-primary">
                {percentage.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
