interface FilterBarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  photoCount: number;
}

const FilterBar = ({ sortBy, onSortChange, photoCount }: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white rounded-xl shadow-lg p-4">
      <div className="mb-4 md:mb-0">
        <p className="text-green-800">
          <span className="font-bold">{photoCount}</span> photos found
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <label className="text-green-800 font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-green-50 border border-green-300 text-green-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;