interface TradingAlertsProps {
  activeTab: string;
}

export default function TradingAlerts({ activeTab }: TradingAlertsProps) {
  const renderAlert = () => {
    switch (activeTab) {
      case "Ações":
        return (
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-xl text-white">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">⚡</span>
              <span className="text-sm font-medium">Alerta de Breakout</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              PETR4 rompeu resistência de R$ 32. Volume acima da média.
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Ver Análise
            </button>
          </div>
        );
      case "FIIs":
        return (
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-white">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">🏢</span>
              <span className="text-sm font-medium">Oportunidade FII</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              HGLG11 com DY de 8.5% e P/VP abaixo de 1.0. Boa oportunidade de
              compra.
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Analisar FII
            </button>
          </div>
        );
      case "Cripto":
        return (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl text-white">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">₿</span>
              <span className="text-sm font-medium">Alerta Cripto</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Bitcoin testando suporte de R$ 270k. Alta volatilidade esperada.
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Ver Gráfico
            </button>
          </div>
        );
      case "Internacional":
        return (
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-xl text-white">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">🌍</span>
              <span className="text-sm font-medium">Mercado Internacional</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              TSLA com forte alta de 5.25%. Setor de tecnologia em recuperação.
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Ver NYSE
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderAlert()}</>;
}
