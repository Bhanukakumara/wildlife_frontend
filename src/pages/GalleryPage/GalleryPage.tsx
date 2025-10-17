import { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar.tsx";
import Footer from "../../components/common/Footer/Footer";
import PhotoGrid from "../../components/gallery/PhotoGrid/PhotoGrid";
import { allPhotos } from "./galleryData.ts";


const GalleryPage = () => {
  const [selectedCategory] = useState<string>("all");

  // Static data for categories

  // Static data for photos (sample wildlife photos with placeholder image URLs from Unsplash or similar)

  // Filter photos based on selected category (client-side filtering)
  const photos = selectedCategory === "all" 
    ? allPhotos 
    : allPhotos.filter(photo => photo.categoryId === selectedCategory);

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
            {/* Sidebar Filters (only category left) */}
            {/* <div className="md:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-green-800">
                  Categories
                </h2>
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  categories={[{ id: "all", name: "All Categories", description: "" }, ...categories]}
                />
              </div>
            </div> */}

            {/* Main Content (grid only, no sort or pagination) */}
            <div className="md:w-4/4">
              <PhotoGrid photos={photos} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;