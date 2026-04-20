import { useCallback } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';
import { cartActions } from '@entities/cart';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = useCallback(
		(cartProduct: CartProduct) => {
			dispatch(cartActions.addCartProduct(cartProduct));
		},
		[dispatch]
	);

	return { addProductToCart };
};
