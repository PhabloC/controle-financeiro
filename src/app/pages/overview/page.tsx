"use client";

import SalesOverview from "@/components/overview/applications-overview/ApplicationsOverview";
import CardsMetrics from "@/components/overview/cards-metrics/CardsMetrics";
import RightColumn from "@/components/overview/right-column/RightColumn";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function Overview() {
  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  return (
    <ProtectedRoute>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary"> Overview</h1>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 glass-subtle rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary border-0"
          >
            <option>Hoje</option>
            <option>Essa Semana</option>
            <option>Esse Mês</option>
          </select>
        </div>

        {/* Metrics Cards */}
        <CardsMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SalesOverview />

          {/* Right Column */}
          <RightColumn />
        </div>
      </div>
    </ProtectedRoute>
  );
}
