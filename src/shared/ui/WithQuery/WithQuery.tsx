import { ComponentType, FC } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import { getMessageFromError } from '@shared/utils';

interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	refetch?: () => void;
	error?: FetchBaseQueryError | SerializedError | undefined;
}

export const WithQuery = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	const ReturnedComponent: FC<WithQueryProps & T> = (props) => {
		const {
			isError,
			isLoading,
			refetch,
			error,
			...propsForWrappedComponent
		} = props;

		if (isError) {
			return (
				<div
					style={{
						maxWidth: 600,
						margin: '40px auto',
						padding: 24,
						borderRadius: 16,
						border: '1px solid #f44336',
						background: '#ffeaea',
						color: '#b71c1c',
					}}
					role='alert'>
					<strong>Ошибка</strong>
					<p>
						{getMessageFromError(
							error,
							'Неизвестная ошибка при получении данных'
						)}
					</p>
					{refetch && (
						<Button variant='secondary' onClick={refetch}>
							Повторить
						</Button>
					)}
				</div>
			);
		}

		if (isLoading) {
			return <Loader fullScreen />;
		}

		return <WrappedComponent {...(propsForWrappedComponent as T)} />;
	};


	return ReturnedComponent;
};
