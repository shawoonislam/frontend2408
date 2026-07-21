import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight } from "../common/Icons";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

function getDiscountPercent(product) {
    return product.price > product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
}

export default function HeroProductSlider({ products }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % products.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [products.length]);

    if (!products.length) return null;
    const product = products[active];
    const image = getMainImage(product);
    const discount = getDiscountPercent(product);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -inset-6 bg-amber/20 rounded-full blur-3xl" />

            <div className="relative bg-paper/5 border border-paper/10 rounded-2xl p-6 backdrop-blur-sm">
                <Link to={`/products/${product._id}`} className="block">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                        <img
                            key={product._id}
                            src={image}
                            alt={product.title}
                            className="w-full h-full object-cover animate-in fade-in duration-500"
                        />
                        {discount > 0 && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </Link>

                <div className="flex items-center justify-between mt-4 gap-3">
                    <div className="min-w-0">
                        <p className="text-paper text-sm font-semibold line-clamp-1">{product.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-display text-lg font-semibold text-amber">
                                ৳{product.salePrice.toLocaleString()}
                            </span>
                            {discount > 0 && (
                                <span className="text-xs text-paper/40 line-through">
                                    ৳{product.price.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <Link
                        to={`/products/${product._id}`}
                        className="shrink-0 w-10 h-10 rounded-full bg-amber text-ink flex items-center justify-center hover:bg-amber/90 transition-colors"
                        aria-label="View product"
                    >
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-5">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-amber" : "w-1.5 bg-paper/20 hover:bg-paper/40"
                                }`}
                            aria-label={`Show product ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};