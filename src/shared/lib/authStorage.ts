const STORAGE_KEY = 'dogfood.auth';

type StoredAuth = {
	user: Partial<User> | null;
	accessToken: string;
};

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
	const parts = token.split('.');
	if (parts.length !== 3) return null;
	try {
		const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64 + '==='.slice((base64.length + 3) % 4);
		return JSON.parse(atob(padded));
	} catch {
		return null;
	}
};

export const isTokenExpired = (token: string): boolean => {
	const payload = decodeJwtPayload(token);
	if (!payload || typeof payload.exp !== 'number') return false;
	return payload.exp * 1000 <= Date.now();
};

export const loadAuth = (): StoredAuth => {
	const empty: StoredAuth = { user: null, accessToken: '' };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw) as StoredAuth;
		if (!parsed.accessToken || isTokenExpired(parsed.accessToken)) {
			localStorage.removeItem(STORAGE_KEY);
			return empty;
		}
		return parsed;
	} catch {
		return empty;
	}
};

export const saveAuth = (auth: StoredAuth): void => {
	try {
		if (!auth.accessToken) {
			localStorage.removeItem(STORAGE_KEY);
			return;
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
	} catch {
	}
};
