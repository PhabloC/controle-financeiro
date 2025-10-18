export interface NavigationTabsProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}
