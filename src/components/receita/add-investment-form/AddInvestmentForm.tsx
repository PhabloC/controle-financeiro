import { Investment } from "../../../app/pages/revenue/types";
import { AddInvestmentFormProps } from "./types";

export default function AddInvestmentForm({
  newInvestment,
  onInvestmentChange,
  onAddInvestment,
  onUpdateInvestment,
  onCancelEdit,
  editingInvestment,
}: AddInvestmentFormProps) {
  const isFormValid =
    newInvestment.name.trim() &&
    newInvestment.symbol.trim() &&
    newInvestment.quantity > 0 &&
    newInvestment.purchasePrice > 0;

  const formatCurrency = (value: string): string => {
    // Remove tudo que não for número
    const numbers = value.replace(/[^\d]/g, "");

    if (!numbers) return "";

    // Converte para centavos e depois para reais
    const amount = parseInt(numbers) / 100;

    // Formata com vírgula para decimal e ponto para milhares
    return amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const parseCurrencyToNumber = (value: string): number => {
    // Remove pontos (separadores de milhares) e substitui vírgula por ponto
    const cleaned = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatCurrency(value);
    const numericValue = parseCurrencyToNumber(formatted);

    onInvestmentChange({
      ...newInvestment,
      purchasePrice: numericValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      if (editingInvestment) {
        onUpdateInvestment?.();
      } else {
        onAddInvestment();
      }
    }
  };

  const isEditing = !!editingInvestment;

  return (
    <div className="card-glass-medium p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">
          {isEditing ? "Editar Investimento" : "Adicionar Novo Investimento"}
        </h2>
        {isEditing && (
          <button
            onClick={onCancelEdit}
            className="text-gray-400 hover:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-500/10 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Nome do Ativo *
            </label>
            <input
              type="text"
              value={newInvestment.name}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  name: e.target.value,
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="Ex: Petrobras PN"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Símbolo *
            </label>
            <input
              type="text"
              value={newInvestment.symbol}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  symbol: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="Ex: PETR4"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Tipo
            </label>
            <select
              value={newInvestment.type}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  type: e.target.value as Investment["type"],
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
            >
              <option value="Ação" className="bg-gray-800 text-white">
                Ação
              </option>
              <option value="FII" className="bg-gray-800 text-white">
                FII
              </option>
              <option value="Renda Fixa" className="bg-gray-800 text-white">
                Renda Fixa
              </option>
              <option value="Cripto" className="bg-gray-800 text-white">
                Cripto
              </option>
              <option value="Internacional" className="bg-gray-800 text-white">
                Internacional
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Quantidade *
            </label>
            <input
              type="number"
              value={newInvestment.quantity || ""}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  quantity: Number(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="0"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Preço de Compra *
            </label>
            <input
              type="text"
              value={
                newInvestment.purchasePrice > 0
                  ? newInvestment.purchasePrice.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : ""
              }
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="0,00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Data de Compra
          </label>
          <input
            type="date"
            value={newInvestment.purchaseDate}
            onChange={(e) =>
              onInvestmentChange({
                ...newInvestment,
                purchaseDate: e.target.value,
              })
            }
            className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            isFormValid
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isEditing ? "Atualizar Investimento" : "Adicionar Investimento"}
        </button>
      </form>
    </div>
  );
}
