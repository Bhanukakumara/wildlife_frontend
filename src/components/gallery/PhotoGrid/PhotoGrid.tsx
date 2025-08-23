import PhotoCard from '../PhotoCard/PhotoCard';

interface Photo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  photos: Photo[];
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