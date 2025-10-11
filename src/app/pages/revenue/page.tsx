"use client";

import { useState } from "react";
import { Investment, InvestmentSummary } from "./types";
import {
  RevenueHeader,
  FinancialSummary,
  NavigationTabs,
  PortfolioList,
  AddInvestmentForm,
  ReportsTab,
  RevenueSidebar,
} from "../../../components/receita";

export default function Revenue() {
  const [selectedTab, setSelectedTab] = useState("Portfolio");
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Petrobras PN",
      symbol: "PETR4",
      type: "Ação",
      quantity: 100,
      purchasePrice: 28.5,
      currentPrice: 32.45,
      purchaseDate: "2024-08-15",
      sector: "Energia",
    },
    {
      id: "2",
      name: "Vale ON",
      symbol: "VALE3",
      type: "Ação",
      quantity: 50,
      purchasePrice: 65.2,
      currentPrice: 68.72,
      purchaseDate: "2024-07-22",
      sector: "Mineração",
    },
    {
      id: "3",
      name: "CSHG Logística",
      symbol: "HGLG11",
      type: "FII",
      quantity: 20,
      purchasePrice: 145.0,
      currentPrice: 158.45,
      purchaseDate: "2024-06-10",
      sector: "Logística",
    },
    {
      id: "4",
      name: "Tesouro IPCA+ 2029",
      symbol: "TPCA29",
      type: "Renda Fixa",
      quantity: 1,
      purchasePrice: 15000.0,
      currentPrice: 15450.0,
      purchaseDate: "2024-05-20",
    },
    {
      id: "5",
      name: "Apple Inc.",
      symbol: "AAPL",
      type: "Internacional",
      quantity: 10,
      purchasePrice: 168.5,
      currentPrice: 175.45,
      purchaseDate: "2024-09-05",
      exchange: "NASDAQ",
    },
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: "",
    symbol: "",
    type: "Ação" as Investment["type"],
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  // Calcular resumo dos investimentos
  const calculateSummary = (): InvestmentSummary => {
    let totalInvested = 0;
    let currentValue = 0;
    const byType: InvestmentSummary["byType"] = {};

    investments.forEach((inv) => {
      const invested = inv.quantity * inv.purchasePrice;
      const current = inv.quantity * inv.currentPrice;

      totalInvested += invested;
      currentValue += current;

      if (!byType[inv.type]) {
        byType[inv.type] = {
          invested: 0,
          currentValue: 0,
          gain: 0,
          gainPercent: 0,
        };
      }

      byType[inv.type].invested += invested;
      byType[inv.type].currentValue += current;
    });

    // Calcular ganhos por tipo
    Object.keys(byType).forEach((type) => {
      const typeData = byType[type];
      typeData.gain = typeData.currentValue - typeData.invested;
      typeData.gainPercent =
        typeData.invested > 0 ? (typeData.gain / typeData.invested) * 100 : 0;
    });

    const totalGain = currentValue - totalInvested;
    const totalGainPercent =
      totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      totalGain,
      totalGainPercent,
      byType,
    };
  };

  const summary = calculateSummary();

  const handleAddInvestment = () => {
    if (
      newInvestment.name &&
      newInvestment.symbol &&
      newInvestment.quantity > 0 &&
      newInvestment.purchasePrice > 0
    ) {
      const investment: Investment = {
        id: Date.now().toString(),
        ...newInvestment,
        currentPrice: newInvestment.purchasePrice, // Inicialmente igual ao preço de compra
      };

      setInvestments([...investments, investment]);
      setNewInvestment({
        name: "",
        symbol: "",
        type: "Ação",
        quantity: 0,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString().split("T")[0],
      });
    }
  };

  const handleRemoveInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  const tabs = ["Portfolio", "Adicionar", "Relatórios"];

  return (
    <div className="p-6">
      <RevenueHeader onAddInvestmentClick={() => setSelectedTab("Adicionar")} />

      <FinancialSummary summary={summary} />

      <NavigationTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* Conteúdo das Abas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          {selectedTab === "Portfolio" && (
            <PortfolioList
              investments={investments}
              onRemoveInvestment={handleRemoveInvestment}
            />
          )}

          {selectedTab === "Adicionar" && (
            <AddInvestmentForm
              newInvestment={newInvestment}
              onInvestmentChange={setNewInvestment}
              onAddInvestment={handleAddInvestment}
            />
          )}

          {selectedTab === "Relatórios" && <ReportsTab summary={summary} />}
        </div>

        {/* Coluna Lateral */}
        <RevenueSidebar summary={summary} />
      </div>
    </div>
  );
}
