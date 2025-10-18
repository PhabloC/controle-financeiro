import { supabase } from "./supabase";
import { Ativo, NovoAtivo } from "../app/pages/revenue/types";
import { PostgrestError } from "@supabase/supabase-js";

// Função para criar um novo ativo
export async function criarAtivo(
  ativo: NovoAtivo
): Promise<{ data: Ativo | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .insert([
      {
        user_id: ativo.user_id,
        nome_ativo: ativo.nome_ativo,
        tipo: ativo.tipo,
        quantidade: ativo.quantidade,
        preco_medio: ativo.preco_medio,
      },
    ])
    .select()
    .single();

  return { data, error };
}

// Função para listar todos os ativos de um usuário
export async function listarAtivos(
  userId: string
): Promise<{ data: Ativo[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .select("*")
    .eq("user_id", userId)
    .order("criado_em", { ascending: false });

  return { data, error };
}

// Função para buscar um ativo específico por ID
export async function buscarAtivo(
  id: number
): Promise<{ data: Ativo | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

// Função para atualizar um ativo
export async function atualizarAtivo(
  id: number,
  ativo: Partial<NovoAtivo>
): Promise<{ data: Ativo | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .update(ativo)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

// Função para deletar um ativo
export async function deletarAtivo(
  id: number
): Promise<{ error: PostgrestError | null }> {
  const { error } = await supabase.from("ativos").delete().eq("id", id);

  return { error };
}

// Função para listar ativos por tipo
export async function listarAtivosPorTipo(
  userId: string,
  tipo: string
): Promise<{ data: Ativo[] | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .select("*")
    .eq("user_id", userId)
    .eq("tipo", tipo)
    .order("criado_em", { ascending: false });

  return { data, error };
}

// Função para calcular o valor total investido por um usuário
export async function calcularValorTotalInvestido(
  userId: string
): Promise<{ total: number; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("ativos")
    .select("quantidade, preco_medio")
    .eq("user_id", userId);

  if (error) {
    return { total: 0, error };
  }

  const total =
    data?.reduce((acc, ativo) => {
      return acc + ativo.quantidade * ativo.preco_medio;
    }, 0) || 0;

  return { total, error: null };
}

// Função para calcular distribuição por tipo de ativo
export async function calcularDistribuicaoPorTipo(userId: string): Promise<{
  data: { [key: string]: { quantidade: number; valorTotal: number } } | null;
  error: PostgrestError | null;
}> {
  const { data, error } = await supabase
    .from("ativos")
    .select("tipo, quantidade, preco_medio")
    .eq("user_id", userId);

  if (error) {
    return { data: null, error };
  }

  const distribuicao =
    data?.reduce((acc, ativo) => {
      const valorTotal = ativo.quantidade * ativo.preco_medio;

      if (acc[ativo.tipo]) {
        acc[ativo.tipo].quantidade += ativo.quantidade;
        acc[ativo.tipo].valorTotal += valorTotal;
      } else {
        acc[ativo.tipo] = {
          quantidade: ativo.quantidade,
          valorTotal: valorTotal,
        };
      }

      return acc;
    }, {} as { [key: string]: { quantidade: number; valorTotal: number } }) ||
    {};

  return { data: distribuicao, error: null };
}
