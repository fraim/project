import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/lib/hooks';
import { isLiked } from '@shared/utils';
import { userSelectors } from '@entities/user';
import { useGetProductsQuery } from '@entities/product';
import { catalogSelectors } from '@shared/store/slices/catalog';

export const useProducts = () => {
	const { pathname } = useLocation();

	const { searchText, page, perPage, sort } = useAppSelector(
		catalogSelectors.getCatalogState
	);

	const isFavoritesPage = pathname === '/favorites';
	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage: isFavoritesPage ? undefined : perPage,
	});

	let products = data?.products || [];

	const user = useAppSelector(userSelectors.getUser);

	if (isFavoritesPage) {
		products = products.filter((product) => isLiked(product.likes, user?.id));
	}

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
