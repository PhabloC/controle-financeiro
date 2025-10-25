import { NextRequest, NextResponse } from "next/server";

interface AtivoInfo {
  nome: string;
  preco: number;
  variacao: number;
  variacaoPercent: number;
  moeda: string;
  ultimaAtualizacao: string;
  erro?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nome = searchParams.get("nome");

  if (!nome) {
    return NextResponse.json(
      { error: "Parâmetro nome é obrigatório" },
      { status: 400 }
    );
  }

  const ativoInfo: AtivoInfo = {
    nome: nome,
    preco: 100.0 + Math.random() * 50,
    variacao: (Math.random() - 0.5) * 10,
    variacaoPercent: (Math.random() - 0.5) * 5,
    moeda: "BRL",
    ultimaAtualizacao: new Date().toISOString().split("T")[0],
  };

  return NextResponse.json(ativoInfo);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let nomes: string[] = [];

    if (body.nomes && Array.isArray(body.nomes)) {
      nomes = body.nomes;
    } else {
      return NextResponse.json(
        { error: "Deve fornecer nomes" },
        { status: 400 }
      );
    }

    const resultados: Record<string, AtivoInfo> = {};

    nomes.forEach((nome) => {
      resultados[nome] = {
        nome: nome,
        preco: 100.0 + Math.random() * 50,
        variacao: (Math.random() - 0.5) * 10,
        variacaoPercent: (Math.random() - 0.5) * 5,
        moeda: "BRL",
        ultimaAtualizacao: new Date().toISOString().split("T")[0],
      };
    });

    return NextResponse.json(resultados);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
