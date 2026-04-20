import { FC, useCallback } from 'react';
import { Button } from '@shared/ui/Button';
import { CartCounter } from '../CartCounter/CartCounter';
import { useLocalCount } from '../../model/useLocalCount';
import { useAddToCart } from '../../model/useAddToCart';
import s from './AddToCartAction.module.css';

type Props = { product: Product };

export const AddToCartAction: FC<Props> = ({ product }) => {
	const { count, handleCount, handleCountPlus, handleCountMinus } =
		useLocalCount(1);
	const { addProductToCart } = useAddToCart();

	const handleAdd = useCallback(() => {
		addProductToCart({ ...product, count });
	}, [addProductToCart, product, count]);

	return (
		<div className={s.wrap}>
			<CartCounter
				count={count}
				stock={product.stock}
				onIncrement={handleCountPlus}
				onDecrement={handleCountMinus}
				onChange={handleCount}
			/>
			<Button onClick={handleAdd} className={s.cartBtn}>
				В корзину
			</Button>
		</div>
	);
};
