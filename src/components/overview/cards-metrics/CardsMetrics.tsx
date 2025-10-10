const metrics = [
  {
    title: "Patrimônio Total",
    value: "R$ 212.500",
    subtitle: "+15.2% vs mês anterior",
    type: "revenue",
  },
  {
    title: "Receita Mensal",
    value: "R$ 25.430",
    subtitle: "+12.5% vs mês anterior",
    type: "arr",
  },
  {
    title: "Rentabilidade Anual",
    value: "18.5%",
    subtitle: "Acima da meta de 15%",
    type: "percentage",
  },
  {
    title: "Aportes do Mês",
    value: "R$ 8.500",
    subtitle: "Meta: R$ 10.000",
    type: "orders",
  },
];

export default function CardsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">
            {metric.title}
          </h3>
          <div className="text-2xl font-bold text-primary mb-1">
            {metric.value}
          </div>
          {metric.subtitle && (
            <p className="text-sm text-muted">{metric.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
