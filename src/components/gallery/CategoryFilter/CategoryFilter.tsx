interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: Category[];
}

const CategoryFilter = ({ selectedCategory, onSelectCategory, categories }: CategoryFilterProps) => {
  // Add 'all' category to the beginning
  const allCategories = [
    { id: 'all', name: 'All Categories' },
    ...categories
  ];

  return (
    <div className="space-y-2">
      {allCategories.map((category) => (
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
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
