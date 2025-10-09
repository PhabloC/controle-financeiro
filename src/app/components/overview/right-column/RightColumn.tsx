export default function RightColumn() {
  return (
    <div className="space-y-6">
      {/* Dividendos Recebidos */}
      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">
          Dividendos (Outubro)
        </h3>
        <div className="text-2xl font-bold text-primary mb-2">R$ 1.248</div>
        <div className="h-16 bg-dark-secondary rounded-lg mb-2 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-8 glass-accent rounded-lg"></div>
        </div>
        <p className="text-sm text-muted">� +12% vs mês anterior</p>
      </div>

      {/* Meta de Investimento */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm opacity-90">Meta Anual 2025</span>
          <button className="text-white hover:text-blue-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
        <div className="text-3xl font-bold mb-2">76%</div>
        <p className="text-sm opacity-90 mb-4">
          R$ 160.000 de R$ 210.000 investidos. Continue aportando para bater sua
          meta!
        </p>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Novo Aporte
        </button>
      </div>

      {/* Próximos Vencimentos */}
      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-4">
          Próximos Vencimentos
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-secondary">
                CDB Banco XYZ
              </p>
              <p className="text-xs text-muted">15/10/2025</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">R$ 25.000</p>
              <p className="text-xs text-green-500">+R$ 1.250</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-secondary">LCI Itaú</p>
              <p className="text-xs text-muted">22/10/2025</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">R$ 18.500</p>
              <p className="text-xs text-green-500">+R$ 920</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerta de Rebalanceamento */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6 rounded-xl text-white">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">⚠️</span>
          <span className="text-sm font-medium">Alerta de Portfólio</span>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Suas ações estão acima do target (30%). Considere rebalancear.
        </p>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Rebalancear
        </button>
      </div>
    </div>
  );
}
