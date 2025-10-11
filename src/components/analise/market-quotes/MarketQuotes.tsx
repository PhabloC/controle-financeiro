import {
  MarketData,
  FIIData,
  CryptoData,
  InternationalData,
} from "@/app/pages/analysis/types";

interface MarketQuotesProps {
  activeTab: string;
  fiiData: FIIData[];
  cryptoData: CryptoData[];
  internationalData: InternationalData[];
  filteredData: MarketData[];
}

export default function MarketQuotes({
  activeTab,
  fiiData,
  cryptoData,
  internationalData,
  filteredData,
}: MarketQuotesProps) {
  const renderStockQuote = (stock: MarketData) => (
    <div
      key={stock.symbol}
      className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-bold text-primary">{stock.symbol}</div>
            <div className="text-sm text-secondary">{stock.name}</div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              {stock.sector}
            </span>
          </div>
          <div className="text-xs text-muted mt-1">
            Vol: {stock.volume} • Cap: {stock.marketCap}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            R$ {stock.price.toFixed(2)}
          </div>
          <div
            className={`text-sm font-medium flex items-center justify-end ${
              stock.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="mr-1">{stock.change >= 0 ? "↗️" : "↘️"}</span>
            {stock.change >= 0 ? "+" : ""}R$ {stock.change.toFixed(2)} (
            {stock.changePercent >= 0 ? "+" : ""}
            {stock.changePercent}%)
          </div>
        </div>
      </div>
    </div>
  );

  const renderFIIQuote = (fii: FIIData) => (
    <div
      key={fii.symbol}
      className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-bold text-primary">{fii.symbol}</div>
            <div className="text-sm text-secondary">{fii.name}</div>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
              {fii.sector}
            </span>
          </div>
          <div className="text-xs text-muted mt-1">
            DY: {fii.dividendYield}% • P/VP: {fii.pvp}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            R$ {fii.price.toFixed(2)}
          </div>
          <div
            className={`text-sm font-medium flex items-center justify-end ${
              fii.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="mr-1">{fii.change >= 0 ? "↗️" : "↘️"}</span>
            {fii.change >= 0 ? "+" : ""}R$ {fii.change.toFixed(2)} (
            {fii.changePercent >= 0 ? "+" : ""}
            {fii.changePercent}%)
          </div>
        </div>
      </div>
    </div>
  );

  const renderCryptoQuote = (crypto: CryptoData) => (
    <div
      key={crypto.symbol}
      className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-bold text-primary">
              {crypto.symbol}
            </div>
            <div className="text-sm text-secondary">{crypto.name}</div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
              Cripto
            </span>
          </div>
          <div className="text-xs text-muted mt-1">
            Vol 24h: {crypto.volume24h} • Cap: {crypto.marketCap}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            R${" "}
            {crypto.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div
            className={`text-sm font-medium flex items-center justify-end ${
              crypto.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="mr-1">{crypto.change >= 0 ? "🚀" : "📉"}</span>
            {crypto.change >= 0 ? "+" : ""}R${" "}
            {crypto.change.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}{" "}
            ({crypto.changePercent >= 0 ? "+" : ""}
            {crypto.changePercent}%)
          </div>
        </div>
      </div>
    </div>
  );

  const renderInternationalQuote = (stock: InternationalData) => (
    <div
      key={stock.symbol}
      className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-bold text-primary">{stock.symbol}</div>
            <div className="text-sm text-secondary">{stock.name}</div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
              {stock.exchange}
            </span>
          </div>
          <div className="text-xs text-muted mt-1">Moeda: {stock.currency}</div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            ${stock.price.toFixed(2)}
          </div>
          <div
            className={`text-sm font-medium flex items-center justify-end ${
              stock.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="mr-1">{stock.change >= 0 ? "↗️" : "↘️"}</span>
            {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)} (
            {stock.changePercent >= 0 ? "+" : ""}
            {stock.changePercent}%)
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-2 card-glass-medium p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">
          {activeTab} - Cotações em Tempo Real
        </h2>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Ao Vivo</span>
        </div>
      </div>

      <div className="space-y-3">
        {activeTab === "Ações" && filteredData.map(renderStockQuote)}
        {activeTab === "FIIs" && fiiData.map(renderFIIQuote)}
        {activeTab === "Cripto" && cryptoData.map(renderCryptoQuote)}
        {activeTab === "Internacional" &&
          internationalData.map(renderInternationalQuote)}
      </div>
    </div>
  );
}
