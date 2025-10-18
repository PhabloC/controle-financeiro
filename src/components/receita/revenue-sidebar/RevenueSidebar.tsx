import PortfolioDistribution from "../portfolio-distribution";
import InvestmentGoals from "../investment-goals";
import UpcomingActions from "../upcoming-actions";
import { RevenueSidebarProps } from "./types";

export default function RevenueSidebar({ summary }: RevenueSidebarProps) {
  return (
    <div className="space-y-6">
      <PortfolioDistribution summary={summary} />
      <InvestmentGoals currentValue={summary.currentValue} />
      <UpcomingActions />
    </div>
  );
}
