import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "../common/Icons";
import { useCart } from "../../context/CartContext";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

function getDiscountPercent(product) {
    return product.price > product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
}

export default function ProductCard({ product }) {
    const { addToCart, isPending } = useCart();
    const image = getMainImage(product);
    const outOfStock = product.stock === 0;
    const discount = getDiscountPercent(product);
    const pending = isPending(product._id);

    return (
        <div className="group relative bg-white rounded-xl border border-ink/10 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            <Link to={`/products/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-ink/5">
                    <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    {outOfStock && (
                        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
                            <span className="text-paper text-xs font-semibold uppercase tracking-wide px-3 py-1 bg-ink/80 rounded-full">
                                Out of Stock
                            </span>
                        </div>
                    )}
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
              text-ink/60 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        aria-label="Add to wishlist"
                    >
                        <Heart size={15} />
                    </button>
                </div>
            </Link>

            <div className="p-4">
                <p className="text-xs text-amber font-medium uppercase tracking-wide">{product.category}</p>
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-sm font-semibold text-ink mt-1 line-clamp-2 hover:text-amber transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {product.numReviews > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                        <Star size={12} className="text-amber" fill="currentColor" />
                        <span className="text-xs text-slate">{product.averageRating.toFixed(1)} ({product.numReviews})</span>
                    </div>
                )}

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                        <span className="font-display text-lg font-semibold text-ink">৳{product.salePrice.toLocaleString()}</span>
                        {discount > 0 && (
                            <span className="text-xs text-slate/50 line-through">৳{product.price.toLocaleString()}</span>
                        )}
                    </div>
                    <button
                        disabled={outOfStock || pending}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                        }}
                        className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center
              hover:bg-amber hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};