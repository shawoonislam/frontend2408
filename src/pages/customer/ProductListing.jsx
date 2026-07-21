import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal } from "../../components/common/Icons";
import ProductGrid from "../../components/product/ProductGrid";
import Pagination from "../../components/common/Pagination";
import PriceRangeSlider from "../../components/product/PriceRangeSlider";
import MobileFilterDrawer from "../../components/product/MobileFilterDrawer";
import { mockProducts } from "../../utils/mockProducts";
import { categories } from "../../utils/mockCategories";

const PER_PAGE = 8;
const PRICE_FLOOR = 0;
const PRICE_CEIL = 10000; // TODO: adjust to match real product price range, or calculate dynamically once backend is wired

export default function ProductListing() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";
    const subParam = searchParams.get("sub") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([
        minPrice ? Number(minPrice) : PRICE_FLOOR,
        maxPrice ? Number(maxPrice) : PRICE_CEIL,
    ]);

    // TODO: replace mockProducts with data fetched from GET /get-all-products
    // Once wired to a real API, prefer filtering status server-side (?status=active)
    // rather than fetching everything and filtering client-side as done below.
    const products = mockProducts;

    const activeCategory = categories.find((c) => c.name === categoryParam);

    const filtered = useMemo(() => {
        // Customers should only ever see active/published products —
        // pending (not yet approved) and inactive (delisted) products are excluded.
        let result = products.filter((p) => p.status === "active");

        if (search) {
            result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (categoryParam) {
            result = result.filter((p) => p.category === categoryParam);
        }
        // TODO: once products have a `subcategory` field, add:
        // if (subParam) result = result.filter((p) => p.subcategory === subParam);

        result = result.filter((p) => p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1]);

        if (sort === "price-low") result.sort((a, b) => a.salePrice - b.salePrice);
        if (sort === "price-high") result.sort((a, b) => b.salePrice - a.salePrice);
        if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));

        return result;
    }, [products, search, categoryParam, subParam, sort, priceRange]);

    useEffect(() => setPage(1), [search, categoryParam, subParam, sort, priceRange]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const setCategory = (catName) => {
        const next = new URLSearchParams(searchParams);
        if (catName) next.set("category", catName);
        else next.delete("category");
        next.delete("sub"); // reset subcategory when switching categories
        setSearchParams(next);
    };

    const setSub = (sub) => {
        const next = new URLSearchParams(searchParams);
        if (sub && sub !== subParam) next.set("sub", sub);
        else next.delete("sub");
        setSearchParams(next);
    };

    const handlePriceChange = (range) => {
        setPriceRange(range);
        const next = new URLSearchParams(searchParams);
        next.set("minPrice", range[0]);
        next.set("maxPrice", range[1]);
        setSearchParams(next);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                <div>
                    <h1 className="font-display text-3xl font-semibold text-ink">
                        {subParam || categoryParam || (search ? `Results for "${search}"` : "All Products")}
                    </h1>
                    <p className="text-sm text-slate mt-1">{filtered.length} products found</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 text-sm font-medium border border-ink/15 rounded-lg px-3 py-2"
                    >
                        <SlidersHorizontal size={15} /> Filters
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="text-sm border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber/20"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A–Z</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar filters — desktop */}
                <aside className="hidden lg:flex lg:flex-col gap-5 w-56 shrink-0">
                    <div>
                        <h3 className="text-sm font-semibold text-ink mb-3">Category</h3>
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => setCategory("")}
                                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${!categoryParam ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
                                    }`}
                            >
                                All Categories
                            </button>

                            {/* Price range — right after the reset button */}
                            <div className="pt-3">
                                <PriceRangeSlider
                                    min={PRICE_FLOOR}
                                    max={PRICE_CEIL}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className="pt-3 flex flex-col gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setCategory(cat.name)}
                                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${categoryParam === cat.name ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Subcategories — only shown once a category is active */}
                    {activeCategory && (
                        <div className="pt-5 border-t border-ink/10">
                            <h3 className="text-sm font-semibold text-ink mb-3">{activeCategory.name} — Refine</h3>
                            <div className="flex flex-col gap-1">
                                {activeCategory.subcategories.map((sub) => (
                                    <button
                                        key={sub}
                                        onClick={() => setSub(sub)}
                                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${subParam === sub ? "bg-amber text-ink font-medium" : "text-slate hover:bg-ink/5"
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    <ProductGrid products={paginated} />
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>

            {/* Mobile filter drawer */}
            <MobileFilterDrawer
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                categories={categories}
                categoryParam={categoryParam}
                setCategory={setCategory}
                activeCategory={activeCategory}
                subParam={subParam}
                setSub={setSub}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                priceFloor={PRICE_FLOOR}
                priceCeil={PRICE_CEIL}
            />
        </div>
    );
};