"use client";

import { useState } from "react";
import { Investment, InvestmentSummary } from "./types";

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
      setShowAddModal(false);
    }
  };

  const handleRemoveInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  const tabs = ["Portfolio", "Adicionar", "Relatórios"];

  const getTypeColor = (type: Investment["type"]) => {
    const colors = {
      Ação: "bg-blue-500/20 text-blue-400",
      FII: "bg-orange-500/20 text-orange-400",
      "Renda Fixa": "bg-green-500/20 text-green-400",
      Cripto: "bg-yellow-500/20 text-yellow-400",
      Internacional: "bg-purple-500/20 text-purple-400",
    };
    return colors[type];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            💰 Gestão de Receitas
          </h1>
          <p className="text-muted">
            Gerencie seus investimentos e acompanhe sua rentabilidade
          </p>
        </div>
        <button
          onClick={() => setSelectedTab("Adicionar")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Novo Investimento</span>
        </button>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">
            Total Investido
          </h3>
          <div className="text-2xl font-bold text-primary mb-1">
            R${" "}
            {summary.totalInvested.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-sm text-blue-400">💼 Capital aplicado</p>
        </div>

        <div className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">Valor Atual</h3>
          <div className="text-2xl font-bold text-primary mb-1">
            R${" "}
            {summary.currentValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-sm text-green-400">📈 Patrimônio atual</p>
        </div>

        <div className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">Ganho Total</h3>
          <div
            className={`text-2xl font-bold mb-1 ${
              summary.totalGain >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {summary.totalGain >= 0 ? "+" : ""}R${" "}
            {summary.totalGain.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
          <p
            className={`text-sm ${
              summary.totalGain >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {summary.totalGain >= 0 ? "🚀" : "📉"}{" "}
            {summary.totalGainPercent >= 0 ? "+" : ""}
            {summary.totalGainPercent.toFixed(2)}%
          </p>
        </div>

        <div className="card-glass-light p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted mb-2">
            Diversificação
          </h3>
          <div className="text-2xl font-bold text-primary mb-1">
            {Object.keys(summary.byType).length}
          </div>
          <p className="text-sm text-purple-400">🎯 Tipos de ativos</p>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedTab === tab
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          {selectedTab === "Portfolio" && (
            <div className="card-glass-medium p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-primary mb-6">
                Meus Investimentos
              </h2>

              <div className="space-y-4">
                {investments.map((investment) => {
                  const totalInvested =
                    investment.quantity * investment.purchasePrice;
                  const currentValue =
                    investment.quantity * investment.currentPrice;
                  const gain = currentValue - totalInvested;
                  const gainPercent =
                    totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

                  return (
                    <div
                      key={investment.id}
                      className="glass-subtle p-4 rounded-lg hover:bg-dark-secondary transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="text-sm font-bold text-primary">
                              {investment.symbol}
                            </div>
                            <div className="text-sm text-secondary">
                              {investment.name}
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded ${getTypeColor(
                                investment.type
                              )}`}
                            >
                              {investment.type}
                            </span>
                          </div>
                          <div className="text-xs text-muted">
                            {investment.quantity} cotas • Compra: R${" "}
                            {investment.purchasePrice.toFixed(2)} •{" "}
                            {investment.purchaseDate}
                          </div>
                        </div>

                        <div className="text-right mr-4">
                          <div className="text-lg font-bold text-primary">
                            R${" "}
                            {currentValue.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              gain >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {gain >= 0 ? "+" : ""}R$ {gain.toFixed(2)} (
                            {gainPercent >= 0 ? "+" : ""}
                            {gainPercent.toFixed(2)}%)
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveInvestment(investment.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedTab === "Adicionar" && (
            <div className="card-glass-medium p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-primary mb-6">
                Adicionar Novo Investimento
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Nome do Ativo
                    </label>
                    <input
                      type="text"
                      value={newInvestment.name}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                      placeholder="Ex: Petrobras PN"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Símbolo
                    </label>
                    <input
                      type="text"
                      value={newInvestment.symbol}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          symbol: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                      placeholder="Ex: PETR4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Tipo
                    </label>
                    <select
                      value={newInvestment.type}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          type: e.target.value as Investment["type"],
                        })
                      }
                      className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                    >
                      <option value="Ação">Ação</option>
                      <option value="FII">FII</option>
                      <option value="Renda Fixa">Renda Fixa</option>
                      <option value="Cripto">Cripto</option>
                      <option value="Internacional">Internacional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      value={newInvestment.quantity}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          quantity: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Preço de Compra
                    </label>
                    <input
                      type="number"
                      value={newInvestment.purchasePrice}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          purchasePrice: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Data de Compra
                  </label>
                  <input
                    type="date"
                    value={newInvestment.purchaseDate}
                    onChange={(e) =>
                      setNewInvestment({
                        ...newInvestment,
                        purchaseDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                  />
                </div>

                <button
                  onClick={handleAddInvestment}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Adicionar Investimento
                </button>
              </div>
            </div>
          )}

          {selectedTab === "Relatórios" && (
            <div className="card-glass-medium p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-primary mb-6">
                Relatórios de Performance
              </h2>

              <div className="space-y-6">
                {/* Performance por Tipo */}
                <div>
                  <h3 className="text-md font-semibold text-primary mb-4">
                    Performance por Tipo de Ativo
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(summary.byType).map(([type, data]) => (
                      <div key={type} className="glass-subtle p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-xs px-2 py-1 rounded ${getTypeColor(
                                type as Investment["type"]
                              )}`}
                            >
                              {type}
                            </span>
                            <span className="text-sm font-medium text-primary">
                              R${" "}
                              {data.currentValue.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              data.gain >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {data.gain >= 0 ? "+" : ""}R$ {data.gain.toFixed(2)}{" "}
                            ({data.gainPercent >= 0 ? "+" : ""}
                            {data.gainPercent.toFixed(2)}%)
                          </div>
                        </div>

                        {/* Barra de progresso */}
                        <div className="mt-3 bg-dark-secondary rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (data.currentValue / summary.currentValue) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-6">
          {/* Distribuição por Tipo */}
          <div className="card-glass-light p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Distribuição do Portfólio
            </h3>
            <div className="space-y-3">
              {Object.entries(summary.byType).map(([type, data]) => {
                const percentage =
                  (data.currentValue / summary.currentValue) * 100;
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded ${getTypeColor(
                        type as Investment["type"]
                      )}`}
                    >
                      {type}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metas de Investimento */}
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-white">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">🎯</span>
              <span className="text-sm font-medium">Meta Anual 2025</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              {((summary.currentValue / 210000) * 100).toFixed(1)}%
            </div>
            <p className="text-sm opacity-90 mb-4">
              R$ {summary.currentValue.toLocaleString("pt-BR")} de R$ 210.000
              meta
            </p>
            <div className="bg-white/20 rounded-full h-2 mb-4">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (summary.currentValue / 210000) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ajustar Meta
            </button>
          </div>

          {/* Próximos Vencimentos */}
          <div className="card-glass-light p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Próximas Ações
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Rebalanceamento
                  </p>
                  <p className="text-xs text-muted">Sugerido mensalmente</p>
                </div>
                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                  Em breve
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Aporte Mensal
                  </p>
                  <p className="text-xs text-muted">Meta: R$ 10.000</p>
                </div>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  Pendente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function setShowAddModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}
