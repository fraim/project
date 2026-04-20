import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import BackSvg from '@shared/assets/icons/back.svg?react';
import s from './ButtonBack.module.css';

export const ButtonBack: FC = () => {
	const navigate = useNavigate();
	return (
		<button
			type='button'
			onClick={() => navigate(-1)}
			className={s.button}>
			<BackSvg aria-hidden='true' />
			<span>Назад</span>
		</button>
	);
};
