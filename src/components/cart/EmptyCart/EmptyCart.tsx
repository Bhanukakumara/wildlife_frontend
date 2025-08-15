import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-100 to-emerald-200 rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-green-800">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven't added any wildlife photos to your cart yet. Start exploring our gallery to find amazing wildlife photography!
      </p>
      
      <Link 
        to="/gallery" 
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
      >
        Browse Gallery
      </Link>
    </div>
  );
};

export default EmptyCart;