import { Ativo, NovoAtivo } from "@/app/pages/revenue/types";

export interface FormularioAtivoProps {
  ativo?: Ativo | null;
  onSalvar: (ativo: NovoAtivo) => Promise<boolean>;
  onCancelar: () => void;
  loading?: boolean;
}
