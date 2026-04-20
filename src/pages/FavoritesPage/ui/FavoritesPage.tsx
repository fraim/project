import { FC } from 'react';
import { WithProtection } from '@features/auth';
import { WithQuery } from '@shared/ui/WithQuery';
import { useProducts } from '@shared/store/hooks/useProducts';
import { ButtonBack } from '@shared/ui/ButtonBack';
import { CardList } from '@widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

const FavoritesPageBase: FC = () => {
	const { isLoading, isError, products, error } = useProducts();

	return (
		<main className='container' style={{ paddingTop: 24 }}>
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</main>
	);
};

export const FavoritesPage = WithProtection(FavoritesPageBase);
