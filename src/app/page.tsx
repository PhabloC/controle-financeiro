"use client";

import SalesOverview from "@/components/overview/applications-overview/ApplicationsOverview";
import CardsMetrics from "@/components/overview/cards-metrics/CardsMetrics";
import RightColumn from "@/components/overview/right-column/RightColumn";
import { useState } from "react";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState("Hoje");

  return (
    <div className="p-6">
      {/* Header com boas-vindas */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Bem-vindo ao Controle Financeiro
          </h1>
          <p className="text-muted">
            Gerencie seus investimentos e acompanhe sua evolução financeira
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
        >
          <option>Hoje</option>
          <option>Essa Semana</option>
          <option>Esse Mês</option>
          <option>Este Ano</option>
        </select>
      </div>

      {/* Cards de métricas principais */}
      <CardsMetrics />

      {/* Layout principal com overview e coluna direita */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SalesOverview />

        {/* Coluna direita com informações adicionais */}
        <RightColumn />
      </div>

      {/* Seção de ações rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card-glass-light rounded-xl p-6 text-center">
          <div className="w-12 h-12 glass-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">�</span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Novo Aporte
          </h3>
          <p className="text-sm text-muted mb-4">
            Adicione novos investimentos ao seu portfólio
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
            Adicionar Aporte
          </button>
        </div>

        <div className="card-glass-light rounded-xl p-6 text-center">
          <div className="w-12 h-12 glass-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">�</span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Relatórios
          </h3>
          <p className="text-sm text-muted mb-4">
            Visualize relatórios detalhados dos seus investimentos
          </p>
          <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
            Ver Relatórios
          </button>
        </div>

        <div className="card-glass-light rounded-xl p-6 text-center">
          <div className="w-12 h-12 glass-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚖️</span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Rebalancear
          </h3>
          <p className="text-sm text-muted mb-4">
            Mantenha seu portfólio equilibrado conforme sua estratégia
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
            Rebalancear
          </button>
        </div>
      </div>
    </div>
  );
}
