import { useMemo } from 'react';
import classNames from 'classnames';
import s from '../cart.module.css';

type CartAmountProps = {
	products: CartProduct[];
};

export const CartAmount = ({ products }: CartAmountProps) => {
	const { allPrice, allDiscount } = useMemo(() => {
		const totals = products.reduce(
			(acc, p) => ({
				allPrice: acc.allPrice + p.price * p.count,
				allDiscount: acc.allDiscount + p.discount * p.count,
			}),
			{ allPrice: 0, allDiscount: 0 }
		);
		return totals;
	}, [products]);

	const handleSubmitCart = () => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	};

	return (
		<div className={s['cart-amount']}>
			<h1 className={s['cart-amount__title']}>Ваша корзина</h1>
			<div className={s['cart-amount__table']}>
				<div className={s['cart-amount__table-row']}>
					<span className={s['cart-amount__table-title']}>
						{`Товары (${products.length})`}
					</span>
					<span className={s['cart-amount__table-value']}>{`${allPrice} ₽`}</span>
				</div>
				<div className={s['cart-amount__table-row']}>
					<span className={s['cart-amount__table-title']}>Скидка</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={s['cart-amount__total-cost']}>
				<h2 className={s['cart-amount__total-cost-title']}>Общая стоимость</h2>
				<span className={s['cart-amount__total-cost-value']}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<button
				onClick={handleSubmitCart}
				className={classNames(
					s.button,
					s['button_type_primary'],
					s['button_type_wide']
				)}>
				Оформить заказ
			</button>
		</div>
	);
};
