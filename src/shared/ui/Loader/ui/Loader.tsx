import classNames from 'classnames';
import s from './Loader.module.css';

type LoaderProps = {
	size?: 'sm' | 'md' | 'lg';
	fullScreen?: boolean;
	className?: string;
};

export const Loader = ({ size = 'md', fullScreen, className }: LoaderProps) => {
	return (
		<div
			className={classNames(s.wrapper, fullScreen && s.full, className)}
			role='status'
			aria-live='polite'
			aria-label='Загрузка'>
			<div className={classNames(s.spinner, size !== 'md' && s[`size-${size}`])} />
		</div>
	);
};
