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
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(
    null
  );

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
      newInvestment.name.trim() &&
      newInvestment.symbol.trim() &&
      newInvestment.quantity > 0 &&
      newInvestment.purchasePrice > 0
    ) {
      const investment: Investment = {
        id: Date.now().toString(),
        ...newInvestment,
        name: newInvestment.name.trim(),
        symbol: newInvestment.symbol.trim().toUpperCase(),
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

      // Mostrar mensagem de sucesso e voltar para o Portfolio
      setSuccessMessage("Investimento adicionado com sucesso!");
      setShowSuccessMessage(true);
      setSelectedTab("Portfolio");

      // Ocultar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment);
    setNewInvestment({
      name: investment.name,
      symbol: investment.symbol,
      type: investment.type,
      quantity: investment.quantity,
      purchasePrice: investment.purchasePrice,
      purchaseDate: investment.purchaseDate,
    });
    setSelectedTab("Adicionar");
  };

  const handleUpdateInvestment = () => {
    if (
      editingInvestment &&
      newInvestment.name.trim() &&
      newInvestment.symbol.trim() &&
      newInvestment.quantity > 0 &&
      newInvestment.purchasePrice > 0
    ) {
      const updatedInvestment: Investment = {
        ...editingInvestment,
        name: newInvestment.name.trim(),
        symbol: newInvestment.symbol.trim().toUpperCase(),
        type: newInvestment.type,
        quantity: newInvestment.quantity,
        purchasePrice: newInvestment.purchasePrice,
        purchaseDate: newInvestment.purchaseDate,
      };

      setInvestments(
        investments.map((inv) =>
          inv.id === editingInvestment.id ? updatedInvestment : inv
        )
      );

      // Limpar estado de edição
      setEditingInvestment(null);
      setNewInvestment({
        name: "",
        symbol: "",
        type: "Ação",
        quantity: 0,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString().split("T")[0],
      });

      // Mostrar mensagem de sucesso e voltar para o Portfolio
      setSuccessMessage("Investimento atualizado com sucesso!");
      setShowSuccessMessage(true);
      setSelectedTab("Portfolio");

      // Ocultar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingInvestment(null);
    setNewInvestment({
      name: "",
      symbol: "",
      type: "Ação",
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split("T")[0],
    });
    setSelectedTab("Portfolio");
  };

  const handleRemoveInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  const tabs = ["Portfolio", "Adicionar", "Relatórios"];

  return (
    <div className="p-6">
      <RevenueHeader onAddInvestmentClick={() => setSelectedTab("Adicionar")} />

      <FinancialSummary summary={summary} />

      {/* Mensagem de Sucesso */}
      {showSuccessMessage && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-green-400 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

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
              onEditInvestment={handleEditInvestment}
            />
          )}

          {selectedTab === "Adicionar" && (
            <AddInvestmentForm
              newInvestment={newInvestment}
              onInvestmentChange={setNewInvestment}
              onAddInvestment={handleAddInvestment}
              onUpdateInvestment={handleUpdateInvestment}
              onCancelEdit={handleCancelEdit}
              editingInvestment={editingInvestment}
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
