const STORAGE_KEY = 'dogfood.cart';

type StoredCart = {
	products: CartProduct[];
};

const empty: StoredCart = { products: [] };

export const loadCart = (): StoredCart => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw) as StoredCart;
		if (!parsed || !Array.isArray(parsed.products)) return empty;
		return parsed;
	} catch {
		return empty;
	}
};

export const saveCart = (cart: StoredCart): void => {
	try {
		if (!cart.products.length) {
			localStorage.removeItem(STORAGE_KEY);
			return;
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
	} catch {
	}
};
