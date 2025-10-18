export interface InvestmentDataItem {
  label: string;
  value: string;
  color: string;
  amount?: number;
}

export interface PieChartProps {
  data: InvestmentDataItem[];
}
