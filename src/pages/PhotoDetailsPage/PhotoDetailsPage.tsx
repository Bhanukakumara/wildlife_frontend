import Navbar from '../../components/common/Navbar/Navbar.tsx'
import Breadcrumb from '../../components/common/Breadcrumb/Breadcrumb'
import PhotoModel from '../../components/gallery/PhotoModal/PhotoModel'

const PhotoDetailsPage = () => {
  return (
    <div>
        <Navbar/>
        <Breadcrumb/>
        <PhotoModel />
    </div>
    
  )
}

export default PhotoDetailsPage