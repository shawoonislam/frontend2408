// Simulates your real cart endpoints with a fake network delay + localStorage
// as a stand-in "server". Swap each function's internals for a real fetch()
// call to your Express routes when you wire the backend — the function
// signatures below are written to match your route shapes.

const CART_DB_KEY = "ecobazaar_server_cart_mock";
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

function readServerCart(userId) {
    try {
        const all = JSON.parse(localStorage.getItem(CART_DB_KEY)) || {};
        return all[userId] || [];
    } catch {
        return [];
    }
}

function writeServerCart(userId, cart) {
    const all = JSON.parse(localStorage.getItem(CART_DB_KEY)) || {};
    all[userId] = cart;
    localStorage.setItem(CART_DB_KEY, JSON.stringify(all));
}

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

// TODO: replace with real GET /cart/:userId
export async function fetchCart(userId) {
    await delay(300);
    return readServerCart(userId);
}

// TODO: replace with real POST /create-cart/:userId
export async function addToCartApi(userId, product, quantity = 1) {
    await delay(400);
    const cart = readServerCart(userId);
    const existing = cart.find((i) => i.productId === product._id);

    if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
        cart.push({
            productId: product._id,
            title: product.title,
            price: product.salePrice,
            image: getMainImage(product),
            stock: product.stock,
            quantity: Math.min(quantity, product.stock),
        });
    }

    writeServerCart(userId, cart);
    return cart;
}

// TODO: replace with real POST /update-cart/:userId/:productId
// body would carry { action: "increment" | "decrement" }
export async function updateCartQuantityApi(userId, productId, action) {
    await delay(350);
    const cart = readServerCart(userId);
    const item = cart.find((i) => i.productId === productId);
    if (!item) throw new Error("Item not found in cart");

    if (action === "increment") {
        if (item.quantity >= item.stock) throw new Error("No more stock available");
        item.quantity += 1;
    } else if (action === "decrement") {
        item.quantity = Math.max(1, item.quantity - 1);
    }

    writeServerCart(userId, cart);
    return cart;
}

// TODO: replace with real DELETE /delete-cart-product/:userId/:productId
export async function removeCartItemApi(userId, productId) {
    await delay(300);
    const cart = readServerCart(userId).filter((i) => i.productId !== productId);
    writeServerCart(userId, cart);
    return cart;
}