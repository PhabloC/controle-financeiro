import { Investment } from "@/app/pages/revenue/types";

export interface AddInvestmentFormProps {
  newInvestment: {
    name: string;
    symbol: string;
    type: Investment["type"];
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
    urlInvesting?: string;
  };
  onInvestmentChange: (investment: {
    name: string;
    symbol: string;
    type: Investment["type"];
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
    urlInvesting?: string;
  }) => void;
  onAddInvestment: () => void;
  onUpdateInvestment?: () => void;
  onCancelEdit?: () => void;
  editingInvestment?: Investment | null;
}
