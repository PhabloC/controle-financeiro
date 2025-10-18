import { Ativo } from "@/app/pages/revenue/types";

export interface AtivoCardProps {
  ativo: Ativo;
  onEdit: (ativo: Ativo) => void;
  onDelete: (id: number) => void;
}
