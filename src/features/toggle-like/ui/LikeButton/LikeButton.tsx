import {
	FC,
	memo,
	startTransition,
	useCallback,
	useOptimistic,
} from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import LikeIcon from '@shared/assets/icons/like.svg?react';
import { useAppSelector } from '@shared/lib/hooks';
import { userSelectors } from '@entities/user';
import {
	IErrorResponse,
	useDeleteLikeProductMutation,
	useSetLikeProductMutation,
} from '@entities/product';
import s from './LikeButton.module.css';

type LikeButtonProps = {
	product: Product;
	showLabel?: boolean;
};

export const LikeButton: FC<LikeButtonProps> = memo(({ product, showLabel }) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLiked = product?.likes?.some((l) => l.userId === user?.id) ?? false;

	const [optimisticLiked, applyOptimisticLike] = useOptimistic(
		isLiked,
		(_prev: boolean, nextValue: boolean) => nextValue
	);

	const toggleLike = useCallback(async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		const nextValue = !isLiked;

		startTransition(async () => {
			applyOptimisticLike(nextValue);

			const response = nextValue
				? await setLike({ id: `${product.id}` })
				: await deleteLike({ id: `${product.id}` });

			if ('error' in response && response.error) {
				const error = response.error as IErrorResponse;
				toast.error(
					error?.data?.message ?? 'Не удалось обновить избранное'
				);
			}
		});
	}, [accessToken, isLiked, applyOptimisticLike, setLike, deleteLike, product.id]);

	return (
		<button
			type='button'
			aria-pressed={optimisticLiked}
			aria-label={optimisticLiked ? 'Убрать из избранного' : 'В избранное'}
			className={classNames(s.button, {
				[s.active]: optimisticLiked,
				[s['button_with-label']]: showLabel,
			})}
			onClick={toggleLike}>
			<LikeIcon />
			{showLabel && (
				<span className={s.label}>
					{optimisticLiked ? 'В избранном' : 'Добавить в избранное'}
				</span>
			)}
		</button>
	);
});
