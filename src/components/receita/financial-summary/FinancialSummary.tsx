import { TargetIcon } from "@/svg";
import { FinancialSummaryProps } from "./types";

export default function FinancialSummary({ summary }: FinancialSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">Total Investido</h3>
        <div className="text-2xl font-bold text-primary mb-1">
          R${" "}
          {summary.totalInvested.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </div>
        <p className="text-sm text-blue-400">💼 Capital aplicado</p>
      </div>

      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">Valor Atual</h3>
        <div className="text-2xl font-bold text-primary mb-1">
          R${" "}
          {summary.currentValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </div>
        <p className="text-sm text-green-400">📈 Patrimônio atual</p>
      </div>

      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">Ganho Total</h3>
        <div
          className={`text-2xl font-bold mb-1 ${
            summary.totalGain >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {summary.totalGain >= 0 ? "+" : ""}R${" "}
          {summary.totalGain.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </div>
        <p
          className={`text-sm ${
            summary.totalGain >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {summary.totalGain >= 0 ? "🚀" : "📉"}{" "}
          {summary.totalGainPercent >= 0 ? "+" : ""}
          {summary.totalGainPercent.toFixed(2)}%
        </p>
      </div>

      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">Diversificação</h3>
        <div className="text-2xl font-bold text-primary mb-1">
          {Object.keys(summary.byType).length}
        </div>
        <p className="flex gap-2 items-center text-sm text-purple-400">
          <TargetIcon /> Tipos de ativos
        </p>
      </div>
    </div>
  );
}
