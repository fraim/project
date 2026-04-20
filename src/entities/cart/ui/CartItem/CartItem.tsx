import { memo, ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import TrashIcon from '@shared/assets/icons/trash.svg?react';
import { useAppDispatch } from '@shared/lib/hooks';
import { ProductImage } from '@entities/product';
import { cartActions } from '../../model/slice';
import s from '../cart.module.css';

type CartItemProps = {
	product: CartProduct;
	counterSlot?: ReactNode;
};

const CartItemBase = ({ product, counterSlot }: CartItemProps) => {
	const dispatch = useAppDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);

	const hasDiscount = discount > 0;
	const finalPrice = price - discount;

	return (
		<div className={s['cart-item']}>
			<ProductImage
				src={images}
				alt={name}
				className={s['cart-item__image']}
			/>
			<Link className={s['cart-item__title']} to={`/products/${id}`}>
				{name}
			</Link>
			<div className={s['cart-item__price']}>
				{hasDiscount && (
					<span className={s['cart-item__price-old']}>{`${price} ₽`}</span>
				)}
				<span
					className={classNames(
						s['cart-item__price-current'],
						hasDiscount && s['cart-item__price-current_discount']
					)}>
					{`${finalPrice} ₽`}
				</span>
			</div>
			<div className={s['cart-item__counter']}>{counterSlot}</div>
			<button
				type='button'
				onClick={handleDelete}
				aria-label='Удалить из корзины'
				className={s['cart-item__bnt-trash']}
			>
				<TrashIcon />
			</button>
		</div>
	);
};

export const CartItem = memo(CartItemBase);
