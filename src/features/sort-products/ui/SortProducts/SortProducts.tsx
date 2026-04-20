import { ChangeEvent, FC, useCallback } from 'react';
import { useSort } from '../../model/useSort';
import s from './SortProducts.module.css';

export const SortProducts: FC = () => {
	const { sort, setSort, sortOptions } = useSort();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			setSort(e.target.value as Sort);
		},
		[setSort]
	);

	return (
		<select
			className={s.select}
			value={sort}
			onChange={handleChange}
			aria-label='Сортировка товаров'>
			{sortOptions.map((o) => (
				<option key={o.value} value={o.value}>
					{o.title}
				</option>
			))}
		</select>
	);
};
