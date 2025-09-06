import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import photoService from '../../services/photoService';
import type { Photo } from '../../services/photoService';
import AddToCartForm from '../../components/cart/AddToCartForm/AddToCartForm.tsx';
import Footer from '../../components/common/Footer/Footer';


const PhotoDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        const photoData = await photoService.getPhotoById(id!);
        setPhoto(photoData);
        
        // Fetch related photos (for now, we'll just get some random photos)
        const allPhotos = await photoService.getAllPhotos();
        const filteredPhotos = allPhotos
          .filter(p => p.id !== photoData.id)
          .slice(0, 4);
        setRelatedPhotos(filteredPhotos);
      } catch (err) {
        setError('Failed to fetch photo details');
        console.error('Error fetching photo:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchPhoto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error || 'Photo not found'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {photo && (
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Gallery', path: '/gallery' },
              { label: photo.name, path: `/photo/${photo.id}` }
            ]}
          />
        )}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Photo Image */}
            <div className="flex flex-col">
              <div className="bg-gradient-to-r from-green-300 to-emerald-400 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-white font-bold text-xl">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
            
            {/* Photo Details */}
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-4">{photo.name}</h1>
              <p className="text-gray-600 mb-6">{photo.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">SKU</h3>
                  <p className="text-gray-700">{photo.sku}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Price</h3>
                  <p className="text-2xl font-bold text-amber-600">${photo.price.toFixed(2)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Dimensions</h3>
                  <p className="text-gray-700">{photo.length}" × {photo.width}" × {photo.height}"</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Weight</h3>
                  <p className="text-gray-700">{photo.weight} {photo.weightUnit}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="mr-4 font-bold text-green-800">Availability:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${photo.qtyInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {photo.qtyInStock > 0 ? `${photo.qtyInStock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              {photo.qtyInStock > 0 && (
                <AddToCartForm
                  productItemId={parseInt(photo.id)}
                  price={photo.price}
                  title={photo.name}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Related Photos */}
        {relatedPhotos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Related Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedPhotos.map(relatedPhoto => (
                <div key={relatedPhoto.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
                  <div className="h-48 bg-gradient-to-r from-green-300 to-emerald-400">
                    {relatedPhoto.imageUrl ? (
                      <img src={relatedPhoto.imageUrl} alt={relatedPhoto.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 text-green-800">{relatedPhoto.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPhoto.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-600 font-bold">${relatedPhoto.price.toFixed(2)}</span>
                      <Link to={`/photo/${relatedPhoto.id}`} className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition duration-300">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default PhotoDetailsPage