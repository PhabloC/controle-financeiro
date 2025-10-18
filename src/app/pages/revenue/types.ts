export interface Investment {
  id: string;
  name: string;
  symbol: string;
  type: "Ação" | "FII" | "Renda Fixa" | "Cripto" | "Internacional";
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  sector?: string;
  exchange?: string;
}

// Tipos que correspondem à tabela do Supabase
export interface Ativo {
  id?: number;
  user_id: string;
  nome_ativo: string;
  tipo: "Ação" | "FII" | "Renda Fixa" | "Cripto" | "Internacional";
  quantidade: number;
  preco_medio: number;
  criado_em?: string;
}

// Tipo para inserir novos ativos (sem campos auto-gerados)
export interface NovoAtivo {
  user_id: string;
  nome_ativo: string;
  tipo: "Ação" | "FII" | "Renda Fixa" | "Cripto" | "Internacional";
  quantidade: number;
  preco_medio: number;
}

export interface InvestmentSummary {
  totalInvested: number;
  currentValue: number;
  totalGain: number;
  totalGainPercent: number;
  byType: {
    [key: string]: {
      invested: number;
      currentValue: number;
      gain: number;
      gainPercent: number;
    };
  };
}
