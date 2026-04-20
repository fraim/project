import { FC } from 'react';
import { useCartCount } from '../../model/useCartCount';
import { CartCounter } from '../CartCounter/CartCounter';

type Props = { productId: string };

export const CartCounterConnected: FC<Props> = ({ productId }) => {
	const { count, stock, handleIncrement, handleDecrement, handleSetCount } =
		useCartCount(productId);

	return (
		<CartCounter
			count={count}
			stock={stock}
			onIncrement={handleIncrement}
			onDecrement={handleDecrement}
			onChange={handleSetCount}
		/>
	);
};
