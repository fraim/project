import { FC, useRef } from 'react';
import { Loader } from '@shared/ui/Loader';
import { useLoadMore } from '../model/useLoadMore';
import s from './LoadMore.module.css';

export const LoadMore: FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { isEndOfList, isFetching } = useLoadMore({ ref });

	return (
		<div ref={ref} className={s.wrap}>
			{isFetching && <Loader />}
			{isEndOfList && !isFetching && (
				<div className={s.end}>Это все товары</div>
			)}
		</div>
	);
};
