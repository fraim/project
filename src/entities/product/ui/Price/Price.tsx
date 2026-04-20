import classNames from 'classnames';
import s from './Price.module.css';

type PriceProps = {
	price: number;
	discountPrice?: number;
};

export const Price = ({ price, discountPrice }: PriceProps) => {
	const hasDiscount = !!discountPrice && discountPrice > 0;
	const finalPrice = hasDiscount ? price - discountPrice : price;
	return (
		<div className={classNames(s['price-small'], s['price-wrap'])}>
			{hasDiscount && (
				<span className={classNames(s['price_old'], s['price_left'])}>
					{`${price}₽`}
				</span>
			)}
			<span
				className={classNames(
					s['price'],
					hasDiscount && s['price_discount']
				)}>
				{`${finalPrice}₽`}
			</span>
		</div>
	);
};
