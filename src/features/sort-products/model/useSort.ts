import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { catalogActions, catalogSelectors } from '@shared/store/slices/catalog';

type SortOption = {
	title: string;
	value: Sort;
};

const SORT_OPTIONS: SortOption[] = [
	{ title: 'Дешевые', value: 'low-price' },
	{ title: 'Дорогие', value: 'high-price' },
	{ title: 'Новые', value: 'newest' },
	{ title: 'Старые', value: 'oldest' },
];

export const useSort = () => {
	const dispatch = useAppDispatch();
	const sort = useAppSelector(catalogSelectors.getSort);

	const setSort = useCallback(
		(newSort: Sort) => {
			dispatch(catalogActions.setSort(newSort));
		},
		[dispatch]
	);

	const sortOptions = useMemo(() => SORT_OPTIONS, []);

	return { sort, setSort, sortOptions };
};
