import * as yup from 'yup';

export const authFormSchema = yup.object({
	email: yup.string().email('Введите корректный email').required('Поле обязательно'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.max(24, 'Максимум 24 символа')
		.required('Поле обязательно'),
});
