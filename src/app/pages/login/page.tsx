"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type AuthMode = "signin" | "signup" | "reset";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const { signIn, signUp, resetPassword, user } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      router.push("/pages/overview");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (mode === "signup" && password !== confirmPassword) {
        setMessage("As senhas não coincidem");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      let result;
      switch (mode) {
        case "signin":
          result = await signIn(email, password);
          break;
        case "signup":
          result = await signUp(email, password);
          break;
        case "reset":
          result = await resetPassword(email);
          break;
      }

      if (result.error) {
        let errorMessage = "Ocorreu um erro. Tente novamente.";

        switch (result.error.message) {
          case "Invalid login credentials":
            errorMessage = "Email ou senha incorretos";
            break;
          case "User already registered":
            errorMessage = "Este email já está cadastrado";
            break;
          case "Password should be at least 6 characters":
            errorMessage = "A senha deve ter pelo menos 6 caracteres";
            break;
          default:
            errorMessage = result.error.message;
        }

        setMessage(errorMessage);
        setMessageType("error");
      } else {
        if (mode === "reset") {
          setMessage(
            "Email de recuperação enviado! Verifique sua caixa de entrada."
          );
          setMessageType("success");
          setMode("signin");
        } else if (mode === "signup") {
          setMessage(
            "Conta criada com sucesso! Verifique seu email para confirmar."
          );
          setMessageType("success");
          setMode("signin");
        }
      }
    } catch {
      setMessage("Erro inesperado. Tente novamente.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "signin":
        return "🔐 Entrar";
      case "signup":
        return "👤 Criar Conta";
      case "reset":
        return "🔄 Recuperar Senha";
    }
  };

  const getSubmitText = () => {
    if (isLoading) return "Carregando...";
    switch (mode) {
      case "signin":
        return "Entrar";
      case "signup":
        return "Criar Conta";
      case "reset":
        return "Enviar Email";
    }
  };

  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card Principal */}
        <div className="glass-subtle p-8 rounded-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {getTitle()}
            </h1>
            <p className="text-secondary">
              {mode === "signin" && "Acesse sua conta para continuar"}
              {mode === "signup" && "Crie sua conta para começar"}
              {mode === "reset" && "Digite seu email para recuperar a senha"}
            </p>
          </div>

          {/* Mensagens */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm ${
                messageType === "success"
                  ? "bg-accent-primary/20 text-accent-light border border-accent-primary/30"
                  : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
            >
              {message}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            {mode !== "reset" && (
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
                  placeholder="Sua senha"
                />
              </div>
            )}

            {/* Confirmar Senha */}
            {mode === "signup" && (
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 glass-subtle rounded-lg text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getSubmitText()}
            </button>
          </form>

          {/* Links de Navegação */}
          <div className="mt-8 space-y-4 text-center">
            {mode === "signin" && (
              <>
                <button
                  type="button"
                  onClick={() => setMode("reset")}
                  className="text-accent-primary hover:text-accent-light text-sm transition-colors"
                >
                  Esqueceu sua senha?
                </button>
                <div className="text-secondary text-sm">
                  Não tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-accent-primary hover:text-accent-light transition-colors"
                  >
                    Criar conta
                  </button>
                </div>
              </>
            )}

            {mode === "signup" && (
              <div className="text-secondary text-sm">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-accent-primary hover:text-accent-light transition-colors"
                >
                  Entrar
                </button>
              </div>
            )}

            {mode === "reset" && (
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-accent-primary hover:text-accent-light text-sm transition-colors"
              >
                Voltar para login
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-secondary text-sm">
          <p>© 2025 Controle Financeiro. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
