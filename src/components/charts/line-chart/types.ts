export interface LineChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  color?: string;
  showGrid?: boolean;
}
