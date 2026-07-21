import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchCart, addToCartApi, updateCartQuantityApi, removeCartItemApi } from "../api/cartApi";

const CartContext = createContext(null);

// TODO: replace with the real logged-in user's _id once auth is wired (e.g. from useAuth())
const DEV_USER_ID = "guest";

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingIds, setPendingIds] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCart(DEV_USER_ID).then(setItems).finally(() => setLoading(false));
    }, []);

    const setPending = (productId, isPending) => {
        setPendingIds((prev) => (isPending ? [...prev, productId] : prev.filter((id) => id !== productId)));
    };

    const addToCart = useCallback(async (product, quantity = 1) => {
        setPending(product._id, true);
        try {
            const updated = await addToCartApi(DEV_USER_ID, product, quantity);
            setItems(updated);
        } finally {
            setPending(product._id, false);
        }
    }, []);

    const incrementQuantity = useCallback(async (productId) => {
        setPending(productId, true);
        setError("");
        try {
            const updated = await updateCartQuantityApi(DEV_USER_ID, productId, "increment");
            setItems(updated);
        } catch (err) {
            setError(err.message);
        } finally {
            setPending(productId, false);
        }
    }, []);

    const decrementQuantity = useCallback(async (productId) => {
        setPending(productId, true);
        try {
            const updated = await updateCartQuantityApi(DEV_USER_ID, productId, "decrement");
            setItems(updated);
        } finally {
            setPending(productId, false);
        }
    }, []);

    const removeFromCart = useCallback(async (productId) => {
        setPending(productId, true);
        try {
            const updated = await removeCartItemApi(DEV_USER_ID, productId);
            setItems(updated);
        } finally {
            setPending(productId, false);
        }
    }, []);

    const clearCart = () => setItems([]); // TODO: wire to a real "clear cart" endpoint if you add one

    const isPending = (productId) => pendingIds.includes(productId);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items, loading, error, subtotal, totalItems,
                addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart, isPending,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
};