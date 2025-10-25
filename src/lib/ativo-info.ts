import axios from "axios";

export interface AtivoInfoResponse {
  nome: string;
  preco: number;
  variacao: number;
  variacaoPercent: number;
  moeda: string;
  ultimaAtualizacao: string;
  erro?: string;
}

export interface AtivoAtualizado extends AtivoInfoResponse {
  quantidade: number;
  precoMedio: number;
  valorAtual: number;
  valorInvestido: number;
  lucroPerda: number;
  lucroPerdasPercent: number;
}

// Função para buscar informações de um ativo específico
export async function buscarInfoAtivo(
  nomeAtivo: string,
  urlInvesting?: string
): Promise<AtivoInfoResponse> {
  try {
    let url = `/api/ativo-info?nome=${encodeURIComponent(nomeAtivo)}`;
    if (urlInvesting) {
      url += `&url=${encodeURIComponent(urlInvesting)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar informações do ativo:", error);
    throw new Error("Falha ao buscar informações do ativo");
  }
}

// Função para buscar informações de múltiplos ativos
export async function buscarInfoMultiplosAtivos(
  nomesAtivos: string[]
): Promise<Record<string, AtivoInfoResponse>> {
  try {
    const response = await axios.post("/api/ativo-info", {
      nomes: nomesAtivos,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar informações dos ativos:", error);
    throw new Error("Falha ao buscar informações dos ativos");
  }
}

// Função para buscar informações de múltiplos ativos com URLs
export async function buscarInfoMultiplosAtivosComUrls(
  ativos: Array<{ nome: string; url?: string }>
): Promise<Record<string, AtivoInfoResponse>> {
  try {
    const response = await axios.post("/api/ativo-info", {
      ativos: ativos,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar informações dos ativos:", error);
    throw new Error("Falha ao buscar informações dos ativos");
  }
}

// Função para calcular informações detalhadas de um ativo
export function calcularInformacoesAtivo(
  ativoInfo: AtivoInfoResponse,
  quantidade: number,
  precoMedio: number
): AtivoAtualizado {
  const valorAtual = ativoInfo.preco * quantidade;
  const valorInvestido = precoMedio * quantidade;
  const lucroPerda = valorAtual - valorInvestido;
  const lucroPerdasPercent =
    valorInvestido > 0
      ? ((valorAtual - valorInvestido) / valorInvestido) * 100
      : 0;

  return {
    ...ativoInfo,
    quantidade,
    precoMedio,
    valorAtual,
    valorInvestido,
    lucroPerda,
    lucroPerdasPercent,
  };
}

// Função para atualizar preços em tempo real de uma carteira
export async function atualizarCarteira(
  ativos: Array<{
    nome_ativo: string;
    quantidade: number;
    preco_medio: number;
    url_investing?: string;
  }>
): Promise<AtivoAtualizado[]> {
  try {
    // Verifica se algum ativo tem URL específica
    const temUrls = ativos.some((ativo) => ativo.url_investing);

    let informacoesAtivos: Record<string, AtivoInfoResponse>;

    if (temUrls) {
      // Usa o método com URLs
      const ativosComUrls = ativos.map((ativo) => ({
        nome: ativo.nome_ativo,
        url: ativo.url_investing,
      }));
      informacoesAtivos = await buscarInfoMultiplosAtivosComUrls(ativosComUrls);
    } else {
      // Usa o método antigo (sem URLs)
      const nomesAtivos = ativos.map((ativo) => ativo.nome_ativo);
      informacoesAtivos = await buscarInfoMultiplosAtivos(nomesAtivos);
    }

    return ativos.map((ativo) => {
      const info = informacoesAtivos[ativo.nome_ativo];
      if (!info || info.erro) {
        // Se houve erro, retorna com valores padrão
        return {
          nome: ativo.nome_ativo,
          preco: 0,
          variacao: 0,
          variacaoPercent: 0,
          moeda: "BRL",
          ultimaAtualizacao: new Date().toISOString(),
          erro: info?.erro || "Não foi possível obter informações",
          quantidade: ativo.quantidade,
          precoMedio: ativo.preco_medio,
          valorAtual: 0,
          valorInvestido: ativo.preco_medio * ativo.quantidade,
          lucroPerda: -ativo.preco_medio * ativo.quantidade,
          lucroPerdasPercent: -100,
        };
      }

      return calcularInformacoesAtivo(
        info,
        ativo.quantidade,
        ativo.preco_medio
      );
    });
  } catch (error) {
    console.error("Erro ao atualizar carteira:", error);
    throw new Error("Falha ao atualizar informações da carteira");
  }
}

// Função para verificar se o mercado está aberto (simplificada)
export function isMercadoAberto(): boolean {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = domingo, 1 = segunda, etc.
  const hora = agora.getHours();

  // Considera mercado aberto de segunda a sexta, das 10h às 17h (horário simplificado)
  return diaSemana >= 1 && diaSemana <= 5 && hora >= 10 && hora <= 17;
}

// Função para formatar valores monetários
export function formatarMoeda(valor: number, moeda: string = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: moeda,
  }).format(valor);
}

// Função para formatar percentuais
export function formatarPercentual(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor / 100);
}
