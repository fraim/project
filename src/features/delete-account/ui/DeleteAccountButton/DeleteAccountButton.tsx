import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Modal } from '@shared/ui/Modal';
import { useAppDispatch } from '@shared/lib/hooks';
import { getMessageFromError } from '@shared/utils';
import { useDeleteUserMutation, userActions } from '@entities/user';
import { cartActions } from '@entities/cart';
import s from './DeleteAccountButton.module.css';

type DeleteAccountButtonProps = {
	userId: string;
};

export const DeleteAccountButton: FC<DeleteAccountButtonProps> = ({ userId }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
	const [isOpen, setOpen] = useState(false);

	const handleConfirm = useCallback(async () => {
		try {
			await deleteUser({ id: userId }).unwrap();
			toast.success('Аккаунт удалён');
			dispatch(userActions.clearUser());
			dispatch(cartActions.clearCart());
			navigate('/signin');
		} catch (error) {
			toast.error(getMessageFromError(error, 'Не удалось удалить аккаунт'));
			setOpen(false);
		}
	}, [deleteUser, dispatch, navigate, userId]);

	return (
		<>
			<button
				type='button'
				onClick={() => setOpen(true)}
				disabled={isDeleting}
				className={classNames(s.btn, s.danger)}>
				Удалить аккаунт
			</button>
			<Modal
				isOpen={isOpen}
				onClose={() => setOpen(false)}
				title='Удалить аккаунт?'>
				<p className={s.text}>
					Действие необратимо: профиль, лайки и отзывы будут удалены.
				</p>
				<div className={s.actions}>
					<button
						type='button'
						className={classNames(s.btn, s.secondary)}
						onClick={() => setOpen(false)}
						disabled={isDeleting}>
						Отмена
					</button>
					<button
						type='button'
						className={classNames(s.btn, s.danger)}
						onClick={handleConfirm}
						disabled={isDeleting}>
						{isDeleting ? 'Удаляем…' : 'Да, удалить'}
					</button>
				</div>
			</Modal>
		</>
	);
};
