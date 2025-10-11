import { InvestmentDataItem } from "./types";

const investmentData: InvestmentDataItem[] = [
  { label: "Renda Fixa", value: "40%", color: "#22c55e" },
  { label: "Ações", value: "25%", color: "#3b82f6" },
  { label: "Investimento Internacional", value: "15%", color: "#f59e0b" },
  { label: "Fundos Imobiliários", value: "12%", color: "#8b5cf6" },
  { label: "Criptomoeda", value: "8%", color: "#ef4444" },
];

const investmentValues = {
  "Renda Fixa": "R$ 85.000",
  Ações: "R$ 53.125",
  "Investimento Internacional": "R$ 31.875",
  "Fundos Imobiliários": "R$ 25.500",
  Criptomoeda: "R$ 17.000",
};

export default function ApplicationsOverview() {
  return (
    <div className="lg:col-span-2 card-glass-medium p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-primary">
          Portfólio de Investimentos
        </h2>
        <div className="flex space-x-2">
          <button className="text-sm text-muted hover:text-secondary transition-colors cursor-pointer px-3 py-1 rounded-md hover:bg-gray-700/20">
            Mensal
          </button>
          <button className="text-sm glass-accent px-3 py-1 rounded-md font-medium text-white cursor-pointer">
            Anual
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="relative h-64 bg-dark-secondary rounded-lg flex items-center justify-center mb-4">
        <div className="relative w-32 h-32 rounded-full border-8 glass-accent border-t-dark-tertiary flex items-center justify-center animate-liquid">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">R$ 212.500</div>
            <div className="text-sm text-muted">Patrimônio Total</div>
          </div>
        </div>
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
              <div className="text-sm font-medium text-primary">
                {investmentValues[item.label as keyof typeof investmentValues]}
              </div>
              <div className="text-xs text-muted">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
