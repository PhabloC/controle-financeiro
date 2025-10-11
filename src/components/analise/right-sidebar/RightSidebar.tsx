import TechnicalAnalysis from "../technical-analysis/TechnicalAnalysis";
import TopGainers from "../top-gainers/TopGainers";
import TopLosers from "../top-losers/TopLosers";
import TradingAlerts from "../trading-alerts/TradingAlerts";
import {
  MarketData,
  FIIData,
  CryptoData,
  InternationalData,
} from "@/app/pages/analysis/types";

interface RightSidebarProps {
  activeTab: string;
  marketData: MarketData[];
  fiiData: FIIData[];
  cryptoData: CryptoData[];
  internationalData: InternationalData[];
}

export default function RightSidebar({
  activeTab,
  marketData,
  fiiData,
  cryptoData,
  internationalData,
}: RightSidebarProps) {
  return (
    <div className="space-y-6">
      <TechnicalAnalysis />

      <TopGainers
        activeTab={activeTab}
        marketData={marketData}
        fiiData={fiiData}
        cryptoData={cryptoData}
        internationalData={internationalData}
      />

      <TopLosers
        activeTab={activeTab}
        marketData={marketData}
        fiiData={fiiData}
        cryptoData={cryptoData}
        internationalData={internationalData}
      />

      <TradingAlerts activeTab={activeTab} />
    </div>
  );
}
