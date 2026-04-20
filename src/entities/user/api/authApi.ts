import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '@shared/api/baseQuery';

export type AuthFormValues = {
	email: string;
	password: string;
};

type AuthResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

export type UpdateMeBody = Pick<User, 'id' | 'email'> &
	Partial<Pick<User, 'name' | 'avatarPath' | 'about' | 'phone' | 'roles'>> & {
		password?: string;
	};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	tagTypes: ['Me'],
	endpoints: (builder) => ({
		signUp: builder.mutation<AuthResponse, AuthFormValues>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
		}),
		signIn: builder.mutation<AuthResponse, AuthFormValues>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
		getMe: builder.query<User, void>({
			query: () => ({ url: '/users/me' }),
			providesTags: ['Me'],
		}),
		updateMe: builder.mutation<User, UpdateMeBody>({
			query: (body) => ({
				url: '/users/me',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Me'],
		}),
		deleteUser: builder.mutation<{ id: string } | void, { id: string }>({
			query: ({ id }) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Me'],
		}),
	}),
});

export const {
	useSignInMutation,
	useSignUpMutation,
	useGetMeQuery,
	useUpdateMeMutation,
	useDeleteUserMutation,
} = authApi;
