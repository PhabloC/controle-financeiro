export default function UpcomingActions() {
  return (
    <div className="card-glass-light p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Próximas Ações
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-secondary">
              Rebalanceamento
            </p>
            <p className="text-xs text-muted">Sugerido mensalmente</p>
          </div>
          <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
            Em breve
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-secondary">Aporte Mensal</p>
            <p className="text-xs text-muted">Meta: R$ 10.000</p>
          </div>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
            Pendente
          </span>
        </div>
      </div>
    </div>
  );
}
