import { Investment } from "../../../app/pages/revenue/types";
import { ReportsTabProps } from "./types";

export default function ReportsTab({ summary }: ReportsTabProps) {
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
        Relatórios de Performance
      </h2>

      <div className="space-y-6">
        {/* Performance por Tipo */}
        <div>
          <h3 className="text-md font-semibold text-primary mb-4">
            Performance por Tipo de Ativo
          </h3>
          <div className="space-y-3">
            {Object.entries(summary.byType).map(([type, data]) => (
              <div key={type} className="glass-subtle p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${getTypeColor(
                        type as Investment["type"]
                      )}`}
                    >
                      {type}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      R${" "}
                      {data.currentValue.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      data.gain >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {data.gain >= 0 ? "+" : ""}R$ {data.gain.toFixed(2)} (
                    {data.gainPercent >= 0 ? "+" : ""}
                    {data.gainPercent.toFixed(2)}%)
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="mt-3 bg-dark-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (data.currentValue / summary.currentValue) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
