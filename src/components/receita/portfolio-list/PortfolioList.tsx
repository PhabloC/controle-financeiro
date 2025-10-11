import { Investment } from "../../../app/pages/revenue/types";

interface PortfolioListProps {
  investments: Investment[];
  onRemoveInvestment: (id: string) => void;
}

export default function PortfolioList({
  investments,
  onRemoveInvestment,
}: PortfolioListProps) {
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
    <div className="card-glass-medium p-6 rounded-xl">
      <h2 className="text-lg font-semibold text-primary mb-6">
        Meus Investimentos
      </h2>

      <div className="space-y-4">
        {investments.map((investment) => {
          const totalInvested = investment.quantity * investment.purchasePrice;
          const currentValue = investment.quantity * investment.currentPrice;
          const gain = currentValue - totalInvested;
          const gainPercent =
            totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

          return (
            <div
              key={investment.id}
              className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-sm font-bold text-primary">
                      {investment.symbol}
                    </div>
                    <div className="text-sm text-secondary">
                      {investment.name}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getTypeColor(
                        investment.type
                      )}`}
                    >
                      {investment.type}
                    </span>
                  </div>
                  <div className="text-xs text-muted">
                    {investment.quantity} cotas • Compra: R${" "}
                    {investment.purchasePrice.toFixed(2)} •{" "}
                    {investment.purchaseDate}
                  </div>
                </div>

                <div className="text-right mr-4">
                  <div className="text-lg font-bold text-primary">
                    R${" "}
                    {currentValue.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      gain >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {gain >= 0 ? "+" : ""}R$ {gain.toFixed(2)} (
                    {gainPercent >= 0 ? "+" : ""}
                    {gainPercent.toFixed(2)}%)
                  </div>
                </div>

                <button
                  onClick={() => onRemoveInvestment(investment.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
