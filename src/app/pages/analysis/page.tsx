"use client";

import { useState, useEffect } from "react";

// Simulação de dados de mercado em tempo real
const generateRandomPrice = (basePrice: number, volatility = 0.02) => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
};

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
}

interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface FIIData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  dividendYield: number;
  pvp: number;
  sector: string;
}

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume24h: string;
}

interface InternationalData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  exchange: string;
}

export default function Analysis() {
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("Ações");
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: "PETR4",
      name: "Petrobras PN",
      price: 32.45,
      change: 0.85,
      changePercent: 2.69,
      volume: "R$ 2.1B",
      marketCap: "R$ 421.3B",
      sector: "Energia",
    },
    {
      symbol: "VALE3",
      name: "Vale ON",
      price: 68.72,
      change: -1.23,
      changePercent: -1.76,
      volume: "R$ 1.8B",
      marketCap: "R$ 324.1B",
      sector: "Mineração",
    },
    {
      symbol: "ITUB4",
      name: "Itaú Unibanco PN",
      price: 31.2,
      change: 0.45,
      changePercent: 1.46,
      volume: "R$ 987M",
      marketCap: "R$ 296.8B",
      sector: "Bancos",
    },
    {
      symbol: "BBDC4",
      name: "Bradesco PN",
      price: 13.85,
      change: -0.12,
      changePercent: -0.86,
      volume: "R$ 654M",
      marketCap: "R$ 128.4B",
      sector: "Bancos",
    },
    {
      symbol: "MGLU3",
      name: "Magazine Luiza ON",
      price: 8.42,
      change: 0.28,
      changePercent: 3.44,
      volume: "R$ 432M",
      marketCap: "R$ 55.8B",
      sector: "Varejo",
    },
    {
      symbol: "WEGE3",
      name: "WEG ON",
      price: 45.67,
      change: 1.12,
      changePercent: 2.51,
      volume: "R$ 298M",
      marketCap: "R$ 89.2B",
      sector: "Industriais",
    },
  ]);

  const [indices, setIndices] = useState<IndexData[]>([
    { name: "Ibovespa", value: 125840, change: 1250, changePercent: 1.0 },
    { name: "IBrX 100", value: 68450, change: -320, changePercent: -0.47 },
    { name: "Small Cap", value: 3240, change: 85, changePercent: 2.7 },
    { name: "IFIX", value: 2890, change: 12, changePercent: 0.42 },
  ]);

  const [fiiData, setFiiData] = useState<FIIData[]>([
    {
      symbol: "HGLG11",
      name: "CSHG Logística",
      price: 158.45,
      change: 2.15,
      changePercent: 1.37,
      dividendYield: 8.5,
      pvp: 0.95,
      sector: "Logística",
    },
    {
      symbol: "VISC11",
      name: "Vinci Shopping Centers",
      price: 89.2,
      change: -1.2,
      changePercent: -1.33,
      dividendYield: 9.2,
      pvp: 0.87,
      sector: "Shopping",
    },
    {
      symbol: "KNRI11",
      name: "Kinea Renda Imobiliária",
      price: 95.67,
      change: 0.45,
      changePercent: 0.47,
      dividendYield: 10.1,
      pvp: 0.92,
      sector: "Híbrido",
    },
    {
      symbol: "XPLG11",
      name: "XP Log",
      price: 112.3,
      change: 1.85,
      changePercent: 1.67,
      dividendYield: 7.8,
      pvp: 1.02,
      sector: "Logística",
    },
  ]);

  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 275840.5,
      change: 8420.3,
      changePercent: 3.15,
      marketCap: "R$ 5.4T",
      volume24h: "R$ 142B",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 13245.8,
      change: -245.6,
      changePercent: -1.82,
      marketCap: "R$ 1.6T",
      volume24h: "R$ 68B",
    },
    {
      symbol: "BNB",
      name: "BNB",
      price: 3120.45,
      change: 156.2,
      changePercent: 5.27,
      marketCap: "R$ 480B",
      volume24h: "R$ 8.2B",
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 785.3,
      change: 45.8,
      changePercent: 6.19,
      marketCap: "R$ 360B",
      volume24h: "R$ 12.5B",
    },
  ]);

  const [internationalData, setInternationalData] = useState<
    InternationalData[]
  >([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.45,
      change: 2.3,
      changePercent: 1.33,
      currency: "USD",
      exchange: "NASDAQ",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 342.8,
      change: -4.2,
      changePercent: -1.21,
      currency: "USD",
      exchange: "NASDAQ",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 138.95,
      change: 1.85,
      changePercent: 1.35,
      currency: "USD",
      exchange: "NASDAQ",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 248.6,
      change: 12.4,
      changePercent: 5.25,
      currency: "USD",
      exchange: "NASDAQ",
    },
  ]);

  // Simulação de atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((stock) => {
          const newPrice = generateRandomPrice(stock.price, 0.005);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          };
        })
      );

      setIndices((prev) =>
        prev.map((index) => {
          const newValue = generateRandomPrice(index.value, 0.002);
          const change = newValue - index.value;
          const changePercent = (change / index.value) * 100;

          return {
            ...index,
            value: Math.round(newValue),
            change: Math.round(change),
            changePercent: Number(changePercent.toFixed(2)),
          };
        })
      );

      // Atualizar FIIs
      setFiiData((prev) =>
        prev.map((fii) => {
          const newPrice = generateRandomPrice(fii.price, 0.008);
          const change = newPrice - fii.price;
          const changePercent = (change / fii.price) * 100;

          return {
            ...fii,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          };
        })
      );

      // Atualizar Criptomoedas
      setCryptoData((prev) =>
        prev.map((crypto) => {
          const newPrice = generateRandomPrice(crypto.price, 0.015);
          const change = newPrice - crypto.price;
          const changePercent = (change / crypto.price) * 100;

          return {
            ...crypto,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          };
        })
      );

      // Atualizar Investimentos Internacionais
      setInternationalData((prev) =>
        prev.map((stock) => {
          const newPrice = generateRandomPrice(stock.price, 0.006);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          };
        })
      );
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const categories = [
    "Todos",
    "Bancos",
    "Energia",
    "Mineração",
    "Varejo",
    "Industriais",
  ];
  const tabs = ["Ações", "FIIs", "Cripto", "Internacional"];

  const filteredData =
    selectedCategory === "Todos"
      ? marketData
      : marketData.filter((stock) => stock.sector === selectedCategory);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            📈 Análise de Mercado
          </h1>
          <p className="text-muted">
            Acompanhe as cotações em tempo real e análise técnica dos ativos
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
          >
            <option>1D</option>
            <option>5D</option>
            <option>1M</option>
            <option>3M</option>
            <option>1A</option>
          </select>
        </div>
      </div>

      {/* Índices Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {indices.map((index) => (
          <div key={index.name} className="card-glass-light p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted">{index.name}</h3>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {index.value.toLocaleString("pt-BR")}
            </div>
            <div
              className={`text-sm font-medium flex items-center ${
                index.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <span className="mr-1">{index.change >= 0 ? "↗️" : "↘️"}</span>
              {index.change >= 0 ? "+" : ""}
              {index.change.toLocaleString("pt-BR")} (
              {index.changePercent >= 0 ? "+" : ""}
              {index.changePercent}%)
            </div>
          </div>
        ))}
      </div>

      {/* Abas de Navegação */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary hover:scale-102"
            }`}
          >
            {tab === "FIIs" && "🏢"}
            {tab === "Cripto" && "₿"}
            {tab === "Internacional" && "🌍"}
            {tab === "Ações" && "📊"}
            <span className="ml-2">{tab}</span>
          </button>
        ))}
      </div>

      {/* Filtros (apenas para ações) */}
      {activeTab === "Ações" && (
        <div className="flex space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Cotações em Tempo Real */}
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
            {activeTab === "Ações" &&
              filteredData.map((stock) => (
                <div
                  key={stock.symbol}
                  className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-bold text-primary">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-secondary">
                          {stock.name}
                        </div>
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
                        <span className="mr-1">
                          {stock.change >= 0 ? "↗️" : "↘️"}
                        </span>
                        {stock.change >= 0 ? "+" : ""}R${" "}
                        {stock.change.toFixed(2)} (
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === "FIIs" &&
              fiiData.map((fii) => (
                <div
                  key={fii.symbol}
                  className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-bold text-primary">
                          {fii.symbol}
                        </div>
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
                        <span className="mr-1">
                          {fii.change >= 0 ? "↗️" : "↘️"}
                        </span>
                        {fii.change >= 0 ? "+" : ""}R$ {fii.change.toFixed(2)} (
                        {fii.changePercent >= 0 ? "+" : ""}
                        {fii.changePercent}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {activeTab === "Cripto" &&
              cryptoData.map((crypto) => (
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
                        <div className="text-sm text-secondary">
                          {crypto.name}
                        </div>
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
                        <span className="mr-1">
                          {crypto.change >= 0 ? "🚀" : "📉"}
                        </span>
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
              ))}

            {activeTab === "Internacional" &&
              internationalData.map((stock) => (
                <div
                  key={stock.symbol}
                  className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-bold text-primary">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-secondary">
                          {stock.name}
                        </div>
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                          {stock.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-muted mt-1">
                        Moeda: {stock.currency}
                      </div>
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
                        <span className="mr-1">
                          {stock.change >= 0 ? "↗️" : "↘️"}
                        </span>
                        {stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}{" "}
                        ({stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Análise e Alertas */}
        <div className="space-y-6">
          {/* Análise Técnica Rápida */}
          <div className="card-glass-light p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Análise Técnica
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">RSI (14)</span>
                <span className="text-sm font-medium text-primary">68.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">MACD</span>
                <span className="text-sm font-medium text-green-400">
                  Compra
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Médias Móveis</span>
                <span className="text-sm font-medium text-green-400">
                  Bullish
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary">Volume</span>
                <span className="text-sm font-medium text-yellow-400">
                  Normal
                </span>
              </div>
            </div>
          </div>

          {/* Principais Altas */}
          <div className="card-glass-light p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-primary mb-4">
              🚀 Maiores Altas - {activeTab}
            </h3>
            <div className="space-y-3">
              {activeTab === "Ações" &&
                marketData
                  .filter((stock) => stock.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
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
                        <div className="text-sm font-bold text-green-400">
                          +{stock.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
              {activeTab === "FIIs" &&
                fiiData
                  .filter((fii) => fii.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
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
                        <div className="text-xs text-muted">
                          DY: {fii.dividendYield}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">
                          +{fii.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
              {activeTab === "Cripto" &&
                cryptoData
                  .filter((crypto) => crypto.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
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
                        <div className="text-sm font-bold text-green-400">
                          +{crypto.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
              {activeTab === "Internacional" &&
                internationalData
                  .filter((stock) => stock.changePercent > 0)
                  .sort((a, b) => b.changePercent - a.changePercent)
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
                        <div className="text-xs text-muted">
                          {stock.exchange}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">
                          +{stock.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Principais Baixas */}
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
                        <div className="text-xs text-muted">
                          P/VP: {fii.pvp}
                        </div>
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
                        <div className="text-xs text-muted">
                          {stock.exchange}
                        </div>
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

          {/* Alertas de Trading Dinâmicos */}
          {activeTab === "Ações" && (
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">⚡</span>
                <span className="text-sm font-medium">Alerta de Breakout</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                PETR4 rompeu resistência de R$ 32. Volume acima da média.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ver Análise
              </button>
            </div>
          )}

          {activeTab === "FIIs" && (
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🏢</span>
                <span className="text-sm font-medium">Oportunidade FII</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                HGLG11 com DY de 8.5% e P/VP abaixo de 1.0. Boa oportunidade de
                compra.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Analisar FII
              </button>
            </div>
          )}

          {activeTab === "Cripto" && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">₿</span>
                <span className="text-sm font-medium">Alerta Cripto</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Bitcoin testando suporte de R$ 270k. Alta volatilidade esperada.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ver Gráfico
              </button>
            </div>
          )}

          {activeTab === "Internacional" && (
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-xl text-white">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🌍</span>
                <span className="text-sm font-medium">
                  Mercado Internacional
                </span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                TSLA com forte alta de 5.25%. Setor de tecnologia em
                recuperação.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ver NYSE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
