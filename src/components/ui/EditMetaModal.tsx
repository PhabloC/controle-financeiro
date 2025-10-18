"use client";

import { useState } from "react";
import { EditMetaModalProps } from "./types";

export default function EditMetaModal({
  isOpen,
  onClose,
  currentMeta,
  onSave,
}: EditMetaModalProps) {
  const [meta, setMeta] = useState(currentMeta.toString());
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    // Remove formatação e converte para número
    const valorLimpo = meta.replace(/[^\d,]/g, "").replace(",", ".");
    const novaMeta = parseFloat(valorLimpo);

    if (isNaN(novaMeta) || novaMeta <= 0) {
      alert("Por favor, insira um valor válido para a meta");
      return;
    }

    setIsLoading(true);
    onSave(novaMeta);
    setIsLoading(false);
    onClose();
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/[^\d]/g, "");

    if (!numbers) return "";

    // Converte para número sem dividir por 100
    const number = parseInt(numbers);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleInputChange = (value: string) => {
    // Se o usuário está digitando, apenas remove caracteres não numéricos
    const numbersOnly = value.replace(/[^\d]/g, "");
    if (numbersOnly) {
      const formatted = formatCurrency(numbersOnly);
      setMeta(formatted);
    } else {
      setMeta("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Editar Meta Anual
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nova Meta Anual
          </label>
          <input
            type="text"
            value={meta}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="R$ 0,00"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Meta atual:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(currentMeta)}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
