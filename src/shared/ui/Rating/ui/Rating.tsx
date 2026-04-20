import { FC, memo } from 'react';
import Star from '@shared/assets/icons/star.svg?react';

type RatingProps = {
	rating?: number;
	isEdit?: boolean;
	onChange?: (rating: number) => void;
};

export const Rating: FC<RatingProps> = memo(
	({ rating = 0, isEdit = false, onChange }) => (
		<div role={isEdit ? 'radiogroup' : undefined} aria-label='Оценка'>
			{Array.from({ length: 5 }).map((_, i) => (
				<span key={i} style={{ cursor: isEdit ? 'pointer' : 'default' }}>
					<Star
						onClick={() => isEdit && onChange?.(i)}
						fill={i <= rating ? 'gold' : 'gray'}
					/>
				</span>
			))}
		</div>
	)
);
