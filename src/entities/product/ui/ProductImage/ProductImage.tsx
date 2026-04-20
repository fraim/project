import { FC, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import s from './ProductImage.module.css';

type ProductImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const ProductImage: FC<ProductImageProps> = ({
	src,
	alt,
	onError,
	className,
	...rest
}) => {
	const [hasError, setHasError] = useState(false);

	if (!src || hasError) {
		return (
			<div
				className={classNames(s.placeholder, className)}
				role='img'
				aria-label={alt || 'Нет изображения'}>
				<svg
					className={s.placeholder__icon}
					viewBox='0 0 48 48'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'>
					<path
						d='M40 10H32l-2-4H18l-2 4H8a4 4 0 0 0-4 4v22a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V14a4 4 0 0 0-4-4Zm-16 24a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z'
						fill='currentColor'
					/>
				</svg>
				<span>Нет фото</span>
			</div>
		);
	}

	return (
		<img
			{...rest}
			className={className}
			src={src}
			alt={alt}
			onError={(e) => {
				setHasError(true);
				onError?.(e);
			}}
		/>
	);
};
