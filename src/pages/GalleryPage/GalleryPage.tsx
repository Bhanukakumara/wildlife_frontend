import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import Footer from "../../components/common/Footer/Footer";
import CategoryFilter from "../../components/gallery/CategoryFilter/CategoryFilter";
import Pagination from "../../components/gallery/Pagination/Pagination";
import FilterBar from "../../components/gallery/FilterBar/FilterBar";
import PhotoGrid from "../../components/gallery/PhotoGrid/PhotoGrid";
import PhotoService from "../../services/photoService";
import type { Photo as ServicePhoto, PhotoCategory } from "../../services/photoService";

// Define the Photo type that includes all properties needed by both PhotoGrid and PhotoCard
interface Photo {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  photos: Photo[];
}

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const photosPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories only once
        if (categories.length === 0) {
          const categoriesData = await PhotoService.getCategories();
          setCategories(categoriesData);
        }

        // Fetch photos
        const photosData = await PhotoService.getAllPhotos();

        // Map ServicePhoto to Photo type expected by components
        const mappedPhotos: Photo[] = photosData.map(photo => ({
          id: photo.id,
          name: photo.name,
          imageUrl: photo.imageUrl,
          description: photo.description || "No description available",
          price: photo.price || 0, // Default to 0 if price is missing
          active: true, // Default to active
          createdAt: photo.createdAt || new Date().toISOString(),
          updatedAt: photo.updatedAt || new Date().toISOString(),
          createdBy: "Unknown", // Default value
          updatedBy: "Unknown", // Default value
          photos: [], // Empty array as default
        }));

        setPhotos(mappedPhotos);
        // Note: photosData is an array, not an object with totalPages property
        // We'll need to calculate totalPages based on the array length and photosPerPage
        setTotalPages(Math.ceil(photosData.length / photosPerPage));
      } catch (err) {
        setError("Failed to fetch gallery data");
        console.error("Error fetching gallery data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentPage, sortBy, categories.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />

      {/* Page Title */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Wildlife Gallery
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore our collection of stunning wildlife photography from around
            the world
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
                <h2 className="text-2xl font-bold mb-4 text-green-800">
                  Categories
                </h2>
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  categories={categories}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {/* Filter Bar */}
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                photoCount={photos.length}
              />

              {/* Photo Grid */}
              <PhotoGrid photos={photos} />

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
