import { Link } from "react-router";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from "../../components/common/Icons";
import ProductCard from "../../components/product/ProductCard";
import OfferSlider from "../../components/product/OfferSlider";
import { mockProducts } from "../../utils/mockProducts";
import { mockOffers } from "../../utils/mockOffers";
import HeroProductSlider from "../../components/product/HeroProductSlider";

import { categories } from "../../utils/mockCategories";
import CategoryGrid from "../../components/product/CategoryGrid";

// const categories = [
//     { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
//     { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400" },
//     { name: "Home & Living", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400" },
//     { name: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
//     { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
//     { name: "Sports", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400" },
// ];

const trustPoints = [
    { icon: Truck, label: "Fast Delivery", desc: "Nationwide, 2-5 days" },
    { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected checkout" },
    { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
    { icon: Headphones, label: "24/7 Support", desc: "Always here to help" },
];

export default function Home() {
    const featured = mockProducts.slice(0, 4);
    const newArrivals = [...mockProducts].reverse().slice(0, 4);

    return (
        <div>
            {/* Hero */}
            
            <section className="bg-ink relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06] `bg-[radial-gradient(circle_at_1px_1px,_theme(colors.amber)_1px,_transparent_0)]` `bg-[length:24px_24px]`" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Left: text */}
                        <div className="max-w-xl">
                            <p className="text-amber text-sm font-semibold tracking-wide uppercase mb-3">New Season Arrivals</p>
                            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-paper leading-tight">
                                Everything you need, delivered to your door.
                            </h1>
                            <p className="text-paper/60 text-base mt-4 max-w-md">
                                Shop electronics, fashion, home essentials, and more — all in one place, with fast delivery across Bangladesh.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 mt-7 bg-amber text-ink font-semibold text-sm px-6 py-3 rounded-lg hover:bg-amber/90 transition-colors"
                            >
                                Shop Now <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Right: rotating product showcase */}
                        <div className="hidden lg:block">
                            <HeroProductSlider products={mockOffers} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust strip */}
            <section className="border-b border-ink/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {trustPoints.map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex items-center gap-3">
                            <Icon size={20} className="text-amber shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-ink">{label}</p>
                                <p className="text-xs text-slate">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Today's Deals slider */}
            <OfferSlider
                products={mockOffers}
                title="Today's Deals"
                subtitle="Limited-time offers — grab them before they're gone"
            />

            {/* Shop by category */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Shop by Category</h2>
                        <p className="text-sm text-slate mt-1">Browse our full range of departments</p>
                    </div>
                </div>

                <CategoryGrid categories={categories} />
            </section>

            {/* Featured products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Featured Products</h2>
                        <p className="text-sm text-slate mt-1">Hand-picked picks our customers love</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featured.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Promo banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="bg-amber/10 border border-amber/20 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <p className="text-amber text-sm font-semibold uppercase tracking-wide mb-2">Limited Time</p>
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                            Free shipping on all orders over ৳2,000
                        </h3>
                        <p className="text-slate text-sm mt-2">No code needed — discount applied automatically at checkout.</p>
                    </div>
                    <Link
                        to="/products"
                        className="shrink-0 bg-ink text-paper font-semibold text-sm px-6 py-3 rounded-lg hover:bg-ink/90 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            </section>

            {/* New arrivals */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">New Arrivals</h2>
                        <p className="text-sm text-slate mt-1">Just landed in our store</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {newArrivals.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};