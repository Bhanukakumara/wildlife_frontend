import { useState } from 'react';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';
import CategoryFilter from '../../components/gallery/CategoryFilter/CategoryFilter';
import Pagination from '../../components/gallery/Pagination/Pagination';
import FilterBar from '../../components/gallery/FilterBar/FilterBar';
import PhotoGrid from '../../components/gallery/PhotoGrid/PhotoGrid';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  // Mock data for photos
  const photos = [
    { id: 1, title: 'Lion Portrait', photographer: 'John Smith', price: 49.99, category: 'mammals' },
    { id: 2, title: 'Eagle in Flight', photographer: 'Jane Doe', price: 39.99, category: 'birds' },
    { id: 3, title: 'Underwater Dolphin', photographer: 'Mike Johnson', price: 59.99, category: 'marine' },
    { id: 4, title: 'Butterfly on Flower', photographer: 'Sarah Wilson', price: 29.99, category: 'others' },
    { id: 5, title: 'Elephant Family', photographer: 'David Brown', price: 69.99, category: 'mammals' },
    { id: 6, title: 'Penguin Colony', photographer: 'Lisa Garcia', price: 45.99, category: 'marine' },
    { id: 7, title: 'Tiger in Jungle', photographer: 'Robert Kim', price: 54.99, category: 'mammals' },
    { id: 8, title: 'Parrot Close-up', photographer: 'Emma Davis', price: 34.99, category: 'birds' },
    { id: 9, title: 'Sea Turtle', photographer: 'Chris Miller', price: 42.99, category: 'marine' },
    { id: 10, title: 'Deer in Forest', photographer: 'Amy Taylor', price: 37.99, category: 'mammals' },
    { id: 11, title: 'Hummingbird', photographer: 'Mark Anderson', price: 32.99, category: 'birds' },
    { id: 12, title: 'Snake in Grass', photographer: 'Jennifer Lee', price: 28.99, category: 'reptiles' },
  ];

  // Filter photos by category
  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  // Sort photos
  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPhotos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const paginatedPhotos = sortedPhotos.slice(startIndex, startIndex + photosPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Title */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Wildlife Gallery</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore our collection of stunning wildlife photography from around the world
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-green-800">Categories</h2>
                <CategoryFilter 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={setSelectedCategory} 
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Filter Bar */}
              <FilterBar 
                sortBy={sortBy} 
                onSortChange={setSortBy} 
                photoCount={sortedPhotos.length}
              />

              {/* Photo Grid */}
              <PhotoGrid photos={paginatedPhotos} />

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;
