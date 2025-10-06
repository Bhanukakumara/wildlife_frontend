import PhotoCard from '../PhotoCard/PhotoCard';

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

interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default PhotoGrid;