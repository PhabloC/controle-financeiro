import React from "react";
import { useAtivoInfo } from "../../hooks/useAtivoInfo";
import {
  formatarMoeda,
  formatarPercentual,
  isMercadoAberto,
} from "../../lib/ativo-info";

interface AtivoInfoDisplayProps {
  nomeAtivo: string;
  quantidade?: number;
  precoMedio?: number;
  autoUpdate?: boolean;
  onError?: (error: string) => void;
}

export function AtivoInfoDisplay({
  nomeAtivo,
  quantidade,
  precoMedio,
  autoUpdate = false,
  onError,
}: AtivoInfoDisplayProps) {
  const { ativoInfo, loading, error, refetch } = useAtivoInfo(nomeAtivo, {
    autoUpdate,
    updateInterval: 60000, // 1 minuto
  });

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span>Carregando...</span>
      </div>
    );
  }

  if (error || !ativoInfo) {
    return (
      <div className="text-sm text-red-500 flex items-center justify-between">
        <span>{error || "Erro ao carregar"}</span>
        <button
          onClick={() => refetch()}
          className="ml-2 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const valorAtual = quantidade ? ativoInfo.preco * quantidade : 0;
  const valorInvestido = quantidade && precoMedio ? precoMedio * quantidade : 0;
  const lucroPerda = valorAtual - valorInvestido;
  const lucroPercent =
    valorInvestido > 0 ? (lucroPerda / valorInvestido) * 100 : 0;

  const isPositivo = ativoInfo.variacao >= 0;
  const corVariacao = isPositivo ? "text-green-600" : "text-red-600";
  const simboloVariacao = isPositivo ? "+" : "";

  return (
    <div className="space-y-2">
      {/* Preço atual e variação */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold">
            {formatarMoeda(ativoInfo.preco)}
          </span>
          <div className="flex items-center space-x-2 text-sm">
            <span className={corVariacao}>
              {simboloVariacao}
              {formatarMoeda(ativoInfo.variacao)}
            </span>
            <span className={corVariacao}>
              ({simboloVariacao}
              {formatarPercentual(ativoInfo.variacaoPercent)})
            </span>
          </div>
        </div>

        <button
          onClick={() => refetch()}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
          title="Atualizar"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Informações da posição (se fornecidas) */}
      {quantidade && precoMedio && (
        <div className="border-t pt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Quantidade:</span>
            <span>{quantidade.toLocaleString("pt-BR")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Preço médio:</span>
            <span>{formatarMoeda(precoMedio)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor investido:</span>
            <span>{formatarMoeda(valorInvestido)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor atual:</span>
            <span>{formatarMoeda(valorAtual)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-gray-600">Lucro/Perda:</span>
            <div className="text-right">
              <div
                className={lucroPerda >= 0 ? "text-green-600" : "text-red-600"}
              >
                {formatarMoeda(lucroPerda)}
              </div>
              <div
                className={`text-xs ${
                  lucroPerda >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ({formatarPercentual(lucroPercent)})
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="border-t pt-2 text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Última atualização:</span>
          <span>
            {new Date(ativoInfo.ultimaAtualizacao).toLocaleTimeString("pt-BR")}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Status do mercado:</span>
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isMercadoAberto() ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span>{isMercadoAberto() ? "Aberto" : "Fechado"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
