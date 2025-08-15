const PhotoModel = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-96 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
        <div className="text-6xl text-white">📷</div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Majestic Lion Portrait</h1>
            <p className="text-gray-600">Photographer: John Smith</p>
          </div>
          <div className="text-2xl font-bold text-amber-600">$49.99</div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700">
            A stunning portrait of a male lion in the Serengeti, captured during golden hour.
            This photograph showcases the raw power and beauty of one of Africa's most iconic predators.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Wildlife</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Africa</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Portrait</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Big Cat</span>
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Add to Cart
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300">
            Download Sample
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModel;