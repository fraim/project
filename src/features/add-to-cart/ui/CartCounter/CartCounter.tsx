import { ChangeEvent, FC, memo } from 'react';
import s from './CartCounter.module.css';

type CartCounterProps = {
	count: number;
	stock?: number;
	onIncrement: () => void;
	onDecrement: () => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CartCounter: FC<CartCounterProps> = memo(
	({ count, stock, onIncrement, onDecrement, onChange }) => (
		<div className={s.wrapper}>
			<button
				type='button'
				onClick={onDecrement}
				className={s.minus}
				disabled={count <= 1}
				aria-label='Уменьшить количество'>
				-
			</button>
			<input
				className={s.num}
				value={count}
				onChange={onChange}
				aria-label='Количество'
			/>
			<button
				type='button'
				onClick={onIncrement}
				className={s.plus}
				disabled={stock !== undefined && count >= stock}
				aria-label='Увеличить количество'>
				+
			</button>
		</div>
	)
);
