import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx';
import Footer from '../../components/common/Footer/Footer';
import PhotoGrid from '../../components/gallery/PhotoGrid/PhotoGrid';
import Pagination from '../../components/gallery/Pagination/Pagination';

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  // Mock search results
  const allPhotos = [
    { id: 1, title: "Lion Portrait", photographer: "John Smith", price: 49.99 },
    { id: 2, title: "Eagle in Flight", photographer: "Jane Doe", price: 39.99 },
    { id: 3, title: "Underwater Dolphin", photographer: "Mike Johnson", price: 59.99 },
    { id: 4, title: "Butterfly on Flower", photographer: "Sarah Wilson", price: 29.99 },
    { id: 5, title: "Elephant Family", photographer: "David Brown", price: 69.99 },
    { id: 6, title: "Penguin Colony", photographer: "Lisa Garcia", price: 45.99 },
    { id: 7, title: "Tiger in Jungle", photographer: "Robert Kim", price: 54.99 },
    { id: 8, title: "Parrot Close-up", photographer: "Emma Davis", price: 34.99 },
    { id: 9, title: "Sea Turtle", photographer: "Chris Miller", price: 42.99 },
    { id: 10, title: "Deer in Forest", photographer: "Amy Taylor", price: 37.99 },
    { id: 11, title: "Hummingbird", photographer: "Mark Anderson", price: 32.99 },
    { id: 12, title: "Snake in Grass", photographer: "Jennifer Lee", price: 28.99 },
    { id: 13, title: "Wolf Pack", photographer: "Thomas Clark", price: 52.99 },
    { id: 14, title: "Gorilla Portrait", photographer: "Maria Rodriguez", price: 64.99 },
    { id: 15, title: "Whale Breaching", photographer: "James Wilson", price: 74.99 },
  ];

  // Filter photos based on search query
  const filteredPhotos = allPhotos.filter(photo => 
    photo.title.toLowerCase().includes(query.toLowerCase()) ||
    photo.photographer.toLowerCase().includes(query.toLowerCase())
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