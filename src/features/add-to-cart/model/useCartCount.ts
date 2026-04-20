import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { cartActions, cartSelectors } from '@entities/cart';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

const clamp = (value: number) =>
	value > MAX_COUNT ? MAX_COUNT : value < MIN_COUNT ? MIN_COUNT : value;

export const useCartCount = (productId: string) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);
	const product = products.find((p) => p.id === productId);

	const count = product?.count ?? 0;
	const stock = product?.stock ?? 0;

	const handleIncrement = useCallback(() => {
		dispatch(
			cartActions.setCartProductCount({
				id: productId,
				count: clamp(count + 1),
			})
		);
	}, [dispatch, count, productId]);

	const handleDecrement = useCallback(() => {
		dispatch(
			cartActions.setCartProductCount({
				id: productId,
				count: clamp(count - 1),
			})
		);
	}, [dispatch, count, productId]);

	const handleSetCount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			dispatch(
				cartActions.setCartProductCount({
					id: productId,
					count: clamp(+e.target.value),
				})
			);
		},
		[dispatch, productId]
	);

	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
