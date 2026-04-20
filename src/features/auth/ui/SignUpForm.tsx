import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { useAppDispatch } from '@shared/lib/hooks';
import { getMessageFromError } from '@shared/utils';
import {
	AuthFormValues,
	userActions,
	useSignUpMutation,
} from '@entities/user';
import { authFormSchema } from '../model/validators';
import s from './AuthForm.module.css';

export const SignUpForm: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [signUpRequestFn] = useSignUpMutation();

	const emailInputRef = useRef<HTMLInputElement | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<AuthFormValues>({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);
	
	const { ref: emailRegisterRef, ...emailRest } = register('email');

	const submitHandler: SubmitHandler<AuthFormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();
			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);
			toast.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Неизвестная ошибка при регистрации')
			);
		}
	};

	return (
		<div className={s.wrapper}>
			<h1 className={s.title}>Регистрация</h1>
			<form
				className={s.form}
				onSubmit={handleSubmit(submitHandler)}
				noValidate>
				<Input
					type='email'
					label='Email'
					placeholder='Введите email'
					autoComplete='email'
					error={errors.email?.message}
					{...emailRest}
					ref={(el) => {
						emailRegisterRef(el);
						emailInputRef.current = el;
					}}
				/>
				<Input
					type='password'
					label='Пароль'
					placeholder='Введите пароль'
					autoComplete='new-password'
					error={errors.password?.message}
					{...register('password')}
				/>
				<Button
					type='submit'
					fullWidth
					disabled={isSubmitted && (!isValid || isSubmitting)}>
					{isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
				</Button>
				<div className={s.footer}>
					<RouterLink className={s.link} to='/signin'>
						Уже есть аккаунт? Войти
					</RouterLink>
				</div>
			</form>
		</div>
	);
};
