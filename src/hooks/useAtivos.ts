import { useState, useEffect, useCallback } from "react";
import { Ativo, NovoAtivo } from "../app/pages/revenue/types";
import {
  criarAtivo,
  listarAtivos,
  atualizarAtivo,
  deletarAtivo,
  calcularValorTotalInvestido,
  calcularDistribuicaoPorTipo,
} from "../lib/ativos";
import { useAuth } from "./useAuth";
import { UseAtivosReturn } from "./types";

export function useAtivos(): UseAtivosReturn {
  const { user } = useAuth();
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [distribuicao, setDistribuicao] = useState<{
    [key: string]: { quantidade: number; valorTotal: number };
  } | null>(null);

  const carregarAtivos = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: ativosError } = await listarAtivos(user.id);

      if (ativosError) {
        setError("Erro ao carregar ativos: " + ativosError.message);
        return;
      }

      setAtivos(data || []);

      // Carregar dados agregados
      const [totalResult, distribuicaoResult] = await Promise.all([
        calcularValorTotalInvestido(user.id),
        calcularDistribuicaoPorTipo(user.id),
      ]);

      if (totalResult.error) {
        console.error("Erro ao calcular total investido:", totalResult.error);
      } else {
        setTotalInvestido(totalResult.total);
      }

      if (distribuicaoResult.error) {
        console.error(
          "Erro ao calcular distribuição:",
          distribuicaoResult.error
        );
      } else {
        setDistribuicao(distribuicaoResult.data);
      }
    } catch (err) {
      setError("Erro inesperado ao carregar ativos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const adicionarAtivo = async (novoAtivo: NovoAtivo): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await criarAtivo({
        ...novoAtivo,
        user_id: user.id,
      });

      if (error) {
        setError("Erro ao adicionar ativo: " + error.message);
        return false;
      }

      // Recarregar a lista após adicionar
      await carregarAtivos();
      return true;
    } catch (err) {
      setError("Erro inesperado ao adicionar ativo");
      console.error(err);
      return false;
    }
  };

  const editarAtivo = async (
    id: number,
    ativo: Partial<NovoAtivo>
  ): Promise<boolean> => {
    try {
      const { error } = await atualizarAtivo(id, ativo);

      if (error) {
        setError("Erro ao editar ativo: " + error.message);
        return false;
      }

      // Recarregar a lista após editar
      await carregarAtivos();
      return true;
    } catch (err) {
      setError("Erro inesperado ao editar ativo");
      console.error(err);
      return false;
    }
  };

  const removerAtivo = async (id: number): Promise<boolean> => {
    try {
      const { error } = await deletarAtivo(id);

      if (error) {
        setError("Erro ao remover ativo: " + error.message);
        return false;
      }

      // Recarregar a lista após remover
      await carregarAtivos();
      return true;
    } catch (err) {
      setError("Erro inesperado ao remover ativo");
      console.error(err);
      return false;
    }
  };

  const recarregarAtivos = async () => {
    await carregarAtivos();
  };

  useEffect(() => {
    carregarAtivos();
  }, [carregarAtivos]);

  return {
    ativos,
    loading,
    error,
    totalInvestido,
    distribuicao,
    adicionarAtivo,
    editarAtivo,
    removerAtivo,
    recarregarAtivos,
  };
}
