import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadCart } from '@shared/lib/cartStorage';

interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: loadCart().products,
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			state.products = [...state.products, action.payload];
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			state.products = state.products.map((p) => ({
				...p,
				count: p.id === action.payload.id ? action.payload.count : p.count,
			}));
		},
		clearCart(): CartState {
			return { products: [] };
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
		getCartCount: (state: CartState) => state.products.length,
	},
});

export const cartActions = { ...cartSlice.actions };
export const cartSelectors = cartSlice.selectors;
