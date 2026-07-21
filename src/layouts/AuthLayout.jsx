import { Link } from "react-router";

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Brand panel */}
            <div className="hidden md:flex flex-col justify-between bg-ink text-paper p-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06] `bg-[radial-gradient(circle_at_1px_1px,_theme(colors.amber)_1px,_transparent_0)]` `bg-[length:24px_24px]`" />

                <Link to="/" className="font-display text-2xl font-semibold relative z-10">
                    Eco<span className="text-amber">Bazaar</span>
                </Link>

                <div className="relative z-10 max-w-sm">
                    <p className="font-display text-3xl leading-snug">
                        Everything you need to buy, sell, and manage — in one place.
                    </p>
                    <p className="text-paper/50 text-sm mt-4">
                        Built as a hands-on training project with React and a custom Node/Express API.
                    </p>
                </div>

                <div className="relative z-10 text-xs text-paper/30">
                    © {new Date().getFullYear()} EcoBazaar
                </div>
            </div>

            {/* Form panel */}
            <div className="flex items-center justify-center p-6 sm:p-10 bg-paper">
                <div className="w-full max-w-sm">
                    <div className="md:hidden mb-8">
                        <Link to="/" className="font-display text-2xl font-semibold text-ink">
                            Eco<span className="text-amber">Bazaar</span>
                        </Link>
                    </div>

                    <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
                    {subtitle && <p className="text-slate text-sm mt-1.5">{subtitle}</p>}

                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </div>
    );
};