import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/hooks';
import { useDebounce } from '@shared/hooks/useDebounce';
import { catalogActions } from '@shared/store/slices/catalog';

const QUERY_SEARCH_PHRASE = 'q';

export const useSearchForm = () => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		() => searchParams.get(QUERY_SEARCH_PHRASE) ?? ''
	);

	const debouncedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		dispatch(catalogActions.setSearchText(debouncedValue));
	}, [debouncedValue, dispatch]);

	useEffect(() => {
		if (searchValue) {
			searchParams.set(QUERY_SEARCH_PHRASE, searchValue);
		} else {
			searchParams.delete(QUERY_SEARCH_PHRASE);
		}
		setSearchParams(searchParams);
	}, [searchParams, searchValue, setSearchParams]);

	const clear = useCallback(() => setSearchValue(''), []);

	return { searchValue, setSearchValue, clear };
};
