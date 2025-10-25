import { useState, useEffect, useCallback } from "react";
import {
  buscarInfoAtivo,
  buscarInfoMultiplosAtivos,
  atualizarCarteira,
  AtivoInfoResponse,
  AtivoAtualizado,
} from "../lib/ativo-info";
import { Ativo } from "../app/pages/revenue/types";

interface UseAtivoInfoOptions {
  autoUpdate?: boolean;
  updateInterval?: number; // em milissegundos
}

export function useAtivoInfo(
  nomeAtivo?: string,
  options: UseAtivoInfoOptions = {}
) {
  const [ativoInfo, setAtivoInfo] = useState<AtivoInfoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { autoUpdate = false, updateInterval = 60000 } = options; // padrão: 1 minuto

  const buscarInfo = useCallback(
    async (nome?: string) => {
      const nomeParaBuscar = nome || nomeAtivo;
      if (!nomeParaBuscar) return;

      setLoading(true);
      setError(null);

      try {
        const info = await buscarInfoAtivo(nomeParaBuscar);
        if (info.erro) {
          setError(info.erro);
        } else {
          setAtivoInfo(info);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar informações"
        );
      } finally {
        setLoading(false);
      }
    },
    [nomeAtivo]
  );

  // Busca inicial
  useEffect(() => {
    if (nomeAtivo) {
      buscarInfo();
    }
  }, [nomeAtivo, buscarInfo]);

  // Auto-update
  useEffect(() => {
    if (!autoUpdate || !nomeAtivo) return;

    const interval = setInterval(() => {
      buscarInfo();
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoUpdate, updateInterval, nomeAtivo, buscarInfo]);

  return {
    ativoInfo,
    loading,
    error,
    buscarInfo,
    refetch: () => buscarInfo(nomeAtivo),
  };
}

export function useCarteira(
  ativos: Ativo[],
  options: UseAtivoInfoOptions = {}
) {
  const [carteira, setCarteira] = useState<AtivoAtualizado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  const { autoUpdate = false, updateInterval = 300000 } = options; // padrão: 5 minutos

  const atualizarInfos = useCallback(async () => {
    if (!ativos || ativos.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const ativosFormatados = ativos.map((ativo) => ({
        nome_ativo: ativo.nome_ativo,
        quantidade: ativo.quantidade,
        preco_medio: ativo.preco_medio,
      }));

      const carteiraAtualizada = await atualizarCarteira(ativosFormatados);
      setCarteira(carteiraAtualizada);
      setUltimaAtualizacao(new Date());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar carteira"
      );
    } finally {
      setLoading(false);
    }
  }, [ativos]);

  // Atualização inicial
  useEffect(() => {
    atualizarInfos();
  }, [atualizarInfos]);

  // Auto-update
  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      atualizarInfos();
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoUpdate, updateInterval, atualizarInfos]);

  // Estatísticas da carteira
  const estatisticas = {
    valorTotal: carteira.reduce((acc, ativo) => acc + ativo.valorAtual, 0),
    valorInvestido: carteira.reduce(
      (acc, ativo) => acc + ativo.valorInvestido,
      0
    ),
    lucroTotalAbsoluto: carteira.reduce(
      (acc, ativo) => acc + ativo.lucroPerda,
      0
    ),
    get lucroTotalPercent() {
      return this.valorInvestido > 0
        ? ((this.valorTotal - this.valorInvestido) / this.valorInvestido) * 100
        : 0;
    },
    ativos: {
      total: carteira.length,
      comLucro: carteira.filter((ativo) => ativo.lucroPerda > 0).length,
      comPerda: carteira.filter((ativo) => ativo.lucroPerda < 0).length,
      neutros: carteira.filter((ativo) => ativo.lucroPerda === 0).length,
    },
  };

  return {
    carteira,
    loading,
    error,
    ultimaAtualizacao,
    estatisticas,
    atualizarInfos,
    refetch: atualizarInfos,
  };
}

interface UseMultiplosAtivosResult {
  infos: Record<string, AtivoInfoResponse>;
  loading: boolean;
  error: string | null;
  buscarInfos: (nomes: string[]) => Promise<void>;
}

export function useMultiplosAtivos(): UseMultiplosAtivosResult {
  const [infos, setInfos] = useState<Record<string, AtivoInfoResponse>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarInfos = useCallback(async (nomes: string[]) => {
    if (!nomes || nomes.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const informacoes = await buscarInfoMultiplosAtivos(nomes);
      setInfos(informacoes);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao buscar informações"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    infos,
    loading,
    error,
    buscarInfos,
  };
}
