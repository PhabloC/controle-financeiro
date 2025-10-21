"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFinancial } from "@/contexts/FinancialContext";
import EditMetaModal from "@/components/ui/EditMetaModal";
import { LineChart } from "@/components/charts";
import { CalendarIcon, MoneyIcon } from "@/svg";

export default function RightColumn() {
  const { metrics, metaAnual, atualizarMetaAnual, loading } = useFinancial();
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();

  const handleNovoAporte = () => {
    router.push("/pages/revenue?tab=Adicionar");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card-glass-light p-6 rounded-xl animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 bg-gray-300 rounded mb-2"></div>
          <div className="h-16 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="h-48 bg-gray-300 rounded-xl"></div>
        <div className="h-32 bg-gray-300 rounded-xl"></div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const progressoMeta = (metrics.totalInvestido / metaAnual) * 100;

  // Dados simulados para o gráfico de evolução da receita mensal
  const receitaEvolution = [
    { label: "Mai", value: metrics.receitaMensal * 0.6 },
    { label: "Jun", value: metrics.receitaMensal * 0.72 },
    { label: "Jul", value: metrics.receitaMensal * 0.85 },
    { label: "Ago", value: metrics.receitaMensal * 0.93 },
    { label: "Set", value: metrics.receitaMensal * 0.97 },
    { label: "Out", value: metrics.receitaMensal },
  ];

  return (
    <div className="space-y-6">
      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-2">
          Receita (
          {new Date()
            .toLocaleDateString("pt-BR", { month: "long" })
            .charAt(0)
            .toUpperCase() +
            new Date().toLocaleDateString("pt-BR", { month: "long" }).slice(1)}
          )
        </h3>
        <div className="text-2xl font-bold text-primary mb-2">
          {formatCurrency(metrics.receitaMensal)}
        </div>
        <LineChart data={receitaEvolution} color="#10B981" showGrid={false} />
        <p className="flex items-center gap-2 mt-5 text-sm text-muted">
          <MoneyIcon /> Estimativa baseada em rendimentos
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm opacity-90">Meta Anual 2025</span>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-white hover:text-blue-100 cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
            </svg>
          </button>
        </div>
        <div className="text-3xl font-bold mb-2">
          {Math.min(progressoMeta, 100).toFixed(0)}%
        </div>
        <p className="text-sm opacity-90 mb-4">
          {formatCurrency(metrics.totalInvestido)} de{" "}
          {formatCurrency(metaAnual)} investidos.
          {progressoMeta < 100
            ? " Continue aportando para bater sua meta!"
            : " Meta atingida! 🎉"}
        </p>
        <button
          onClick={handleNovoAporte}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Novo Aporte
        </button>
      </div>

      <div className="card-glass-light p-6 rounded-xl">
        <h3 className="text-sm font-medium text-muted mb-4">
          Resumo da Carteira
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-secondary">
                Patrimônio Total
              </p>
              <p className="text-xs text-muted">Valor atual</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">
                {formatCurrency(metrics.patrimonioTotal)}
              </p>
              <p
                className={`text-xs ${
                  metrics.ganhoTotal >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {metrics.ganhoTotal >= 0 ? "+" : ""}
                {formatCurrency(metrics.ganhoTotal)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-secondary">
                Total Investido
              </p>
              <p className="text-xs text-muted">Capital aplicado</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">
                {formatCurrency(metrics.totalInvestido)}
              </p>
              <p className="text-xs text-blue-400">Base de cálculo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-400 to-red-400 p-6 rounded-xl text-white">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">
            <CalendarIcon />
          </span>
          <span className="text-sm font-medium">Análise de Portfólio</span>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Rentabilidade atual: {metrics.rentabilidadeAnual.toFixed(1)}%.
          {metrics.rentabilidadeAnual > 15
            ? " Excelente performance!"
            : " Continue diversificando!"}
        </p>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
          Ver Detalhes
        </button>
      </div>

      <EditMetaModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        currentMeta={metaAnual}
        onSave={atualizarMetaAnual}
      />
    </div>
  );
}
