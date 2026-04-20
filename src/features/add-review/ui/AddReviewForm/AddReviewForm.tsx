import { FC, useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Rating } from '@shared/ui/Rating';
import { getMessageFromError } from '@shared/utils';
import { useAddReviewMutation } from '@entities/product';
import s from './AddReviewForm.module.css';

type AddReviewFormProps = {
	productId: string;
	onSuccess?: () => void;
};

type FormState = {
	ok: boolean;
	error: string | null;
};

const INITIAL_STATE: FormState = { ok: false, error: null };

export const AddReviewForm: FC<AddReviewFormProps> = ({
	productId,
	onSuccess,
}) => {
	const [rating, setRating] = useState(0);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [addReview] = useAddReviewMutation();

	const [state, submitAction, isPending] = useActionState<FormState, FormData>(
		async (_prev, formData) => {
			const text = String(formData.get('text') ?? '').trim();

			if (!text) {
				return { ok: false, error: 'Напишите текст отзыва' };
			}
			if (rating <= 0) {
				return { ok: false, error: 'Поставьте оценку' };
			}

			try {
				await addReview({ productId, text, rating }).unwrap();
				return { ok: true, error: null };
			} catch (error) {
				return {
					ok: false,
					error: getMessageFromError(error, 'Не удалось отправить отзыв'),
				};
			}
		},
		INITIAL_STATE
	);

	useEffect(() => {
		if (state.ok) {
			toast.success('Отзыв отправлен!');
			setRating(0);
			formRef.current?.reset();
			onSuccess?.();
		}
	}, [state, onSuccess]);

	return (
		<form ref={formRef} className={s.form} action={submitAction}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={s.textarea}
				name='text'
				placeholder='Напишите текст отзыва'
				disabled={isPending}
			/>
			{state.error && <div className={s.error}>{state.error}</div>}
			<button type='submit' className={s.submit} disabled={isPending}>
				{isPending ? 'Отправляем…' : 'Отправить отзыв'}
			</button>
		</form>
	);
};
