import { RefObject, useCallback, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useProducts } from '@shared/store/hooks/useProducts';
import { catalogActions, catalogSelectors } from '@shared/store/slices/catalog';

interface UseLoadMoreParams {
	ref: RefObject<HTMLDivElement | null>;
}

export const useLoadMore = ({ ref }: UseLoadMoreParams) => {
	const dispatch = useAppDispatch();
	const { products, isFetching, productsCount } = useProducts();
	const page = useAppSelector(catalogSelectors.getPage);

	const isEndOfList = products.length >= productsCount;

	const fetchMore = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(catalogActions.setPage(page + 1));
		}
	}, [isEndOfList, isFetching, page, dispatch]);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined;

		if (!isEndOfList && products.length) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						fetchMore();
					}
				},
				{ threshold: 0.5 }
			);
			if (ref.current) observer.observe(ref.current);
		}

		return () => observer?.disconnect();
	}, [fetchMore, isEndOfList, products.length, ref]);

	return { isEndOfList, isFetching };
};
