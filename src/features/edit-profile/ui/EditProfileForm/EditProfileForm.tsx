import { FC, FormEvent, useCallback } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { getMessageFromError } from '@shared/utils';
import {
	UpdateMeBody,
	useUpdateMeMutation,
} from '@entities/user';
import s from './EditProfileForm.module.css';

type EditProfileFormProps = {
	user: User;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
	const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const form = e.currentTarget;
			const data = new FormData(form);
			const password = String(data.get('password') ?? '');
			const passwordConfirm = String(data.get('passwordConfirm') ?? '');

			if (password && password !== passwordConfirm) {
				toast.error('Пароли не совпадают');
				return;
			}

			const name = String(data.get('name') ?? '').trim();
			const avatarPath = String(data.get('avatarPath') ?? '').trim();
			const about = String(data.get('about') ?? '').trim();
			const phone = String(data.get('phone') ?? '').replace(/[\s()\-]/g, '');

			const body: UpdateMeBody = {
				id: user.id,
				email: String(data.get('email') ?? '').trim(),
			};
			if (name) body.name = name;
			if (avatarPath) body.avatarPath = avatarPath;
			if (about) body.about = about;
			if (phone) body.phone = phone;
			if (user.roles?.length) body.roles = user.roles;
			if (password) body.password = password;

			try {
				await updateMe(body).unwrap();
				toast.success('Профиль обновлён');
				const pwd = form.elements.namedItem('password') as HTMLInputElement | null;
				const pwd2 = form.elements.namedItem('passwordConfirm') as HTMLInputElement | null;
				if (pwd) pwd.value = '';
				if (pwd2) pwd2.value = '';
			} catch (error) {
				toast.error(getMessageFromError(error, 'Не удалось сохранить'));
			}
		},
		[updateMe, user.id, user.roles]
	);

	return (
		<form className={s.form} onSubmit={handleSubmit} key={user.id}>
			<div className={s.row}>
				<label className={s.label} htmlFor='name'>
					<span className={s.caption}>Имя</span>
					<input
						className={s.input}
						name='name'
						id='name'
						type='text'
						placeholder='Введите ваше имя'
						defaultValue={user.name ?? ''}
					/>
				</label>
				<label className={s.label} htmlFor='about'>
					<span className={s.caption}>О себе</span>
					<input
						className={s.input}
						name='about'
						id='about'
						type='text'
						placeholder='Коротко о себе'
						defaultValue={user.about ?? ''}
					/>
				</label>
			</div>
			<div className={s.row}>
				<label className={s.label} htmlFor='avatarPath'>
					<span className={s.caption}>Аватар (URL)</span>
					<input
						className={s.input}
						name='avatarPath'
						id='avatarPath'
						type='url'
						placeholder='https://…'
						defaultValue={user.avatarPath ?? ''}
					/>
				</label>
				<label className={s.label} htmlFor='phone'>
					<span className={s.caption}>Телефон</span>
					<input
						className={s.input}
						name='phone'
						id='phone'
						type='tel'
						placeholder='+7…'
						defaultValue={user.phone ?? ''}
					/>
				</label>
			</div>
			<div className={s.row}>
				<label className={s.label} htmlFor='email'>
					<span className={s.caption}>Email</span>
					<input
						className={s.input}
						name='email'
						id='email'
						type='email'
						required
						placeholder='you@example.com'
						defaultValue={user.email ?? ''}
					/>
				</label>
			</div>
			<div className={s.row}>
				<label className={s.label} htmlFor='password'>
					<span className={s.caption}>Новый пароль</span>
					<input
						className={s.input}
						name='password'
						id='password'
						type='password'
						autoComplete='new-password'
						minLength={6}
						placeholder='Минимум 6 символов'
					/>
				</label>
				<label className={s.label} htmlFor='passwordConfirm'>
					<span className={s.caption}>Подтверждение пароля</span>
					<input
						className={s.input}
						name='passwordConfirm'
						id='passwordConfirm'
						type='password'
						autoComplete='new-password'
						minLength={6}
						placeholder='Повторите новый пароль'
					/>
				</label>
			</div>
			<button
				type='submit'
				disabled={isUpdating}
				className={classNames(s.btn, s.primary)}>
				{isUpdating ? 'Сохраняем…' : 'Сохранить'}
			</button>
		</form>
	);
};
