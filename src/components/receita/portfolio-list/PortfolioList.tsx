import { Investment } from "../../../app/pages/revenue/types";
import { PortfolioListProps } from "./types";

export default function PortfolioList({
  investments,
  onRemoveInvestment,
  onEditInvestment,
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
        {investments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-primary mb-2">
              Nenhum investimento encontrado
            </h3>
            <p className="text-secondary mb-6">
              Comece adicionando seus primeiros investimentos para acompanhar
              sua carteira.
            </p>
          </div>
        ) : (
          investments.map((investment) => {
            const totalInvested =
              Number(investment.quantity) * Number(investment.purchasePrice);
            const currentValue =
              Number(investment.quantity) * Number(investment.currentPrice);
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
                      {Number(investment.purchasePrice).toFixed(2)} •{" "}
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

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditInvestment(investment)}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-colors"
                      title="Editar investimento"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onRemoveInvestment(investment.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Remover investimento"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
