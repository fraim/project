import { FC, useCallback, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { ReviewCard } from '@entities/review';
import { AddReviewForm } from '@features/add-review';
import s from './ReviewList.module.css';

type ReviewListProps = { product: Product };

export const ReviewList: FC<ReviewListProps> = ({ product }) => {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return (
		<div className={s.reviews}>
			<div className={s.actionRow}>
				<h2 className={s.heading}>Отзывы о товаре</h2>
				<Button variant='secondary' onClick={open}>
					Оставить отзыв
				</Button>
			</div>

			{product.reviews.length === 0 ? (
				<p className={s.empty}>Пока нет отзывов. Будьте первым!</p>
			) : (
				product.reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))
			)}

			<Modal
				isOpen={isOpen}
				onClose={close}
				title={`Отзыв о товаре «${product.name}»`}>
				<AddReviewForm productId={product.id} onSuccess={close} />
			</Modal>
		</div>
	);
};
