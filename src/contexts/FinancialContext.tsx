"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useAtivos } from "../hooks/useAtivos";
import { FinancialContextType, FinancialProviderProps } from "./types";

const FinancialContext = createContext<FinancialContextType | undefined>(
  undefined
);

export function FinancialProvider({ children }: FinancialProviderProps) {
  const {
    ativos,
    loading,
    error,
    totalInvestido,
    distribuicao,
    adicionarAtivo,
    editarAtivo,
    removerAtivo,
    recarregarAtivos,
  } = useAtivos();

  // Estado para meta anual - recupera do localStorage ou usa valor padrão
  const [metaAnual, setMetaAnual] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedMeta = localStorage.getItem("metaAnual");
      return savedMeta ? parseFloat(savedMeta) : 210000;
    }
    return 210000;
  });

  // Função para atualizar a meta anual
  const atualizarMetaAnual = (novaMeta: number) => {
    setMetaAnual(novaMeta);
    if (typeof window !== "undefined") {
      localStorage.setItem("metaAnual", novaMeta.toString());
    }
  };

  const metrics = useMemo(() => {
    // Calcular valor atual dos ativos (por enquanto usando preço médio como atual)
    const valorAtual = ativos.reduce((total, ativo) => {
      return total + Number(ativo.quantidade) * Number(ativo.preco_medio);
    }, 0);

    const ganhoTotal = valorAtual - totalInvestido;
    const ganhoPercent =
      totalInvestido > 0 ? (ganhoTotal / totalInvestido) * 100 : 0;

    // Calcular receita mensal estimada (baseada em dividendos e rendimentos)
    const receitaMensal = ativos.reduce((total, ativo) => {
      // Estimativa básica: 0.8% ao mês para ações, 1% para FIIs, 0.5% para renda fixa
      const percentualMensal =
        ativo.tipo === "FII" ? 0.01 : ativo.tipo === "Ação" ? 0.008 : 0.005;
      const valorAtivo = Number(ativo.quantidade) * Number(ativo.preco_medio);
      return total + valorAtivo * percentualMensal;
    }, 0);

    // Calcular aportes do mês (baseado nos ativos criados no mês atual)
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const aportesMes = ativos
      .filter((ativo) => {
        const dataAtivo = new Date(ativo.criado_em || "");
        return dataAtivo >= inicioMes;
      })
      .reduce((total, ativo) => {
        return total + Number(ativo.quantidade) * Number(ativo.preco_medio);
      }, 0);

    return {
      patrimonioTotal: valorAtual,
      receitaMensal,
      rentabilidadeAnual: ganhoPercent,
      aportesMes,
      totalInvestido,
      valorAtual,
      ganhoTotal,
      ganhoPercent,
      distribuicaoPorTipo: distribuicao,
    };
  }, [ativos, totalInvestido, distribuicao]);

  const contextValue: FinancialContextType = {
    ativos,
    metrics,
    metaAnual,
    loading,
    error,
    adicionarAtivo,
    editarAtivo,
    removerAtivo,
    recarregarAtivos,
    atualizarMetaAnual,
  };

  return (
    <FinancialContext.Provider value={contextValue}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error(
      "useFinancial deve ser usado dentro de um FinancialProvider"
    );
  }
  return context;
}
