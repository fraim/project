import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CatalogState = {
	sort: Sort;
	page: number;
	perPage: number;
	searchText: string;
};

const initialState: CatalogState = {
	searchText: '',
	sort: 'newest',
	page: 1,
	perPage: 8,
};

export const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setSort: (state, action: PayloadAction<Sort>) => ({
			...state,
			sort: action.payload,
		}),
		setSearchText: (state, action: PayloadAction<string>) => ({
			...state,
			searchText: action.payload,
		}),
		setPage: (state, action: PayloadAction<number>) => ({
			...state,
			page: action.payload,
		}),
	},
	selectors: {
		getSort: (state: CatalogState) => state.sort,
		getSearchText: (state: CatalogState) => state.searchText,
		getPage: (state: CatalogState) => state.page,
		getPerPage: (state: CatalogState) => state.perPage,
		getCatalogState: (state: CatalogState) => state,
	},
});

export const catalogActions = { ...catalogSlice.actions };
export const catalogSelectors = catalogSlice.selectors;
