import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
	size?: Size;
	fullWidth?: boolean;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			fullWidth,
			startIcon,
			endIcon,
			className,
			children,
			type = 'button',
			...rest
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={classNames(
					s.button,
					s[variant],
					s[`size-${size}`],
					fullWidth && s['full-width'],
					className
				)}
				{...rest}>
				{startIcon}
				{children}
				{endIcon}
			</button>
		);
	}
);
