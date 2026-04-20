export { ProductCard } from './ui/ProductCard';
export { ProductImage } from './ui/ProductImage/ProductImage';
export { Price } from './ui/Price/Price';
export {
	productsApi,
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	useAddReviewMutation,
} from './api/productsApi';
export type { IErrorResponse } from './api/productsApi';
