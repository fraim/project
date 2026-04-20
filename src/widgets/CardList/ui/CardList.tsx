import { FC, memo, useRef } from 'react';
import { ProductCard } from '@entities/product';
import { LikeButton } from '@features/toggle-like';
import s from './CardList.module.css';

type CardListProps = {
	title: string;
	products: Product[];
};

export const CardList: FC<CardListProps> = memo(({ title, products }) => {
	const renderCountRef = useRef(0);
	renderCountRef.current += 1;

	if (!products.length) {
		return <h1 className={s.empty}>Товар не найден</h1>;
	}

	return (
		<div className={s.cardList}>
			<div className={s.header}>
				<h2 className={s.title}>{title}</h2>
				{process.env.NODE_ENV !== 'production' && (
					<span
						className={s.renderCounter}
						data-testid='cardlist-render-count'
						title='useRef: счётчик перерендеров'>
						renders: {renderCountRef.current}
					</span>
				)}
			</div>
			<div className={s.items}>
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						topRightSlot={<LikeButton product={product} />}
					/>
				))}
			</div>
		</div>
	);
});
