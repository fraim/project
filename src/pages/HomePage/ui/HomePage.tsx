import { FC } from 'react';
import { WithProtection } from '@features/auth';
import { WithQuery } from '@shared/ui/WithQuery';
import { useProducts } from '@shared/store/hooks/useProducts';
import { SortProducts } from '@features/sort-products';
import { CardList } from '@widgets/CardList';
import { LoadMore } from '@widgets/LoadMore';

const CardListWithQuery = WithQuery(CardList);

const HomePageBase: FC = () => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<main className='container' style={{ paddingTop: 24 }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 16,
				}}>
				<SortProducts />
			</div>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</main>
	);
};

export const HomePage = WithProtection(HomePageBase);
