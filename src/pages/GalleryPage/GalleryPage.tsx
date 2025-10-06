import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import Footer from "../../components/common/Footer/Footer";
import CategoryFilter from "../../components/gallery/CategoryFilter/CategoryFilter";
import Pagination from "../../components/gallery/Pagination/Pagination";
import FilterBar from "../../components/gallery/FilterBar/FilterBar";
import PhotoGrid from "../../components/gallery/PhotoGrid/PhotoGrid";
import PhotoService, { type PhotoCategory, type PhotoSearchRequest } from "../../services/photoService";

interface Photo {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  weight: number;
  weightUnit: string;
  length: number;
  width: number;
  height: number;
  customizable: boolean;
  freeShipping: boolean;
  qtyInStock: number;
  productId: number;
  categoryId: string;
  imageUrl: string; // Changed from 'image' to 'imageUrl' for consistency
}

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const photosPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories only once
        if (categories.length === 0) {
          const categoriesData = await PhotoService.getCategories();
          setCategories(categoriesData);
        }

        // Prepare search parameters
        const searchParams: PhotoSearchRequest = {
          category: selectedCategory === "all" ? undefined : selectedCategory,
          sort: sortBy,
          page: currentPage - 1, // Backend typically expects 0-based page index
          size: photosPerPage,
        };

        // Fetch photos with pagination, filtering, and sorting
        const response = await PhotoService.searchPhotos(searchParams);

        // Map response to Photo type
        const mappedPhotos: Photo[] = response.content.map((photo) => ({
          id: photo.id || "",
          name: photo.name || "Unnamed Photo",
          sku: photo.sku || "UNKNOWN_SKU",
          description: photo.description || "No description available",
          price: photo.price ?? 0,
          weight: photo.weight ?? 0,
          weightUnit: photo.weightUnit || "kg",
          length: photo.length ?? 0,
          width: photo.width ?? 0,
          height: photo.height ?? 0,
          customizable: photo.customizable ?? false,
          freeShipping: photo.freeShipping ?? false,
          qtyInStock: photo.qtyInStock ?? 0,
          productId: photo.productId ?? 0,
          categoryId: photo.categoryId || "",
          imageUrl: photo.imageUrl || "", // Use imageUrl
        }));

        setPhotos(mappedPhotos);
        setTotalPages(response.totalPages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch gallery data. Please try again.");
        console.error("Error fetching gallery data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, currentPage, sortBy]); // Removed categories.length

  const handleRetry = () => {
    setCurrentPage(1); // Reset to first page
    setError(null); // Clear error
    // Re-run will be triggered by useEffect due to currentPage change
  };

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
            <button
              onClick={handleRetry}
              className="ml-4 inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
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
                  categories={[{
                    id: "all", name: "All Categories",
                    description: ""
                  }, ...categories]}
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