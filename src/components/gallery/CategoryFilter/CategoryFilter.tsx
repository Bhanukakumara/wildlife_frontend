interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const categories = [
    { id: 'all', name: 'All Categories', count: 120 },
    { id: 'mammals', name: 'Mammals', count: 45 },
    { id: 'birds', name: 'Birds', count: 38 },
    { id: 'marine', name: 'Marine Life', count: 22 },
    { id: 'reptiles', name: 'Reptiles', count: 15 },
    { id: 'others', name: 'Others', count: 20 },
  ];

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`flex justify-between items-center w-full p-3 rounded-lg text-left transition-colors ${
            selectedCategory === category.id
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-100 text-green-800'
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          <span className="font-medium">{category.name}</span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              selectedCategory === category.id
                ? 'bg-green-700'
                : 'bg-green-200 text-green-800'
            }`}
          >
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
