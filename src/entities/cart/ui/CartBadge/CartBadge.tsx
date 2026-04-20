import { ReactNode } from 'react';
import s from './CartBadge.module.css';

type CartBadgeProps = {
	count: number;
	icon: ReactNode;
};

export const CartBadge = ({ count, icon }: CartBadgeProps) => {
	return (
		<span className={s.badge}>
			{icon}
			<span className={s.count}>{count}</span>
		</span>
	);
};
