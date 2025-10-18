import { Investment } from "@/app/pages/revenue/types";

export interface PortfolioListProps {
  investments: Investment[];
  onRemoveInvestment: (id: string) => void;
  onEditInvestment: (investment: Investment) => void;
}
