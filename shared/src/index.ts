/**
 * Types shared by frontend and backend: the JSON shapes the backend's routes return.
 */

export interface HelloResponse {
	message: string;
}

export interface MeResponse {
	signedIn: boolean;
}
