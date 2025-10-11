import PortfolioDistribution from "../portfolio-distribution";
import InvestmentGoals from "../investment-goals";
import UpcomingActions from "../upcoming-actions";
import { InvestmentSummary } from "../../../app/pages/revenue/types";

interface RevenueSidebarProps {
  summary: InvestmentSummary;
}

export default function RevenueSidebar({ summary }: RevenueSidebarProps) {
  return (
    <div className="space-y-6">
      <PortfolioDistribution summary={summary} />
      <InvestmentGoals currentValue={summary.currentValue} />
      <UpcomingActions />
    </div>
  );
}
