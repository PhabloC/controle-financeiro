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
