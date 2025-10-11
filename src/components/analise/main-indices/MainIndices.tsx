import { IndexData } from "@/app/pages/analysis/types";
import { useState } from "react";

export default function MainIndices() {
  const [indices] = useState<IndexData[]>([
    { name: "Ibovespa", value: 125840, change: 1250, changePercent: 1.0 },
    { name: "IBrX 100", value: 68450, change: -320, changePercent: -0.47 },
    { name: "Small Cap", value: 3240, change: 85, changePercent: 2.7 },
    { name: "IFIX", value: 2890, change: 12, changePercent: 0.42 },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {indices.map((index) => (
        <div key={index.name} className="card-glass-light p-6 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted">{index.name}</h3>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl font-bold text-primary mb-1">
            {index.value.toLocaleString("pt-BR")}
          </div>
          <div
            className={`text-sm font-medium flex items-center ${
              index.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="mr-1">{index.change >= 0 ? "↗️" : "↘️"}</span>
            {index.change >= 0 ? "+" : ""}
            {index.change.toLocaleString("pt-BR")} (
            {index.changePercent >= 0 ? "+" : ""}
            {index.changePercent}%)
          </div>
        </div>
      ))}
    </div>
  );
}
