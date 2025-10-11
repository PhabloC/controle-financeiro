import { CadastroFormData } from "@/app/pages/cadastro/types";
import { CadastroFormProps } from "./types";

export default function CadastroForm({
  formData,
  onFormChange,
  onSubmit,
  isLoading,
}: CadastroFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-primary mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormChange("email", e.target.value)}
          required
          className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
          placeholder="seu@email.com"
        />
      </div>

      {/* Senha */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-primary mb-2"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => onFormChange("password", e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
          placeholder="Sua senha (mínimo 6 caracteres)"
        />
      </div>

      {/* Confirmar Senha */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-primary mb-2"
        >
          Confirmar Senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => onFormChange("confirmPassword", e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
          placeholder="Confirme sua senha"
        />
      </div>

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Criando conta..." : "Criar Conta"}
      </button>
    </form>
  );
}
