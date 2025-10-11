"use client";

import { useState, useEffect } from "react";
import { CryptoData, FIIData, InternationalData, MarketData } from "./types";
import MainIndices from "@/components/analise/main-indices/MainIndices";
import AnalysisHeader from "@/components/analise/analysis-header";
import MarketTabs from "@/components/analise/market-tabs";
import CategoryFilter from "@/components/analise/category-filter";
import MarketQuotes from "@/components/analise/market-quotes";
import RightSidebar from "@/components/analise/right-sidebar";

// Simulação de dados de mercado em tempo real
const generateRandomPrice = (basePrice: number, volatility = 0.02) => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
};

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

  const filteredData =
    selectedCategory === "Todos"
      ? marketData
      : marketData.filter((stock) => stock.sector === selectedCategory);

  return (
    <div className="p-6">
      <AnalysisHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <MainIndices />

      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        show={activeTab === "Ações"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MarketQuotes
          activeTab={activeTab}
          fiiData={fiiData}
          cryptoData={cryptoData}
          internationalData={internationalData}
          filteredData={filteredData}
        />

        <RightSidebar
          activeTab={activeTab}
          marketData={marketData}
          fiiData={fiiData}
          cryptoData={cryptoData}
          internationalData={internationalData}
        />
      </div>
    </div>
  );
}
