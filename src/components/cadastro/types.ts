import { CadastroFormData } from "@/app/pages/cadastro/types";

export interface CadastroFormProps {
  formData: CadastroFormData;
  onFormChange: (field: keyof CadastroFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}
