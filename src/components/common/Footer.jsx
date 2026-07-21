import { useState } from "react";
import { Link } from "react-router";
import {
    Mail, Truck, ShieldCheck, RotateCcw, CreditCard,
    FacebookIcon, InstagramIcon, TwitterIcon,
} from "../common/Icons";

const trustPoints = [
    { icon: Truck, label: "Fast Delivery", desc: "Nationwide shipping" },
    { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected checkout" },
    { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
    { icon: CreditCard, label: "Flexible Payment", desc: "Cards & mobile banking" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        // TODO: wire to a newsletter endpoint if/when you build one
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="bg-ink text-paper/80 mt-20">
            {/* Trust strip */}
            <div className="border-b border-paper/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {trustPoints.map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                            <Icon size={20} className="text-amber shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-paper">{label}</p>
                                <p className="text-xs text-paper/50 mt-0.5">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand + newsletter */}
                    <div className="lg:col-span-2">
                        <h3 className="font-display text-xl font-semibold text-paper">
                            Eco<span className="text-amber">Bazaar</span>
                        </h3>
                        <p className="text-sm mt-2 text-paper/60 max-w-xs">
                            A training platform for people who'd rather learn by doing.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-5 max-w-xs">
                            <p className="text-xs font-medium text-paper/70 mb-2">Get updates on new products & offers</p>
                            {subscribed ? (
                                <p className="text-sm text-amber">Thanks — you're subscribed.</p>
                            ) : (
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/40" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email"
                                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper/10 border border-paper/15 text-sm text-paper
                        placeholder:text-paper/40 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-amber text-ink text-sm font-semibold hover:bg-amber/90 transition-colors shrink-0"
                                    >
                                        Join
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Shop</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/products" className="hover:text-amber transition-colors">All Products</Link></li>
                            <li><Link to="/cart" className="hover:text-amber transition-colors">Cart</Link></li>
                            <li><Link to="/my-orders" className="hover:text-amber transition-colors">My Orders</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Account</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/login" className="hover:text-amber transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-amber transition-colors">Register</Link></li>
                            <li><Link to="/profile" className="hover:text-amber transition-colors">Profile</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/resend-verification" className="hover:text-amber transition-colors">Verify Email</Link></li>
                            <li><Link to="/forgot-password" className="hover:text-amber transition-colors">Reset Password</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-paper/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-paper/40">
                        © {new Date().getFullYear()} EcoBazaar. Built with AI. Powered by Ashraf Shahin.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" aria-label="Facebook" className="text-paper/50 hover:text-amber transition-colors">
                            <FacebookIcon />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-paper/50 hover:text-amber transition-colors">
                            <InstagramIcon />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-paper/50 hover:text-amber transition-colors">
                            <TwitterIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};