import { Investment } from "../../../app/pages/revenue/types";

interface AddInvestmentFormProps {
  newInvestment: {
    name: string;
    symbol: string;
    type: Investment["type"];
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  };
  onInvestmentChange: (investment: {
    name: string;
    symbol: string;
    type: Investment["type"];
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
  }) => void;
  onAddInvestment: () => void;
}

export default function AddInvestmentForm({
  newInvestment,
  onInvestmentChange,
  onAddInvestment,
}: AddInvestmentFormProps) {
  return (
    <div className="card-glass-medium p-6 rounded-xl">
      <h2 className="text-lg font-semibold text-primary mb-6">
        Adicionar Novo Investimento
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Nome do Ativo
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Símbolo
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
              <option value="Ação">Ação</option>
              <option value="FII">FII</option>
              <option value="Renda Fixa">Renda Fixa</option>
              <option value="Cripto">Cripto</option>
              <option value="Internacional">Internacional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Quantidade
            </label>
            <input
              type="number"
              value={newInvestment.quantity}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  quantity: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Preço de Compra
            </label>
            <input
              type="number"
              value={newInvestment.purchasePrice}
              onChange={(e) =>
                onInvestmentChange({
                  ...newInvestment,
                  purchasePrice: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
              placeholder="0.00"
              min="0"
              step="0.01"
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
          onClick={onAddInvestment}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Adicionar Investimento
        </button>
      </div>
    </div>
  );
}
