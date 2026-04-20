import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Price } from './Price/Price';
import { ProductImage } from './ProductImage/ProductImage';
import s from './ProductCard.module.css';

type ProductCardProps = {
	product: Product;
	topRightSlot?: ReactNode;
	footerSlot?: ReactNode;
};

const ProductCardBase = ({
	product,
	topRightSlot,
	footerSlot,
}: ProductCardProps) => {
	const { id, name, images, price, discount, tags } = product;

	return (
		<article className={s.card}>
			<div
				className={classNames(s.card__sticky, s['card__sticky_type_top-left'])}>
				{discount > 0 && (
					<span className={s.card__discount}>{discount}</span>
				)}
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s.tag, s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			{topRightSlot && (
				<div
					className={classNames(s.card__sticky, s['card__sticky_type_top-right'])}>
					{topRightSlot}
				</div>
			)}
			<Link className={s.card__link} to={`/products/${id}`}>
				<ProductImage
					src={images}
					alt={name}
					className={s.card__image}
					loading='lazy'
				/>
				<div className={s.card__desc}>
					<Price price={price} discountPrice={price === discount ? undefined : discount} />
					<h3 className={s.card__name}>{name}</h3>
				</div>
			</Link>
			{footerSlot}
		</article>
	);
};

export const ProductCard = memo(ProductCardBase);
