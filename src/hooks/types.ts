import { Ativo, NovoAtivo } from "@/app/pages/revenue/types";
import { AuthError, Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error?: AuthError | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error?: AuthError | null }>;
  signOut: () => Promise<{ error?: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error?: AuthError | null }>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface UseAtivosReturn {
  ativos: Ativo[];
  loading: boolean;
  error: string | null;
  totalInvestido: number;
  distribuicao: {
    [key: string]: { quantidade: number; valorTotal: number };
  } | null;
  adicionarAtivo: (ativo: NovoAtivo) => Promise<boolean>;
  editarAtivo: (id: number, ativo: Partial<NovoAtivo>) => Promise<boolean>;
  removerAtivo: (id: number) => Promise<boolean>;
  recarregarAtivos: () => Promise<void>;
}
