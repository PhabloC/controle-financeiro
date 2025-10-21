import { RevenueHeaderProps } from "./types";

export default function RevenueHeader({}: RevenueHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          Gestão de Receitas
        </h1>
        <p className="text-muted">
          Gerencie seus investimentos e acompanhe sua rentabilidade
        </p>
      </div>
    </div>
  );
}
