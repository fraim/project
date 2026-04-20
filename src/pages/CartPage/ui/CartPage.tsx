import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@shared/lib/hooks';
import {
	CartAmount,
	CartItem,
	cartSelectors,
} from '@entities/cart';
import { CartCounterConnected } from '@features/add-to-cart';
import { WithProtection } from '@features/auth';
import s from './CartPage.module.css';

const pluralize = (count: number) => {
	const mod10 = count % 10;
	const mod100 = count % 100;
	if (mod10 === 1 && mod100 !== 11) return 'товар';
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'товара';
	return 'товаров';
};

const CartPageBase: FC = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return (
			<main className={classNames(s['content'], s['container'])}>
				<div className={s['empty']}>
					<h1 className={s['empty__title']}>Ваша корзина пуста</h1>
					<Link to='/' className={classNames(s.button, s['button_type_primary'])}>
						Перейти в каталог
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className={classNames(s['content'], s['container'])}>
			<div className={s['content-cart']}>
				<h1 className={s['cart-title']}>
					<span>{products.length}</span> {pluralize(products.length)} в корзине
				</h1>
				<div className={s['cart-list']}>
					{products.map((p) => (
						<CartItem
							key={p.id}
							product={p}
							counterSlot={<CartCounterConnected productId={p.id} />}
						/>
					))}
				</div>
				<CartAmount products={products} />
			</div>
		</main>
	);
};

export const CartPage = WithProtection(CartPageBase);
