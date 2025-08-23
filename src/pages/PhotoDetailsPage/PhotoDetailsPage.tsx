import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar.tsx'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import photoService from '../../services/photoService';
import type { Photo } from '../../services/photoService';
// import AddToCartForm from '../../components/cart/AddToCartForm/AddToCartForm.tsx'; // You'll need to create this component


const PhotoDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const photoData = await photoService.getPhotoById(id!); // Fetch photo details by ID
      setPhoto(photoData);
    };
    fetchPhoto();
  }, [id]);

  return (
    <div>
        <Navbar/>
        {photo && <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Gallery', path: '/gallery' }, { label: photo.title, path: `/photo/${photo.id}` }]} />}
    </div>
    
  )
}

export default PhotoDetailsPage