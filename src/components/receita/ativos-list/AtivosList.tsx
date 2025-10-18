import React, { useState } from "react";
import { Ativo } from "../../../app/pages/revenue/types";
import { AtivoCardProps } from "./types";

export function AtivoCard({ ativo, onEdit, onDelete }: AtivoCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const valorTotal = ativo.quantidade * ativo.preco_medio;

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Ação":
        return "bg-blue-100 text-blue-800";
      case "FII":
        return "bg-green-100 text-green-800";
      case "Renda Fixa":
        return "bg-yellow-100 text-yellow-800";
      case "Cripto":
        return "bg-purple-100 text-purple-800";
      case "Internacional":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = () => {
    if (ativo.id) {
      onDelete(ativo.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {ativo.nome_ativo}
          </h3>
          <span
            className={`inline-block  px-2 py-1 text-xs font-medium rounded-full ${getTipoColor(
              ativo.tipo
            )}`}
          >
            {ativo.tipo}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(ativo)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Quantidade:</span>
          <p className="font-medium">
            {ativo.quantidade.toLocaleString("pt-BR")}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Preço Médio:</span>
          <p className="font-medium">{formatCurrency(ativo.preco_medio)}</p>
        </div>
        <div>
          <span className="text-gray-500">Valor Total:</span>
          <p className="font-semibold text-green-600">
            {formatCurrency(valorTotal)}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Cadastrado em:</span>
          <p className="font-medium">
            {ativo.criado_em ? formatDate(ativo.criado_em) : "N/A"}
          </p>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar exclusão
            </h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o ativo &quot;{ativo.nome_ativo}
              &quot;? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface AtivosListProps {
  ativos: Ativo[];
  onEdit: (ativo: Ativo) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export function AtivosList({
  ativos,
  onEdit,
  onDelete,
  loading = false,
}: AtivosListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Carregando ativos...</span>
      </div>
    );
  }

  if (ativos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">
          Nenhum ativo cadastrado
        </div>
        <div className="text-gray-400 text-sm">
          Comece adicionando seu primeiro ativo para acompanhar seus
          investimentos
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ativos.map((ativo) => (
        <AtivoCard
          key={ativo.id}
          ativo={ativo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
