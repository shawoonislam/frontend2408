import { useState } from "react";
import { useParams, Link } from "react-router";
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Star } from "../../components/common/Icons";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import Button from "../../components/common/Button";
import { mockProducts } from "../../utils/mockProducts";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    const [selectedQty, setSelectedQty] = useState(1);
    const { addToCart, isPending } = useCart();

    // TODO: replace with data fetched from GET /get-single-product/:id
    const product = mockProducts.find((p) => p._id === id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <p className="text-slate">Product not found.</p>
                <Link to="/products" className="text-amber font-medium hover:underline mt-2 inline-block">
                    Back to products
                </Link>
            </div>
        );
    }

    const outOfStock = product.stock === 0;
    const discount = product.price > product.salePrice
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;
    const pending = isPending(product._id);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-sm text-slate mb-6">
                <Link to="/" className="hover:text-ink">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-ink">Products</Link>
                <span className="mx-2">/</span>
                <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
                    {product.category}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductImageGallery images={product.images} />

                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-amber font-medium uppercase tracking-wide">{product.category}</p>
                        {product.brand && <span className="text-xs text-slate/50">· {product.brand}</span>}
                    </div>
                    <h1 className="font-display text-3xl font-semibold text-ink mt-2">{product.title}</h1>

                    {product.numReviews > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <Star
                                        key={n}
                                        size={14}
                                        className={n <= Math.round(product.averageRating) ? "text-amber" : "text-ink/15"}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-slate">
                                {product.averageRating.toFixed(1)} ({product.numReviews} reviews)
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 mt-4">
                        <span className="font-display text-3xl font-semibold text-ink">৳{product.salePrice.toLocaleString()}</span>
                        {discount > 0 && (
                            <>
                                <span className="text-base text-slate/40 line-through">৳{product.price.toLocaleString()}</span>
                                <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full">-{discount}%</span>
                            </>
                        )}
                    </div>

                    <div className="mt-2">
                        {outOfStock ? (
                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>
                        ) : (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                {product.stock} in stock
                            </span>
                        )}
                    </div>

                    <p className="text-slate text-sm leading-relaxed mt-5">
                        {product.shortDescription || product.description}
                    </p>

                    {/* Buy box */}
                    <div className="mt-8 p-5 rounded-xl border border-ink/10 bg-white">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-sm font-medium text-ink">Quantity</span>
                            <div className="flex items-center border border-ink/15 rounded-lg w-fit">
                                <button
                                    onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                                    className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center text-sm font-medium">{selectedQty}</span>
                                <button
                                    onClick={() => setSelectedQty((q) => Math.min(product.stock, q + 1))}
                                    className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="accent"
                                loading={pending}
                                disabled={outOfStock}
                                onClick={() => addToCart(product, selectedQty)}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={17} /> Add to Cart
                            </Button>
                            <button
                                className="w-11 h-11 shrink-0 rounded-lg border border-ink/15 flex items-center justify-center
                  text-ink/60 hover:text-red-500 hover:border-red-200 transition-colors"
                                aria-label="Add to wishlist"
                            >
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-6">
                        {[
                            { icon: Truck, label: "Fast delivery" },
                            { icon: ShieldCheck, label: "Secure payment" },
                            { icon: RotateCcw, label: "7-day return" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-1.5 py-3 rounded-lg bg-ink/[0.03]">
                                <Icon size={18} className="text-amber" />
                                <span className="text-xs text-slate">{label}</span>
                            </div>
                        ))}
                    </div>

                    {(product.description || product.additionalInformation) && (
                        <div className="mt-8 pt-6 border-t border-ink/10">
                            {product.description && (
                                <>
                                    <h2 className="text-sm font-semibold text-ink mb-2">Description</h2>
                                    <p className="text-sm text-slate leading-relaxed">{product.description}</p>
                                </>
                            )}
                            {product.additionalInformation && (
                                <>
                                    <h2 className="text-sm font-semibold text-ink mt-5 mb-2">Additional Information</h2>
                                    <p className="text-sm text-slate leading-relaxed">{product.additionalInformation}</p>
                                </>
                            )}
                            {product.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-ink/5 text-ink/60">#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};