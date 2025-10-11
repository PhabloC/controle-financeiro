interface MarketTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Ações", "FIIs", "Cripto", "Internacional"];

export default function MarketTabs({
  activeTab,
  onTabChange,
}: MarketTabsProps) {
  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === tab
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
              : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary hover:scale-102"
          }`}
        >
          {tab === "FIIs" && "🏢"}
          {tab === "Cripto" && "₿"}
          {tab === "Internacional" && "🌍"}
          {tab === "Ações" && "📊"}
          <span className="ml-2">{tab}</span>
        </button>
      ))}
    </div>
  );
}
