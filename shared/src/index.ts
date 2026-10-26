/**
 * Types shared by frontend and backend: the JSON shapes the backend's routes return.
 */

export interface HelloResponse {
	message: string;
}

export interface User {
	userId: string;
	email: string;
	name: string;
}

export interface CurrentUserResponse {
	user: User;
}
