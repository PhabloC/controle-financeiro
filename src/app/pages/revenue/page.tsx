"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Ativo, NovoAtivo, Investment, InvestmentSummary } from "./types";
import { useFinancial } from "../../../contexts/FinancialContext";
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
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "Portfolio";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingAtivo, setEditingAtivo] = useState<Ativo | null>(null);

  // Atualizar tab quando a query string mudar
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["Portfolio", "Adicionar", "Relatórios"].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const { ativos, error, adicionarAtivo, editarAtivo, removerAtivo } =
    useFinancial();

  // Converter ativos do Supabase para formato dos componentes existentes
  const investments: Investment[] = useMemo(() => {
    return ativos.map((ativo) => ({
      id: ativo.id?.toString() || "",
      name: ativo.nome_ativo,
      symbol: ativo.nome_ativo.substring(0, 6).toUpperCase(),
      type: ativo.tipo,
      quantity: Number(ativo.quantidade) || 0,
      purchasePrice: Number(ativo.preco_medio) || 0,
      currentPrice: Number(ativo.preco_medio) || 0, // Por enquanto, mesmo valor
      purchaseDate: ativo.criado_em
        ? new Date(ativo.criado_em).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    }));
  }, [ativos]);

  // Calcular resumo dos investimentos no formato dos componentes existentes
  const summary: InvestmentSummary = useMemo(() => {
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
  }, [investments]);

  // Estados para o formulário de adição (compatibilidade com componentes existentes)
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    symbol: "",
    type: "Ação" as Investment["type"],
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split("T")[0],
  });

  const showSuccessMsg = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Funções para trabalhar com o formulário de investimento existente
  const handleAddInvestment = async () => {
    if (
      newInvestment.name.trim() &&
      newInvestment.quantity > 0 &&
      newInvestment.purchasePrice > 0
    ) {
      const novoAtivo: NovoAtivo = {
        user_id: "", // Será preenchido pelo hook
        nome_ativo: newInvestment.name.trim(),
        tipo: newInvestment.type,
        quantidade: newInvestment.quantity,
        preco_medio: newInvestment.purchasePrice,
      };

      const sucesso = await adicionarAtivo(novoAtivo);
      if (sucesso) {
        setNewInvestment({
          name: "",
          symbol: "",
          type: "Ação",
          quantity: 0,
          purchasePrice: 0,
          purchaseDate: new Date().toISOString().split("T")[0],
        });
        showSuccessMsg("Investimento adicionado com sucesso!");
        setSelectedTab("Portfolio");
      }
    }
  };

  const handleEditInvestment = (investment: Investment) => {
    // Encontrar o ativo correspondente
    const ativo = ativos.find((a) => a.id?.toString() === investment.id);
    if (ativo) {
      setEditingAtivo(ativo);
      setNewInvestment({
        name: investment.name,
        symbol: investment.symbol,
        type: investment.type,
        quantity: investment.quantity,
        purchasePrice: investment.purchasePrice,
        purchaseDate: investment.purchaseDate,
      });
      setSelectedTab("Adicionar");
    }
  };

  const handleUpdateInvestment = async () => {
    if (
      editingAtivo &&
      editingAtivo.id &&
      newInvestment.name.trim() &&
      newInvestment.quantity > 0 &&
      newInvestment.purchasePrice > 0
    ) {
      const ativoAtualizado: Partial<NovoAtivo> = {
        nome_ativo: newInvestment.name.trim(),
        tipo: newInvestment.type,
        quantidade: newInvestment.quantity,
        preco_medio: newInvestment.purchasePrice,
      };

      const sucesso = await editarAtivo(editingAtivo.id, ativoAtualizado);
      if (sucesso) {
        setEditingAtivo(null);
        setNewInvestment({
          name: "",
          symbol: "",
          type: "Ação",
          quantity: 0,
          purchasePrice: 0,
          purchaseDate: new Date().toISOString().split("T")[0],
        });
        showSuccessMsg("Investimento atualizado com sucesso!");
        setSelectedTab("Portfolio");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingAtivo(null);
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

  const handleRemoveInvestment = async (id: string) => {
    const ativo = ativos.find((a) => a.id?.toString() === id);
    if (ativo && ativo.id) {
      const sucesso = await removerAtivo(ativo.id);
      if (sucesso) {
        showSuccessMsg("Investimento removido com sucesso!");
      }
    }
  };

  // Converter ativo para formato de edição do componente existente
  const editingInvestment = editingAtivo
    ? {
        id: editingAtivo.id?.toString() || "",
        name: editingAtivo.nome_ativo,
        symbol: editingAtivo.nome_ativo.substring(0, 6).toUpperCase(),
        type: editingAtivo.tipo,
        quantity: editingAtivo.quantidade,
        purchasePrice: editingAtivo.preco_medio,
        currentPrice: editingAtivo.preco_medio,
        purchaseDate: editingAtivo.criado_em
          ? new Date(editingAtivo.criado_em).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      }
    : null;

  const tabs = ["Portfolio", "Adicionar", "Relatórios"];

  return (
    <div className="p-6">
      <RevenueHeader onAddInvestmentClick={() => setSelectedTab("Adicionar")} />

      <FinancialSummary summary={summary} />

      {/* Mensagem de Erro */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-red-400">✕</span>
            <span className="text-red-400 font-medium">{error}</span>
          </div>
        </div>
      )}

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
