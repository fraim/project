import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadAuth } from '@shared/lib/authStorage';

interface UserState {
	user: Partial<User> | null;
	accessToken: string;
}

const createInitState = (): UserState => {
	const stored = loadAuth();
	return {
		user: stored.user,
		accessToken: stored.accessToken,
	};
};

export const userSlice = createSlice({
	name: 'user',
	initialState: createInitState(),
	reducers: {
		setAccessToken(state, action: PayloadAction<Pick<Token, 'accessToken'>>) {
			state.accessToken = action.payload.accessToken;
		},
		clearUser() {
			return { user: null, accessToken: '' };
		},
		setUser: (state, action: PayloadAction<UserState['user']>) => {
			state.user = action.payload;
		},
	},
	selectors: {
		getUser: (state: UserState) => state.user,
		getAccessToken: (state: UserState) => state.accessToken,
	},
});

export const userActions = { ...userSlice.actions };
export const userSelectors = userSlice.selectors;
