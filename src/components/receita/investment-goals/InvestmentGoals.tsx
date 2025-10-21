"use client";

import { useState } from "react";
import { useFinancial } from "@/contexts/FinancialContext";
import EditMetaModal from "@/components/ui/EditMetaModal";
import { InvestmentGoalsProps } from "./types";
import { TargetIcon } from "@/svg";

export default function InvestmentGoals({
  currentValue,
}: InvestmentGoalsProps) {
  const { metaAnual, atualizarMetaAnual } = useFinancial();
  const [showEditModal, setShowEditModal] = useState(false);

  const progress = (currentValue / metaAnual) * 100;

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">
              <TargetIcon />
            </span>
            <span className="text-sm font-medium">Meta Anual 2025</span>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-white hover:text-green-100 cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
            </svg>
          </button>
        </div>
        <div className="text-3xl font-bold mb-2">{progress.toFixed(1)}%</div>
        <p className="text-sm opacity-90 mb-4">
          R$ {currentValue.toLocaleString("pt-BR")} de R${" "}
          {metaAnual.toLocaleString("pt-BR")} meta
        </p>
        <div className="bg-white/20 rounded-full h-2 mb-4">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(progress, 100)}%`,
            }}
          ></div>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Ajustar Meta
        </button>
      </div>

      <EditMetaModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        currentMeta={metaAnual}
        onSave={atualizarMetaAnual}
      />
    </>
  );
}
