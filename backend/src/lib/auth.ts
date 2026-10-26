/**
 * Looks up the signed-in user for the current request. Reads the request
 * through contextStorage, so call it from any code a handler runs.
 */
import { getContext } from "hono/context-storage";
import type { CurrentUserResponse } from "shared";

const API_BASE_URL = process.env.MAJOR_API_BASE_URL || "https://go-api.prod.major.build";

export async function getCurrentUser(): Promise<CurrentUserResponse> {
	const userJwt = getContext().req.header("x-major-user-jwt");
	const majorJwtToken = process.env.MAJOR_JWT_TOKEN;

	if (!userJwt && !majorJwtToken) {
		throw new Error("No user JWT found. Ensure x-major-user-jwt header is present.");
	}

	const headers: Record<string, string> = userJwt
		? { "x-major-user-jwt": userJwt }
		: { "x-major-jwt": majorJwtToken! };

	const res = await fetch(`${API_BASE_URL}/internal/apps/v1/me`, { headers });

	if (!res.ok) {
		throw new Error(`Failed to fetch user: ${res.statusText}`);
	}

	return (await res.json()) as CurrentUserResponse;
}
