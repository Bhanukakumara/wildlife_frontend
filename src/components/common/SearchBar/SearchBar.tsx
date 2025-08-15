import { Search } from '@mui/icons-material';
import { useState } from 'react'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className='flex justify-center mt-6'>
      <div className="flex items-center bg-green-500/10 backdrop-blur-md border border-green-400/20 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search wildlife photos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-green-100 placeholder-green-200/70 px-4 py-2 w-64 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 hover:bg-green-400/20 transition-colors"
        >
          <Search className="h-5 w-5 text-green-200" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar