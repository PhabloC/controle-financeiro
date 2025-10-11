interface InvestmentGoalsProps {
  currentValue: number;
  targetValue?: number;
}

export default function InvestmentGoals({
  currentValue,
  targetValue = 210000,
}: InvestmentGoalsProps) {
  const progress = (currentValue / targetValue) * 100;

  return (
    <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-white">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">🎯</span>
        <span className="text-sm font-medium">Meta Anual 2025</span>
      </div>
      <div className="text-3xl font-bold mb-2">{progress.toFixed(1)}%</div>
      <p className="text-sm opacity-90 mb-4">
        R$ {currentValue.toLocaleString("pt-BR")} de R${" "}
        {targetValue.toLocaleString("pt-BR")} meta
      </p>
      <div className="bg-white/20 rounded-full h-2 mb-4">
        <div
          className="bg-white h-2 rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        ></div>
      </div>
      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
        Ajustar Meta
      </button>
    </div>
  );
}
