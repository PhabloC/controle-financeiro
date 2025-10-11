interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  show: boolean;
}

const categories = [
  "Todos",
  "Bancos",
  "Energia",
  "Mineração",
  "Varejo",
  "Industriais",
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  show,
}: CategoryFilterProps) {
  if (!show) return null;

  return (
    <div className="flex space-x-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              : "glass-subtle text-secondary hover:text-primary hover:bg-dark-secondary"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
