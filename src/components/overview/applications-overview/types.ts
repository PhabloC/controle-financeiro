// Types para componentes do dashboard de investimentos

export interface InvestmentDataItem {
  label: string;
  value: string;
  color: string;
}

export interface InvestmentCategory {
  category: string;
  amount: number;
  percentage: string;
  color: string;
}

export interface PortfolioDistribution {
  asset: string;
  amount: number;
  percentage: string;
  color: string;
}
