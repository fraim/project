import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@entities/user';
import { productsApi } from '@entities/product';
import { saveAuth } from '@shared/lib/authStorage';
import { saveCart } from '@shared/lib/cartStorage';
import { rootReducer } from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			productsApi.middleware,
		]),
});

let prevUserState = store.getState().user;
let prevCartState = store.getState().cart;
store.subscribe(() => {
	const state = store.getState();
	if (state.user !== prevUserState) {
		prevUserState = state.user;
		saveAuth({
			user: state.user.user,
			accessToken: state.user.accessToken,
		});
	}
	if (state.cart !== prevCartState) {
		prevCartState = state.cart;
		saveCart({ products: state.cart.products });
	}
});
