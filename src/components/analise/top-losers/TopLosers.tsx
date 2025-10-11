import {
  MarketData,
  FIIData,
  CryptoData,
  InternationalData,
} from "@/app/pages/analysis/types";

interface TopLosersProps {
  activeTab: string;
  marketData: MarketData[];
  fiiData: FIIData[];
  cryptoData: CryptoData[];
  internationalData: InternationalData[];
}

export default function TopLosers({
  activeTab,
  marketData,
  fiiData,
  cryptoData,
  internationalData,
}: TopLosersProps) {
  return (
    <div className="card-glass-light p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-primary mb-4">
        📉 Maiores Baixas - {activeTab}
      </h3>
      <div className="space-y-3">
        {activeTab === "Ações" &&
          marketData
            .filter((stock) => stock.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 3)
            .map((stock) => (
              <div
                key={stock.symbol}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium text-primary">
                    {stock.symbol}
                  </div>
                  <div className="text-xs text-muted">{stock.sector}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">
                    {stock.changePercent}%
                  </div>
                </div>
              </div>
            ))}
        {activeTab === "FIIs" &&
          fiiData
            .filter((fii) => fii.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 3)
            .map((fii) => (
              <div
                key={fii.symbol}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium text-primary">
                    {fii.symbol}
                  </div>
                  <div className="text-xs text-muted">P/VP: {fii.pvp}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">
                    {fii.changePercent}%
                  </div>
                </div>
              </div>
            ))}
        {activeTab === "Cripto" &&
          cryptoData
            .filter((crypto) => crypto.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 3)
            .map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium text-primary">
                    {crypto.symbol}
                  </div>
                  <div className="text-xs text-muted">{crypto.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">
                    {crypto.changePercent}%
                  </div>
                </div>
              </div>
            ))}
        {activeTab === "Internacional" &&
          internationalData
            .filter((stock) => stock.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 3)
            .map((stock) => (
              <div
                key={stock.symbol}
                className="flex justify-between items-center"
              >
                <div>
                  <div className="text-sm font-medium text-primary">
                    {stock.symbol}
                  </div>
                  <div className="text-xs text-muted">{stock.exchange}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-400">
                    {stock.changePercent}%
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
