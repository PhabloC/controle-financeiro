interface AnalysisHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export default function AnalysisHeader({
  selectedPeriod,
  onPeriodChange,
}: AnalysisHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          📈 Análise de Mercado
        </h1>
        <p className="text-muted">
          Acompanhe as cotações em tempo real e análise técnica dos ativos
        </p>
      </div>
      <div className="flex space-x-3">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="px-4 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
        >
          <option>1D</option>
          <option>5D</option>
          <option>1M</option>
          <option>3M</option>
          <option>1A</option>
        </select>
      </div>
    </div>
  );
}
