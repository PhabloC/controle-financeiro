import { Ativo, NovoAtivo } from "@/app/pages/revenue/types";
import { ReactNode } from "react";

export interface FinancialMetrics {
  patrimonioTotal: number;
  receitaMensal: number;
  rentabilidadeAnual: number;
  aportesMes: number;
  totalInvestido: number;
  valorAtual: number;
  ganhoTotal: number;
  ganhoPercent: number;
  distribuicaoPorTipo: {
    [key: string]: { quantidade: number; valorTotal: number };
  } | null;
}

export interface FinancialContextType {
  ativos: Ativo[];
  metrics: FinancialMetrics;
  metaAnual: number;
  loading: boolean;
  error: string | null;
  adicionarAtivo: (ativo: NovoAtivo) => Promise<boolean>;
  editarAtivo: (id: number, ativo: Partial<NovoAtivo>) => Promise<boolean>;
  removerAtivo: (id: number) => Promise<boolean>;
  recarregarAtivos: () => Promise<void>;
  atualizarMetaAnual: (novaMeta: number) => void;
}

export interface FinancialProviderProps {
  children: ReactNode;
}
