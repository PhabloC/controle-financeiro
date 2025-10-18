import React, { useState, useEffect } from "react";
import { NovoAtivo } from "../../../app/pages/revenue/types";
import { FormularioAtivoProps } from "./types";

export function FormularioAtivo({
  ativo,
  onSalvar,
  onCancelar,
  loading = false,
}: FormularioAtivoProps) {
  const [formData, setFormData] = useState<NovoAtivo>({
    user_id: "", // Será preenchido pelo hook
    nome_ativo: "",
    tipo: "Ação",
    quantidade: 0,
    preco_medio: 0,
  });

  const [precoFormatado, setPrecoFormatado] = useState("");
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (ativo) {
      setFormData({
        user_id: ativo.user_id,
        nome_ativo: ativo.nome_ativo,
        tipo: ativo.tipo,
        quantidade: ativo.quantidade,
        preco_medio: ativo.preco_medio,
      });
      setPrecoFormatado(formatCurrency(ativo.preco_medio));
    } else {
      // Reset do formulário para novo ativo
      setFormData({
        user_id: "",
        nome_ativo: "",
        tipo: "Ação",
        quantidade: 0,
        preco_medio: 0,
      });
      setPrecoFormatado("");
    }
    setErros({});
  }, [ativo]);

  const formatCurrency = (value: number): string => {
    if (value === 0) return "";

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handlePrecoChange = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/[^\d]/g, "");

    if (!numbers) {
      setPrecoFormatado("");
      setFormData((prev) => ({ ...prev, preco_medio: 0 }));
      return;
    }

    // Converte para centavos e depois para reais
    const amount = parseInt(numbers) / 100;

    // Formata para exibição
    const formatted = amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setPrecoFormatado(formatted);
    setFormData((prev) => ({ ...prev, preco_medio: amount }));
  };

  const validarFormulario = (): boolean => {
    const novosErros: { [key: string]: string } = {};

    if (!formData.nome_ativo.trim()) {
      novosErros.nome_ativo = "Nome do ativo é obrigatório";
    }

    if (formData.quantidade <= 0) {
      novosErros.quantidade = "Quantidade deve ser maior que zero";
    }

    if (formData.preco_medio <= 0) {
      novosErros.preco_medio = "Preço médio deve ser maior que zero";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const sucesso = await onSalvar(formData);

    if (sucesso) {
      // Reset do formulário apenas se não estiver editando
      if (!ativo) {
        setFormData({
          user_id: "",
          nome_ativo: "",
          tipo: "Ação",
          quantidade: 0,
          preco_medio: 0,
        });
        setPrecoFormatado("");
      }
    }
  };

  const tiposAtivos = [
    { value: "Ação", label: "Ação" },
    { value: "FII", label: "FII (Fundo Imobiliário)" },
    { value: "Renda Fixa", label: "Renda Fixa" },
    { value: "Cripto", label: "Criptomoeda" },
    { value: "Internacional", label: "Internacional" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {ativo ? "Editar Ativo" : "Adicionar Novo Ativo"}
      </h3>

      {/* Nome do Ativo */}
      <div>
        <label
          htmlFor="nome_ativo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome do Ativo *
        </label>
        <input
          type="text"
          id="nome_ativo"
          value={formData.nome_ativo}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nome_ativo: e.target.value }))
          }
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            erros.nome_ativo ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex: PETR4, HGLG11, CDB Banco X..."
          disabled={loading}
        />
        {erros.nome_ativo && (
          <p className="text-red-500 text-sm mt-1">{erros.nome_ativo}</p>
        )}
      </div>

      {/* Tipo */}
      <div>
        <label
          htmlFor="tipo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tipo do Ativo *
        </label>
        <select
          id="tipo"
          value={formData.tipo}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tipo: e.target.value as NovoAtivo["tipo"],
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {tiposAtivos.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quantidade */}
        <div>
          <label
            htmlFor="quantidade"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantidade *
          </label>
          <input
            type="number"
            id="quantidade"
            value={formData.quantidade || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quantidade: Number(e.target.value) || 0,
              }))
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              erros.quantidade ? "border-red-500" : "border-gray-300"
            }`}
            min="0.000001"
            step="0.000001"
            placeholder="0"
            disabled={loading}
          />
          {erros.quantidade && (
            <p className="text-red-500 text-sm mt-1">{erros.quantidade}</p>
          )}
        </div>

        {/* Preço Médio */}
        <div>
          <label
            htmlFor="preco_medio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preço Médio *
          </label>
          <input
            type="text"
            id="preco_medio"
            value={precoFormatado}
            onChange={(e) => handlePrecoChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              erros.preco_medio ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="R$ 0,00"
            disabled={loading}
          />
          {erros.preco_medio && (
            <p className="text-red-500 text-sm mt-1">{erros.preco_medio}</p>
          )}
        </div>
      </div>

      {/* Valor Total (calculado) */}
      <div className="bg-gray-50 p-3 rounded-md">
        <span className="text-sm text-gray-600">Valor Total Investido:</span>
        <p className="text-lg font-semibold text-green-600">
          {(formData.quantidade * formData.preco_medio).toLocaleString(
            "pt-BR",
            {
              style: "currency",
              currency: "BRL",
            }
          )}
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {ativo ? "Atualizar" : "Adicionar"} Ativo
        </button>
      </div>
    </form>
  );
}
