import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import truckSVG from '@shared/assets/icons/truck.svg';
import qualitySVG from '@shared/assets/icons/quality.svg';
import { Rating } from '@shared/ui/Rating';
import { ButtonBack } from '@shared/ui/ButtonBack';
import { Loader } from '@shared/ui/Loader';
import { useAppSelector } from '@shared/lib/hooks';
import { ProductImage, useGetProductQuery } from '@entities/product';
import { cartSelectors } from '@entities/cart';
import { WithProtection } from '@features/auth';
import { LikeButton } from '@features/toggle-like';
import {
	AddToCartAction,
	CartCounterConnected,
} from '@features/add-to-cart';
import { ReviewList } from '@widgets/ReviewList';
import s from './ProductPage.module.css';

const ProductPageBase: FC = () => {
	const location = useLocation();
	const productId = location.pathname.split('/').at(-1) || '';

	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const { data: product, isLoading, isError } = useGetProductQuery({ id: productId });

	if (isLoading) {
		return (
			<main className='container' style={{ paddingTop: 24 }}>
				<Loader fullScreen size='lg' />
			</main>
		);
	}

	if (isError || !product) {
		return (
			<main className='container' style={{ paddingTop: 24 }}>
				<ButtonBack />
				<p style={{ marginTop: 24 }}>Не удалось загрузить товар. Попробуйте позже.</p>
			</main>
		);
	}

	const { id, name, images, description, price, discount } = product;
	const isProductInCart = cartProducts.some((p) => p.id === id);

	return (
		<main className='container' style={{ paddingTop: 24 }}>
			<ButtonBack />
			<h1 className={s['header-title']}>{name}</h1>
			<p className='acticul'>
				Артикул: <b>2388907</b>
			</p>
			<Rating rating={3} />
			<div className={s['product']}>
				<div className={s['product__img-wrapper']}>
					<ProductImage src={images} alt={description} />
				</div>
				<div className={s['product__desc']}>
					<div className={classNames(s['price-big'], s['price-wrap'])}>
						{discount > 0 && (
							<span className={classNames(s['price_old'], s['price_left'])}>
								{`${price} ₽`}
							</span>
						)}
						<span className={classNames(s['price_discount'], s['price'])}>
							{`${price - discount} ₽`}
						</span>
					</div>

					{isProductInCart ? (
						<div className={s['product__in-cart']}>
							<div className={s['product__in-cart-left']}>
								<span className={s['product__in-cart-label']}>В корзине</span>
								<CartCounterConnected productId={id} />
							</div>
							<Link to='/cart' className={s['product__cart-link']}>
								Перейти в корзину
							</Link>
						</div>
					) : (
						<AddToCartAction product={product} />
					)}

					<div className={s['product__favorite-wrap']}>
						<LikeButton product={product} showLabel />
					</div>

					<div className={s['product__delivery']}>
						<img src={truckSVG} alt='truck' />
						<div className={s['product__right']}>
							<h3 className={s['product__name']}>Доставка по всему миру!</h3>
							<p className={s['product__text']}>
								Доставка курьером <span className='bold'>от 399 ₽</span>
							</p>
							<p className={s['product__text']}>
								Доставка в пункт выдачи
								<span className={s['product__bold']}> от 199 ₽</span>
							</p>
						</div>
					</div>
					<div className={s['product__delivery']}>
						<img src={qualitySVG} alt='quality' />
						<div className={s['product__right']}>
							<h3 className={s['product__name']}>Гарантия качества</h3>
							<p className={s['product__text']}>
								Если Вам не понравилось качество нашей продукции, мы вернем
								деньги, либо сделаем всё возможное, чтобы удовлетворить ваши
								нужды.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={s['product__box']}>
				<h2 className={s['product__title']}>Описание</h2>
				<p className={s['product__subtitle']}>{description}</p>
				<h2 className={s['product__title']}>Характеристики</h2>
				<div className={s['product__grid']}>
					<div className={s['product__naming']}>Вес</div>
					<div className={s['product__description']}>1 шт 120-200 грамм</div>
					<div className={s['product__naming']}>Цена</div>
					<div className={s['product__description']}>490 ₽ за 100 грамм</div>
					<div className={s['product__naming']}>Польза</div>
					<div className={s['product__description']}>
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
					</div>
				</div>
			</div>
			<ReviewList product={product} />
		</main>
	);
};

export const ProductPage = WithProtection(ProductPageBase);
