import { Link } from "react-router";

export default function CategoryGrid({ categories }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                    <div
                        key={cat.name}
                        className="group bg-white rounded-xl border border-ink/10 p-5 hover:border-amber hover:shadow-md transition-all duration-200"
                    >
                        <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center shrink-0 group-hover:bg-amber transition-colors">
                                <Icon size={20} className="text-amber group-hover:text-ink transition-colors" />
                            </div>
                            <h3 className="text-sm font-semibold text-ink group-hover:text-amber transition-colors">
                                {cat.name}
                            </h3>
                        </Link>

                        <div className="flex flex-col gap-1.5 pl-1">
                            {cat.subcategories.map((sub) => (
                                <Link
                                    key={sub}
                                    to={`/products?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                                    className="text-xs text-slate hover:text-amber transition-colors w-fit"
                                >
                                    {sub}
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};