import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="bg-[var(--wildlife-bg-light)] rounded-xl shadow-lg p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-[var(--wildlife-primary-light)] rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-[var(--wildlife-primary)] rounded-full"></div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-[var(--wildlife-primary-dark)]">
        Your Cart is Empty
      </h2>
      <p className="text-[var(--wildlife-text-muted)] mb-8 max-w-md mx-auto">
        You haven't added any wildlife photos to your cart yet. Start exploring
        our gallery to find amazing wildlife photography!
      </p>

      <Link
        to="/gallery"
        className="inline-block bg-[var(--wildlife-primary)] hover:bg-[var(--wildlife-primary-dark)] text-[var(--wildlife-text-light)] font-bold py-3 px-8 rounded-lg transition duration-300"
      >
        Browse Gallery
      </Link>
    </div>
  );
};

export default EmptyCart;
