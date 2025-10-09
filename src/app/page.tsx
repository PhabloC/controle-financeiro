export default function Home() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">
          💰 Bem-vindo ao Controle Financeiro
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de receita */}
          <div className="card-glass-light rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Receita Total
              </h2>
              <div className="w-12 h-12 glass-accent rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">R$ 25.430,00</p>
            <p className="text-sm text-muted mt-2">↗️ +12.5% este mês</p>
          </div>

          {/* Card de despesas */}
          <div className="card-glass-light rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">Despesas</h2>
              <div className="w-12 h-12 glass-subtle rounded-lg flex items-center justify-center">
                <span className="text-2xl">📉</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-red-400">R$ 15.250,00</p>
            <p className="text-sm text-muted mt-2">↘️ -3.2% este mês</p>
          </div>

          {/* Card de saldo */}
          <div className="card-glass-medium rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">Saldo</h2>
              <div className="w-12 h-12 glass-accent rounded-lg flex items-center justify-center animate-liquid">
                <span className="text-2xl">💎</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">R$ 10.180,00</p>
            <p className="text-sm text-muted mt-2">💰 Lucro líquido</p>
          </div>
        </div>
      </div>
    </div>
  );
}
