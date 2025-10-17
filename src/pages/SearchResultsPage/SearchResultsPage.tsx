import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';
import PhotoGrid from '../../components/gallery/PhotoGrid/PhotoGrid';
import Pagination from '../../components/gallery/Pagination/Pagination';
import { allPhotos } from '../GalleryPage/galleryData.ts';

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  // Filter photos based on search query (updated to search name and photographer)
  const filteredPhotos = allPhotos.filter(photo => 
    photo.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const paginatedPhotos = filteredPhotos.slice(startIndex, startIndex + photosPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      {/* Page Navbar */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Search Results</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            {query ? `Results for "${query}"` : 'All Photos'}
          </p>
        </div>
      </section>

      {/* Search Results Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {paginatedPhotos.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Found <span className="font-bold">{filteredPhotos.length}</span> results
                  {query && (
                    <span> for "<span className="font-bold">{query}</span>"</span>
                  )}
                </p>
              </div>
              
              <PhotoGrid photos={paginatedPhotos} />
              
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-100 to-emerald-200 rounded-full flex items-center justify-center mb-6">
                <div className="text-4xl text-green-500">🔍</div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 text-green-800">No Results Found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any wildlife photos matching your search for "{query}".
                Try different keywords or browse our gallery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/gallery" 
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  Browse Gallery
                </a>
                <a 
                  href="/" 
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  Go Home
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;