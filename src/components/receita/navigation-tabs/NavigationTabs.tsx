interface NavigationTabsProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavigationTabs({
  tabs,
  selectedTab,
  onTabChange,
}: NavigationTabsProps) {
  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
            selectedTab === tab
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
