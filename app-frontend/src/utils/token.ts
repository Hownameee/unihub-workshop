const REFRESH_TOKEN = "refresh-token";
const ACCESS_TOKEN = "access-token";

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_TOKEN);
}

export function getAccessToken() {
	return localStorage.getItem(ACCESS_TOKEN);
}

export function setRefreshToken(token: string) {
	localStorage.setItem(REFRESH_TOKEN, token);
}

export function setAccessToken(token: string) {
	localStorage.setItem(ACCESS_TOKEN, token);
}

export function clearToken() {
	localStorage.removeItem(REFRESH_TOKEN);
	localStorage.removeItem(ACCESS_TOKEN);
}
