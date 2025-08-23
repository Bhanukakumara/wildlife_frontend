import { Link } from "react-router-dom";

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

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  return (
    <Link to={`/photos/${photo.id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
        <div className="h-48 bg-gradient-to-r from-green-300 to-emerald-400">
          {photo.imageUrl ? (
            <img src={photo.imageUrl} alt={photo.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1 text-green-800">{photo.name}</h3>
          <p className="text-gray-600 text-sm mb-3">by {photo.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-amber-600 font-bold">${photo.active}</span>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent link navigation when clicking button
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;
