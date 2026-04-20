import { combineReducers } from 'redux';
import { userSlice, authApi } from '@entities/user';
import { cartSlice } from '@entities/cart';
import { productsApi } from '@entities/product';
import { catalogSlice } from '@shared/store/slices/catalog';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[catalogSlice.name]: catalogSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});
