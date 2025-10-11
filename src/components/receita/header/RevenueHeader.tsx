interface RevenueHeaderProps {
  onAddInvestmentClick: () => void;
}

export default function RevenueHeader({
  onAddInvestmentClick,
}: RevenueHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          💰 Gestão de Receitas
        </h1>
        <p className="text-muted">
          Gerencie seus investimentos e acompanhe sua rentabilidade
        </p>
      </div>
      <button
        onClick={onAddInvestmentClick}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 cursor-pointer"
      >
        <span>➕</span>
        <span>Novo Investimento</span>
      </button>
    </div>
  );
}
