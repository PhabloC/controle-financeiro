const metrics = [
  {
    title: "Total Investido",
    value: "$3,131,021",
    subtitle: "42.5% vs last month",
    type: "revenue",
  },
  {
    title: "Rentabilidade Mensal",
    value: "$1,511,121",
    subtitle: "10% vs last month",
    type: "arr",
  },
  {
    title: "Rentabilidade Anual",
    value: "71%",
    subtitle: "",
    type: "percentage",
  },
  {
    title: "Aportes do Mês",
    value: "18,221",
    subtitle: "3% vs last week",
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
