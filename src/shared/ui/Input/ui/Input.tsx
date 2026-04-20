import { forwardRef, InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, className, id, ...rest }, ref) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const isInvalid = !!error;

		return (
			<label className={s.wrapper} htmlFor={inputId}>
				{label && <span className={s.label}>{label}</span>}
				<input
					ref={ref}
					id={inputId}
					className={classNames(s.input, isInvalid && s.invalid, className)}
					aria-invalid={isInvalid || undefined}
					{...rest}
				/>
				{(error || helperText) && (
					<span className={classNames(s.helper, error && s.error)}>
						{error ?? helperText}
					</span>
				)}
			</label>
		);
	}
);
