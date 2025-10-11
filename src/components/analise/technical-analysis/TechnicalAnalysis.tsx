export default function TechnicalAnalysis() {
  return (
    <div className="card-glass-light p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Análise Técnica
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary">RSI (14)</span>
          <span className="text-sm font-medium text-primary">68.5</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary">MACD</span>
          <span className="text-sm font-medium text-green-400">Compra</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary">Médias Móveis</span>
          <span className="text-sm font-medium text-green-400">Bullish</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary">Volume</span>
          <span className="text-sm font-medium text-yellow-400">Normal</span>
        </div>
      </div>
    </div>
  );
}
