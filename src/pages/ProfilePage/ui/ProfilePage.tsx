import { FC } from 'react';
import { ButtonBack } from '@shared/ui/ButtonBack';
import { Loader } from '@shared/ui/Loader';
import { useGetMeQuery } from '@entities/user';
import { WithProtection } from '@features/auth';
import { EditProfileForm } from '@features/edit-profile';
import { DeleteAccountButton } from '@features/delete-account';
import s from './ProfilePage.module.css';

const ProfilePageBase: FC = () => {
	const { data: me, isLoading, isError, refetch } = useGetMeQuery();

	if (isLoading) {
		return (
			<main className='container' style={{ paddingTop: 24 }}>
				<Loader fullScreen size='lg' />
			</main>
		);
	}

	if (isError || !me) {
		return (
			<main className='container' style={{ paddingTop: 24 }}>
				<ButtonBack />
				<p style={{ marginTop: 24 }}>
					Не удалось загрузить профиль.{' '}
					<button type='button' className={s['link-btn']} onClick={() => refetch()}>
						Попробовать ещё раз
					</button>
				</p>
			</main>
		);
	}

	return (
		<main className='container' style={{ paddingTop: 24 }}>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<div className={s['content']}>
				<EditProfileForm user={me} />
				<div className={s['danger-zone']}>
					<DeleteAccountButton userId={me.id} />
				</div>
			</div>
		</main>
	);
};

export const ProfilePage = WithProtection(ProfilePageBase);
